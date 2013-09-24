/*
 * jQuery CSlide; v20130923
 * http://compojoom.com
 * Copyright (c) 2013 Yves Hoppe; License: GPL v2 or later
 */

(function( $ ) {

    var version = "20130924";
    var debug = 1;

    $.fn.cslide = function( options ) {

        var settings = $.extend({
            // Default settings - see API instructions
            delay:                      8000, // Delay between every image
            autoplay:                      1, // Automatically start the slideshow
            loop:                          1, // Should the slideshow looped or stopped after all slides are shown
            pauseOnHover:                  1, // Should the slideshow stopped on mouse over?
            speed:                      1000, // Speed of the animation / effect
            startingSlide:                 1, // Set the number on which the slideshow should start (beginning on 0)
            slides:                    'img', // Set the slide elements, normally img, but you can also use links, divs etc
            fx:                       'fade', // Set the effect / animation for the slide, please notice that depending on effect you also need to load jquery-ui
            captionContainer:             '', // Container (normally a div) for the counter (e.g. 2 / 4) - Can be outside of the slideshow too, e.g. #myslide-counter (optional)
            textContainer:                '', // Text-Container (normally a div) - Can also be outside of the slideshow! (optional)
                                              // (Optional, if you have a data-cslide-title on the slide we will display it in an automatically created div on the slide)
            titleContainer:               '', // Same like Text-Container
            nextButton:                   '', // Id of the next button (optional)
            prevButton:                   '', // Id of the prev button (optional)
            pauseButton:                  '', // Id of the pause button (optional)
            playButton:                   '', // Id of the play button (optional)
            linkTitle:                     1, // Link title (if link exists)
            autosize:                      1, // Auto resizing of the image (only images!)
            loadCSS:                       1  // Loads the default css or for the slideshow (you can also supply it yourself)
        }, options );

        var holder = $.extend({
            // Holder for initialized objects
            container: null,
            slides: null,
            nextbutton: null,
            prevbutton: null,
            pausebutton: null,
            playbutton: null,
            textcont: null,
            titlecont: null,
            slideCount: 0,
            current: 0,
            instNr: 0,
            text: 0,
            title: 0
        });

        var API = $.extend({
            // Slideshow API
            log: function(msg) { $.fn.cslide.log(msg) },

            // Initializes the slideshow
            initshow: function(container) {
                var api = this;

                this.log("Initialising slideshow");
                holder.container = container;
                holder.slideCount = holder.slides.length;
                this.log("Number of slides " + this.slideCount);

                holder.current = settings.startingSlide;

                // Initialize nav buttons
                if ( settings.nextButton != '') {
                    this.log("Nav Buttons initialized");

                    // Initialize the button
                    holder.nextbutton = $( settings.nextButton );

                    holder.nextbutton.css("z-index", "1002"); // Bring to front

                    holder.nextbutton.click(function(event){
                        api.next();
                        event.preventDefault(); // Prevent browser event
                    });
                }

                if ( settings.prevButton != '') {
                    holder.prevbutton = $( settings.prevButton );
                    holder.prevbutton.css("z-index", "1002"); // Bring to front
                    holder.prevbutton.click(function(event){
                        api.prev();
                        event.preventDefault(); // Prevent browser event
                    });
                }

                // Initialize text / title container if applied
                if ( settings.textContainer != "" ) {
                    this.log("Separate text container initialized");
                    holder.textcont = $( settings.textContainer );
                }

                if ( settings.titleContainer != "" ) {
                    this.log("Separate title container initialized");
                    holder.titlecont = $( settings.titleContainer );
                }

                if ( settings.playButton != "") {
                    holder.playbutton = $( settings.playButton );
                    holder.playbutton.on("click", function() {
                        this.play();
                    });
                }

                if ( settings.pauseButton != "") {
                    holder.pausebutton = $( settings.pauseButton );
                    holder.pausebutton.on("click", function() {
                        this.pause();
                    });
                }

                this.setCaption();
            },

            // Switches to the next slide (including caption & title)
            next: function() {
                var curSlide = holder.slides[holder.current];
                this.log("Going to next Slide - current: " + holder.current);
                holder.current++;

                // Goto first image
                if(holder.current >= holder.slideCount) {
                    if(settings.loop == 0) {
                        // Stop sliding
                        holder.nextbutton.hide();
                        return;
                    }
                    holder.current = 0;
                }

                var nextslide = $( holder.slides[holder.current] );

                nextslide.parent(".cslide_element").show();

                var curslide = $( curSlide );
                  // Bring again to foreground and then send it back
                curslide.parent(".cslide_element").css("z-index", 1001).hide(settings.fx, settings.speed, function() { $( this ).css("z-index", 900)});

                this.setCaption();

                if(settings.textContainer != "") {
                    this.setSlideText(nextslide.attr("data-cslide-text"));
                }

                if(settings.titleContainer != "") {
                    this.setSlideTitle(nextslide.attr("data-cslide-title"));
                }
            },

            // Switches to the prev slide (including caption & title)
            prev: function() {
                var curSlide = holder.slides[holder.current];
                this.log("Going to prev Slide - current: " + holder.current);

                holder.current--;

                // Goto last image
                if(holder.current == -1) {
                    if(settings.loop == 0) {
                        // Stop sliding
                        holder.prevButton.hide();
                        return;
                    }
                    holder.current = holder.slideCount - 1;
                }

                var prevSlide = holder.slides[this.current];
                var prevslide = $( prevSlide );
                prevslide.parent(".cslide_element").show();

                var curslide = $( curSlide );
                // Bring again to foreground and then send it back
                curslide.parent(".cslide_element").css("z-index", 1001).hide(settings.fx, settings.speed, function() { $( this ).css("z-index", 900)});

                this.setCaption();

                if(settings.textContainer != "") {
                    this.setSlideText(prevslide.attr("data-cslide-text"));
                }

                if(settings.titleContainer != "") {
                    this.setSlideTitle(prevslide.attr("data-cslide-title"));
                }
            },

            // Pauses (destroys the interval) the slideshow
            pause: function() {
                this.log("Pausing slideshow " + holder.instNr);
                window.clearInterval(holder.instNr);
            },

            // Starts the slideshow
            play: function() {
                var ct = this;
                holder.instNr = setInterval(
                    function(){ct.next()}, settings.delay
                );
                this.log("Starting on instance " + holder.instNr);
            },

            // Sets the caption
            setCaption: function() {
                if(settings.captionContainer != '') {
                    $(settings.captionContainer).text( (holder.current + 1) + " / " + holder.slideCount);
                }
            },

            // Set the title (for separate container)
            setSlideTitle: function(title) {
                this.log("Settings title " + title);
                holder.titlecont.html(title);
            },

            // Sets the text (for separate container)
            setSlideText: function(text) {
                 this.log("Settings text " + text);
                 holder.textcont.html(text);
            }
        });

        // Support multiple Slideshows
        return this.each(function(){
            var container = this;
            var log = $.fn.cslide.log;

            log('-- cSlide init --');
            log($.fn.cslide.version())
            log('Preparing Container');

            // Prepare the slideshow container
            $( container ).wrapInner("<div class='cslide_inner'></div>");

            var innerContainer = $( container ).children(".cslide_inner").first();
            innerContainer.css({"position": "relative"}); // Set inner container position relative

            var zIndex = 990;
            holder.slides = $( this ).find(settings.slides);

            holder.slides.each(function(){
                 // Single slideshow item
                var slide = $( this );

                var stitle = this.getAttribute("data-cslide-title");
                var stext = this.getAttribute("data-cslide-text");

                var contWidth = $( container ).outerWidth(true);
                var contHeight = $( container).outerHeight(true);

                if(settings.autosize) {
                    // Set Element img dimensions (according to slideshow size)
                    if(settings.slides != 'img') {
                        // Find img
                        slide.find('img').innerWidth(contWidth).innerHeight(contHeight);
                    } else {
                        // Resize element itself
                        slide.innerWidth(contWidth).innerHeight(contHeight);
                    }
                }

                slide.wrap('<div class="cslide_element"></div>');

                // We wrap an div element around it (not manupilating the users object directly)
                var cele = slide.parent(".cslide_element");

                cele.css( "position", "absolute" );
                cele.css( "top", "0" );
                cele.css( "left", "0" );
                cele.css( "z-index", zIndex);
                cele.hide();

                // Auto generate a container for the title (in the wrapping div)
                if(settings.titleContainer == "" && stitle != "") {
                    slide.after('<div class="cslide_title">'
                        + '<h3>'
                        + stitle
                        + '</h3>'
                        + '</div>');
                    holder.title = 1;
                } else if (stitle != "") {
                    holder.title = 1;
                }

                // Auto generate a container for the title (in the wrapping div)
                if(settings.textContainer == "" && stext != "") {
                    slide.after('<div class="cslide_text">'
                        + stext
                        + '</div>');
                    holder.text = 1;
                } else if (stext != "") {
                    holder.text = 1;
                }

                zIndex--;

                if(settings.pauseOnHover) {
                    cele.on("mouseenter", function() { API.pause(); });
                    cele.on("mouseleave", function() { API.play(); });
                }
            });

            holder.slides.eq( settings.startingSlide ).parent(".cslide_element").show();

            API.initshow(container);

            // Load css for the generated title / caption div
            if (settings.loadCSS == 1) {
                if (holder.title == 1 && settings.titleContainer == "") {
                    $.fn.cslide.CSS("title");
                }

                if (holder.text == 1 && settings.textContainer == "") {
                    $.fn.cslide.CSS("text");
                }
            }

            // Start playing if autoplay = 1
            if(settings.autoplay == 1) {
                API.play();
            }
        });
    };

    // Logging to console
    $.fn.cslide.log = function log() {
        if (window.console && console.log && debug == 1 )
            console.log('[cslide] ' + Array.prototype.join.call(arguments, ' ') );
    }

    // Version
    $.fn.cslide.version = function() { return 'CSlide: ' + version; };

}( jQuery ));