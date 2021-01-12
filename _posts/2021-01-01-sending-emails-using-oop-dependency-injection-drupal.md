---
title: Sending Emails Using OOP and Dependency Injection in Drupal 8, 9
image: "/img/oop-email.png"
description: A place where community members can network and help one another
thumbnail: "/uploads/yogas-design-j6qn9se4akm-unsplash.jpg"
color_overlay: "#009480"
categories: []
date: 2020-11-09T08:00:00.000+00:00
author: alex-novak

---
In Drupal, until now, the formation of an email is done using the `hook_mail()` hook. If you need to form more than one email, then the function grows by leaps and bounds, or provokes to write spaghetti. Often, the problem is complicated by the fact that emails can be complex, require data or services for some kind of logic, which makes the code even more difficult to maintain.

Until this hook is replaced with something more modern, we can do it ourselves! Fortunately, it's not that difficult.

We do not need to invent anything. The Drupal Commerce 2 developers have already come up with everything for us. In this article, you will not only learn how they send emails, but how you can also apply their approach to your projects.

Some advantages include:

* Set standard parameter values for emails.
* Send render arrays as the content of the email.
* Use Dependency Injection and Services correctly.
* Break emails their own object, making it easier to form emails with more complex logic by methods and DI (Dependency Injection).
* Better organize your code in your project.
* Send emails in different languages, regardless of the original.

Further we will write and analyze an analogue of what is in Drupal Commerce 2. If you compare them, they will be slightly different, but the principle and approach will be absolutely identical.

### MailHandler - Generating and Sending Emails

The @Mail plugins are responsible for sending emails to Drupal, and they are managed by the plugin.manager.mail manager. In principle, this service is sufficient for sending mail, but most likely you will not want to send emails with standard parameters. In order not to pass the same parameters every time, this mediator is introduced - MailHandler.

    src/Mail/MailHandler.php
    
    <?php
    
    namespace Drupal\example\Mail;
    
    use Drupal\Core\Language\LanguageDefault;
    use Drupal\Core\Language\LanguageManagerInterface;
    use Drupal\Core\Mail\MailManagerInterface;
    use Drupal\Core\StringTranslation\TranslatableMarkup;
    use Drupal\Core\StringTranslation\TranslationInterface;
    use Drupal\Core\StringTranslation\TranslationManager;
    
    /**
     * Handles the assembly and dispatch of HTML emails.
     */
    final class MailHandler {
    
      /**
      * The mail manager.
      *
      * @var \Drupal\Core\Mail\MailManagerInterface
      */
      protected $mailManager;
    
      /**
       * The language manager.
       *
       * @var \Drupal\Core\Language\LanguageManagerInterface
       */
      protected $languageManager;
    
      /**
       * The language default.
       *
       * @var \Drupal\Core\Language\LanguageDefault
       */
      protected $languageDefault;
    
      /**
       * The string translation service.
       *
       * @var \Drupal\Core\StringTranslation\TranslationInterface
       */
      private $stringTranslation;
    
      /**
       * Constructs a new MailHandler object.
       *
       * @param \Drupal\Core\Mail\MailManagerInterface $mail_manager
       *   The mail manager.
       * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
       *   The language manager.
       * @param \Drupal\Core\Language\LanguageDefault $language_default
       *   The language default.
       * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
       *   The string translation service.
       */
      public function __construct(MailManagerInterface $mail_manager,
        LanguageManagerInterface $language_manager, LanguageDefault
        $language_default, TranslationInterface $string_translation) {
        $this->mailManager = $mail_manager;
        $this->languageManager = $language_manager;
        $this->languageDefault = $language_default;
        $this->stringTranslation = $string_translation;
      }
    
      /**
        * Composes and send email message.
        *
        * @param string $to
        *   The email address or addresses where the message will be sent to.
        * @param TranslatableMarkup $subject
        *   The message subject. To be properly translated with body, it must be
        *   TranslatableMarkup when we switch language.
        * @param array $body
        * @param array $params
        *   Parameters to build the email.
        *
        * @return bool
        *   TRUE if the email was sent successfully, FALSE otherwise.
        *
        * @see \Drupal\Core\Mail\MailManagerInterface::mail()
        */
      public function sendMail(string $to, TranslatableMarkup $subject, array $body, array $params = []): bool {
        $default_params = ['headers' => [
            'Content-Type' => 'text/html; charset=UTF-8;',
            'Content-Transfer-Encoding' => '8Bit',
          ],
          'id' => 'mail',
          'reply-to' => NULL,
          'subject' => $subject,
          'langcode' => $this->languageManager->getCurrentLanguage()->getId(),
          // The body will be rendered in example_mail().
          'body' => $body,
        ];
    
        if (!empty($params['cc'])) {
          $default_params['headers']['Cc'] = $params['cc'];
        }
    
        if (!empty($params['bcc'])) {
          $default_params['headers']['Bcc'] = $params['bcc'];
        }
    
        $params = array_replace($default_params, $params);
    
        // Change the active language to ensure the email is properly translated.
        if ($params['langcode'] != $default_params['langcode']) {
          $this->changeActiveLanguage($params['langcode']);
        }
    
        $message = $this->mailManager->mail('example', $params['id'], $to, $params['langcode'], $params, $params['reply-to']);
    
        // Revert back to the original active language.
        if ($params['langcode'] != $default_params['langcode']) {
          $this->changeActiveLanguage($default_params['langcode']);
        }
    
        return (bool) $message['result'];
      }
    
      /**
       * Changes the active language for translations.
       *
       * @param string $langcode
       *   The langcode.
       */
      protected function changeActiveLanguage($langcode): void {
        if (!$this->languageManager->isMultilingual()) {
          return;
        }
    
        $language = $this->languageManager->getLanguage($langcode);
    
        if (!$language) {
          return;
        }
    
        // The language manager has no method for overriding the default
        // language, like it does for config overrides. We have to change the
        // default language service's current language.
        // @see https://www.drupal.org/project/drupal/issues/3029010
        $this->languageDefault->set($language);
        $this->languageManager->setConfigOverrideLanguage($language);
        $this->languageManager->reset();
    
        // The default string_translation service, TranslationManager, has a
        // setDefaultLangcode method. However, this method is not present on
        // either of its interfaces. Therefore we check for the concrete class
        // here so that any swapped service does not break the application.
        // @see https://www.drupal.org/project/drupal/issues/3029003
        if ($this->stringTranslation instanceof TranslationManager) {
          $this->stringTranslation->setDefaultLangcode($language->getId());
          $this->stringTranslation->reset();
        }
      }
    }

