# simple-slideshow

Slideshow component that can display image and video content. No external dependencies

## Useage 

```
include <script type="text/javascript" src="simple-slideshow.js"></script>

var slideshow = new SimpleSlideShow.SlideShow(HTMLElement, SlideshowOptions, Callback);

```

## Options

    transition: string          ** 'fade', 'drop'
    sources: string[]; 
                                -Sources should be an array of urls to images and or webcompatible video. 
                                For each source string you can also add a fallback src, which will be added as an 'alt' attribute
                                in case of images, and as a fallback 'src' element in video. Add fallback with delimiter ';'
                                ie;
                                    [
                                        "img1.png",
                                        "flower.gif;A nice flower",
                                        "video1.webm;video1.mp4",
                                        "smiley.jpg"
                                    ]
    
    autostart: boolean          ** Start slideshow as soon as first source/all sources loaded
    loop: boolean;              ** Loop on complete. This does not trigger callback
    interval: number;           ** Slide interval. Is overriden on any slide containing video.
    ignoreNotLoaded: boolean;   ** If next slide is not loaded, skip and proceed to next.
    ensureAllLoaded: boolean;   ** If autostart is set to true, this waits for all slides loaded before starting, instead of just first.
    onClick: Function;          ** Slideshow click event.

