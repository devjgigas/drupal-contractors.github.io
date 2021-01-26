---
date: 2021-01-26 15:59:21 +0000
author: matt-pritchard
categories: []
title: 'Understanding Your Drupal Module Must-Haves '
description: ''
image: "/uploads/christopher-gower-m_hrflhgabo-unsplash.jpg"
thumbnail: "/uploads/charles-deluvio-pjah2ax4uwk-unsplash.jpg"
color_overlay: ''

---
Imagine you're a DIYer, getting ready to remodel your house.

Imagine you're heading over to your favorite home center for supplies to construct your walls, run some electrical wiring, and pick up some kitchen cabinets.

Imagine you walk in and instead of seeing all these items, you find pine trees that you need to cut on your own, and copper nuggets that you're expected to melt down and shape into wiring.

Sounds pretty ridiculous, doesn’t it?

Well, once upon a time home builders actually did cut down trees and mill their own lumber. But it all started somewhere, and now, we’re well past that.

We can draw a parallel between home-renovation and web development. In the past we were expected to build our own menu system, forms, user and login systems, all from scratch. Thankfully, Drupal comes with all of these out of the box.

However, there are lots of holes that need to be filled! But, there are some great add-on modules. Many serve the same or similar purpose, some compliment others. They fit into many categories. Often, it's up to you to decide the best combination. Let’s take a look at some of our favorites below. 

### **Presentation Modules** 

Presentation modules are those that produce or alter pages or parts of pages. They reduce the amount of work needed to create complete sections of pages, such as lists of products, image galleries, slideshows, customized member rosters, or even pages containing one or more of these elements. Here are a few great tools to help you make a great presentation.

#### Views