### Constructor - Dependency Injection

    /**
     * Constructs a new MailHandler object.
     *
     * @param \Drupal\Core\Mail\MailManagerInterface $mail_manager
     *   The mail manager.
     * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
     *   The language manager.
     * @param \Drupal\Core\Language\LanguageDefault $language_default
     *  The language default.
     * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
     *   The string translation service.
     */
    public function __construct(MailManagerInterface $mail_manager, LanguageManagerInterface $language_manager, LanguageDefault $language_default, TranslationInterface $string_translation) {
      $this->mailManager = $mail_manager;
      $this->languageManager = $language_manager;
      $this->languageDefault = $language_default;
      $this->stringTranslation = $string_translation;
    }

Dependency Injection of four services is performed in the handler:

* `plugin.manager.mail`: @Mail plugin manager - which are responsible for sending emails. Through the plugin data manager, we will make a request to send a email, and then he will go about his business - select a plugin and send it.
* `language_manager`: System language manager. Allows us to receive all the necessary information about languages.
* `language.default`: Repository of information about the current language.
* `string_translation`: Translation manager. Responsible for how the strings will be translated and their direct translation.

### Change Language for Sending an Email — `::changeActiveLanguage()`

    /**
     * Changes the active language for translations.
     *
     * @param string $langcode
     *   The langcode.
     */
    protected function changeActiveLanguage($langcode): void {
      if (!$this->languageManager->isMultilingual()) {
        return;
      }
    
      $language = $this->languageManager->getLanguage($langcode);
    
      if (!$language) {
        return;
      }
    
      // The language manager has no method for overriding the default
      // language, like it does for config overrides. We have to change the
      // default language service's current language.
      // @see https://www.drupal.org/project/drupal/issues/3029010
      $this->languageDefault->set($language);
      $this->languageManager->setConfigOverrideLanguage($language);
      $this->languageManager->reset();
    
      // The default string_translation service, TranslationManager, has a
      // setDefaultLangcode method. However, this method is not present on
      // either of its interfaces. Therefore we check for the concrete class
      // here so that any swapped service does not break the application.
      // @see https://www.drupal.org/project/drupal/issues/3029003
      if ($this->stringTranslation instanceof TranslationManager) {
        $this->stringTranslation->setDefaultLangcode($language->getId());
        $this->stringTranslation->reset();
      }
    }

