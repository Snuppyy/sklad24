// JavaScript Document
jQuery(document).ready(function (e) {
   jQuery(".main_menu .mob_menu").click(function () {
      if (jQuery(".main_menu").hasClass("open")) {
         jQuery(".main_menu").removeClass("open");
         jQuery(".main_menu .menu").stop().fadeTo(300, 0).slideUp(0);
      } else {
         jQuery(".main_menu").addClass("open");
         jQuery(".main_menu .menu").stop().slideDown(0).fadeTo(300, 1);
      }
   });
   jQuery(".main_menu .menu a").click(function () {
      var obj = jQuery(this).attr("href");
      jQuery(".main_menu").removeClass("open");
      jQuery(".main_menu .menu").stop().fadeTo(300, 0).slideUp(0);
      jQuery("body, html").animate({ "scrollTop": jQuery(obj).offset().top - jQuery("#head").outerHeight() }, 1000);
      return false;
   });

   function head_pos() {
      if (jQuery(window).scrollTop() > 10) {
         jQuery("#head").addClass("fixed");
      } else {
         jQuery("#head").removeClass("fixed");
      }
   }
   head_pos();
   jQuery(window).scroll(function (e) {
      head_pos();
      if (jQuery(window).scrollTop() > 200) {
         jQuery(".scroll_top").addClass("vis");
      } else {
         jQuery(".scroll_top").removeClass("vis");
      }
   });
   if (jQuery(window).scrollTop() > 200) {
      jQuery(".scroll_top").addClass("vis");
   } else {
      jQuery(".scroll_top").removeClass("vis");
   }
   jQuery(".scroll_top").click(function (e) {
      jQuery("html, body").animate({ "scrollTop": 0 }, 1000);
      return false;
   });

   var today = new Date();
   if (today.getMonth() == 0) {
      jQuery('.sect_action h2 .month').text("января");
   } else if (today.getMonth() == 1) {
      jQuery('.sect_action h2 .month').text("февраля");
   } else if (today.getMonth() == 2) {
      jQuery('.sect_action h2 .month').text("марта");
   } else if (today.getMonth() == 3) {
      jQuery('.sect_action h2 .month').text("апреля");
   } else if (today.getMonth() == 4) {
      jQuery('.sect_action h2 .month').text("мая");
   } else if (today.getMonth() == 5) {
      jQuery('.sect_action h2 .month').text("июня");
   } else if (today.getMonth() == 6) {
      jQuery('.sect_action h2 .month').text("июля");
   } else if (today.getMonth() == 7) {
      jQuery('.sect_action h2 .month').text("августа");
   } else if (today.getMonth() == 8) {
      jQuery('.sect_action h2 .month').text("сентября");
   } else if (today.getMonth() == 9) {
      jQuery('.sect_action h2 .month').text("октября");
   } else if (today.getMonth() == 10) {
      jQuery('.sect_action h2 .month').text("ноября");
   } else if (today.getMonth() == 11) {
      jQuery('.sect_action h2 .month').text("декабря");
   }

   jQuery.fn.myTabs = function (tab_block) {
      var tab = jQuery(this);
      tab.find("a").click(function () {
         var ind = jQuery(this).parent().index();
         tab.children(".act").removeClass("act");
         jQuery(this).parent("li").addClass("act");
         tab_block.children(".vis").removeClass("vis");
         tab_block.children("li").eq(ind).addClass("vis");
      });
   };
   jQuery(".view_tab").myTabs(jQuery(".view_tab_bl"));
   jQuery(".popup_view .view_tab_bl .img_sm a").click(function () {
      var ind = jQuery(this).parent().index();
      jQuery(this).parents(".img_sm").find(".act").removeClass("act");
      jQuery(this).parent("li").addClass("act");
      jQuery(this).parents(".img_bl").find(".img_big .vis").removeClass("vis");
      jQuery(this).parents(".img_bl").find(".img_big li").eq(ind).addClass("vis");
   });


   jQuery("[data-fancybox]").fancybox({
      buttons: [
         'close'
      ],
      loop: true
   });


   jQuery(".scroll_to").click(function (e) {
      var obj = jQuery(this).attr("href");
      jQuery("html, body").animate({ "scrollTop": jQuery(obj).offset().top - 75 }, 1200);
      return false;
   });

   jQuery(".popup_open").click(function () {
      var h = jQuery("#site").height();
      var obj = ".popup_wrapper>." + jQuery(this).attr("popup");
      jQuery(".popup_bg").css({ "display": "block", "height": h }).animate({ opacity: 1 }, 200);
      jQuery(obj).css({ "display": "block" });
      var ih = jQuery(window).innerHeight();
      var wh = jQuery(obj).outerHeight();
      var wt = (ih - wh) / 2;
      var st = jQuery(document).scrollTop();
      if (wt < 0) { wt = 0 };
      wt = wt + st;
      jQuery(obj).css({ "top": wt }).animate({ opacity: 1 }, 200);
      if (jQuery(this).attr("popup") == "popup_view") {
         jQuery(".popup_view .view_tab li").eq(jQuery(this).data("ind")).children("a").click();
      }
      return false;
   });
   jQuery(".popup_close").click(function () {
      jQuery(this).parents("li").animate({ opacity: 0 }, 200).hide(0);
      jQuery(".popup_bg").animate({ opacity: 0 }, 200).hide(0);
   });
   jQuery(".popup_bg").click(function () {
      jQuery(".popup_wrapper>li").animate({ opacity: 0 }, 200).hide(0);
      jQuery(".popup_bg").animate({ opacity: 0 }, 200).hide(0);
   });

   jQuery("input[type='text'],input[type='email'],input[type='tel'],input[type='password'], textarea").focusin(function (e) {
      jQuery(this).addClass("clean");
   });
   jQuery("input[type='text'],input[type='email'],input[type='tel'],input[type='password'], textarea").focusout(function (e) {
      jQuery(this).removeClass("clean");
   });

   // part of code moved to «theme--form-validation.js»

   function form_send(form) {
      var msg = form.serialize();
      var hasEmpty = false;
      $(form).find('input').each(function () {
         if ($(this).prop('required')) {
            !$(this).val() ? $(this).addClass('t') : $(this).removeClass('t');
            hasEmpty = hasEmpty || !$(this).val();
         }
      });
      $(form).find('textarea').each(function () {
         if ($(this).prop('required')) {
            !$(this).val() ? $(this).addClass('t') : $(this).removeClass('t');
            hasEmpty = hasEmpty || !$(this).val();
         }
      });
      if (!hasEmpty) {
         jQuery.ajax({
            type: 'POST',
            url: 'include/send.php',
            data: msg,
            success: function (data) {
               console.log(data);
               jQuery(".popup_wrapper>li").animate({ opacity: 0 }, 0).hide(0);
               var h = jQuery("#site").height();
               var obj = ".popup_wrapper>.popup_thanks";
               jQuery(".popup_bg").css({ "display": "block", "height": h }).animate({ opacity: 1 }, 200);
               jQuery(obj).css({ "display": "block" });
               var ih = jQuery(window).innerHeight();
               var wh = jQuery(obj).outerHeight();
               var wt = (ih - wh) / 2;
               var st = jQuery(document).scrollTop();
               if (wt < 0) { wt = 0 };
               wt = wt + st;
               jQuery(obj).css({ "top": wt }).animate({ opacity: 1 }, 200);
               $(form).trigger('reset');
            },
            error: function (xhr, str) {
               alert('Возникла ошибка: ' + xhr.responseCode);
            }
         });
      }
   }
   jQuery("[type='submit']").click(function (e) {
      e.preventDefault();
      form_send(jQuery(this).parents("form"));
   });
});