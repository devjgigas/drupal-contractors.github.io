(function ($) {
  Drupal.behaviors.qtip = {
    attach: function (context, settings) {
      $(function () {
        var instances = $.parseJSON(settings.instances);
        var debug = $.parseJSON(settings.qtipDebug);

        $('.qtip-link:not(.qtip-processed)', context).each(function() { // Call .each() so we can access $(this) in the settings/config
          // Check for a sibling .qtip-tooltip containing the tooltip information, otherwise (for forms)
          // go to the element's parent and look for .qtip-tooltip container as a sibling of the parent
          if ($(this, context).next('.qtip-tooltip').length) {
            var tooltipElement = $(this).next('.qtip-tooltip');
          }
          else {
            var tooltipElement = $(this).parent().siblings('.qtip-tooltip');
          }
          var tooltip = tooltipElement;

          if (!debug.leaveElement) {
            // Remove the tooltip element to keep the DOM clean
            tooltipElement.remove();
          }

          var text     = tooltip.html();
          var title    = (tooltip.data('qtip-title') != undefined) ? tooltip.data('qtip-title') + '' : ''; // Concatenate an empty string to make sure that the value being passed as the title is a string, otherwise it will not display
          var instance = (tooltip.data('qtip-instance') != undefined) ? tooltip.data('qtip-instance') : '';
          var settings = (instances[instance] != undefined) ? instances[instance] : '';

          if (settings) {
            $(this).qtip(settings);
            $(this).qtip('option', 'content.text', text);
            if (title) {
              $(this).qtip('option', 'content.title', title);
            }
          }
          // If no settings have been passed through, we still want to display a tooltip
          else {
            $(this).qtip({
              content: {
                text: text,
                title: title,
              }
            });
          }

          // Add instance class to the container to aid in styling
          $(this).addClass('qtip-instance-' + instance);

          // Add processed class to not process again on AJAX calls.
          $(this).addClass('qtip-processed');
        });
      });
    }
  };
})(jQuery);
;
(function ($) {

  // Need to keep this to check if there are extra parameters in the original URL.
  var original = {
    path: window.location.href,
    // @TODO integrate #1359798 without breaking history.js
    query: window.location.search || ''
  };

  /**
   * Keep the original beforeSubmit method to use it later.
   */
  var beforeSubmit = Drupal.ajax.prototype.beforeSubmit;

  /**
   * Keep the original beforeSerialize method to use it later.
   */
  var beforeSerialize = Drupal.ajax.prototype.beforeSerialize;

  Drupal.behaviors.viewsAjaxHistory = {
    attach: function (context, settings) {
      // Init the current page too, because the first loaded pager element do
      // not have loadable history and will not work the back button.
      var $body = $('body').once('views-ajax-history-first-page-load');
      if ($body.length && settings.views && settings.views.ajaxViews) {
        for (var viewsAjaxSettingsKey in settings.views.ajaxViews) {
          if (settings.views.ajaxViews.hasOwnProperty(viewsAjaxSettingsKey)) {
            var viewsAjaxSettings = settings.views.ajaxViews[viewsAjaxSettingsKey];
            viewsAjaxSettings.page = settings.viewsAjaxHistory.onloadPageItem;
            var options = {
              data: viewsAjaxSettings,
              url: settings.views.ajax_path
            };
            addState(options, window.location.pathname + window.location.search);
          }
        }
      }
    }
  };

  /**
   * Modification of Drupal.Views.parseQueryString() to allow extracting multivalues fields
   *
   * @param query
   *   String, either a full url or just the query string.
   */
  var parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos != -1) {
      query = query.substring(pos + 1);
    }
    var pairs = query.split('&');
    var pair, key, value;
    for(var i in pairs) {
      if (typeof(pairs[i]) == 'string') {
        pair = pairs[i].split('=');
        // Ignore the 'q' path argument, if present.
        if (pair[0] != 'q' && pair[1]) {
          key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
          value = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          // field name ends with [], it's multivalues
          if (/\[\]$/.test(key)) {
            if (!(key in args)) {
              args[key] = [value];
            }
            // don't duplicate values
            else if (!$.inArray(value, args[key]) !== -1) {
              args[key].push(value);
            }
          }
          else {
            args[key] = value;
          }
        }
      }
    }
    return args;
  };

  /**
   * Strip views values and duplicates from URL
   *
   * @param url
   *   String with the full URL to clean up.
   * @param viewArgs
   *   Object containing field values from views.
   *
   * @return url
   *   String URL with views values and reduced duplicates.
   */
  var cleanURL = function (url, viewArgs) {
    var args = parseQueryString(url);
    var query = [];

    // With clean urls off we need to add the 'q' parameter.
    if (/\?/.test(Drupal.settings.views.ajax_path)) {
      query.push('q=' + Drupal.Views.getPath(url));
    }

    $.each(args, function (name, value) {
      // use values from viewArgs if they exists
      if (name in viewArgs) {
        value = viewArgs[name];
      }
      if ($.isArray(value)) {
        $.merge(query, $.map(value, function (sub) {
          return name + '=' + sub;
        }));
      }
      else {
        query.push(name + '=' + value);
      }
    });

    url = url.split('?');
    return url[0] + (query.length ? '?' + query.join('&') : '');
  };

  /**
   * Unbind 'statechange' when adding a new state to avoid an infinite loop.
   *
   * We only use the 'statechange' event to trigger refresh on back of forward click.
   *
   * @param options
   *   Object containing the values from views' AJAX call.
   * @param url
   *   String with the current URL to be cleaned up.
   */
  var addState = function (options, url) {
    $(window).unbind('statechange', loadView);
    History.pushState(options, document.title, cleanURL(url, options.data));
    $(window).bind('statechange', loadView);
  };

  /**
   * Make an AJAX request to update the view when nagitating back and forth.
   */
  var loadView = function () {
    var state = History.getState();
    var options = state.data;

    // need a dummy element to trigger Drupal's AJAX call.
    var $dummy = $('<div class="ajaxHistoryDummy"/>');
    // Drupal's AJAX options.
    var settings = $.extend({
      submit: options.data,
      setClick: true,
      event: 'click',
      selector: '.view-dom-id-' + options.data.view_dom_id,
      progress: { type: 'throbber' }
    }, options);

    new Drupal.ajax(false, $dummy[0], settings);
    // trigger ajax call
    // @TODO check there is no leak, $dummy is never destroyed.
    $dummy.trigger('click');
  };

  /**
   * Override beforeSerialize to handle click on pager links
   *
   * @param $element
   *   jQuery DOM element
   * @param options
   */
  Drupal.ajax.prototype.beforeSerialize = function ($element, options) {
    if (options.data.view_name) {
      // If we're restoring a previous state the dummy element will have this class,
      // and we don't need to go trough all this processing.
      if ($($element).hasClass('ajaxHistoryDummy')) {return;}

      options.url = Drupal.settings.views.ajax_path;

      // Check we handle a click on a link, not a form submission.
      if ($element.is('a')) {
        addState(options, $element.attr('href'));
      }
    }
    // Call the original Drupal method with the right context.
    beforeSerialize.apply(this, arguments);
  };

  /**
   * Override beforeSubmit to handle exposed form submissions.
   *
   * @param form_values
   *   Object with all field values.
   * @param element
   *   jQuery DOM form element.
   * @param options
   *   Object containing AJAX options.
   */
  Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
    if (options.data.view_name) {
      var url = original.path + (/\?/.test(original.path) ? '&' : '?') + element.formSerialize();

      // copy selected values in history state
      $.each(form_values, function () {
        // field name ending with [] is a multi value field
        if (/\[\]$/.test(this.name)) {
          if (!options.data[this.name]) {
            options.data[this.name] = [];
          }
          options.data[this.name].push(this.value);
        }
        // regular field
        else {
          options.data[this.name] = this.value;
        }
      });

      addState(options, url);
    }
    // Call the original Drupal method with the right context.
    beforeSubmit.apply(this, arguments);
  };
}(jQuery));
;
/**
 * @file
 * Attaches behaviors for the Chosen module.
 */