Yes, Views, one of the most commonly used modules in the Drupal world, and it’s now in core. If you already know how much of a lifesaver it is, just move on. If not, add it to your project and start using it to present your content in pages and on blocks. Create reports, lists, even calendars with the addition of Views add-on modules, such as the [Fullcalendar View module](https://www.drupal.org/project/fullcalendar_view){:target="_blank"}.

Need a quick overview of Views? Learn how to implement it via this training video by [WebWash]( https://www.youtube.com/watch?v=MHT_Q7GH7dw){:target="_blank"}. 

To make Views even more powerful, here are a few of my favorite Views add-ons:

##### [Infinite Scroll](https://www.drupal.org/project/views_infinite_scroll){:target="_blank"}

Most users don't like to click on the “Next” button to see more items in their search results. Instead, they prefer to scroll down the page to see more results. Both the Facebook posts display and Pinterest pins display are a great examples of the infinite scroll feature. Simply, add this functionality to your site with the Infinite Scroll module. 

##### [FullCalendar View](https://www.drupal.org/project/fullcalendar_views){:target="_blank"}

FullCalendar View provides an easy-to-implement, custom calendar creator that is both pleasing to work with and for your visitors to use.

##### [Views View Field](https://www.drupal.org/project/views_field_view){:target="_blank"}

Want to see a list inside each row of data? This is best achieved with a child view that reads in that data and is linked to a field in the current row. Use this module, because any other way is just too much work!

##### [Views Slideshow](https://www.drupal.org/project/views_slideshow){:target="_blank"}

A long-time favorite module for custom slideshows, the Views Slideshow module will make creating slideshows from several different pieces of content a snap. Theming the resulting slideshow, however, can prove to be a daunting task!

##### [Views Accordion](https://www.drupal.org/project/views_accordion){:target="_blank"}

Know those simple lists that slide open to reveal a section with [more info when you click on them](https://help.content.samsung.com/csweb/faq/searchFaq.do){:target="_blank"}? Create the same, powerful dropdown lists in Drupal with the Views Accordion module.

#### Benefits of Views

* Select, filter and display your content easily without code
* Create custom pages or blocks (to be placed on pages) with your selected content without code
* Add on all kinds of cool modules to enhance the capabilities of Views (you guessed it— _without code_)

### [Layout Builder](https://www.youtube.com/watch?v=E3p7UZ8hI-0){:target="_blank"}

Layout Builder is a great core module, but it’s not enabled by default. Enabling this module also enables the Layout Discovery module as a dependency. 

This module adds a “Manage Layout” button to a content type’s “Manage Display” tab. This displays a management screen that allows you to select a layout for the content type where users are able to drop in blocks. 

You can customize the rows and columns in a similar fashion to the Panels module. Unlike the Panels module, however, the new layout applies to many content nodes, not just a single page. 

Additionally, you can allow the user to customize each piece of content. This will provide them with a layout tab that allows them to customize the layout as of that node and insert blocks and other content in the sections they have created for that node. 

Though this offers a lot of power to content editors, it can also result in an inconsistent site look and feel, so use this feature with caution. 

#### Related Modules

* [Layout Builder Restrictions](https://www.drupal.org/project/layout_builder_restrictions){:target="_blank"} 

  Limit what the layout builder sees, reducing clutter
* [Block List Override](https://www.drupal.org/project/block_list_override){:target="_blank"}

  Filters out less commonly used blocks from the layout builder list or which you don’t want users to be able to place on any page they create

#### Benefits of Layout Builder 

* Intuitive layout building
* Easy-to-add content to created layout
* Enforces consistency throughout content of similar type, or flexibility if you prefer

### [Paragraphs](https://www.drupal.org/project/paragraphs){:target="_blank"}

Not to be confused with blocks of text, Paragraphs is a tool for building your own modular components, which are reusable collections of fields. This module works similarly to D7's [Field Collection](https://www.drupal.org/project/field_collection){:target="_blank"} module.

Users can add multiple fields to a Paragraph type, as well as add unlimited instances of a Paragraph to any content that has a reference field of that Paragraph type. The Paragraphs module has another major advantage over the Field Collection module. When you add a Field Collection field to a content type, its definition is a single group of field types (e.g.: a text field or two, a date field, an image field, etc). With the Paragraph field, you can allow the user to select from one or more Paragraph types, each having its own group of fields, and each can have unique styling applied. It's pretty flexible! 

However, theming can be a bit of a challenge, especially if you’re using component-based theming. Additionally, migrating data via the Migrate module can be a challenge.

#### Benefits of Paragraphs

* Easy-to-create custom Paragraph types
* Allows users to easily drop in a new style into content to which the Paragraph type has been assigned
* Users can mix and match Paragraph types within the same layout, allowing for a more flexible content management experience.

### Search Engine Optimization

Unfortunately, there is no single module that will completely optimize your site, or lead you in the search engines, but there are a few that can help make it better.

#### [Pathauto](https://www.drupal.org/project/pathauto){:target="_blank"}

Everyone loves a pretty path—especially Google and other search engines! Easy-to-read paths are easier to understand and remember. 

Out of the box, Drupal creates paths for content that look like _your_site/node/123_, which is rather meaningless to viewers and search engines. 

Pathauto allows site admins to define URL patterns using Tokens. For example, a simple path pattern using the Token _\[node:title\]_ takes the title and converts it to a clean variation of the content title; if the title is “My Birthday Wishlist”, this module will cause the path to be displayed as _your_site/my-birthday-wishlist._ This clean URL makes sense to both visitors and search engines. 

For a slightly more complex example, use multiple tokens separated by the / character: _\[node:content-type\]/\[node:title\]_ will display an Article called “Hello World” at the path _your_site/article/hello-world_ and a Board Member called “Jane Smith” at _your_site/board-member/jane-smith_. 

By combining different Tokens and configuration settings, you can generate much better organic search results for your content.

#### Benefits of Pathauto

* Makes an ugly URL look prettier, to both the visitor and to search engines
* Allows you to customize url using tokens
* Automates the process of assigning these pretty (called “clean”) urls.

#### [Metatag](https://www.drupal.org/project/metatag){:target="_blank"}

Meta-tags are hidden snippets of text that describe a page’s content to search engines. The Metatag module allows you to set up tokens to automatically pull information from your content, such as content title, page url, and other field data and automatically turn them into meta-tags. 

This helps improve your site’s SEO rankings when Google looks for meta-tag information and sees that it matches visible content. For some advanced configuration tips, check out [Trevor Kjorlien’s article](https://evolvingweb.ca/blog/perfect-your-facebook-link-previews-drupal-metatag-module){:target="_blank"}. 

#### Benefits of Metatag

* Automates the creation of meta-tags
* Improves SEO automatically
* Sounds like a cool, Sci-Fi, deadly mutant full contact sport

#### [Google Analytics](https://www.drupal.org/project/google_analytics){:target="_blank"}

Google Analytics provides you with the information you need to make good marketing and optimization decisions. 

Once Google has all of the needed information, you can see site usage statistics in visualizations that will give you insight into user behavior, and site usage. Setup can be a bit tricky, but luckily, OS Training has provided a [free v](https://youtube.com/watch?v=2wFXo-vnhWs)[ideo to get you up and running in a snap](). 

#### [Google Tag Manager](https://www.drupal.org/project/google_tag){:target="_blank"}

While Google Analytics is great, it doesn’t give you the pinpoint accuracy you might be looking for. For example, do you want to know when visitors click your call-to-action buttons? 

The Google Tag Manager gives you an interface to set up “tags” that represent events such as what specific site-clicks to track. This module lets you do this without all without the need of a developer or even visiting the Google Analytics manager. 

It's a great tool for the marketing geek in your organization. 

#### Benefits of Google Analytics and Tag Manager

* Helps you gather site analytics data automatically
* Provide great interfaces for managing your data collection process

There are many other SEO tools and techniques which you can implement, but these tools should get you started in the right direction.

### Customer Interaction Tools

#### [Webform](https://www.drupal.org/project/webform)

Webform is the most commonly used module for making forms and surveys in Drupal. It provides an easy interface to create single or multi-page forms, add fields, and manage submissions. This is one of the most important modules for providing interaction with your visitors. You can create “Contact Us” forms, surveys, quotation request forms, and more. 

Providing users with opportunities to give you more information is one of the best ways to build and strengthen relationships, gather actionable data, and show your site visitors that you are interested in their questions and concerns, thus building a reputation of caring. 

Several other modules are available to extend the capabilities of the Webform module. 

* Webform Views: integrates Webform 8.x-5.x and Views modules
* Webform Analysis: used to obtain statistics on the results of form submissions
* Webform Rest: retrieve and submit webforms via REST.
* Webform Encrypt: provides encryption for webform elements.
* Webform Composite Tools

#### Benefits of Webform

* Provides an easy-to-use interface for creating user forms
* Provides a reporting system 
* See collected user data

### Administrative Tools

#### [Admin Toolbar](https://www.drupal.org/project/admin_toolbar)

If you’re administering a website, you want to get the job done fast. Nothing slows you down like having to click a page, wait for it to load so you can see links to related pages, then have to click one of those to see another list of child pages before you can get to the page you need. 

The answer? Dropdown menus listing all of those child pages in a nested fashion so you can directly navigate to your desired page. The Admin toolbar makes this possible, automatically converting menu items into drop-down items when hovering over them, showing you the child pages. 

### Benefits of Admin Toolbar

* Converts admin menus to dropdowns
* Makes your admin menu system easier to work with 

#### [Devel]()

_Download link:_ 

This module has been my go-to for troubleshooting Drupal and testing new code. In the older version, I would rely on the included module, Devel PHP, to quickly test code before implementing it. However, it has been removed for some reason from the Drupal 8 version of this module, so you can add it separately by installing Devel PHP. The Devel module also provides a module called _Web Profiler_ which can help you troubleshoot performance issues. It provides a customizable toolbar at the bottom of the window of your website with a wealth of information you can use to troubleshoot and optimize your site. To learn more about using the Web Profiler module, watch the great video by WebWash here: [https://www.youtube.com/watch?v=pHf128w-1QQ&feature=emb_title](https://www.youtube.com/watch?v=pHf128w-1QQ&feature=emb_title "https://www.youtube.com/watch?v=pHf128w-1QQ&feature=emb_title")

### Benefits of Devel

* Makes your development experience so much better. Need we say more?

# Devel PHP

_Download link:_ [_https://www.drupal.org/project/devel_php_](https://www.drupal.org/project/devel_php "https://www.drupal.org/project/devel_php")

As mentioned above, the ability to run PHP commands from a development page in Drupal has been removed from the Devel module. This module adds it back in. Install the module, navigate to _your-site/devel/php_, and you have a window where you can drop in any PHP code. It’s a great tool I turn to often. Just make sure that you use the Devel modules in development environments only, and never enable them on a production website due to security concerns.

### Benefits of Devel PHP

* Brings the Execute PHP page back to Devel in Drupal 8

# Backup/Migrate

_Download Link:_ [_https://www.drupal.org/project/backup_migrate_](https://www.drupal.org/project/backup_migrate "https://www.drupal.org/project/backup_migrate")

This module is a fantastic tool for creating database backups of your website and migrating that data to another site. It provides you with an easy to use interface with options to create backups, manage and download those backups, and of course, upload and restore your backups. This makes it easy to migrate your database to another server or even your local development machine by downloading your backup, navigating to the Backup/Migrate screen on your target installation and importing that backup file. If you don’t want to run all of these activities from the command line like a true geek, this is definitely a must have tool for you.

### Benefits of Backup/Migrate

* Makes managing backups and restoring them a breeze
* No need for a MySQL client or working from the command line

# Entity Embed Module

_Download Link:_ [_https://www.drupal.org/project/entity_embed_](https://www.drupal.org/project/entity_embed "https://www.drupal.org/project/entity_embed")

Ever want to have a node teaser show up on another node? Well, the old fashioned approach was to add a node_embed field, which essentially added a field that needed to be themed and positioned in a fairly rigid manner. And what if you wanted to include an image? Now you needed an image field. Every time you wanted to display another piece of content, you had to request yet another field. Why couldn’t you just drop in content on demand? With the Entity Embed module, you can create custom embed types, such as one for nodes. A button is created for each type which you can add to the CKEditor bar and even customize the icon for the button. Then, when editing full text fields in your content, you just click a button to insert one of your custom embed types into the text. If it’s a node, you can have the full node or any one of the node displays. You can embed just about any kind of content into your text field using this module. For a good in depth guide on working with this module, see the article, [https://www.lullabot.com/articles/how-to-embed-just-about-anything-in-drupal-8-entity-embed-url-embed](https://www.lullabot.com/articles/how-to-embed-just-about-anything-in-drupal-8-entity-embed-url-embed "https://www.lullabot.com/articles/how-to-embed-just-about-anything-in-drupal-8-entity-embed-url-embed"), which explains its use and related modules as well.

### Benefits of Entity Embed

* Gives you the power to embed all kinds of content into your full text fields
* Gives you the power to create buttons to embed your content
* Allows you to assign cute little icons to the different types of embedding buttons you’ve created

So, there you have it! Drupal has thousands of community-contributed modules. Drupal's APIs allow you to extend your site with custom code in practically infinite ways! 

The modules mentioned in this collection are a great place to start, but if you are looking for something more specific, hop on over to the Drupal [contributed module search page](https://www.drupal.org/project/project_module). You’ll be sure to find a lot of interesting modules. Don’t be afraid to experiment. 

Of course, it’s always best to experiment on a local testing environment. If you don’t have one of those setup, you should checkout the [Bitnami Drupal stack](https://bitnami.com/stack/drupal/installer) for an instant Drupal development site. Just run the installer and you’ll have a site ready to develop on. You can find installers for Windows, Mac and Linux. 