---
title: Come to Commerce, the Drupal Way
image: "/img/come-to-commerce.png"
description: A primer on all things Drupal Commerce.
thumbnail: "/uploads/rupixen-com-q59hmzk38eq-unsplash.jpg"
color_overlay: "#009480"
author: tyler-ashbaugh
categories: []
date: 2020-11-09T08:00:00.000+00:00

---
Drupal Commerce is the defacto, go-to, solution for enabling one of the world’s premiere CMS for e-commerce. Commerce is on its second major version and offers compatibility with versions 7, 8 and now 9 of the Drupal CMS. Commerce is loved by many because:

* It Makes No Assumptions About How Your Business Works
* Building a Store is Straightforward and Easy
* There is More to the Store than Just Products
* Everybody’s Favorite: It Helps You Get Paid
* Expert Help is Within Reach If You Need It

Now that you know what Drupal Commerce is, it is time to take a look at what Commerce can do for you.

#### Makes No Assumptions

The versatility that Commerce offers out of the box is phenomenal and will literally work with any type of business. This versatility is achieved because it makes no predetermined decisions about how your business should function.

#### Not Your Grandpa’s Integration: A CMS First-Class Citizen

This is not a mere integration, Commerce is built using content as its building blocks and has massive community support behind it. Commerce never feels like it is shoehorned into the CMS, it feels like a first-class citizen in the Drupal ecosystem. Site builders feel right at home with building out the necessary pieces of their online store.

#### Commerce has you covered with flexible payment models

Standard, recurring, licensing and subscription payment models are all easily implemented in Commerce. Leverage prepaid and postpaid billing, powerful proration tools and configurable retry logic for failed payments. If you have a payment model need, Commerce and its community has a solution for you and your team.

#### Easy to use even for non-technical site builders

