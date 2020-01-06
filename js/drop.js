    jQuery(function() {
        jQuery("#accordion").accordion({ header: "h3", collapsible: true, active: false, heightStyle: "content", autoHeight: false });
    });
    jQuery('.sectiondropdown').click(function() {
        jQuery("i", this).toggleClass("fa-caret-up fa-caret-down");
    });