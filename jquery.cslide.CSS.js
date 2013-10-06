/*
 * jQuery CSlide; v20131006
 * http://compojoom.com
 * Copyright (c) 2013 Yves Hoppe; License: GPL v2 or later
 */

(function( $ ) {

    var version = "20131006";

    $.fn.cslide.CSS = function( name, options ) {

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

        if(name == "preview") {

            var styles = {
                position: "relative",
                float: "right",
                background: options.previewBackground,
                width: options.previewSize,
                overflow: "hidden"
            };

            var stylesInner = {

            }

            var stylesElement = {
                width:  options.previewSize - 14,
                height: options.previewThumbHeight,
                overflow: "hidden",
                border: "2px solid #000",
                margin: "4px 5px"
            }

            $(".cslide_preview").css(styles);
            $(".cslide_preview_inner").css(stylesInner);
            $(".cslide_preview_element").css(stylesElement);
        }

        return this;
    }

}( jQuery ));