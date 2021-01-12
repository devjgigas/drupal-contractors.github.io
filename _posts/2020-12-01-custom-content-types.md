---
title: 'Custom Content Types: Drupal vs. WordPress'
image: "/img/custom-content-types.jpg"
description: By default, most CMSs offer static and dynamic content as common content
  types. In WordPress, these are Posts and Pages. In Drupal, they are Pages and Stories.
thumbnail: "/uploads/austin-distel-imc-iozdmxc-unsplash.jpg"
color_overlay: "#009480"
author: alex-novak
categories: []
date: 2020-11-09T08:00:00.000+00:00

---
By default, most CMSs offer static and dynamic content as common content types. In WordPress, these are Posts and Pages. In Drupal, they are Pages and Stories. These post types have a predefined set of fields: title, body, and description. But what if these values ​​don't quite fit the website you are using? Certainly, you'll need something else. With custom post types, you can create a content type and customize the fields and appearance, create your own taxonomies, (such as categories and tags), and more.

### Why Do We Need to Use Custom Post Types?

We need custom post types in order to manage information in a way that is not like other types, and distinguishes them from traditional posts and pages. For example, for a clinic network site, custom content types might consist of:

* Clinics
* Patients
* Doctors
* Directions
* Agreements

This way you get unlimited possibilities to transform your blog into a website with many functions, as well as a set of fields that each type of content will own.

### WordPress' Post Type Capabilities

By default, you only have two content types as mentioned above: Post and Page. There is no way to add any custom fields out of the box. You can only add a title, description, and feature image. You can add custom content types, as well as fields programmatically. However, to do so, you need to have at least a minimum level of PHP proficiency. But this is done extremely rarely, because there are plugins for WordPress that allow you to do this directly from the user interface: ACF (Advanced Custom Fields) and Types and Toolset.

These plugins are free-to-use and also on a paid platform. The free plan covers 90% of cases. But, if you need more advanced fields, such as Repeater Fields, ACF Blocks, Flexible Content Fields, Options Pages, Gallery Fields, or Clone Fields, you must invest in the Pro version.

When using these plugins, your possibilities expand. The disadvantage, however, is that they are tied to paid plugins. If something happens to them–like changing to a paid-only version–you will have to buy it.

### Drupal's Post Type Capabilities

After installing Drupal, you can choose between 2 content types: Pages and Stories. Drupal is advantageous in this way, as its extensibility is integrated right into the core. For example, you can create any number of new custom content types and correlated custom fieleds. Take a look at some of the fields you can integrate to the core.

* [boolean](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21BooleanItem.php/8.3.x){:target="_blank"}
* [changed](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21ChangedItem.php/8.3.x){:target="_blank"}
* [comment](https://api.drupal.org/api/drupal/core%21modules%21comment%21src%21Plugin%21Field%21FieldType%21CommentItem.php/8.3.x){:target="_blank"}
* [created](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21CreatedItem.php/8.3.x){:target="_blank"}
* [datetime](https://api.drupal.org/api/drupal/core%21modules%21datetime%21src%21Plugin%21Field%21FieldType%21DateTimeItem.php/8.3.x){:target="_blank"}
* [daterange](https://api.drupal.org/api/drupal/core%21modules%21datetime_range%21src%21Plugin%21Field%21FieldType%21DateRangeItem.php/8.2.x){:target="_blank"}
* [decimal](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21DecimalItem.php/8.3.x){:target="_blank"}
* [email](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21EmailItem.php/8.3.x){:target="_blank"}
* [entity_reference](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21EntityReferenceItem.php/8.3.x){:target="_blank"}
* [file](https://api.drupal.org/api/drupal/core%21modules%21file%21src%21Plugin%21Field%21FieldType%21FileItem.php/8.3.x){:target="_blank"}
* [float](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21FloatItem.php/8.3.x){:target="_blank"}
* [image](https://api.drupal.org/api/drupal/core%21modules%21image%21src%21Plugin%21Field%21FieldType%21ImageItem.php/8.3.x){:target="_blank"}
* [integer](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21IntegerItem.php/8.3.x){:target="_blank"}
* [language](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21LanguageItem.php/8.3.x){:target="_blank"}
* [link](https://api.drupal.org/api/drupal/core%21modules%21link%21src%21Plugin%21Field%21FieldType%21LinkItem.php/8.3.x){:target="_blank"}
* [list_float](https://api.drupal.org/api/drupal/core%21modules%21options%21src%21Plugin%21Field%21FieldType%21ListFloatItem.php/8.3.x){:target="_blank"}
* [list_integer](https://api.drupal.org/api/drupal/core%21modules%21options%21src%21Plugin%21Field%21FieldType%21ListIntegerItem.php/8.3.x){:target="_blank"}
* [list_string](https://api.drupal.org/api/drupal/core%21modules%21options%21src%21Plugin%21Field%21FieldType%21ListStringItem.php/8.3.x){:target="_blank"}
* [map](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21MapItem.php/8.3.x){:target="_blank"}
* [password](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21PasswordItem.php/8.3.x){:target="_blank"}
* [path](https://api.drupal.org/api/drupal/core%21modules%21path%21src%21Plugin%21Field%21FieldType%21PathItem.php/8.3.x){:target="_blank"}
* [string](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21StringItem.php/8.3.x){:target="_blank"}
* [string_long](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21StringLongItem.php/8.3.x){:target="_blank"}
* [telephone](https://api.drupal.org/api/drupal/core%21modules%21telephone%21src%21Plugin%21Field%21FieldType%21TelephoneItem.php/8.3.x){:target="_blank"}
* [text](https://api.drupal.org/api/drupal/core%21modules%21text%21src%21Plugin%21Field%21FieldType%21TextItem.php/8.3.x){:target="_blank"}
* [text_long](https://api.drupal.org/api/drupal/core%21modules%21text%21src%21Plugin%21Field%21FieldType%21TextLongItem.php/8.3.x){:target="_blank"}
* [text_with_summary](https://api.drupal.org/api/drupal/core%21modules%21text%21src%21Plugin%21Field%21FieldType%21TextWithSummaryItem.php/8.3.x){:target="_blank"}
* [timestamp](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21TimestampItem.php/8.3.x){:target="_blank"}
* [uri](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21UriItem.php/8.3.x){:target="_blank"}
* [uuid](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21UuidItem.php/8.3.x){:target="_blank"}

These fields can be added to WordPress only when using the Pro version of ACF. With Drupal, you can do this after installing several free modules. Just like in WordPress, it is possible to add any type of content or field programmatically.

No matter which CMS you choose, WordPress and Drupal both have decent content customization options. Not certain which to choose? Still have questions? Talk with us! Our experts will help you create a project of any complexity for your needs.