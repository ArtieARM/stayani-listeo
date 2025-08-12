/* ----------------- Start Document ----------------- */
(function ($) {
  "use strict";

  /*----------------------------------------------------*/
  /*  Elementor Smooth Loading
    /*----------------------------------------------------*/
  $(document).ready(function () {
    $(".main-search-container").after(
      '<div class="search-banner-placeholder"><div class="search-banner-placeholder-loader"></div></div>'
    );
    setTimeout(function () {
      $("body").addClass("theme-loaded");
      $(".search-banner-placeholder").fadeOut();
    }, 1100);
  });

  $(window).on("load", function () {
    $("body").addClass("theme-loaded");
    $(".search-banner-placeholder").fadeOut();
  });

  function starsOutput(
    firstStar,
    secondStar,
    thirdStar,
    fourthStar,
    fifthStar
  ) {
    return (
      "" +
      '<span class="' +
      firstStar +
      '"></span>' +
      '<span class="' +
      secondStar +
      '"></span>' +
      '<span class="' +
      thirdStar +
      '"></span>' +
      '<span class="' +
      fourthStar +
      '"></span>' +
      '<span class="' +
      fifthStar +
      '"></span>'
    );
  }

  $.fn.numericalRating = function () {
    this.each(function () {
      var dataRating = $(this).attr("data-rating");

      // Rules
      if (dataRating >= 4.0) {
        $(this).addClass("high");
      } else if (dataRating >= 3.0) {
        $(this).addClass("mid");
      } else if (dataRating < 3.0) {
        $(this).addClass("low");
      }
    });
  };

  /*  Star Rating
/*--------------------------*/
  $.fn.starRating = function () {
    this.each(function () {
      var dataRating = $(this).attr("data-rating");
      if (dataRating > 0) {
        // Rating Stars Output

        var fiveStars = starsOutput("star", "star", "star", "star", "star");

        var fourHalfStars = starsOutput(
          "star",
          "star",
          "star",
          "star",
          "star half"
        );
        var fourStars = starsOutput(
          "star",
          "star",
          "star",
          "star",
          "star empty"
        );

        var threeHalfStars = starsOutput(
          "star",
          "star",
          "star",
          "star half",
          "star empty"
        );
        var threeStars = starsOutput(
          "star",
          "star",
          "star",
          "star empty",
          "star empty"
        );

        var twoHalfStars = starsOutput(
          "star",
          "star",
          "star half",
          "star empty",
          "star empty"
        );
        var twoStars = starsOutput(
          "star",
          "star",
          "star empty",
          "star empty",
          "star empty"
        );

        var oneHalfStar = starsOutput(
          "star",
          "star half",
          "star empty",
          "star empty",
          "star empty"
        );
        var oneStar = starsOutput(
          "star",
          "star empty",
          "star empty",
          "star empty",
          "star empty"
        );

        // Rules
        if (dataRating >= 4.75) {
          $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
          $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
          $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
          $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
          $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
          $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
          $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
          $(this).append(oneHalfStar);
        } else if (dataRating < 1.25) {
          $(this).append(oneStar);
        }
      }
    });
  };
})(jQuery);

