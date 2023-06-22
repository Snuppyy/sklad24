// JavaScript Document
jQuery(document).ready(function(e) {
	var priceAr = [1500, 2600, 3800, 5500, 9900, 15200];
	
	jQuery(".calc_wrap .mon_slider").slider({
		min:1,
		max:12,
		step:1,
   		create: function() {
        	jQuery(".calc_wrap .slider_bl .lab span").text(jQuery(this).slider("value"));
			jQuery(".calc_wrap .result .mon").text(jQuery(this).slider("value"));
			jQuery(".calc_wrap input[name='month']").val(jQuery(this).slider("value"));
      	},
      	slide: function( event, ui ) {
        	jQuery(".calc_wrap .slider_bl .lab span").text(ui.value);
			jQuery(".calc_wrap .result .mon").text(ui.value);
			jQuery(".calc_wrap input[name='month']").val(ui.value);
			calc();
      	}
    }); 
	
	jQuery(".calc_wrap .type_sel_list a").click(function(e) {
		var ind = jQuery(this).parent().index();
       	jQuery(".calc_wrap .type_sel_list .act").removeClass("act");
	   	jQuery(this).parent("li").addClass("act");
	   	jQuery(".calc_wrap .desc_list .vis").removeClass("vis");
		jQuery(".calc_wrap .desc_list>li").eq(ind).addClass("vis");
		jQuery(".calc_wrap input[name='cont_type']").val(jQuery(this).text());
		calc();
    });
	
	function calc(){
		var cont_type = jQuery(".calc_wrap .type_sel_list .act").index();
		var month = jQuery(".calc_wrap input[name='month']").val();
		var total_pr = priceAr[cont_type]*month;
		var desc_pr;
		if(month>11){
			desc_pr = total_pr*0.9;
			jQuery(".calc_wrap .result .no_descount").addClass("six");
			jQuery(".calc_wrap .result .descount").stop().slideDown(200);
		}else{
			desc_pr = total_pr;
			jQuery(".calc_wrap .result .no_descount").removeClass("six");
			jQuery(".calc_wrap .result .descount").stop().slideUp(200);
		}
		jQuery(".calc_wrap input[name='price']").val(total_pr);
		jQuery(".calc_wrap .result .total").text(total_pr);
		jQuery(".calc_wrap .result .mon_price").text(priceAr[cont_type]);
		jQuery(".calc_wrap .result .desc_price").text(desc_pr);
		jQuery(".calc_wrap input[name='price_desc']").val(desc_pr);
	}
	calc();
});