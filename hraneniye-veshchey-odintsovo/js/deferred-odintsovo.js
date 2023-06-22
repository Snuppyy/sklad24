//////////////////////////////////
// Deferred scripts
//////////////////////////////////
let deferredScriptsLoaded = false;
let deferredFormValidationScriptsLoaded = false;
let thirdPartScriptsLoaded = false;

function loadScript(url, callback = null, defer = false) {
  const script = document.createElement('script');
  script.src = url;
  if (!defer) { script.async = true; } else { script.setAttribute("defer", "defer"); }
  document.body.appendChild(script);

  if (callback) {
    script.onload = function() {
      callback();
    };
  }
}

// PRIORITY
// WOW
if (getWindowWidth() >= 991) {
  loadScript('js/wow.min.js', function() {
    new WOW().init();
  }, true);
}
// /WOW

function deferredScripts() {
  deferredScriptsLoaded = true;

  // Slick
  loadScript('js/slick.min.js', function() {
    jQuery(".gallery_slider").slick({
      arrows: true,
      prevArrow: '<a class="slick-prev"><span></span></a>',
      nextArrow: '<a class="slick-next"><span></span></a>',
      dots: false,
      speed: 300,
      rows: 2,
      slidesPerRow: 1,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
    jQuery('.slider-rent-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      fade: true,
      asNavFor: '.slider-rent-nav'
    });
    jQuery('.slider-rent-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-rent-for',
      infinite: true,
      dots: false,
      arrows: true,
      prevArrow:'<div class="slick-prev"> <img src="img/right-arrow.svg"> </div>',
      nextArrow:'<div class="slick-next"> <img src="img/right-arrow.svg"> </div>',
      centerMode: false,
      focusOnSelect: true,
      variableWidth: true
    });

    jQuery(".comment_slider").slick({
      arrows: true,
      prevArrow: '<a class="slick-prev"><span></span></a>',
      nextArrow: '<a class="slick-next"><span></span></a>',
      dots: false,
      speed: 300,
      fade: true,
    });

    jQuery(".comment_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      jQuery(".comment_slider").find(".comment.open").each(function(index, element) {
        jQuery(this).removeClass("open");
        jQuery(this).find(".more_link").text("Читать отзыв");
        jQuery(this).find(".hide_bl").slideUp(0);
      });
      var video = jQuery(".comment_slider").find(".slick-current .video_bl").html();
      jQuery(".comment_slider").find(".slick-current .video_bl").html("");
      jQuery(".comment_slider").find(".slick-current .video_bl").html(video);
    });

    jQuery(".comment_slider .comment_in .more_link").click(function() {
      if (jQuery(this).parents(".comment").hasClass("open")) {
        jQuery(this).parents(".comment").removeClass("open");
        jQuery(this).text("Читать отзыв");
        jQuery(this).parent(".comment").find(".hide_bl").slideUp(200);
      } else {
        jQuery(this).parents(".comment").addClass("open");
        jQuery(this).text("Скрыть отзыв");
        jQuery(this).parent(".comment").find(".hide_bl").slideDown(200);
      }
      return false;
    });

    jQuery(".compare_slider").slick({
      arrows: true,
      prevArrow: '<a class="slick-prev"><span></span></a>',
      nextArrow: '<a class="slick-next"><span></span></a>',
      dots: false,
      speed: 300,
      fade: true,
    });

    jQuery(".faq_slider").slick({
      arrows: false,
      prevArrow: '<a class="slick-prev"><span></span></a>',
      nextArrow: '<a class="slick-next"><span></span></a>',
      dots: false,
      speed: 0,
      loop: false
    });

    jQuery(".faq_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      jQuery(".faq_wrap .quest_list .act").removeClass("act");
      jQuery(".faq_wrap .quest_list>li").eq(nextSlide).addClass("act");
    });

    jQuery(".faq_wrap .quest_list a").click(function(e) {
      var ind = jQuery(this).parent().index();
      jQuery(".faq_wrap .quest_list .act").removeClass("act");
      jQuery(this).parent().addClass("act");
      jQuery(".faq_slider").slick('slickGoTo', ind);
      if (jQuery("#site").width() < 991) {
        jQuery("body, html").animate({ "scrollTop": jQuery(".answer_bl").offset().top - 70 }, 500);
      }
      return false;
    });
  }, true);
  // /Slick

  // Parallax
  if (getWindowWidth() >= 991) {
    loadScript('js/jquery.parallax.js', function() {
      jQuery(".pickup_parallax").parallax();
      jQuery(".save_parallax").parallax();
      jQuery(".cons_parallax").parallax();
    }, true);
  }
  // /Parallax
}

function deferredFormValidationScripts() {
  deferredFormValidationScriptsLoaded = true;
  // FormValidation
  loadScript('js/jquery.inputmask.bundle.js', function() {
    loadScript('js/inputmask/phone-my.js', function() {
      loadScript('js/jquery.validate.min.js', function() {
        loadScript('js/theme--form-validation.js', function() {}, true);
      }, true);
    }, true);
  }, true);
  // /FormValidation
}


function onPageScrollOnce(evt) {
  if (deferredScriptsLoaded === false) {
    deferredScripts();
  }
  if (deferredFormValidationScriptsLoaded === false) {
    deferredFormValidationScripts();
  }
  
  window.removeEventListener('scroll', onPageScrollOnce);
  document.querySelector('.form').removeEventListener('mouseenter', onFormMouseenter);
}

function onFormMouseenter() {
  deferredFormValidationScripts();
  document.querySelector('.form').removeEventListener('mouseenter', onFormMouseenter);
}
deferredScripts();
deferredFormValidationScripts();
// FLOW
window.addEventListener('scroll', onPageScrollOnce);
document.querySelector('.form').addEventListener('mouseenter', onFormMouseenter);