jQuery("input[type='tel']").inputmask({
alias: "phonemy",
});

jQuery("#popup_call_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#popup_prop_form").validate({
  rules: {
    name: "required",
    tel: "required",
    text: "required",
  }
});
jQuery("#popup_order_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#top_order_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#cons_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#calc_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#smaller_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#quest_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery("#one_click_form").validate({
  rules: {
    tel: "required",
  }
});
jQuery(".popup_view form").each(function(index, element) {
      jQuery(this).validate({
    rules: {
      tel: "required",
    }
  });
});