The `:changeActiveLanguage()` method is responsible for changing the current language at the time the request is executed.

First of all, it checks if the site is multilingual (has two or more languages). If not, it immediately exits. If the site is multilingual, it receives information about the language to which you want to switch the system. If there is no information about the language, the process is aborted. Further, if both conditions are satisfied, the process of switching the language to the one passed in the parameter occurs.

For this, information about the language is set in language.default and resets the current internal cache, then the same operation is performed for string_translation so that it understands whether it needs to be translated and into which language. This method is copy-paste from a commercial. In fact, this is a "crutch" for switching the current system language, since the kernel does not provide such an API that would comprehensively perform this. In the comments, links to issues are provided, if you are interested in this, you can "kick" and add such an API to the core. For example this allows you to send a email to a user in one language, calling it in another: A manager with an English interface will cause a email to be sent for a user with the selected Spanish language.

### Sending Email — `::sendMail()`

    /**
     * Composes and send email message.
     * @param string $to
     *   The email address or addresses where the message will be sent to.
     * @param TranslatableMarkup $subject
     *   The message subject. To be properly translated with body, it must be
     *   TranslatableMarkup when we switch language.
     * @param array $body
     *   A render array representing message body.
     * @param array $params
     *   Parameters to build the email.
     *
     * @return bool
     *   TRUE if the email was sent successfully, FALSE otherwise.
     *
     * @see \Drupal\Core\Mail\MailManagerInterface::mail()
     */
    public function sendMail(string $to, TranslatableMarkup $subject, array $body, array $params = []): bool {
      $default_params = [
        'headers' => [
          'Content-Type' => 'text/html; charset=UTF-8;',
          'Content-Transfer-Encoding' => '8Bit',
        ],
        'id' => 'mail',
        'reply-to' => NULL,
        'subject' => $subject,
        'langcode' => $this->languageManager->getCurrentLanguage()->getId(),
        // The body will be rendered in example_mail().
        'body' => $body,
      ];
    
      if (!empty($params['cc'])) {
        $default_params['headers']['Cc'] = $params['cc'];
      }
    
      if (!empty($params['bcc'])) {
        $default_params['headers']['Bcc'] = $params['bcc'];
      }
    
      $params = array_replace($default_params, $params);
    
      // Change the active language to ensure the email is properly translated.
      if ($params['langcode'] != $default_params['langcode']) {
        $this->changeActiveLanguage($params['langcode']);
      }
    
      $message = $this->mailManager->mail('example', $params['id'], $to, $params['langcode'], $params, $params['reply-to']);
    
      // Revert back to the original active language.
      if ($params['langcode'] != $default_params['langcode']) {
        $this->changeActiveLanguage($default_params['langcode']);
      }
    
      return (bool) $message['result'];
    }

This method prepares the email for sending, sets the default values and sends them using `plugin.manager.mail`.

It takes as arguments:

* string $to: Email address where the email should be sent.
* `TranslatableMarkup $subject`: The subject of the email. This argument differs from the commercial implementation. I deliberately made the TranslatableMarkup type so that the title does not come immediately in the line like in Drupal Commerce. If you pass a string here, it will not be translated!
* `array $body`: Render an array with the body of the email. We will send emails through render arrays. This opens up many possibilities, for example, forming a email via `hook_theme()`.
* `array $params`: An array of parameters for the email, just like in normal sending. In our case, it will also be used to be able to change the default parameters.

As a result, it returns a boolean value about the message sending status.

Inside the method, the first thing to do is set the default parameters:

* `headers`: By default, all emails will be sent as HTML. In order for this to work correctly, you need some kind of module that can send HTML, for example, swiftmailer (it will be like an example dependency). If you don't want to send HTML emails, remove the Content-Type.
* `id`: Key of the email. This value will come in the $key parameter of the hook_mail() hook. We set the default value to mail. You can override this value to alter emails or for other purposes.
* `reply-to`: The e-mail that will be indicated for the reply in the email. By default, we set NULL, since we will pass this parameter as an argument when sending. If you don't override this value when submitting, Drupal will substitute the default site email address.
* `subject`: The subject of the email, taken from the argument.
* `langcode`: Current system language code. It is necessary to send a email, but it is not used in any way out of the box, so we have our own method for switching the language.
* `body`: The body of the email is a render array.

All of these options will be available in `hook_mail()`. If you need any additional information when altering emails, you can safely add it to this array.

Next, it is checked whether the value is passed in the additional parameters cc. If passed, the correct email header is set. Cc - email address where a copy of the email will be sent.

