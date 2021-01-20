---
date: 2021-01-20 17:08:14 +0000
author: matt-pritchard
categories: []
title: 'Using Headless CMS for Drupal: When and Why? '
description: When you use a headless CMS, you open up a whole new world of possibility,
  but it's not always a one-size-fits-all solution.
image: "/uploads/wonderlane-fkhpejze0c4-unsplash.jpg"
thumbnail: "/uploads/neonbrand-4kjcmphsgkc-unsplash.jpg"
color_overlay: ''

---
Headless CMS has been a hot new web trend, and is gaining steam in many different applications. But is it a one size fits all solution? While Headless CMS can provide flexible results, it may not be the best tool for every job. Let's delve into this wonderful world of "Decoupled" or **Headless CMS**, and consider the pros and cons.

### **What is "Headless CMS"?** 

A Headless CMS (sometimes referred to as Decoupled) is a content management system that has no view layer _and_ delivers your content as a text-based representation–typically JSON or XML. To display, simply parse the information, and use in a custom-made view. This custom view (also known as "the front-end") will request and consume the data to populate the content of your view.

### **How Might Headless CMS Look in Drupal?** 

To start with, let’s take a look at a simple custom Blog component that was written to display a blog from Drupal JSON:API data (truncated to show most relevant details). 

    const Blog = () => {
      
    /*
    Here, an object of “articles” is fetched from an API call to a Drupal backend. 
    */
    
      const blogItems = articles.map((item) => {
    	const title = item.attributes.title;
    	const body = item.attributes.body.value;
    	let date = new Date(item.attributes.created);
    	date = moment(date).format("DD MMMM YYYY");
    
    	return (
      	<BlogItem
        	title={title}
        	body={body}
        	date={date}
        	id={item.id}
        	key={item.id}
      	/>
    	);
      });

If you are familiar with front-end frameworks, you likely won't find this format to be out-of-the-ordinary. It simply takes data that Drupal provides by the JSON:API core module, and then uses this data to build a frontend component that is separate from Drupal, rendering it "Headless". 

Let's take a look at the structure of the JSON shape that fuels the above component. 

    
    data: [ 
      {
          ...,
          attributes: {
            title: "",
            body: { ... } 
          ...,
      },
      { ... },
      { ... },
    ]

As you can see, there is some nesting, but the structure is also familiar from node to node, and the JSON:API standard is opinionated and well documented ([https://jsonapi.org/](https://jsonapi.org/ "https://jsonapi.org/")). Because of this, when you opt for a Decoupled or Headless approach, you need to familiarize yourself with JSON:API, but then have quite a predictable data model to work with in this approach. That said, this highlights that this approach implies that you are willing to put in the overhead, and thus this may not be a method you want to use for every project and scenario.

### **When to Embrace Headless CMS with Drupal?**

When you use a Headless CMS, you open up a whole new world of possibilities. Because the data is separated from the view(s), you can display data in numerous ways. You now can cater for as many use cases as you are willing to build views–like kiosks, mobile apps, or reactive web pages.

If your project demands the aggregation of multiple data sources, a Headless CMS could be a possible option. If your data layer is not closely coupled to your view, then you will not be tied to a single source of data. You can provide a rich user experience with components, plugins, or widgets that utilize their own data sources, or those of a third-party.

Modern reactive frameworks (React, Vue, Angular, etc.) allow you to build a dynamic user experience, free of the clunkiness of page refreshes. Of course, when you use a Headless CMS, you open up this possibility. If you have a highly active blog that has frequent updates, you may want to consider the headless approach to keep the data current without page refreshes.

### **When to Avoid Headless CMS with Drupal?**

A headless CMS is not a one-size-fits-all solution. There are several use cases where you may wish to take a more traditional approach.

If your data is static, for example, it doesn't make a lot of sense for the extra overhead of building a headless experience. In most situations, the best solution is usually the one with fewer moving parts. By its very nature, headless architecture introduces more complexity. If you have a specific use case, it makes more sense to use a more traditional approach. Flexibility is appealing, but if it's not needed then you are just wasting resources.

While it is often appealing to want to use the latest web trend for your projects, it is worth remembering that each tool, programming language, or paradigm has pros and cons. It is a good idea to consider multiple options when you begin a project. Being aware of the gains and compromises that come with a technology choice can help you avoid hurt later down the road. That way, you can ensure you deliver the best result for your end-user.

And if you need help deciding on your latest tool or approach to your Drupal-based projects, we're here to help you grow! 