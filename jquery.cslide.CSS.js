/*
 * jQuery CSlide; v20130923
 * http://compojoom.com
 * Copyright (c) 2013 Yves Hoppe; License: GPL v2 or later
 */

(function( $ ) {

    var version = "20130923";

    $.fn.cslide.CSS = function( name ) {

        // Text Element
        if (name === "title") {
            var styles = {
                position: "absolute",
                top: "70%",
                right: "20%",
                background: "#111",
                padding: "0 20px",
                "border-radius": "10px",
                opacity: "0.85",
                color: "#fff"
            };

            $(".cslide_title").css(styles);
        }

        if(name === "text") {
            var styles = {
                position: "absolute",
                top: "50%",
                left: "10%",
                background: "#111",
                padding: "10px 20px",
                opacity: "0.85",
                "margin-top": "-100px",
                height: "180px",
                width: "300px",
                "border-radius": "10px",
                color: "#fff"
            };

            $(".cslide_text").css(styles);
            $(".cslides_text").children("p").css("opacity", "1");
        }

        return this;
    }

}( jQuery ));