Experienced Drupal Site Builders will feel right at home working with Commerce entities and newbies can be onboarded quickly given the vast documentation out there for Drupal Commerce. [The Commerce Guys](https://commerceguys.com/){:target="_blank"} (maintainers of Commerce) have put a commendable effort into [creating documentation](https://docs.drupalcommerce.org/){:target="_blank"} for the end user and not just for developers.

#### Open source and very extensible allowing for integrations of all kinds

Just like Drupal, Commerce is open source so you get the benefit of a multitude of developers constantly enhancing the software and addressing any shortcomings. If, by chance, a feature is missing, Drupal Commerce is very extensible and leverages a plugin type architecture allowing developers to easily fill any feature gaps for your business.

### Can You Build It? Yes You Can

Warning, developers only. The following section is aimed at a Drupal developer that would like to spin up a Drupal Commerce site. If that is not you skip to the next section titled: Ludwig, the non-techie path.

#### Composer based install

Thank goodness for Composer, with just a few short commands you can have a Drupal Commerce site up and running locally. We’ll take a quick look at this from both a brand new site perspective as well as enabling an existing site with Commerce power.

##### New Site

Start with a single composer command and let the magic of Commerce begin. (Update “esteemedshop” with your project name of choice)

    composer create-project drupalcommerce/project-base
    esteemedshop --prefer-source --stability dev

For local dev, I do like [DDEV](https://www.ddev.com/){:target="_blank"}, it makes getting up and running that much easier, so your next step should be:

    cd esteemedshop
    ddev config

1. The config command will ask you three questions about project name, docroot and project type. The defaults are great for all three of these questions.
2. Make sure Docker is running and start your engines:

    ddev start

##### Existing Site

Navigate to your Drupal installation and let Composer know that you want the Commerce treatment:

    cd /path/to/drupal/shop
    composer require "drupal/commerce"

Next you’ll want to enable the commerce suite of modules. Using DDev and Drush you can enable them using this command:

    ddev exec drush en commerce_product commerce_checkout commerce_cart

#### Ludwig, the non-techie path

If you’re not a developer or you’re command-line-aphobic, there is a way to set up shop through Drupal’s UI.

##### Modules

1. Enable the Update Manager from the Extend admin menu. Once it is installed you can navigate to Reports -> Available updates.
2. In another window navigate to the Ludwig module page on drupal.org and grab a copy of the link to the tar.gz of the latest release.
3. Click “Install new module or theme” on the Available updates page and paste the tar.gz link into the “Install from a URL” textbox, then click Install. Once the installation is done, you’ll be presented with a confirmation screen similar to this:

Navigate to “Enable newly added modules”, select the Ludwig module and click install. The next steps will require that you have access to the file system where your Drupal site exists. Download these modules to the following directory:

    /path/to/drupal/shop/web/modules/contrib

1. [Commerce](https://www.drupal.org/project/commerce)
2. [Address Entity API](https://www.drupal.org/project/entity)
3. [Entity Reference Revisions](https://www.drupal.org/project/entity_reference_revisions)
4. [Inline Entity Form](https://www.drupal.org/project/inline_entity_form)
5. [Profile](https://www.drupal.org/project/profile)
6. [State Machine](https://www.drupal.org/project/state_machine)

##### Packages

Similar to the work that Composer does, Ludwig finds packages that are required by the Commerce modules. You can see a list of these packages by navigating to Reports->Packages, where you will see a list like this:

1. Download the missing packages, unzip them and place then in the path as directed. The path will be local to your Drupal installation.
2. Install the commerce modules along with its 6 dependent modules that were downloaded in the earlier step.

##### Updates

In the future, when Commerce needs to be updated then you will need to update Commerce and all 6 of its dependent modules to make sure the entire suite is up to date.

### The Store: Products, Orders & More

Congratulations, if you’ve made it this far then the code is in place, you’re ready to open up and what’s a store without some products?

#### Products

Products can be either tangible or intangible items that you wish to sell in your store. This is where Commerce really shines, as it allows you to build out your sellable items using attributes for each product type resulting in unique product variations.

#### Product Types

A product type is the basic building block of products inside of Commerce. Use the admin menu to navigate to Commerce-> Configuration-> Products-> Product Types to begin creating types and prepare your store for the attributes you will associate with the new type.

#### Attributes

A product attribute is akin to a selectable or customizable piece of the product type. Let’s take coffee for instance, there’s lots of decisions to be made when you order a cup of coffee like size, flavor, creamer, sweetener, and the list can go on and on. Each attribute can be tied to one or more product types. Expounding on this example, you could have a coffee product and a tea product that might share attributes like size, creamer and sweetener for instance, but also have unique attributes that are assigned to each product respectively. During attribute creation/updating, you can link to the appropriate product type(s).

#### Variations

Product variations (a product with attributes selected) can be created up front by the store administrator and displayed for ease of selection or they can be dynamically created by exposing attributes so your customer can customize their product. Product architecture is a complex subject and one that can quite honestly make your head spin. For more information about product architecture I recommend checking out the [Commerce Guys Product Architecture guide](https://docs.drupalcommerce.org/commerce2/developer-guide/products/product-architecture/product-architectures){:target="_blank"} or reaching out to an [Esteemed expert](https://esteemed.io/){:target="_blank"} for help.

#### Orders

Who bought what, how much they paid and how many they should receive describes an order in Commerce. Order creation can occur as a result of a checkout flow or by manually creating the order as an administrator.

#### The Workflow

The workflow of an order depends on several factors such as the order type, configured checkout flows and whether a customer is completing the order directly or an administrator is creating the order on the customer’s behalf. Four workflows exist by default in Drupal Commerce, and if those don’t wet your whistle then you can create your own programmatically.

#### Order Types

Order types allow the defining of different workflows based on the type of products being ordered. For instance if you’re selling a product that is physically going to be shipped somewhere, then you would want an order type that goes through a fulfillment type process. This would differ if you were just going to sell someone a cup of joe and hand it right to them which would only require a simple payment process. Order types can be created/updated by navigating from the admin menu to `Commerce -> Configuration -> Orders -> Order types`. The available order workflows will be listed on this page.

#### Checkout Flows

A checkout flow defines how an order moves to the completion of a checkout. By default a multi-step checkout flow is included in Commerce and facilitates the capture of information related to checkout on multiple screens. Checkout flows are built on top of a programming construct called a plugin and can be easily created or extended by a development resource. Checkout flows can be managed by navigating from the admin menu to `Commerce -> Configuration -> Orders -> Checkout flows`.

#### Currencies

Speaking of checking out, what happens when your customer is located in a country that uses a different currency than your business? Multi-currency support is available out of the box and is based on the [Unicode CLDR standard](http://cldr.unicode.org/core-spec){:target="_blank"}. Currency entities in Drupal allow a currency to be defined with various attributes like a currency code, currency symbol and even the number of decimal points to display. Currencies can be managed by navigating from the admin menu to `Commerce -> Configuration -> Store -> Currencies` where you can add a community provided currency or create your own.

### Wait, How Do I Get Paid Again?

Receiving payment in exchange for your product/services is an important part of Commerce and its flexibility is just as powerful as the rest of the Commerce system. Supporting multiple payment gateways, offering the ability to run various promotions on your products, and supporting a variety of tax computations means that Commerce worries about the details and allows your business to focus on what it does best.

#### Payment Gateways

Payment Gateways facilitate the financial transactions between your business and your customers. At the time of this writing the Commerce Guys list a whopping [138 payment gateway contributed modules](https://docs.drupalcommerce.org/commerce2/developer-guide/payments/available-gateways){:target="_blank"}, which means you are going to be hard pressed to find a payment provider that is not already supported in Drupal Commerce. Adding a payment gateway to your shop can be done in a few short steps:

* Download and install the corresponding payment gateway module.
* Add a new payment gateway by navigating from the admin menu to `Commerce -> Configuration -> Payment -> Payment` gateways.

When adding the new payment gateway you’ll have a chance to configure the gateway based on your expected usage. For instance, if you add a payment gateway based on the Square payment provider you can set it up as either a sandbox gateway for testing or a production gateway for live payment processing.

#### Promotions

Promotions in Drupal Commerce dictate the various types of discounts that can be applied to a customer’s order. Some default promotions are available out of the box with Commerce, like fixed or percentage amounts taken off of a line item in the order or off the order’s subtotal. These default promotions will cover the majority of use cases out there, but programmatically creating your own or extending the existing ones are easily attainable.

#### Taxes

While the word “taxes” may sound like nails on a chalkboard to some, this is not a subject you want to ignore or worse implement incorrectly. Navigating from the admin menu to `Commerce -> Configuration -> Store -> Tax` types will land you on a screen that lists existing tax setups and allow you to add new ones. Drupal Commerce will allow you to easily pair a tax rate with a territory and even allow you to limit it by postal code.

### Let an Esteemed Expert Guide You to a Better Commerce Experience

Believe it or not, this article covers only the tip of the iceberg with Drupal Commerce and all that it offers. It is a very important part of any business’s online footprint. Are you currently navigating the depth of Commerce with limited resources? If so, let [Esteemed](https://esteemed.io/){:target="_blank"} redefine your capacity with a dynamic team today. Flexible options are available to allow engagement with esteemed experts quickly and efficiently. Flip your virtual open sign and begin reaching your customers around the globe and make your mark on the world.