/* ----------------- Start Document ----------------- */
(function ($) {
  "use strict";

  $(document).ready(function () {
    /*--------------------------------------------------*/
    /*  Mobile Menu
	/*--------------------------------------------------*/
    $(".mmenu-trigger, .menu-icon-toggle, .desktop-mmenu-trigger").on(
      "click",
      function (e) {
        $("body").toggleClass("mobile-nav-open");
        e.preventDefault();
      }
    );

    $("#mobile-nav .sub-menu").prepend(
      '<div class="sub-menu-back-btn">' + listeo.menu_back + "</div>"
    );
    $(function () {
      $("#mobile-nav .menu-item-has-children > a").on("click", function (ea) {
        ea.preventDefault();
      });

      var rwdMenu = $("#mobile-nav"),
        topMenu = $("#mobile-nav > li > a"),
        subMenu = $("#mobile-nav > li li > a"),
        parentLi = $("#mobile-nav > li"),
        parentSubLi = $("#mobile-nav > li li"),
        backBtn = $(".sub-menu-back-btn");

      topMenu.on("click", function (e) {
        var thisTopMenu = $(this).parent(); // current $this

        rwdMenu.addClass("rwd-menu-view");
        thisTopMenu.addClass("open-submenu");
      });

      subMenu.on("click", function (e) {
        var thisSubMenu = $(this).parent(); // current $this
        thisSubMenu.addClass("open-submenu");
      });

      backBtn.click(function () {
        var thisBackBtn = $(this);
        $(this).parent().closest(".open-submenu").removeClass("open-submenu");
        rwdMenu.removeClass("rwd-menu-view");
      });

      $(".menu-item-has-children a").on("click", function () {
        var newHeight = $(this).parent().find(".sub-menu").height();
        $(".mobile-navigation-list").animate({ height: newHeight }, 400);
      });
      $(".sub-menu-back-btn").on("click", function () {
        var newHeighta = $(this).closest("li").parent().height();

        $(".mobile-navigation-list").animate({ height: newHeighta }, 400);
      });
    });

    $(".stars a")
      .on("click", function () {
        $(".stars a").removeClass("prevactive");
        $(this).prevAll().addClass("prevactive");
      })
      .hover(
        function () {
          $(".stars a").removeClass("prevactive");
          $(this).addClass("prevactive").prevAll().addClass("prevactive");
        },
        function () {
          $(".stars a").removeClass("prevactive");
          $(".stars a.active").prevAll().addClass("prevactive");
        }
      );

    /*  User Menu */
    // $("body").on("click", ".user-menu", function () {
    //   $(this).toggleClass("active");
    // });

    // var user_mouse_is_inside = false;

    // $("body").on("mouseenter", ".user-menu", function () {
    //   user_mouse_is_inside = true;
    // });
    // $("body").on("mouseleave", ".user-menu", function () {
    //   user_mouse_is_inside = false;
    // });

    // $("body").mouseup(function () {
    //   if (!user_mouse_is_inside) $(".user-menu").removeClass("active");
    // });

    /*----------------------------------------------------*/
    /*  Sticky Header
	/*----------------------------------------------------*/
    if ($("#header-container").hasClass("sticky-header")) {
      $("#header")
        .not("#header.not-sticky")
        .clone(true)
        .addClass("cloned unsticky")
        .insertAfter("#header");
      var reg_logo = $("#header.cloned #logo").data("logo-sticky");

      $("#header.cloned #logo img").attr("src", reg_logo);

      // sticky header script
      var headerOffset = 100; // height on which the sticky header will shows

      $(window).scroll(function () {
        if ($(window).scrollTop() > headerOffset) {
          $("#header.cloned").addClass("sticky").removeClass("unsticky");
          $("#navigation.style-2.cloned")
            .addClass("sticky")
            .removeClass("unsticky");
        } else {
          $("#header.cloned").addClass("unsticky").removeClass("sticky");
          $("#navigation.style-2.cloned")
            .addClass("unsticky")
            .removeClass("sticky");
        }
      });
    }

    $(document.body).on("added_to_cart", function () {
      $("body").addClass("listeo_adding_to_cart");
      setTimeout(function () {
        $("body").removeClass("listeo_adding_to_cart");
      }, 2000);
    });

    $(document).ready(function () {
      // Function to update margin-top for .hws-container and padding-top for #wrapper
      function updateMarginsAndPadding() {
        var hwsWrapperHeight = $(".hws-wrapper").outerHeight();
        var adminBarHeight = $("#wpadminbar").outerHeight() || 0; // Consider admin bar height or default to 0

        // Add adminBarHeight as margin-top to .hws-container
        $(".hws-wrapper").css("margin-top", adminBarHeight + "px");

        // Update padding-top for #wrapper
        $("#wrapper").css("padding-top", hwsWrapperHeight + "px");
      }

      // Run the function on document ready
      updateMarginsAndPadding();

      // Run the function when the window is resized
      $(window).resize(function () {
        updateMarginsAndPadding();
      });
    });
    $(document).ready(function () {
      // Function to check window width and remove class
      function checkWindowWidth() {
        var windowWidth = $(window).width();

        if (windowWidth < 1024) {
          $(".hws-wrapper .main-search-form").removeClass("gray-style");
        } else {
          $(".hws-wrapper .main-search-form").addClass("gray-style");
        }
      }

      // Initial check on page load
      checkWindowWidth();

      // Listen for window resize events
      $(window).resize(function () {
        // Recheck window width on resize
        checkWindowWidth();
      });
    });

    $(document).ready(function () {
      // Function to log current padding on #header
      function logHeaderPadding() {
        var currentPadding = $("#header").css("padding-top");
        return parseInt(currentPadding, 10) || 0;
      }

      // Initial log on page load
      logHeaderPadding();

      // Listen for window resize events
      $(window).resize(function () {
        logHeaderPadding();
      });

      // Function to set top attribute based on header height below 1200px
      function setTopAttribute() {
        var windowWidth = $(window).width();

        if (windowWidth < 1200) {
          var headerHeight =
            $("#header-container.hws-wrapper #header").outerHeight() -
            logHeaderPadding();
          $(".header-search-container").css("top", headerHeight + "px");
        } else {
          // Reset top attribute if window width is 1200px or above
          $(".header-search-container").css("top", "");
        }
      }

      // Initial set on page load
      setTopAttribute();

      // Listen for window resize events
      $(window).resize(function () {
        // Re-set top attribute on resize
        setTopAttribute();
      });
    });

    $(document).ready(function () {
      // Add click event listener to .mobile-search-trigger
      $(".mobile-search-trigger").on("click", function () {
        // Toggle the visibility by adding/removing the .visible class
        $(".header-search-container").toggleClass("visible");
        $(this).toggleClass("visible");
      });
    });

    /*----------------------------------------------------*/
    /*  Back to Top
	/*----------------------------------------------------*/
    var pxShow = 600; // height on which the button will show
    var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

    $(window).scroll(function () {
      if ($(window).scrollTop() >= pxShow) {
        $("#backtotop").addClass("visible");
      } else {
        $("#backtotop").removeClass("visible");
      }
    });

    $("#backtotop a").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, scrollSpeed);
      return false;
    });

    /*----------------------------------------------------*/
    /*  Inline CSS replacement for backgrounds etc.
	/*----------------------------------------------------*/
    function inlineCSS() {
      // Common Inline CSS
      $(
        ".main-search-container, section.fullwidth, .listing-slider .item, .listing-slider-small .item, .address-container, .img-box-background, .image-edge, .edge-bg"
      ).each(function () {
        var attrImageBG = $(this).attr("data-background-image");
        var attrColorBG = $(this).attr("data-background-color");

        if (attrImageBG !== undefined) {
          $(this).css("background-image", "url(" + attrImageBG + ")");
        }

        if (attrColorBG !== undefined) {
          $(this).css("background", "" + attrColorBG + "");
        }
      });
    }

    // Init
    inlineCSS();

    function parallaxBG() {
      $(".parallax,.vc_parallax").prepend(
        '<div class="parallax-overlay"></div>'
      );

      $(".parallax,.vc_parallax").each(function () {
        var attrImage = $(this).attr("data-background");
        var attrColor = $(this).attr("data-color");
        var attrOpacity = $(this).attr("data-color-opacity");

        if (attrImage !== undefined) {
          $(this).css("background-image", "url(" + attrImage + ")");
        }

        if (attrColor !== undefined) {
          $(this)
            .find(".parallax-overlay")
            .css("background-color", "" + attrColor + "");
        }

        if (attrOpacity !== undefined) {
          $(this)
            .find(".parallax-overlay")
            .css("opacity", "" + attrOpacity + "");
        }
      });
    }

    parallaxBG();

    /*----------------------------------------------------*/
    /*  Image Box
    /*----------------------------------------------------*/
    $(".category-box").each(function () {
      // add a photo container
      $(this).append('<div class="category-box-background"></div>');

      // set up a background image for each tile based on data-background-image attribute
      $(this)
        .children(".category-box-background")
        .css({
          "background-image":
            "url(" + $(this).attr("data-background-image") + ")",
        });
    });
    window.initializeSliders = function () {
      $(".listing-card-nl").each(function () {
        const $card = $(this);

        // Skip if already initialized
        if ($card.data("slider-initialized")) return;

        const $sliderWrapper = $card.find(".slider-wrapper-nl");
        const $slides = $card.find(".slider-image-nl");
        let currentIndex = 0;

        // Hide arrows if there's only one image
        if ($slides.length <= 1) {
          $card.find(".slider-arrow-nl").hide();
        } else {
          $card.find(".slider-arrow-nl").show();
        }

        function updateSlider() {
          if ($slides.length === 0) return;
          const slideWidth = $slides.first().width();
          $sliderWrapper.css(
            "transform",
            `translateX(${-currentIndex * slideWidth}px)`
          );
        }

        // Next button click
        $card
          .find("#nextBtn")
          .off("click")
          .on("click", function () {
            currentIndex = (currentIndex + 1) % $slides.length;
            updateSlider();
          });

        // Previous button click
        $card
          .find("#prevBtn")
          .off("click")
          .on("click", function () {
            currentIndex = (currentIndex - 1 + $slides.length) % $slides.length;
            updateSlider();
          });

        // Mark as initialized
        $card.data("slider-initialized", true);
$card.data("updateSlider", updateSlider);
$card.data("currentIndex", currentIndex);
$card.data("slidesLength", $slides.length);
        // Initialize slider
        updateSlider();
      });
    };

    $(document).ready(function () {
      initializeSliders();
    });

    // Listen for custom event from AJAX calls
    $(document).on("ajaxContentLoaded", function () {
      initializeSliders();
    });

    // Function to reset all sliders to first slide
    window.resetSlidersToFirst = function () {
      $(".listing-card-nl").each(function () {
        const $card = $(this);
        const updateSlider = $card.data("updateSlider");

        if (updateSlider) {
          // Reset to first slide
          $card.data("currentIndex", 0);
          updateSlider();
        }
      });
    };
    /*----------------------------------------------------*/
    /*  Image Box
    /*----------------------------------------------------*/
    $(".img-box").each(function () {
      $(this).append('<div class="img-box-background"></div>');
      $(this)
        .children(".img-box-background")
        .css({
          "background-image":
            "url(" + $(this).attr("data-background-image") + ")",
        });
    });

    /*----------------------------------------------------*/
    /*  Parallax
	/*----------------------------------------------------*/

    /* detect touch */
    if ("ontouchstart" in window) {
      document.documentElement.className =
        document.documentElement.className + " touch";
    }
    if (!$("html").hasClass("touch")) {
      /* background fix */
      $(".parallax").css("background-attachment", "fixed");
    }

    /* fix vertical when not overflow
	call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix() {
      var h = $("body").height();
      // set .fullscreen height
      $(".content-b").each(function (i) {
        if ($(this).innerHeight() > h) {
          $(this).closest(".fullscreen").addClass("overflow");
        }
      });
    }
    $(window).resize(fullscreenFix);
    fullscreenFix();

    /* resize background images */
    function backgroundResize() {
      var windowH = $(window).height();
      $(".parallax").each(function (i) {
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = 100;
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
          //var maxH = contH > windowH ? contH : windowH;
          remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if (contW > imgW) {
          imgW = contW;
          imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
      });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();

    /* set parallax background-position */
    function parallaxPosition(e) {
      var heightWindow = $(window).height();
      var topWindow = $(window).scrollTop();
      var bottomWindow = topWindow + heightWindow;
      var currentWindow = (topWindow + bottomWindow) / 2;
      $(".parallax").each(function (i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if (bottomWindow > top && topWindow < bottom) {
          //var imgW = path.data("resized-imgW");
          var imgH = path.data("resized-imgH");
          // min when image touch top of window
          var min = 0;
          // max when image touch bottom of window
          var max = -imgH + heightWindow;
          // overflow changes parallax
          var overflowH =
            height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
          top = top - overflowH;
          bottom = bottom + overflowH;

          // value with linear interpolation
          var value = 0;
          if ($(".parallax").is(".titlebar")) {
            value =
              min +
              (((max - min) * (currentWindow - top)) / (bottom - top)) * 2;
          } else {
            value =
              min + ((max - min) * (currentWindow - top)) / (bottom - top);
          }

          // set background-position
          var orizontalPosition = path.attr("data-oriz-pos");
          orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
          $(this).css(
            "background-position",
            orizontalPosition + " " + value + "px"
          );
        }
      });
    }
    if (!$("html").hasClass("touch")) {
      $(window).resize(parallaxPosition);
      $(window).scroll(parallaxPosition);
      parallaxPosition();
    }

    // Jumping background fix for IE
    if (navigator.userAgent.match(/Trident\/7\./)) {
      // if IE
      $("body").on("mousewheel", function () {
        event.preventDefault();

        var wheelDelta = event.wheelDelta;
        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
    }

    // Single Select
    $(".dokan-store-products-filter-area select").select2({
      dropdownPosition: "below",
      dropdownParent: $(".dokan-store-products-ordeby-select"),
      minimumResultsForSearch: 20,
      width: "100%",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });
    $(
      ".select2-single,.woocommerce-ordering select,.dokan-form-group select,#stores_orderby"
    ).select2({
      dropdownPosition: "below",

      minimumResultsForSearch: 20,
      width: "100%",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });

    // Multiple Select
 function initializeSelect2($context = $(document)) {
   $context.find(".select2-multiple").each(function () {
     // Prevent double init
     if (!$(this).hasClass("select2-hidden-accessible")) {
       $(this).select2({
         dropdownPosition: "below",
         width: "100%",
         placeholder: $(this).data("placeholder"),
         language: {
           noResults: function () {
             return listeo_core.no_results_text;
           },
         },
       });
     }
   });
 }
 initializeSelect2();

    $(".main-search-inner .select2-single").select2({
      minimumResultsForSearch: 20,
      dropdownPosition: "below",

      width: "100%",
      //placeholder: $(this).data('placeholder'),
      dropdownParent: $(".main-search-input"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });

    // Multiple Select
    $(".main-search-inner .select2-multiple").each(function () {
      $(this).select2({
        width: "100%",
        dropdownPosition: "below",
        placeholder: $(this).data("placeholder"),
        dropdownParent: $(".main-search-input"),
        language: {
          noResults: function (term) {
            return listeo_core.no_results_text;
          },
        },
      });
    });

    // Select on Home Search Bar
    $(".select2-sortby").select2({
      dropdownParent: $(".sort-by"),
      minimumResultsForSearch: 20,
      width: "100%",
      dropdownPosition: "below",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });
    // Select on Home Search Bar
    $(".select2-bookings").select2({
      dropdownParent: $(".sort-by"),
      minimumResultsForSearch: 20,
      width: "100%",
      dropdownPosition: "below",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });
    $(".select2-bookings-status").select2({
      dropdownParent: $(".sort-by-status"),
      minimumResultsForSearch: 20,
      width: "100%",
      dropdownPosition: "below",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });
    $(".select2-bookings-author").select2({
      dropdownParent: $(".sort-by-booking-author"),
      minimumResultsForSearch: 20,
      //   dropdownAutoWidth: true,
      dropdownPosition: "below",
      placeholder: $(this).data("placeholder"),
      language: {
        noResults: function (term) {
          return listeo_core.no_results_text;
        },
      },
    });

    $("selectpicker-bts").selectpicker();

    /*----------------------------------------------------*/
    /*  Magnific Popup
    /*----------------------------------------------------*/

    $(".mfp-gallery-container").each(function () {
      // the containers for all your galleries

      $(this).magnificPopup({
        type: "image",
        delegate: "a.mfp-gallery",

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: "auto",

        closeBtnInside: false,
        preloader: true,

        removalDelay: 0,
        mainClass: "mfp-fade",

        gallery: { enabled: true, tCounter: "" },
      });
    });

    var listing_gallery_grid_popup;
    $("#single-listing-grid-gallery-popup").on("click", function (e) {
      e.preventDefault();

      // Get the JSON-encoded data from the data attribute
      var imageData = $(this).data("gallery");

      // Create an array to hold the gallery items
      var items = [];

      // Loop through the JSON data and create Magnific Popup items
      $.each(imageData, function (index, image) {
        console.log(image);
        items.push({
          src: image,
          //title: image.title,
        });
      });

      // Open Magnific Popup with the gallery items
      $.magnificPopup.open({
        items: items,
        type: "image", // Specify the type of content (image, iframe, inline, etc.)
        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: "auto",

        closeBtnInside: false,
        preloader: true,

        removalDelay: 0,
        mainClass: "mfp-fade",

        gallery: { enabled: true, tCounter: "" },
      });
      listing_gallery_grid_popup = $.magnificPopup.instance;
    });

    $("a.slg-gallery-img").on("click", function (e) {
      e.preventDefault();
      $("#single-listing-grid-gallery-popup").trigger("click");
      var index = $(this).data("grid-start-index");
      listing_gallery_grid_popup.goTo(index);
    });
    // $("#single-listing-grid-gallery").magnificPopup({
    //   type: "image",
    //   delegate: "a.slg-gallery-img",
    //   fixedContentPos: true,
    // });
    $(".popup-with-zoom-anim").magnificPopup({
      type: "inline",

      fixedContentPos: false,
      fixedBgPos: true,

      overflowY: "auto",

      closeBtnInside: true,
      preloader: false,

      midClick: true,
      removalDelay: 300,
      mainClass: "my-mfp-zoom-in",
    });

    $(".mfp-image").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      mainClass: "mfp-fade",
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false,
    });

    /*----------------------------------------------------*/
    /*  Slick Carousel
    /*----------------------------------------------------*/

    // New Carousel Nav With Arrows
    $(
      ".home-search-carousel, .simple-slick-carousel, .simple-fw-slick-carousel, .testimonial-carousel, .fullwidth-slick-carousel, .fullgrid-slick-carousel,.reviews-slick-carousel"
    ).append(
      "" +
        "<div class='slider-controls-container'>" +
        "<div class='slider-controls'>" +
        "<button type='button' class='slide-m-prev'></button>" +
        "<div class='slide-m-dots'></div>" +
        "<button type='button' class='slide-m-next'></button>" +
        "</div>" +
        "</div>"
    );

    // New Homepage Carousel
    $(".home-search-carousel").each(function () {
      $(this).slick({
        slide: ".home-search-slide",
        centerMode: true,
        //   autoplay: true,
        // autoplaySpeed: 2000,
        centerPadding: "15%",
        slidesToShow: 1,
        dots: true,
        arrows: true,
        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),

        responsive: [
          {
            breakpoint: 1940,
            settings: {
              centerPadding: "13%",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1640,
            settings: {
              centerPadding: "8%",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1430,
            settings: {
              centerPadding: "50px",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1370,
            settings: {
              centerPadding: "20px",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "20px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });
    // New Homepage Carousel Positioning
    if (document.readyState == "complete") {
      init7Slider();
    }

    function init7Slider() {
      $(".home-search-slider-headlines").each(function () {
        var carouselHeadlineHeight = $(this).height();
        $(this).css("padding-bottom", carouselHeadlineHeight + 30);
      });
      $(".home-search-carousel").removeClass("carousel-not-ready");
      $(".home-search-carousel-placeholder").addClass("carousel-ready");

      if ($(window).width() < 992) {
        $(".home-search-slider-headlines").each(function () {
          $(this).css("bottom", $(".main-search-input").height() + 65);
        });
      }
    }
    $(window).on("load", function () {
      init7Slider();
    });
    $(window).on("load resize", function () {
      if ($(window).width() < 992) {
        $(".home-search-slider-headlines").each(function () {
          $(this).css("bottom", $(".main-search-input").height() + 65);
        });
      }
    });

    $(".fullwidth-slick-carousel").each(function () {
      $(this).slick({
        centerMode: true,
        centerPadding: "20%",
        slidesToShow: 3,
        dots: true,
        arrows: true,
        slide: ".fw-carousel-item",
        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),
        responsive: [
          {
            breakpoint: 1920,
            settings: {
              centerPadding: "15%",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1441,
            settings: {
              centerPadding: "10%",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              centerPadding: "10px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "10px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });
    $(".fullgrid-slick-carousel").each(function () {
      $(this).slick({
        centerMode: true,
        centerPadding: "20%",
        slidesToShow: 2,
        dots: true,
        arrows: true,
        slide: ".fw-carousel-item",
        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),
        responsive: [
          {
            breakpoint: 1920,
            settings: {
              centerPadding: "15%",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 1441,
            settings: {
              centerPadding: "10%",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              centerPadding: "10px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "10px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });
    $(".reviews-slick-carousel").each(function () {
      $(this).slick({
        centerMode: true,
        centerPadding: "0%",
        slidesToShow: 5,
        dots: true,
        arrows: true,
        slide: ".fw-carousel-item",
        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),
        responsive: [
          {
            breakpoint: 1920,
            settings: {
              centerPadding: "0%",
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1441,
            settings: {
              centerPadding: "0%",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });

    $(".general-carousel").each(function () {
      var slides = $(this).data("slides");

      if (!slides) {
        slides = 3;
      }
      $(this).slick({
        //  centerMode: true,

        slidesToShow: slides,
        dots: false,
        arrows: true,

        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),
      });
    });

    $(".testimonial-carousel").each(function () {
      $(this).slick({
        centerMode: true,
        centerPadding: "34%",
        slidesToShow: 1,
        dots: true,
        arrows: true,
        slide: ".fw-carousel-review",
        appendDots: $(this).find(".slide-m-dots"),
        prevArrow: $(this).find(".slide-m-prev"),
        nextArrow: $(this).find(".slide-m-next"),
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              centerPadding: "10px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "10px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });

    $(".listing-slider").slick({
      centerMode: true,
      centerPadding: "20%",
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: "15%",
          },
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: "0",
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: "0",
            slidesToShow: 1,
          },
        },
      ],
    });
    $(".widget-listing-slider").slick({
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
    });

    $(".listing-slider-small").slick({
      centerMode: true,
      centerPadding: "0",
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

    $(".simple-slick-carousel").each(function () {
      var slides = $(this).data("slides");

      if (!slides) {
        slides = 3;
      }
      if ($("body").hasClass("page-template-template-dashboard")) {
        slides = 4;
      }
      $(this)
        .slick({
          infinite: true,
          slidesToShow: slides,
          slidesToScroll: 3,
          slide: ".fw-carousel-item",
          dots: true,
          arrows: true,
          appendDots: $(this).find(".slide-m-dots"),
          prevArrow: $(this).find(".slide-m-prev"),
          nextArrow: $(this).find(".slide-m-next"),
          responsive: [
            {
              breakpoint: 1220,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        })
        .on("init", function (e, slick) {});
      // 		console.log(slick);
      //slideautplay = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("time");
      //$s.slick("setOption", "autoplaySpeed", slideTime);
    });

    $(".simple-fw-slick-carousel").each(function () {
      var slides = $(this).data("slides");

      if (!slides) {
        slides = 5;
      }
      $(this)
        .slick({
          infinite: true,
          slidesToShow: slides,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          slide: ".fw-carousel-item",
          appendDots: $(this).find(".slide-m-dots"),
          prevArrow: $(this).find(".slide-m-prev"),
          nextArrow: $(this).find(".slide-m-next"),
          responsive: [
            {
              breakpoint: 1610,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1365,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        })
        .on("init", function (e, slick) {
          //slideautplay = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("time");
          //$s.slick("setOption", "autoplaySpeed", slideTime);
        });
    });

    $(".logo-slick-carousel").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 4,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // Fix for carousel if there are less than 4 categories
    $(window).on("load resize", function (e) {
      var carouselListItems = $(
        ".fullwidth-slick-carousel .fw-carousel-item"
      ).length;
      if (carouselListItems < 4) {
        $(".fullwidth-slick-carousel .slick-slide").css({
          "pointer-events": "all",
          opacity: "1",
        });
      }
    });

    // Mobile fix for small listing slider
    $(window).on("load resize", function (e) {
      var carouselListItems = $(".listing-slider-small .slick-track").children()
        .length;
      if (carouselListItems < 2) {
        $(".listing-slider-small .slick-track").css({
          transform: "none",
        });
      }
    });
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      $(document).ready(function () {
        $(
          ".home-search-carousel,.logo-slick-carousel,.simple-fw-slick-carousel,.listing-slider-small,.listing-slider,.testimonial-carousel,.fullwidth-slick-carousel,.fullgrid-slick-carousel,.reviews-slick-carousel"
        ).slick("refresh");
      });
    }

    // Number Picker - TobyJ
    (function ($) {
      $.fn.numberPicker = function () {
        var dis = "disabled";
        return this.each(function () {
          var picker = $(this),
            p = picker.find("button:last-child"),
            m = picker.find("button:first-child"),
            input = picker.find("input"),
            min = parseInt(input.attr("min"), 10),
            max = parseInt(input.attr("max"), 10),
            inputFunc = function (picker) {
              var i = parseInt(input.val(), 10);
              if (i <= min || !i) {
                input.val(min);
                p.prop(dis, false);
                m.prop(dis, true);
              } else if (i >= max) {
                input.val(max);
                p.prop(dis, true);
                m.prop(dis, false);
              } else {
                p.prop(dis, false);
                m.prop(dis, false);
              }
            },
            changeFunc = function (picker, qty) {
              var q = parseInt(qty, 10),
                i = parseInt(input.val(), 10);
              if ((i < max && q > 0) || (i > min && !(q > 0))) {
                input.val(i + q);
                inputFunc(picker);
              }
            };
          m.on("click", function (e) {
            e.preventDefault();
            changeFunc(picker, -1);
          });
          p.on("click", function (e) {
            e.preventDefault();
            changeFunc(picker, 1);
          });
          input.on("change", function () {
            inputFunc(picker);
          });
          inputFunc(picker); //init
        });
      };
    })(jQuery);

    // Init
    $(".plusminus").numberPicker();

    /*----------------------------------------------------*/
    /*  Tabs
	/*----------------------------------------------------*/

    var $tabsNav = $(".tabs-nav"),
      $tabsNavLis = $tabsNav.children("li");

    $tabsNav.each(function () {
      var $this = $(this);

      $this
        .next()
        .children(".tab-content")
        .stop(true, true)
        .hide()
        .first()
        .show();

      $this.children("li").first().addClass("active").stop(true, true).show();
    });

    $tabsNavLis.on("click", function (e) {
      var $this = $(this);

      $this.siblings().removeClass("active").end().addClass("active");

      $this
        .parent()
        .next()
        .children(".tab-content")
        .stop(true, true)
        .hide()
        .siblings($this.find("a").attr("href"))
        .fadeIn();

      e.preventDefault();
    });
    var hash = window.location.hash;
    var anchor = $('.tabs-nav a[href="' + hash + '"]');
    if (anchor.length === 0) {
      $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
      $(".tab-content:first").show(); //Show first tab content
    } else {
      anchor.parent("li").click();
    }

    /*----------------------------------------------------*/
    /*  Accordions
	/*----------------------------------------------------*/
    var $accor = $(".accordion");

    $accor.each(function () {
      $(this).toggleClass("ui-accordion ui-widget ui-helper-reset");
      $(this)
        .find("h3")
        .addClass(
          "ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"
        );
      $(this)
        .find("div")
        .addClass(
          "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
        );
      $(this).find("div").hide();
    });

    var $trigger = $accor.find("h3");

    $trigger.on("click", function (e) {
      var location = $(this).parent();

      if ($(this).next().is(":hidden")) {
        var $triggerloc = $("h3", location);
        $triggerloc
          .removeClass(
            "ui-accordion-header-active ui-state-active ui-corner-top"
          )
          .next()
          .slideUp(300);
        $triggerloc.find("span").removeClass("ui-accordion-icon-active");
        $(this).find("span").addClass("ui-accordion-icon-active");
        $(this)
          .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
          .next()
          .slideDown(300);
      }
      e.preventDefault();
    });

    /*----------------------------------------------------*/
    /*	Toggle
	/*----------------------------------------------------*/

    $(".toggle-container").hide();

    $(".trigger, .trigger.opened").on("click", function (a) {
      $(this).toggleClass("active");
      a.preventDefault();
    });

    $(".trigger").on("click", function () {
      $(this).next(".toggle-container").slideToggle(300);
    });

    $(".trigger.opened").addClass("active").next(".toggle-container").show();

    /*----------------------------------------------------*/
    /*  Tooltips
	/*----------------------------------------------------*/

    $(".tooltip.top").tipTip({
      defaultPosition: "top",
    });

    $(".tooltip.bottom").tipTip({
      defaultPosition: "bottom",
    });

    $(".tooltip.left").tipTip({
      defaultPosition: "left",
    });

    $(".tooltip.right").tipTip({
      defaultPosition: "right",
    });

    /*----------------------------------------------------*/
    /*  Searh Form More Options
    /*----------------------------------------------------*/
    $(".more-search-options-trigger").on("click", function (e) {
      e.preventDefault();
      $(".more-search-options, .more-search-options-trigger").toggleClass(
        "active"
      );
      $(".more-search-options.relative").animate(
        { height: "toggle", opacity: "toggle" },
        300
      );
    });

    /*----------------------------------------------------*/
    /*  Half Screen Map Adjustments
    /*----------------------------------------------------*/
    $(window).on("load resize", function () {
      var winWidth = $(window).width();
      var headerHeight = $("#header-container").height(); // height on which the sticky header will shows
      // if body doesn't have class hws-coontainer:
      if (!$("body").hasClass("hws-header")) {
        $(
          ".fs-inner-container, .fs-inner-container.map-fixed, #dashboard, .page-template-template-split-map-sidebar .full-page-jobs"
        ).css("padding-top", headerHeight);
      }

      // if(winWidth<992) {
      // 	$('.fs-inner-container.map-fixed').insertBefore('.fs-inner-container.content');
      // } else {
      // 	$('.fs-inner-container.content').insertBefore('.fs-inner-container.map-fixed');
      // }
    });

    /*----------------------------------------------------*/
    /*  Counters
    /*----------------------------------------------------*/
    $(window).on("load", function () {
      $(".listeo-dashoard-widgets .dashboard-stat-content h4").counterUp({
        delay: 100,
        time: 800,
        formatter: function (n) {
          if ($("#waller-row").data("numberFormat") == "euro") {
            return n.replace(".", ",");
          } else {
            return n;
          }
        },
      });
    });

    /*----------------------------------------------------*/
    /*  Rating Script Init
    /*----------------------------------------------------*/

    // Leave Rating
    $(".leave-rating input").change(function () {
      var $radio = $(this);
      $(".leave-rating .selected").removeClass("selected");
      $radio.closest("label").addClass("selected");
    });

    /*----------------------------------------------------*/
    /* Dashboard Scripts
	/*----------------------------------------------------*/
    $(".dashboard-nav ul li a").on("click", function () {
      if ($(this).closest("li").has("ul").length) {
        $(this).parent("li").toggleClass("active");
      }
    });

    // Dashbaord Nav Scrolling
    $(window).on("load resize", function () {
      var wrapperHeight = window.innerHeight;
      var headerHeight = $("#header-container").height();
      var winWidth = $(window).width();

      if (winWidth > 992) {
        $(".dashboard-nav-inner").css(
          "max-height",
          wrapperHeight - headerHeight
        );
      } else {
        $(".dashboard-nav-inner").css("max-height", "");
      }
    });

    // Tooltip
    $(".tip").each(function () {
      var tipContent = $(this).attr("data-tip-content");
      $(this).append('<div class="tip-content">' + tipContent + "</div>");
    });

    $(".verified-badge.with-tip").each(function () {
      var tipContent = $(this).attr("data-tip-content");
      $(this).append('<div class="tip-content">' + tipContent + "</div>");
    });

    $(window).on("load resize", function () {
      var verifiedBadge = $(".verified-badge.with-tip");
      verifiedBadge.find(".tip-content").css({
        width: verifiedBadge.outerWidth(),
        "max-width": verifiedBadge.outerWidth(),
      });
    });

    // Responsive Nav Trigger
    $(".dashboard-responsive-nav-trigger").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active");

      var dashboardNavContainer = $("body").find(".dashboard-nav");

      if ($(this).hasClass("active")) {
        $(dashboardNavContainer).addClass("active");
      } else {
        $(dashboardNavContainer).removeClass("active");
      }
    });

    // Dashbaord Messages Alignment
    $(window).on("load resize", function () {
      var msgContentHeight = $(".message-content").outerHeight();
      var msgInboxHeight = $(".messages-inbox ul").height();

      if (msgContentHeight > msgInboxHeight) {
        $(".messages-container-inner .messages-inbox ul").css(
          "max-height",
          msgContentHeight
        );
      }
    });

    /*----------------------------------------------------*/
    /*  Notifications
	/*----------------------------------------------------*/
    $("a.close")
      .removeAttr("href")
      .on("click", function () {
        function slideFade(elem) {
          var fadeOut = { opacity: 0, transition: "opacity 0.5s" };
          elem.css(fadeOut).slideUp();
        }
        slideFade($(this).parent());
      });

    /*----------------------------------------------------*/
    /* Panel Dropdown
	/*----------------------------------------------------*/
    function close_panel_dropdown() {
      $(".panel-dropdown").removeClass("active");
      $(".fs-inner-container.content").removeClass("faded-out");
    }

    $(".panel-dropdown a").on("click", function (e) {
      if ($(this).parent().is(".active")) {
        close_panel_dropdown();
      } else {
        close_panel_dropdown();
        $(this).parent().addClass("active");
        $(".fs-inner-container.content").addClass("faded-out");
      }

      e.preventDefault();
    });

    // Apply / Close buttons
    $(".panel-buttons button,.panel-buttons span.panel-cancel").on(
      "click",
      function (e) {
        $(".panel-dropdown").removeClass("active");
        $(".fs-inner-container.content").removeClass("faded-out");
      }
    );

    var $inputRange = $('input[type="range"].distance-radius');

    $inputRange.rangeslider({
      polyfill: false,
      onInit: function () {
        var radiustext = $(".distance-radius").attr("data-title");
        this.output = $('<div class="range-output" />')
          .insertBefore(this.$range)
          .html(this.$element.val())
          .after('<i class="data-radius-title">' + radiustext + "</i>");

        // $('.range-output')
      },
      onSlide: function (position, value) {
        this.output.html(value);
      },
    });

    var $inputBudgetRange = $('input[type="range"].budget-radius');

    $inputBudgetRange.rangeslider({
      polyfill: false,
      onInit: function () {
        var radiustext = $(".budget-radius").attr("data-title");
        this.output = $('<div class="budget-range-output" />')
          .insertBefore(this.$range)
          .html(this.$element.val());

        // $('.range-output')
      },
      onSlide: function (position, value) {
        this.output.html(value);
      },
    });

    $(".sidebar .panel-disable").on("click", function (e) {
      var to = $(".sidebar .range-slider");
      var enable = $(this).data("enable");
      var disable = $(this).data("disable");
      to.toggleClass("disabled");
      if (to.hasClass("disabled")) {
        $(to).find("input").prop("disabled", true);
        $(this).html(enable);
      } else {
        $(to).find("input").prop("disabled", false);
        $(this).html(disable);
      }
      $inputRange.rangeslider("update");
    });

    //disable radius in panels

    //disable radius in sidebar
    if (listeo_core.radius_state == "disabled") {
      $(".sidebar .panel-disable").each(function (index) {
        var enable = $(this).data("enable");
        $(".sidebar .range-slider")
          .toggleClass("disabled")
          .find("input")
          .prop("disabled", true);
        $inputRange.rangeslider("update");
        $(this).html(enable);
      });
      $(".panel-buttons span.panel-disable").each(function (index) {
        var to = $(this).parent().parent();
        var enable = $(this).data("enable");
        var disable = $(this).data("disable");
        to.toggleClass("disabled");
        if (to.hasClass("disabled")) {
          $(to).find("input").prop("disabled", true);
          $(this).html(enable);
        } else {
          $(to).find("input").prop("disabled", false);
          $(this).html(disable);
        }
        $inputRange.rangeslider("update");
      });
    }

    $(".panel-buttons span.panel-disable").on("click", function (e) {
      var to = $(this).parent().parent();
      var enable = $(this).data("enable");
      var disable = $(this).data("disable");
      to.toggleClass("disabled");
      if (to.hasClass("disabled")) {
        $(to).find("input").prop("disabled", true);
        $(this).html(enable);
      } else {
        $(to).find("input").prop("disabled", false);
        $(this).html(disable);
      }
      $inputRange.rangeslider("update");
    });

    // Closes dropdown on click outside the conatainer
    var mouse_is_inside = false;

    $(".panel-dropdown").hover(
      function () {
        mouse_is_inside = true;
      },
      function () {
        mouse_is_inside = false;
      }
    );

    $("body").mouseup(function () {
      if (!mouse_is_inside) close_panel_dropdown();
    });

    // "All" checkbox
    $(".checkboxes.categories input").on("change", function () {
      if ($(this).hasClass("all")) {
        $(this).parents(".checkboxes").find("input").prop("checked", false);
        $(this).prop("checked", true);
      } else {
        $(".checkboxes input.all").prop("checked", false);
      }
    });

    var panelDropdowns = $(".panel-dropdown");

    // Check initial state of checkboxes within each .panel-dropdown
    panelDropdowns.each(function () {
      var panelDropdown = $(this);
      var checkboxes = panelDropdown.find('input[type="checkbox"]');

      // Check if any checkbox is initially checked
      var isAnyCheckboxChecked = checkboxes.is(":checked");

      // Add 'selected' class if any checkbox is checked
      if (isAnyCheckboxChecked) {
        panelDropdown.addClass("preselected");
      }
    });
    $(document).on(
      "change",
      ".panel-dropdown input,.panel-dropdown select",
      function (e) {
        var panelDropdowns = $(".panel-dropdown");

        // Check initial state of checkboxes within each .panel-dropdown
        panelDropdowns.each(function () {
          var panelDropdown = $(this);
          var checkboxes = panelDropdown.find('input[type="checkbox"]');

          // Check if any checkbox is initially checked
          var isAnyCheckboxChecked = checkboxes.is(":checked");

          // Add 'selected' class if any checkbox is checked
          if (isAnyCheckboxChecked) {
            panelDropdown.addClass("preselected");
          } else {
            panelDropdown.removeClass("preselected");
          }

          var select = panelDropdown.find("select option");
          var isAnySelectSelected;
          // for each option in select
          select.each(function () {
            var option = $(this);
            // if option is selected
            if (option.is(":selected")) {
              // add selected class
              if (option.val() != "0") {
                isAnySelectSelected = true;
              }
            }
          });

          if (isAnySelectSelected) {
            panelDropdown.addClass("preselected");
          } else {
            panelDropdown.removeClass("preselected");
          }
        });
      }
    );
    /*--------------------------------------------------*/
    /*  Bootstrap Range Slider
	/*--------------------------------------------------*/

    // Thousand Separator for Tooltip
    function ThousandSeparator(nStr) {
      nStr += "";
      var x = nStr.split(".");
      var x1 = x[0];
      var x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    }

    // Bootstrap Range Slider
    var currencyAttr = $(".bootstrap-range-slider").attr(
      "data-slider-currency"
    );

    $(".bootstrap-range-slider").slider({
      formatter: function (value) {
        if (listeo_core.currency_position == "before") {
          return (
            currencyAttr +
            " " +
            ThousandSeparator(parseFloat(value[0])) +
            " - " +
            ThousandSeparator(parseFloat(value[1]))
          );
        } else {
          return (
            ThousandSeparator(parseFloat(value[0])) +
            " - " +
            ThousandSeparator(parseFloat(value[1])) +
            " " +
            currencyAttr
          );
        }
      },
    });

    if (!$(".range-slider-container").hasClass("no-to-disable")) {
      $(".bootstrap-range-slider")
        .slider("disable")
        .prop("disabled", true)
        .toggleClass("disabled");
    } else {
      var dis = $(".slider-disable").data("disable");
      $(".slider-disable").html(dis);
    }

    $('.range-slider-container:not(".no-to-disable")').toggleClass("disabled");

    $(".slider-disable").click(function () {
      var to = $(".range-slider-container");
      var enable = $(this).data("enable");
      var disable = $(this).data("disable");
      to.toggleClass("disabled");
      if (to.hasClass("disabled")) {
        $(".bootstrap-range-slider").slider("disable");
        $(to).find("input").prop("disabled", true);
        $(this).html(enable);
      } else {
        $(".bootstrap-range-slider").slider("enable");
        $(to).find("input").prop("disabled", false);
        $(this).html(disable);
      }
    });

    /*----------------------------------------------------*/
    /*  Show More Button
    /*----------------------------------------------------*/
    $(".show-more-button").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active");

      $(".show-more").toggleClass("visible");
      if ($(".show-more").is(".visible")) {
        var el = $(".show-more"),
          curHeight = el.height(),
          autoHeight = el.css("height", "auto").height();
        el.height(curHeight).animate({ height: autoHeight }, 400);
      } else {
        $(".show-more").animate({ height: "450px" }, 400);
      }
    });

    $(".simple-slider-form-inner .filter-tab").on("click", function (e) {
      e.preventDefault();
      var type = $(this).data("type");
      $("#search-listing-type").remove();
      if (type) {
        $("#listeo_core-search-form").prepend(
          '<input type="hidden" id="search-listing-type" name="_listing_type" value="' +
            type +
            '">'
        );
      }
    });

    /*----------------------------------------------------*/
    /* Listing Page Nav
	/*----------------------------------------------------*/

    //  	$(window).on('resize load', function() {
    // 	var winWidth = $(window).width();
    // 	if (winWidth<992) {
    // 		$('.mobile-sidebar-container').insertBefore('.mobile-content-container');
    // 	} else {
    // 		$('.mobile-sidebar-container').insertAfter('.mobile-content-container');
    // 	}
    // });

    if (document.getElementById("listing-nav") !== null) {
      $(window).scroll(function () {
        var window_top = $(window).scrollTop();
        var div_top =
          $(".listing-nav")
            .not(".listing-nav-container.cloned .listing-nav")
            .offset().top + 90;
        if (window_top > div_top) {
          $(".listing-nav-container.cloned").addClass("stick");
        } else {
          $(".listing-nav-container.cloned").removeClass("stick");
        }
      });
    }
    var widgetList = document.querySelectorAll(".elementor-widget");
    var navListTop = document.querySelector(".listing-nav-container.cloned");

    var navList = document.querySelector(
      ".elementor-widget-container #nav-list-dynamic"
    );

    widgetList.forEach(function (widget, index) {
      //check if widget has inside div with class elementor-widget-container
      if (widget.querySelector(".listing-gallery")) {
      }

      var id = widget.getAttribute("data-id");
      switch (widget.getAttribute("data-widget_type")) {
        //           listeo-listing-pricing-menu.default
        //listeo-listing-taxonomy-checkboxes.default
        //listeo-listing-video.default<a href="#listing-pricing-list">Pricing</a>
        case "listeo-listing-gallery.default":
          if (widget.querySelector(".listing-slider-small")) {
            var widgetTitle = listeo_core.elementor_single_gallery;
            var href = "elementor-element-" + id;
            $(".elementor-element-" + id).attr("id", href);
            break;
          }

          break;
        case "listeo-listing-custom-fields.default":
          var widgetTitle = listeo_core.elementor_single_details;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;

        case "listeo-listing-pricing-menu.default":
          var widgetTitle = listeo_core.elementor_single_pricing;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;

        case "listeo-listing-store.default":
          var widgetTitle = listeo_core.elementor_single_store;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;

        case "listeo-listing-video.default":
          // chec if widget has video
          if (widget.querySelector(".responsive-iframe")) {
            var widgetTitle = listeo_core.elementor_single_video;
            var href = "elementor-element-" + id;
            $(".elementor-element-" + id).attr("id", href);
          }
          break;
        case "listeo-listing-location.default":
          var widgetTitle = listeo_core.elementor_single_location;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;
        case "listeo-listing-faq.default":
          var widgetTitle = listeo_core.elementor_single_faq;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;
        case "listeo-listing-reviews.default":
          var widgetTitle = listeo_core.elementor_single_reviews;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;
        case "listeo-listing-map.default":
          var widgetTitle = listeo_core.elementor_single_map;
          var href = "elementor-element-" + id;
          $(".elementor-element-" + id).attr("id", href);
          break;

        // default:
        //   var widgetTitle = "Widget " + (index + 1);
        //   break;
      }
      if (widgetTitle) {
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#" + href;
        link.textContent = widgetTitle;
        listItem.appendChild(link);
        if (
          widget.getAttribute("data-widget_type") ==
          "theme-post-content.default"
        ) {
          $(".nav-listing-overview").html(link);
        } else {
          if (navList) {
            navList.appendChild(listItem);
          }
        }
      }
    });

    $(".listing-nav-container")
      .clone(true)
      .addClass("cloned")
      .prependTo("body");

    // Smooth scrolling using scrollto.js
    $(document).on(
      "click",
      ".listing-nav a, a.listing-address, .star-rating a",
      function (e) {
        if (this.hash !== "") {
          try {
            // Check if the target element exists
            const targetElement = $(this.hash);

            if (targetElement.length && targetElement.offset()) {
              e.preventDefault();

              // Ensure element is visible and has dimensions
              const offset = targetElement.offset();
              if (offset && typeof offset.top !== "undefined") {
                // Scroll to the target element
                $("html, body").animate(
                  {
                    scrollTop: offset.top - 20,
                  },
                  800
                );
              }
            }
          } catch (error) {
            console.log("Scroll error:", error);
            // Allow default behavior if there's an error
          }
        }
      }
    );

    $(document).on(
      "click",
      ".listing-nav li:first-child a, a.add-review-btn, a[href='#add-review']",
      function (e) {
        e.preventDefault();

        $("html,body").scrollTo(this.hash, this.hash, { gap: { y: -100 } });
      }
    );

    // Highlighting functionality.
    $(window).on("load resize", function () {
      var aChildren = $(".listing-nav li").children();
      var aArray = [];
      for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr("href");
        aArray.push(ahref);
      }

      $(window).scroll(function () {
        var windowPos = $(window).scrollTop();
        for (var i = 0; i < aArray.length; i++) {
          var theID = aArray[i];
          if ($(theID).length > 0) {
            var divPos = $(theID).offset().top - 150;
            var divHeight = $(theID).height();
            if (windowPos >= divPos && windowPos < divPos + divHeight) {
              $("a[href='" + theID + "']").addClass("active");
            } else {
              $("a[href='" + theID + "']").removeClass("active");
            }
          }
        }
      });
    });

    // dynamic listing for Elementor widget

    var time24 = false;

    if (listeo_core.clockformat) {
      time24 = true;
    }
    $(".listeo-flatpickr").flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: time24,
      disableMobile: true,
    });

    $(".day_hours_reset").on("click", function (e) {
      $(this).parent().parent().find("input").val("");
    });

    /*----------------------------------------------------*/
    /*  Payment Accordion
	/*----------------------------------------------------*/
    var radios = document.querySelectorAll(".payment-tab-trigger > input");

    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener("change", expandAccordion);
    }

    function expandAccordion(event) {
      var allTabs = document.querySelectorAll(".payment-tab");
      for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("payment-tab-active");
      }
      event.target.parentNode.parentNode.classList.add("payment-tab-active");
    }

    //     /*----------------------------------------------------*/
    /*  Rating Overview Background Colors
    /*----------------------------------------------------*/
    function ratingOverview(ratingElem) {
      $(ratingElem).each(function () {
        var dataRating = $(this).attr("data-rating");

        // Rules
        if (dataRating >= 4.0) {
          $(this).addClass("high");
          $(this)
            .find(".rating-bars-rating-inner")
            .css({ width: (dataRating / 5) * 100 + "%" });
        } else if (dataRating >= 3.0) {
          $(this).addClass("mid");
          $(this)
            .find(".rating-bars-rating-inner")
            .css({ width: (dataRating / 5) * 80 + "%" });
        } else if (dataRating < 3.0) {
          $(this).addClass("low");
          $(this)
            .find(".rating-bars-rating-inner")
            .css({ width: (dataRating / 5) * 60 + "%" });
        }
      });
    }
    ratingOverview(".rating-bars-rating");

    $(window).on("resize", function () {
      ratingOverview(".rating-bars-rating");
    });

    /*----------------------------------------------------*/
    /*  Recaptcha Holder
    /*----------------------------------------------------*/
    $(".message-vendor").on("click", function () {
      $(".captcha-holder").addClass("visible");
    });

    if (listeo_core.map_provider == "google") {
      $(".show-map-button").on("click", function (event) {
        event.preventDefault();
        $(".hide-map-on-mobile").toggleClass("map-active");
        var text_enabled = $(this).data("enabled");
        var text_disabled = $(this).data("disabled");
        if ($(".hide-map-on-mobile").hasClass("map-active")) {
          $(this).text(text_disabled);
          //$( '#listeo-listings-container' ).triggerHandler('show_map');
        } else {
          $(this).text(text_enabled);
        }
      });
    }
    $(window).on("load resize", function () {
      $(".full-page-map-container.map-fixed").addClass("hide-map-on-mobile");
      $(".fs-inner-container.map-fixed").addClass("hide-map-on-mobile");
      $("#map-container").addClass("hide-map-on-mobile");
    });

    // Mobile Map Collapsible Functionality
    function initMobileMapCollapsible() {
      var $mapContainer = $('#map-container');
      var $body = $('body');
      
      // Remove loading class
      $body.removeClass('mobile-map-collapsible-loading');
      
      // Clean up previous initialization
      $mapContainer.removeClass('mobile-map-collapsible expanded');
      $body.removeClass('mobile-map-collapsible-active');
      $('.mobile-map-toggle-btn, .mobile-map-collapse-btn').remove();
      $mapContainer.off('click.mobileMap click.mobileMapCollapse click.mobileMapPrevent');
      $(document).off('click.mobileMapToggle click.mobileMapCollapse');
      
      // Check if mobile map collapsible is enabled via customizer
      if (typeof listeo !== 'undefined' && listeo.mobile_map_collapsible === 'collapsible') {
        // Only apply on mobile devices (768px and below)
        if ($(window).width() <= 768) {
          if ($mapContainer.length) {
            $body.addClass('mobile-map-collapsible-active');
            // Set initial collapsed state immediately to prevent flash
            $mapContainer.addClass('mobile-map-collapsible');
            
            // Add toggle button overlay
            var showMapText = (typeof listeo !== 'undefined' && listeo.mobile_map_show_text) ? listeo.mobile_map_show_text : 'Show Map ';
            var toggleBtn = '<div class="mobile-map-toggle-btn">' + showMapText + '</div>';
            $mapContainer.append(toggleBtn);
            
            // Add collapse button
            var collapseBtn = '<div class="mobile-map-collapse-btn"><i class="fas fa-chevron-up"></i></div>';
            $mapContainer.append(collapseBtn);
            
            // Toggle button click handler - use direct element binding to prevent conflicts
            $(document).on('click.mobileMapToggle', '#map-container .mobile-map-toggle-btn', function(e) {
              e.preventDefault();
              e.stopPropagation();
              $('#map-container').addClass('expanded');
              $(this).fadeOut(200);
              
              // Simple map reinitialization after 300ms
              setTimeout(function() {
                if (typeof window.map !== 'undefined' && window.map && window.map.invalidateSize) {
                  window.map.invalidateSize();
                }
              }, 300);
            });
            
            // Collapse button click handler - use direct element binding to prevent conflicts
            $(document).on('click.mobileMapCollapse', '#map-container .mobile-map-collapse-btn', function(e) {
              e.preventDefault();
              e.stopPropagation();
              $('#map-container').removeClass('expanded');
              $('.mobile-map-toggle-btn').fadeIn(200);
            });
            
            // Prevent map interaction when collapsed - only for map elements, not buttons
            $mapContainer.on('click.mobileMapPrevent', function(e) {
              // Don't trigger if clicking on button elements or if already expanded
              if ($mapContainer.hasClass('expanded') || 
                  $(e.target).hasClass('mobile-map-toggle-btn') || 
                  $(e.target).hasClass('mobile-map-collapse-btn') ||
                  $(e.target).closest('.mobile-map-toggle-btn, .mobile-map-collapse-btn').length > 0) {
                return;
              }
              
              e.preventDefault();
              e.stopPropagation();
              $mapContainer.addClass('expanded');
              $('.mobile-map-toggle-btn').fadeOut(200);
            });
          }
        }
      }
      
      // Handle hidden option
      if (typeof listeo !== 'undefined' && listeo.mobile_map_collapsible === 'hidden') {
        if ($(window).width() <= 768) {
          $mapContainer.hide();
        } else {
          $mapContainer.show();
        }
      } else if (typeof listeo !== 'undefined' && listeo.mobile_map_collapsible === 'default') {
        $mapContainer.show();
      }
    }

    // Initialize on document ready and window resize
    $(document).ready(function() {
      initMobileMapCollapsible();
    });
    
    // Also initialize as early as possible to prevent flash
    $(function() {
      initMobileMapCollapsible();
    });
    
    // Debounced resize handler
    var resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        initMobileMapCollapsible();
      }, 250);
    });

    /*----------------------------------------------------*/
    /*  Ratings Script
/*----------------------------------------------------*/

    /*  Numerical Script
/*--------------------------*/
    $(".numerical-rating").numericalRating();

    $(".star-rating").starRating();
    // ------------------ End Document ------------------ //

    /**
     * Initializes sticky sidebar functionality on single listing pages.
     *
     * @requires jQuery
     * @listens window.resize
     * @listens window.load
     * @listens window.scroll.stickySidebar
     */
    function initStickySidebar() {
      jQuery(document).ready(function ($) {
        var sidebar = $(".listeo-single-listing-sidebar");
        var stickyWrapper = $(".sticky-wrapper");
        var content = $(".listeo-single-listing-content");

        if (!sidebar.length || !stickyWrapper.length || !content.length) return; // Exit if elements don't exist

        // Only initialize if the outer height of .sticky-wrapper is greater than the sidebar's height
        if (stickyWrapper.outerHeight() <= sidebar.outerHeight()) return;

        var sidebarContainer = sidebar.get(0); // Native DOM element for sidebar
        var lastScrollTop = $(window).scrollTop(); // Track last scroll position

        function updateStickySidebarState() {
          if ($(window).width() >= 1020) {
            sidebar.addClass("sticky-sidebar-enabled");
          } else {
            sidebar.removeClass("sticky-sidebar-enabled");
          }
        }

        // Run on load and resize
        $(window).on("resize load", updateStickySidebarState);

        // After full page load, check distance between #footer and sidebar
        $(window).on("load", function () {
          var footer = $("#footer");
          if (!footer.length) return;
          var footerTop = footer.offset().top;
          var sidebarBottom = sidebar.offset().top + sidebar.outerHeight();
          if (footerTop - sidebarBottom < 300) {
            sidebar.addClass("overflow-enabled");
            // Scroll the overflow-enabled container to the bottom
            sidebar.scrollTop(sidebar.prop("scrollHeight"));
          }
        });

        $(window).on("scroll.stickySidebar", function () {
          if (!sidebar.hasClass("sticky-sidebar-enabled")) return; // Run sticky logic only when enabled

          var scrollTop = $(window).scrollTop();
          var stickyWrapperHeight = stickyWrapper.outerHeight();
          var stickyOffset = stickyWrapper.offset().top - scrollTop + 200; // Distance from top
          var contentBottom = content.offset().top + content.outerHeight(); // Bottom of content
          var windowBottom = scrollTop + $(window).height(); // Bottom of viewport

          if (stickyOffset <= 0 && windowBottom < contentBottom) {
            // Enable scrolling and add 'overflow-enabled' class
            sidebar.addClass("overflow-enabled");
            var scrollDiff = scrollTop - lastScrollTop;
            sidebarContainer.scrollTop += scrollDiff;
          } else if (scrollTop < lastScrollTop && stickyOffset > 0) {
            // Remove class when scrolling UP past sticky-wrapper
            sidebar.removeClass("overflow-enabled");
          }

          if (windowBottom >= contentBottom) {
            // Stop script when reaching end of content
            return;
          }

          lastScrollTop = scrollTop; // Update last scroll position
        });
      });
    }

    function checkAndInitStickySidebar() {
      var sidebar = $(".listeo-single-listing-sidebar");
      var stickyWrapper = $(".sticky-wrapper");

      // Only initialize if sticky-wrapper is at least 500px higher than the sidebar.
      if (stickyWrapper.outerHeight() >= sidebar.outerHeight() + 500) {
        initStickySidebar();
      } else {
        sidebar.removeClass("sticky-sidebar-enabled");
      }
    }

    jQuery(document).ready(function ($) {
      checkAndInitStickySidebar();
    });

    /*--------------------------------------------------*/
    /*  Full Page Jobs Scripts
  /*--------------------------------------------------*/
    // Sliding Sidebar
    $(".enable-filters-button").on("click", function () {
      $(".full-page-sidebar").toggleClass("enabled-sidebar");
      $(".enable-filters-button").toggleClass("active");
      $(".filter-button-tooltip").removeClass("tooltip-visible");
    });

    // Sticky Filter
    $(".full-page-content-container").scroll(function () {
      if ($(this).scrollTop() >= 240) {
        $(".sticky-filter-button").addClass("btn-visible");
      } else {
        $(".sticky-filter-button").removeClass("btn-visible");
      }
    });

    //  Enable Filters Button Tooltip
    $(window).on("load", function () {
      $(".filter-button-tooltip")
        .css({
          left: $(".enable-filters-button").outerWidth() + 60,
        })
        .addClass("tooltip-visible");
    });
  });
})(this.jQuery);

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
//!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

/*!
 * zeynepjs v2.2.0
 * A light-weight multi-level jQuery side menu plugin.
 * It's fully customizable and is compatible with modern browsers such as Google Chrome, Mozilla Firefox, Safari, Edge and Internet Explorer
 * MIT License
 * by Huseyin ELMAS
 */
!(function (l, s) {
  var n = { htmlClass: !0 };
  function i(e, t) {
    (this.element = e),
      (this.eventController = o),
      (this.options = l.extend({}, n, t)),
      (this.options.initialized = !1),
      this.init();
  }
  (i.prototype.init = function () {
    var s = this.element,
      e = this.options,
      i = this.eventController.bind(this);
    !0 !== e.initialized &&
      (i("loading"),
      s.find("[data-submenu]").on("click", function (e) {
        e.preventDefault();
        var t,
          n = l(this).attr("data-submenu"),
          o = l("#" + n);
        o.length &&
          (i("opening", (t = { subMenu: !0, menuId: n })),
          s.find(".submenu.current").removeClass("current"),
          o.addClass("opened current"),
          s.hasClass("submenu-opened") || s.addClass("submenu-opened"),
          s[0].scrollTo({ top: 0 }),
          i("opened", t));
      }),
      s.find("[data-submenu-close]").on("click", function (e) {
        e.preventDefault();
        var t,
          n = l(this).attr("data-submenu-close"),
          o = l("#" + n);
        o.length &&
          (i("closing", (t = { subMenu: !0, menuId: n })),
          o.removeClass("opened current"),
          s.find(".submenu.opened").last().addClass("current"),
          s.find(".submenu.opened").length || s.removeClass("submenu-opened"),
          o[0].scrollTo({ top: 0 }),
          i("closed", t));
      }),
      i("load"),
      this.options.htmlClass &&
        !l("html").hasClass("zeynep-initialized") &&
        l("html").addClass("zeynep-initialized"),
      (e.initialized = !0));
  }),
    (i.prototype.open = function () {
      this.eventController("opening", { subMenu: !1 }),
        this.element.addClass("opened"),
        this.options.htmlClass && l("html").addClass("zeynep-opened"),
        this.eventController("opened", { subMenu: !1 });
    }),
    (i.prototype.close = function (e) {
      e || this.eventController("closing", { subMenu: !1 }),
        this.element.removeClass("opened"),
        this.options.htmlClass && l("html").removeClass("zeynep-opened"),
        e || this.eventController("closed", { subMenu: !1 });
    }),
    (i.prototype.destroy = function () {
      this.eventController("destroying"),
        this.close(!0),
        this.element.find(".submenu.opened").removeClass("opened"),
        this.element.removeData(s),
        this.eventController("destroyed"),
        (this.options = n),
        this.options.htmlClass && l("html").removeClass("zeynep-initialized"),
        delete this.element,
        delete this.options,
        delete this.eventController;
    }),
    (i.prototype.on = function (e, t) {
      r.call(this, e, t);
    });
  var o = function (e, t) {
      if (this.options[e]) {
        if ("function" != typeof this.options[e])
          throw Error("event handler must be a function: " + e);
        this.options[e].call(this, this.element, this.options, t);
      }
    },
    r = function (e, t) {
      if ("string" != typeof e)
        throw Error(
          "event name is expected to be a string but got: " + typeof e
        );
      if ("function" != typeof t)
        throw Error("event handler is not a function for: " + e);
      this.options[e] = t;
    };
  l.fn[s] = function (e) {
    var t, n, o;
    return (
      (t = l(this[0])),
      (n = e),
      (o = null),
      t.data(s) ? (o = t.data(s)) : ((o = new i(t, n || {})), t.data(s, o)),
      o
    );
  };
})(window.jQuery || window.cash, "zeynep");
//# sourceMappingURL=zeynep.min.js.map


 document.addEventListener("DOMContentLoaded", function () {
   const passwordInputs = document.querySelectorAll('input[type="password"]');

   passwordInputs.forEach((passwordInput) => {
     // Wrap input in a relative container
     const wrapper = document.createElement("div");
     passwordInput.parentNode.insertBefore(wrapper, passwordInput);
     wrapper.appendChild(passwordInput);

     // Style input so it doesn't overlap with icon
     passwordInput.style.paddingRight = "35px";

     // Create the toggle icon
     const toggleIcon = document.createElement("i");
     toggleIcon.className = "fa-solid fa-eye";
     toggleIcon.style.position = "absolute";
     toggleIcon.style.top = "51%";
     toggleIcon.style.right = "18px";
     toggleIcon.style.left = "initial";
     toggleIcon.style.transform = "translateY(-50%)";
     toggleIcon.style.cursor = "pointer";
     toggleIcon.style.fontSize = "16px";
     toggleIcon.setAttribute("aria-hidden", "true");

     wrapper.appendChild(toggleIcon);

     // Toggle visibility
     toggleIcon.addEventListener("click", function () {
       const isPassword = passwordInput.type === "password";
       passwordInput.type = isPassword ? "text" : "password";
       toggleIcon.className = isPassword
         ? "fa-solid fa-eye-slash"
         : "fa-solid fa-eye";
     });
   });
 });