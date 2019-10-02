$(document).ready(function () {

  // PAGE TRANSITIONS
  $(".animsition").animsition({
    inClass: 'zoom-in-sm',
    outClass: 'fade-out',
    inDuration: 900,
    outDuration: 900,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'body',
    loadingClass: 'loadingAnimation',
    loadingInner: '<svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"><g fill="none" fill-rule="evenodd"><path fill="#4CABD4" d="M40.138,14.877 C38.352,12.406 36.431,10.036 34.384,7.777 C34.076,7.431 33.547,7.399 33.2,7.706 L33.129,7.777 C33.129,7.777 30.217,11.021 27.364,14.951 C23.464,20.325 21.445,24.421 21.445,27.286 C21.464,34.083 26.99,39.576 33.787,39.5560544 C40.583,39.537 46.077,34.011 46.0570544,27.215 C46.058,24.419 44.081,20.263 40.138,14.877"/><path fill="#1E5485" d="M25.717,11.054 C23.26,7.654 20.618,4.393 17.802,1.283 C17.379,0.807 16.652,0.763 16.174,1.183 L16.074,1.283 C16.074,1.283 12.068,5.745 8.143,11.152 C2.785,18.546 0,24.18 0,28.121 C0.027,37.47 7.629,45.028 16.979,45.0000775 C26.329,44.972 33.886,37.371 33.8580776,28.021 C33.859,24.18 31.139,18.464 25.717,11.054"/><path fill="#FFF" d="M33.8374859,20.3233035 C32.7183467,18.6678678 31.511039,17.0746741 30.2205724,15.5497458 C30.0492449,15.3318988 29.7346435,15.2937505 29.517228,15.4654179 C29.5032011,15.4764608 29.4891743,15.4885077 29.4761494,15.5015584 L29.4310633,15.5497458 C29.4310633,15.5497458 27.6005644,17.7302226 25.8071363,20.3684791 C23.3584558,23.9825292 22.0860236,26.7332228 22.0860236,28.6587084 C21.8465659,32.9403538 25.1168168,36.6066067 29.3899847,36.8455356 C33.6631527,37.0854684 37.3221466,33.8097336 37.5616044,29.5270843 C37.5786369,29.2218978 37.577635,28.9167114 37.5585986,28.6115249 C37.5585986,26.7362345 36.3132181,23.943377 33.8374859,20.3233035"/></g></svg>',
    timeout: true,
    timeoutCountdown: 1000,
    onLoadEvent: false,
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function (url) {
      window.location.href = url;
    }
  });


  // FULLPAGE
  $('#main').fullpage({
    lockAnchors: true,
    scrollingSpeed: 999,
    responsiveWidth: 769,
    menu: '.main-menu',
    easingcss3: 'cubic-bezier(0.68, -0.15, 0.265, 1)'
  });


  // TEXT ROTATION - ANIMATED HEADLINE
  $('#rotate1').rotaterator({
    fadeSpeed: 900,
    pauseSpeed: 4000
  });
  $('#rotate2').rotaterator({
    fadeSpeed: 900,
    pauseSpeed: 3000
  });


  // OWL CAROUSEL
  $('.owl-portfolio').owlCarousel({
    loop: false,
    margin: 0,
    items: 1,
    dots: true,
    animateOut: 'fadeOut'
  });

  $("#quotes").owlCarousel({
    items: 1,
    navigation: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoHeight: true
  });

  $("#quotes-resources").owlCarousel({
    items: 1,
    navigation: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoHeight: true
  });

  // SVG as IMG
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function (data) {
      var $svg = jQuery(data).find('svg');
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      $svg = $svg.removeAttr('xmlns:a');
      $img.replaceWith($svg);
    }, 'xml');
  });


  // MENU FULLSCREEN
  $('.nav-button').click(function () {
    $('body').toggleClass('nav-open');
  });


  // CUSTOM CURSOR
  var cursor = $(".cursor");
  var posX = 0,
    posY = 0;
  $(document).mousemove(function (e) {
    $('.cursor').eq(0).css({
      left: e.pageX,
      top: e.pageY
    });
  });
  $(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  $("a,button,label").on("mouseenter", function () {
    cursor.addClass("active");
  });
  $("a,button,label").on("mouseleave", function () {
    cursor.removeClass("active");
  });
  $("input,select,textarea,.card-brand").on("mouseenter", function () {
    cursor.addClass("hovered");
  });
  $("input,select,textarea,.card-brand").on("mouseleave", function () {
    cursor.removeClass("hovered");
  });


  // AUTOSIZE TEXTAREA
  autosize(document.getElementById('message'));

});