The same is done with bcc. Bcc - email address where a copy of the email will be sent, but the addressee (`$to`) will not be able to see it.

Next, the values of `$default_params` are concatenated with additional values from `$params` and stored in `$params`. $default_params remains unchanged.

Then the language is checked from $params and `$default_params`. If they differ (in $params when sending a language different from the currently active one), then the system language is switched to the language from $params using the `::hangeActiveLanguage()` method.

After the system language is switched, the message is sent using `plugin.manager.mail`.

As soon as the sending process is completed, the system language switches back to what it was before the email was sent, so that all subsequent operations do not end up in the incorrect language.

At the end, the message sending status received from `plugin.manager.mail` is returned.

### Service example.mail_handler

    services:
      example.mail_handler:
        class: Drupal\example\Mail\MailHandler
        arguments: ['@plugin.manager.mail', '@language_manager', '@language.default', '@string_translation']

We just have to declare our class as a service with all the required services as arguments.

## `hook_mail()`

We have declared our service example.mail_handler for sending emails in HTML via render arrays and with support for language switching. Almost everything is ready, we just need to implement `hook_mail()`.

We still need a hook, it must form a message ($message) to send.

    /**
     * Implements hook_mail().
     *
     * @see \Drupal\example\Mail\MailHandler
     */
    function example_mail(string $key, array &$message, array $params): void {
      /** @var \Drupal\Core\Render\RendererInterface $renderer */
      $renderer = \Drupal::service('renderer');
    
      if (isset($params['headers'])) {
        $message['headers'] = array_merge($message['headers'], $params['headers']);
      }
    
      if (!empty($params['from'])) {
        $message['from'] = $params['from'];
      }
    
      $message['subject'] = $params['subject'];
      $message['body'][] = $renderer->renderPlain($params['body']);
    }

Since all the main logic has been transferred to our service, we only form the final `$message`:

* We pass the resulting headers.
* Set from whom the email (if specified).
* We indicate the title of the email.
* We render the render array into HTML string and set it as the body of the email.

We don't need anything else. This is a fully functional service for sending emails.

## How to Use

With this service, you can now send HTML emails very simply:

    $subject = new TranslatableMarkup('My first mail!');
    $body = [
      '#markup' => '<strong>Hello World!</strong>',
    ];
    $mail_handler->sendMail('example@example.com', $subject, $body);

## A Simple Example

    <?php
    namespace Drupal\example\Mail;
    use Drupal\Core\StringTranslation\TranslatableMarkup;
    
    /**
     * Simple email message class.
     */
    final class SimpleMail {
    
      /**
       * The mail handler.
       *
       * @var \Drupal\example\Mail\MailHandler
       */
      protected $mailHandler;
    
      /**
       * Constructs a new UserLoginEmail object.
       *
       * @param \Drupal\example\Mail\MailHandler $mail_handler
       *   The mail handler.
       */
      public function __construct(MailHandler $mail_handler) {
        $this->mailHandler = $mail_handler;
      }
    
      /**
       * Sends email.
       *
       * @return bool
       *   The message status.
       */
      public function send(): bool {
        $subject = new TranslatableMarkup('My first mail!');
        $body = [
          '#markup' => '<strong>Hello World!</strong>',
        ];
    
        return $this->mailHandler->sendMail('example@example.com', $subject, $body);
      }
    }

This is the minimum that is needed to form a email as a service. It will need our `example.mail_handler` service and some method to send the email.

You can create interfaces and develop the idea further in order to standardize specific emails.

## Outcome

Since we have simplified `hook_mail()` and expect that emails will go through our service, and it, in turn, expects render arrays, we need to somehow form these emails.

Email is a service. This means it is an object and it has support for Dependency Injection. And it's extremely convenient!

This has significant advantages:

* You can make abstract objects for emails or basic ones, extend them, improve them. In general, apply OOP to the fullest, so that the code becomes less in the end!
* You can easily find the objects responsible for the emails.
* Different emails are not mixed in one file. In general, the file for the email is easier to find than the function in the sheet of code.
* Dependency Injection allows you to correctly and conveniently connect all the required dependencies and use them to form an email.
* Complex emails can be broken down into methods - emails will be easier to edit in the future. Less spaghetti.
* It's easier to implement similar emails with minimal differences.
* Deleting such emails, again, is easier - since everything is in one file, and all dependencies are clearly traced through DI.
* It is easy to find where a specific email is sent, again, due to DI.

And this is just what I encountered in real practice, having switched to this option for sending emails from custom modules.