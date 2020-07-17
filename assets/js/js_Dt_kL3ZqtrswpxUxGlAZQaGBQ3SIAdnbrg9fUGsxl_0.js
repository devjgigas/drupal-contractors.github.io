/**
 * @file
 * JS for Radix.
 */
(function ($, Drupal, window, document, undefined) {
  // Allow dropdown links to be clickable by showing dropdowns on hover/focus.
  Drupal.behaviors.radix_dropdown = {
    attach: function(context, setting) {
      var dropdown_disabled = false;

      // Prevent the dropdown from re-opening if a menu link was focused before
      // the window was re-focused.
      $(window).focus(function() {
        dropdown_disabled = true;
        setTimeout(function () {
          dropdown_disabled = false;
        }, 0);
      });

      $('.dropdown').once('radix-dropdown', function() {
        var dropdown = this;

        // Helper function to show the dropdown.
        function show() {
          if (!$(dropdown).hasClass('open') && !dropdown_disabled) {
            $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
          }
        }

        // Helper function to hide the dropdown.
        function hide() {
          if ($(dropdown).hasClass('open')) {
            $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
          }
        }

        // Show dropdown on hover and focus.
        $(this).on('mouseenter.radix.dropdown', function(e) {
          show();
        });
        $(this).on('mouseleave.radix.dropdown', function() {
          hide();
        });
        $(this).on('focusin.radix.dropdown', function() {
          show();
        });

        $(this).on('keydown.radix.dropdown', function(e) {
          // Prevent up/down arrow from doing anything -- they conflict with
          // using focus to show the dropdown, and the default Bootstrap keydown
          // handler will trigger our click handler to visit the link.
          if (e.keyCode == 38 || e.keyCode == 40) {
            return false;
          }
          // Show/hide dropdown with spacebar.
          if (e.keyCode == 32) {
            $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
            return false;
          }
          // Hide the dropdown with the escape hey.
          if (e.keyCode == 27) {
            // Leave focus on the parent after it's hidden.
            $('>[data-toggle="dropdown"]', dropdown).focus();
            hide();
            return false;
          }
        });

        // Allow a.dropdown-toggle to be clickable.
        if ($(this).has('> a.dropdown-toggle')) {
          $(this).on('click.radix.dropdown', function(e) {
            var $target = $(e.target);
            if ($target.parent().get(0) == dropdown && $target.is('a.dropdown-toggle') && $target.attr('href')) {
              e.preventDefault();
              window.location.href = $target.attr('href');
            }
          });
        }
      });

      // Make submenus work.
      $('.dropdown-submenu').once('radix-dropdown', function() {
        var dropdown = this,
            toggle = $(dropdown).children('.dropdown-toggle'),
            menu = $(dropdown).children('.dropdown-menu');

        function show() {
          $(dropdown).addClass('open');
        }

        function hide() {
          $(dropdown).removeClass('open');
        }

        $(dropdown)
          .on('mouseenter.radix.dropdown', show)
          .on('mouseleave.radix.dropdown', hide)
          .on('focusin.radix.dropdown', show);
      });

      // Hide dropdowns when focus is lost.
      $('body').once('radix-dropdown').on('focusout.radix.dropdown', function(e) {
        var parent = $(e.target).closest('li.radix-dropdown-processed.open').get(0);
        if (parent) {
          // Defer to after all handlers so we can see where focus landed.
          setTimeout(function () {
            // Don't do anything if no element is focused - that can only
            // happen with the mouse and this is meant to close the menu
            // when the keyboard is used to change focus.
            if (!document.activeElement || document.activeElement === document.body) {
              return;
            }
            // Hide the parent if it doesn't contain the now focused element
            // and is still open.
            if (!parent.contains(document.activeElement) && $(parent).hasClass('open')) {
              if ($(parent).hasClass('dropdown-submenu')) {
                $(parent).removeClass('open');
              }
              else {
                $(parent).trigger('click.bs.dropdown');
              }
            }
          }, 0);
        }
      });

    }
  };

  // Bootstrap tooltip.
  Drupal.behaviors.radix_tooltip = {
    attach: function(context, setting) {
      if ($.fn.tooltip) {
        $("[data-toggle='tooltip']").tooltip();
      }
    }
  };

  // Bootstrap popover.
  Drupal.behaviors.radix_popover = {
    attach: function(context, setting) {
      if ($.fn.popover) {
        $("[data-toggle='popover']").popover();
      }
    }
  };

  $(document).ready(function() {
    // Show first tab by default.
    // Ignore the "primary" tabs on the node edit page.
    if ($.fn.tab) {
      var tabs = $('.nav-tabs').not('.primary');
      tabs.children('li').first().find('a').tab('show');

      if (hash = window.location.hash) {
        $('.nav-tabs > li > a[href$="' + hash + '"]').tab('show');
      }
    }
  });
})(jQuery, Drupal, this, this.document);
;
!function(e,t,s,i,o){var a={xxsmall:s.matchMedia("only screen and (max-width: 30em)"),xsmall:s.matchMedia("only screen and (min-width: 30.062em) and (max-width: 48em)"),small:s.matchMedia("only screen and (min-width: 48.063em) and (max-width: 62em)"),medium:s.matchMedia("only screen and (min-width: 62.063em) and (max-width: 75em)"),large:s.matchMedia("only screen and (min-width: 75.063em) and (max-width: 89.375em)"),xlarge:s.matchMedia("only screen and (min-width: 89.438em)")};t.behaviors.wowInit={attach:function(e,t){(new WOW).init()}},t.behaviors.fixedHeader={attach:function(t,o){function a(){var t=e(".scrollHeader"),i=e(".siteHeader-body-right .js-firstLvl");t.length&&(e(s).scrollTop()>e(".siteHeader").height()&&e(".scrollHeader").offset().top>e(".siteHeader").offset().top?(i.hasClass("is-open")&&(i.removeClass("is-open"),t.addClass("is-open")),e(".js-header").addClass("is-show")):(t.hasClass("is-open")&&(t.removeClass("is-open"),i.addClass("is-open")),e(".js-header").removeClass("is-show")))}var n=function(){e(this).closest(".js-firstLvl").toggleClass("is-open")};e(".siteHeader .js-firstLvl > span").once().on("click",n),e(i).mouseup(function(t){var s=e(".siteHeader .js-firstLvl");s.is(t.target)||0!==s.has(t.target).length||s.removeClass("is-open")}),e(".js-secondLvl > span").once().on("click",function(){var t=e(this),s=t.closest(".js-secondLvl"),i=s.find("ul");s.hasClass("is-open")?(s.removeClass("is-open"),i.slideUp()):(s.siblings().removeClass("is-open"),s.siblings().find("ul").slideUp(),s.addClass("is-open"),i.slideDown())}),a(),e(s).on("scroll",function(){a(),e(".scrollHeader").hasClass("is-show")&&e(".scrollHeader .js-firstLvl > span").once().on("click",n)})}},t.behaviors.mobileMenu={attach:function(t,s){var i=e(".js-mobileMenuHolder"),o=e(".js-closeMobileMenu"),a=e(".js-hamburger"),n=e("body");a.once().on("click",function(){n.addClass("is-openMenu"),i.show()}),i.once().on("click",function(){n.removeClass("is-openMenu"),i.hide()}),o.once().on("click",function(){n.removeClass("is-openMenu"),i.hide()}),e(".mobileMenu .js-firstLvl > span").once().on("click",function(){var t=e(this),s=t.closest(".js-firstLvl");s.toggleClass("is-open"),s.children("ul").slideToggle()})}},t.behaviors.footerAccordion={attach:function(t,i){function o(){a.xsmall.matches||a.xxsmall.matches?n.find(".block__content").hide():n.find(".block__content").show()}var n=e(".js-footerMenu ");n.click(function(){var t=e(this);(a.xsmall.matches||a.xxsmall.matches)&&(t.hasClass("is-open")?(t.removeClass("is-open"),t.find(".block__content").slideUp()):(t.addClass("is-open"),t.find(".block__content").slideDown(),t.siblings().removeClass("is-open").find(".block__content").slideUp(),t.closest(".siteFooter-body-column").siblings().find(".js-footerMenu").removeClass("is-open").find(".block__content").slideUp()))}),o(),e(s).on("resize",function(){o()})}},t.behaviors.footerBottom={attach:function(t,i){var o=e(".page-sign-up"),a=e(".js-footer"),n=e(".js-header");o&&e(".main").css({"min-height":e(s).height()-n.outerHeight()-a.outerHeight()})}},t.behaviors.sectionLevels={attach:function(t,s){var i=e(".js-showLvl"),o=e(".js-moreLvl");i.once().on("click",function(){e(this).toggleClass("is-active"),a.large.matches||a.xlarge.matches?e(".js-itemsLvl").slideToggle(100):(a.small.matches||a.medium.matches)&&e(".js-tableLvl").slideToggle(100)}),o.once().on("click",function(){var t=e(this),s=t.attr("data-close"),i=t.attr("data-open");t.toggleClass("is-open"),t.parent().siblings(".js-itemsLvl").slideToggle(200),t.closest(".levelBox").find(".levelBox-body").toggleClass("is-open"),t.hasClass("is-open")?t.text(i):t.text(s)})}},t.behaviors.contractorsMenu={attach:function(t,s){e(".js-contractorsMenuBtn").once().on("click",function(){e(this).toggleClass("is-open"),e(this).siblings("ul").slideToggle()})}},t.behaviors.toggleUS={attach:function(t,s){e(".switch-us").length&&(e(".collapse-link",t).on("click",function(t){t.preventDefault(),$target_id=e(this).attr("href"),e($target_id).slideToggle()}),e(i).ready(function(){e(".filter-collapse").hasClass("collapse")||e(".filter-collapse").addClass("collapse")}),e(".switch-us").on("click",function(){e(this).is(":checked")?(e("[id*=edit-field-address-country-us], [id*=edit-profile2-field-address-country-1-us]").prop("checked",!0),e("[id*=edit-submit-browse-contractors]").click()):(e("[id*=edit-field-address-country-all], [id*=edit-profile2-field-address-country-1-all]").prop("checked",!0),e("[id*=edit-submit-browse-contractors]").click())}),e("[id*=edit-field-address-country-us], [id*=edit-profile2-field-address-country-1-us]").is(":checked")?e(".switch-us").prop("checked",!0):e(".switch-us").prop("checked",!1))}},t.behaviors.toggleDrupalProfile={attach:function(t,s){e(".switch-drupal-profile").length&&(e(".switch-drupal-profile").on("click",function(){e(this).is(":checked")?(e("[id*=edit-drupal-org-profile-1]").prop("checked",!0),e("[id*=edit-submit-browse-contractors]").click()):(e("[id*=edit-drupal-org-profile-2]").prop("checked",!0),e("[id*=edit-submit-browse-contractors]").click())}),e("[id*=edit-drupal-org-profile-1]").is(":checked")?e(".switch-drupal-profile").prop("checked",!0):e(".switch-drupal-profile").prop("checked",!1))}},t.behaviors.smoothScroll={attach:function(t,s){e("a[href*=#]:not([href=#])").click(function(){if((location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")||location.hostname==this.hostname)&&!e(this).hasClass("no-scroll")){var t=e(this.hash);if(t=t.length?t:e("[name="+this.hash.slice(1)+"]"),t.length){var s=e(".scrollHeader").outerHeight();return e("html,body").animate({scrollTop:t.offset().top-s},1e3),!1}}})}},t.behaviors.slickContactors={attach:function(t,s){if(e(".contractorsView.view-contactors").length){var i=e(".contractorsView.view-contactors"),o=i.find(".view-content");i.find(".panel-display").length<=2&&e(".contractorsSlider").length&&(e(".contractorsSlider .panel-display").unwrap().unwrap(),o.wrapInner("<div class='contractorsSlider'></div>"),o.find(".contractorsSlider").slick({accessibility:!0,arrows:!0,draggable:!0,edgeFriction:.35,infinite:!1,mobileFirst:!0,slidesToShow:1,slidesPerRow:1,speed:500,swipe:!0,touchMove:!0,waitForAnimate:!0,responsive:[{breakpoint:1199,settings:{slidesToShow:4,slidesPerRow:1}},{breakpoint:868,settings:{slidesToShow:3,slidesPerRow:1}},{breakpoint:481,settings:{slidesToShow:2,slidesPerRow:1}}]}))}}},t.behaviors.slickSkills={attach:function(t,s){if(e(".contractorsView.view-display-id-contractors_skill_block").length){var i=e(".contractorsView.view-display-id-contractors_skill_block"),o=i.find(".view-content");i.find(".slick__slide").length<=2&&(e(".contractorsSlider .slick__slide").unwrap(),o.wrapInner("<div class='contractorsSlider'></div>"),o.find(".contractorsSlider").slick({accessibility:!0,arrows:!0,draggable:!0,edgeFriction:.35,infinite:!1,mobileFirst:!0,slidesToShow:1,slidesPerRow:1,speed:500,swipe:!0,touchMove:!0,waitForAnimate:!0,responsive:[{breakpoint:1199,settings:{slidesToShow:4,slidesPerRow:1}},{breakpoint:868,settings:{slidesToShow:3,slidesPerRow:1}},{breakpoint:481,settings:{slidesToShow:2,slidesPerRow:1}}]}))}}},t.behaviors.DContractorsShareButtons={attach:function(t){var i=e(".block.block-addtoany .block__content",t);e(s).width()<=768&&i.hasClass("a2a_vertical_style")&&(i.removeClass("a2a_vertical_style"),i.addClass("a2a_default_style"))}},t.behaviors.DContractorsEmployersUploadButtons={attach:function(s){if(e(".page-employers-register").length){var o=e('.field-name-field-company-logo input[type="file"]',s);o.closest(".field-name-field-company-logo").find(".employers-upload-photo").length?o.closest(".field-name-field-company-logo").find(".employers-upload-photo").text(t.t("No file chosen")):o.after('<span class="employers-upload-photo">'+t.t("No file chosen")+"</span>"),o.change(function(){e(this).next().html(e(this).val().split("\\").pop()),e(".employers-upload-photo").text(e(this).val().split("\\").pop())}),e(i).ajaxComplete(function(){var t=e(".field-name-field-company-logo .image-widget");t.find(".image-preview").length&&t.find(".image-widget-data").addClass("hide-icon")})}}},t.behaviors.DContractorsContractorsUploadButtons={attach:function(s){if(e(".page-contractors-register").length){var o=e('.field-name-field-profile-picture input[type="file"]',s);o.closest(".field-name-field-profile-picture").find(".contractors-upload-photo").length?o.closest(".field-name-field-profile-picture").find(".contractors-upload-photo").text(t.t("No file chosen")):o.after('<span class="contractors-upload-photo">'+t.t("No file chosen")+"</span>");var a=e('.field-name-field-upload-resume input[type="file"]',s);a.closest(".field-name-field-upload-resume").find(".contractors-resume-upload-photo").length?a.closest(".field-name-field-upload-resume").find(".contractors-resume-upload-photo").text(t.t("No file chosen")):a.after('<span class="contractors-resume-upload-photo">'+t.t("No file chosen")+"</span>"),o.change(function(){e(this).next().html(e(this).val().split("\\").pop()),e(".contractors-upload-photo").text(e(this).val().split("\\").pop())}),a.change(function(){e(this).next().html(e(this).val().split("\\").pop()),e(".contractors-resume-upload-photo").text(e(this).val().split("\\").pop())}),e(i).ajaxComplete(function(){var t=e(".field-name-field-profile-picture .image-widget"),s=e(".field-name-field-upload-resume .file-widget");t.find(".image-preview").length&&t.find(".image-widget-data").addClass("hide-icon"),s.find(".file").length&&s.addClass("hide-icon")})}}},t.behaviors.DContractorsToggleJobsFilter={attach:function(t){(e(".page-jobs").length||e(".page-taxonomy.jobs-listing").length)&&t===i&&e(i).on("click",".view-jobs .views-exposed-form .panel-heading",function(){s.innerWidth<769&&(e(this).toggleClass("opened"),e(i).find(".view-jobs .views-exposed-form .panel-body").slideToggle().css("display","flex"))})}},t.behaviors.DContractorsSearchPageRadio={attach:function(t){if(e(".page-search-contractors").length){e(".view-dc-search .form-type-radio").each(function(){var t=e(this);t.find("input").is(":checked")&&t.find("label").addClass("active")})}}},t.behaviors.DContractorsToggleSearchJobsFilter={attach:function(t){if(e(".page-search-jobs").length&&t===i){var o=e(".page-search-jobs .left-column");o.find(".column-title").off("click").click(function(){s.innerWidth<769&&(e(this).toggleClass("opened"),o.find(".region-sidebar-left").slideToggle().css("display","flex"))})}}},t.behaviors.headerSearchChangePaths={attach:function(s){var o=e(".block-custom-search-blocks"),a=o.find(".left-arrow"),n=a.find(".button"),l=a.find(".options"),c=l.find("span"),r=o.find(".form-item-custom-search-blocks-form-1 input"),d=o.find(".form-item-custom-search-paths"),h=d.find("select");n.click(function(){n.toggleClass("active"),l.fadeToggle()}),c.click(function(){var s=e(this);c.removeClass("active"),s.hasClass("find_contractor")?(h.val(h.find("option:first").val()),r.attr("placeholder",t.t("Find Contractors")),s.addClass("active")):(h.val(h.find("option:nth-child(2)").val()),r.attr("placeholder",t.t("Find Jobs")),s.addClass("active")),l.fadeOut(),n.removeClass("active")}),e(i).click(function(t){e(t.target).closest(l).length||e(t.target).closest(n).length||l.is(":visible")&&l.fadeOut()})}},t.behaviors.BContractorsSkillsShowMore={attach:function(s){function i(){var s=e(".page-browse-contractors .view-browse-contractors tr, .page-browse-contractors .view-browse-contractors .views-row");e(".page-search-contractors").length&&(s=e(".page-search-contractors .view-dc-search tr, .page-search-contractors .view-dc-search .views-row")),s.each(function(){var s=(e(this),e(this).find(".views-field-field-skills"));s.height()>75&&(s.find(".field-content").height(51),s.find(".show-more-skills").length||s.append("<span class='show-more-skills'>"+t.t("See more")+"</span>"))}),e(".show-more-skills").click(function(){var s=e(this),i=e(this).closest(".views-field-field-skills").find(".field-content");s.hasClass("animating")||(s.hasClass("enabled")?(i.animate({height:51},500),s.text(t.t("See more")),s.removeClass("enabled")):(i.animate({height:i.get(0).scrollHeight},500,function(){e(this).height("auto")}),s.text(t.t("See less")),s.addClass("enabled"))),s.addClass("animating"),setTimeout(function(){s.removeClass("animating")},50)})}(e(".page-browse-contractors").length||e(".page-search-contractors").length)&&(i(),e("#quicktabs-browse_contractors a").click(function(){i()}),e("#quicktabs-contractors_search a").click(function(){i()}))}},t.behaviors.employerDashboardMenu={attach:function(t,s){e(".employer-jobs-link").once().on("click",function(t){t.preventDefault(),e(".employerDashboard-jobs-submenu").toggle()})}},t.behaviors.advancedFilters={attach:function(t,s){e(".advanced-filters").once().on("click",function(t){t.preventDefault(),e(".filter-collapse").removeClass("show")})}},t.behaviors.educationShowMore={attach:function(t,s){e(".education-employment-show-button").once().on("click",function(t){t.preventDefault();var s=e(this),i=s.closest(".field-item").find(".education-employment-trimmed-text"),o=s.closest(".field-item").find(".education-employment-all-text");"more"==s.text()?(s.text("less"),i.addClass("hidden"),o.removeClass("hidden")):(s.text("more"),i.removeClass("hidden"),o.addClass("hidden"))})}},t.behaviors.suggestedSkills={attach:function(t,s){function i(t){var s=[];return e.each(t,function(t,i){-1==e.inArray(i,s)&&s.push(i)}),s}var o=e("#edit-profile-main-field-skills");if(o){var a=[];o.find(".help-block .suggested-skill").once().click(function(t){t.preventDefault();var s=e('[id^="edit-profile-main-field-skills-und"]'),o=s.val()?s.val():[];const n=e(this).attr("data-term-name");$selectedSkill=s.find("option:contains('"+n+"')"),o.push($selectedSkill.val()),o=i(o),a[e(this).attr("data-term-name")]=e(this).detach(),s.val(o).trigger("chosen:updated")})}}},t.behaviors.portfolioFilter={attach:function(t,s){e(".portfolio__category-filter").length&&e(".portfolio__category-filter").change(function(){var t=e(this).val();if("all"===t)return void e(".portfolio__item").show();e(".portfolio__item").hide(),e(".portfolio__item."+t).show()})}}}(jQuery,Drupal,this,this.document);;
