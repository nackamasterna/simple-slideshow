(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SimpleSlideShow", [], factory);
	else if(typeof exports === 'object')
		exports["SimpleSlideShow"] = factory();
	else
		root["SimpleSlideShow"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SlideShowEvents;
(function (SlideShowEvents) {
    SlideShowEvents.slideLoaded = function (i, src) {
        return new CustomEvent("slide-loaded", {
            detail: {
                message: "SLIDE:: loaded",
                index: i,
                src: src
            },
            bubbles: true,
            cancelable: true
        });
    };
    SlideShowEvents.firstLoaded = function () {
        return new CustomEvent("first-loaded", {
            detail: {
                message: "LOADER:: first-loaded",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
    };
    SlideShowEvents.allLoaded = function () {
        return new CustomEvent("all-loaded", {
            detail: {
                message: "LOADER:: all-loaded",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
    };
})(SlideShowEvents = exports.SlideShowEvents || (exports.SlideShowEvents = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var Slide = /** @class */ (function () {
    function Slide(index, src, transition) {
        this.loaded = false;
        this.index = index;
        this.src = src;
        this.transition = transition;
    }
    Slide.prototype._init = function () {
        this.container = document.createElement('div');
        //this.container.classList.add(this.transition);
        this.content = document.createElement(this.tagName);
        this.container.appendChild(this.content);
        this.bindEvents();
    };
    Slide.prototype.bindEvents = function () {
        var _this = this;
        this.content.onerror = function () { _this.loaded = false; };
        this.content.onabort = function () { _this.loaded = false; };
        this.content.onload = function () { _this.setLoaded(); };
    };
    Slide.prototype.setLoaded = function () {
        this.loaded = true;
        this.container.dispatchEvent(events_1.SlideShowEvents.slideLoaded(this.index, this.src));
    };
    Slide.prototype.defineSources = function () {
        this.srcArray = this.src.split(';');
        this.primarySrc = this.srcArray[0];
        this.fallbackSrc = this.srcArray[1] || '';
    };
    Slide.prototype.in = function () {
        this.container.classList.add(this.transition);
    };
    Slide.prototype.out = function () {
        this.container.classList.remove(this.transition);
    };
    return Slide;
}());
exports.Slide = Slide;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var slide_loader_1 = __webpack_require__(4);
var SSS_CLASS_NAME = 'simple-slideshow';
var SlideShow = /** @class */ (function () {
    function SlideShow(element, opts, callback) {
        var _this = this;
        this.interval = function (x) {
            _this.wait = x > 0 ? x : _this.opts.interval;
            return _this.wait;
        };
        this.stop = function () {
            _this.next = 0;
            _this.running = false;
        };
        this.start = function () {
            _this.running = true;
            _this._run();
        };
        this.pause = function () { _this.running = false; };
        this._init = function () {
            _this._bindEvents();
            _this._loadSlides(_this.opts.sources);
            _this.slides[_this.next].in();
            _this.wait = _this.opts.interval;
            _this._cue();
        };
        this._bindEvents = function () {
            _this.slideshow.addEventListener('first-loaded', _this._onFirstLoaded, false);
            _this.slideshow.addEventListener('all-loaded', _this._onAllLoaded, false);
            _this.parent.addEventListener('click', function () { _this.opts.onClick(); });
        };
        this._loadSlides = function (sources) {
            _this.slides = _this.loader.load(sources, _this.opts.transition);
            _this.slides.forEach(function (s) {
                _this.slideshow.appendChild(s.container);
            });
            _this.parent.appendChild(_this.slideshow);
        };
        this._onFirstLoaded = function (e) {
            if (!_this.opts.ensureAllLoaded) {
                _this.start();
            }
        };
        this._onAllLoaded = function () {
            if (!_this.running) {
                _this.start();
            }
            ;
        };
        this._slide = function () {
            _this.slides[_this.curr].out();
            _this.slides[_this.next].in();
            _this.interval(_this.slides[_this.next].duration);
            _this._cue();
        };
        this._cue = function () {
            _this.curr = _this.next;
            _this._setNext();
        };
        this._setNext = function () {
            _this.next++;
            if (_this.next >= _this.slides.length) {
                _this.opts.loop ? _this.next = 0 : _this.stop();
            }
            if (_this.opts.ignoreNotLoaded && !_this.slides[_this.next].loaded) {
                window.setTimeout(function () { _this._setNext(); }, 100);
            }
        };
        this._onCompleted = function () {
            if (_this.callback) {
                window.setTimeout(function () { _this.callback(); }, _this.wait);
            }
        };
        this._run = function () {
            window.setTimeout(function () {
                if (_this.slides[_this.next].loaded || _this.opts.ignoreNotLoaded) {
                    _this._slide();
                }
                _this.running ? _this._run() : _this._onCompleted();
            }, _this.wait);
        };
        this.parent = element;
        this.opts = opts;
        this.callback = callback;
        this.slideshow = document.createElement('div');
        this.slideshow.className = SSS_CLASS_NAME;
        this.loader = new slide_loader_1.SlideLoader(this.slideshow);
        this.next = 0;
        this._init();
    }
    return SlideShow;
}());
exports.SlideShow = SlideShow;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var common_1 = __webpack_require__(5);
var img_slide_1 = __webpack_require__(6);
var video_slide_1 = __webpack_require__(7);
var SlideLoader = /** @class */ (function () {
    function SlideLoader(slideshow) {
        var _this = this;
        this.imgTypes = ['png', 'jpg', 'gif', 'jpeg', 'bmp'];
        this.videoTypes = ['webm', 'mp4', 'ogv'];
        this._loadSlideSrc = function (src, t, i) {
            var srcExt = src.split('.').pop();
            switch (_this._srcType(srcExt)) {
                case common_1.SourceTypes.SOURCE_TYPE_IMG:
                    _this.slides.push(new img_slide_1.ImgSlide(i, src, t));
                    break;
                case common_1.SourceTypes.SOURCE_TYPE_VIDEO:
                    _this.slides.push(new video_slide_1.VideoSlide(i, src, t));
                    break;
                default:
                    console.error('SimpleSlideShow::Source type unsupported: ', src);
                    break;
            }
        };
        this._onSlideLoaded = function (e) {
            if (e.detail.index === _this.slides[0].index) {
                _this.slideShow.dispatchEvent(events_1.SlideShowEvents.firstLoaded());
            }
            if (_this.slides.every(function (s) { return s.loaded; })) {
                _this.slideShow.dispatchEvent(events_1.SlideShowEvents.allLoaded());
            }
        };
        this._srcType = function (ext) {
            if (_this.imgTypes.indexOf(ext) !== -1) {
                return common_1.SourceTypes.SOURCE_TYPE_IMG;
            }
            if (_this.videoTypes.indexOf(ext) !== -1) {
                return common_1.SourceTypes.SOURCE_TYPE_VIDEO;
            }
            return common_1.SourceTypes.SOURCE_UNSUPPORTED;
        };
        this.load = function (sources, transition) {
            sources.forEach(function (src, index) {
                _this._loadSlideSrc(src, transition, index);
            });
            return _this.slides;
        };
        this.slideShow = slideshow;
        this.slides = [];
        this.slideShow.addEventListener('slide-loaded', this._onSlideLoaded, false);
    }
    return SlideLoader;
}());
exports.SlideLoader = SlideLoader;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SourceTypes;
(function (SourceTypes) {
    SourceTypes[SourceTypes["SOURCE_TYPE_IMG"] = 0] = "SOURCE_TYPE_IMG";
    SourceTypes[SourceTypes["SOURCE_TYPE_VIDEO"] = 1] = "SOURCE_TYPE_VIDEO";
    SourceTypes[SourceTypes["SOURCE_UNSUPPORTED"] = 2] = "SOURCE_UNSUPPORTED";
})(SourceTypes = exports.SourceTypes || (exports.SourceTypes = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var slide_1 = __webpack_require__(1);
var ImgSlide = /** @class */ (function (_super) {
    __extends(ImgSlide, _super);
    function ImgSlide(index, src, transition) {
        var _this = _super.call(this, index, src, transition) || this;
        _this.tagName = 'img';
        _super.prototype._init.call(_this);
        _this.defineSources();
        return _this;
    }
    ImgSlide.prototype.defineSources = function () {
        _super.prototype.defineSources.call(this);
        this.content.src = this.primarySrc;
        this.content.alt = this.fallbackSrc;
    };
    return ImgSlide;
}(slide_1.Slide));
exports.ImgSlide = ImgSlide;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var slide_1 = __webpack_require__(1);
var VideoSlide = /** @class */ (function (_super) {
    __extends(VideoSlide, _super);
    function VideoSlide(index, src, transition) {
        var _this = _super.call(this, index, src, transition) || this;
        _this.tagName = 'video';
        _super.prototype._init.call(_this);
        _this.defineSources();
        return _this;
    }
    VideoSlide.prototype.bindEvents = function () {
        var _this = this;
        this.content.onloadeddata = function () {
            _super.prototype.setLoaded.call(_this);
            _this.duration = _this.content.duration * 1000;
        };
        _super.prototype.bindEvents.call(this);
    };
    VideoSlide.prototype.defineSources = function () {
        var _this = this;
        _super.prototype.defineSources.call(this);
        this.srcArray.forEach(function (src) {
            var el = document.createElement('source');
            el.src = src;
            _this.content.appendChild(el);
        });
    };
    VideoSlide.prototype.in = function () {
        _super.prototype.in.call(this);
        this.content.play();
    };
    return VideoSlide;
}(slide_1.Slide));
exports.VideoSlide = VideoSlide;


/***/ })
/******/ ]);
});