(function($) {
  Drupal.behaviors.chosen = {
    attach: function(context, settings) {
      settings.chosen = settings.chosen || Drupal.settings.chosen;

      // Prepare selector and add unwantend selectors.
      var selector = settings.chosen.selector;

      // Function to prepare all the options together for the chosen() call.
      var getElementOptions = function (element) {
        var options = $.extend({}, settings.chosen.options);

        // The width default option is considered the minimum width, so this
        // must be evaluated for every option.
        if (settings.chosen.minimum_width > 0) {
          if ($(element).width() < settings.chosen.minimum_width) {
            options.width = settings.chosen.minimum_width + 'px';
          }
          else {
            options.width = $(element).width() + 'px';
          }
        }

        // Some field widgets have cardinality, so we must respect that.
        // @see chosen_pre_render_select()
        if ($(element).attr('multiple') && $(element).data('cardinality')) {
          options.max_selected_options = $(element).data('cardinality');
        }

        return options;
      };

      // Process elements that have opted-in for Chosen.
      // @todo Remove support for the deprecated chosen-widget class.
      $('select.chosen-enable, select.chosen-widget', context).once('chosen', function() {
        options = getElementOptions(this);
        $(this).chosen(options);
      });

      $(selector, context)
        // Disabled on:
        // - Field UI
        // - WYSIWYG elements
        // - Tabledrag weights
        // - Elements that have opted-out of Chosen
        // - Elements already processed by Chosen.
        .not('#field-ui-field-overview-form select, #field-ui-display-overview-form select, .wysiwyg, .draggable select[name$="[weight]"], .draggable select[name$="[position]"], .chosen-disable, .chosen-processed')
        .filter(function() {
          // Filter out select widgets that do not meet the minimum number of
          // options.
          var minOptions = $(this).attr('multiple') ? settings.chosen.minimum_multiple : settings.chosen.minimum_single;
          if (!minOptions) {
            // Zero value means no minimum.
            return true;
          }
          else {
            return $(this).find('option').length >= minOptions;
          }
        })
        .once('chosen', function() {
          options = getElementOptions(this);
          $(this).chosen(options);
        });
    }
  };
})(jQuery);
;
