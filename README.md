JQuery CSlide
======

Simple and highly customizable JQuery slideshow currently in Alpha stage

Getting started
-----------------------

Download the production version or development version. Include jQuery:

`<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>`

Depending on which fx effect you want to use, you also need jQuery ui!

Next create a slideshow (normal HTML markup:)

&lt;div id=&quot;myslideshow&quot;&gt;

    &lt;img src=&quot;s1.jpg&quot; /&gt;

    &lt;img src=&quot;s2.jpg&quot; /&gt;

    &lt;img src=&quot;s3.jpg&quot; /&gt;

&lt;/div&gt;

Now we have to initialize the slideshow:

&lt;script&gt;

jQuery( document ).ready(function() {

    jQuery(&quot;myslideshow&quot;).cslide({

        // your custom settings

    });

});

&lt;/script&gt;

If you want to use titles or text you just extend the image with some cslide attributes (you can also use html there, but don't break the quotes).

*For example*:

&lt;img src=&quot;s1.jpg&quot; data-cslide-text=&quot;&lt;p&gt;My custom test&lt;/p&gt;&quot; data-cslide-title=&quot;My custom title&quot; data-cslide-link=&quot;http://compojoom.com&quot; /&gt;


You can style the elements pretty easy with css (or use the default javascript css generator).

.cslide_inner (generated div Container around all elements, position is relative)
.cslide_element (div Container which is created around every element, position is absolute)
.cslide_text (div Container inside cslide_element which holds the text, only created if no textContainer is supplied and a title attribute exists)
.cslide_title (div Container inside cslide_element which holds the title, only created if no titleContainer is supplied and a title attribute exists)

Settings
-----------------------

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


Documentation, Demo and more
----------------------------------

This is going to follow soon - If you have any questions just drop me a line.


Copyright and License
----------------------------------

Copyright (C) 2013 Yves Hoppe

The plugin is licensed under the GPL v2 license.