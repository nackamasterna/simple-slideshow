import {SlideshowOptions} from './types/common';
import {SlideLoader} from './modules/slide-loader';
import {ISlide} from './modules/slide';

const SSS_CLASS_NAME: string = 'simple-slideshow';

export class SlideShow {
    private running: boolean;
    private opts: SlideshowOptions;
    private callback: Function;
    private next: number;
    private curr: number;
    private slideshow: HTMLDivElement;
    private slides: ISlide[];
    private wait: number;
    private loader: SlideLoader;
    private parent: HTMLElement;
    
    constructor(element, opts, callback) {
		this.parent = element;
        this.opts = opts;
        this.callback = callback;
        this.slideshow = document.createElement('div');
        this.slideshow.className = SSS_CLASS_NAME;
        this.loader = new SlideLoader(this.slideshow);
        this.next = 0;                
        this._init();
    }
    
    public interval = (x?: number) => {
        this.wait = x > 0 ? x : this.opts.interval;
        return this.wait;
    }

    public stop = () => {
        this.next = 0;
        this.running = false;
    }

    public start = () => { 
        this.running = true;
        this._run();        
    }

    public pause = () => { this.running = false }

	private _init = () => {
        this._bindEvents();
        this._loadSlides(this.opts.sources);
        this.slides[this.next].in();        
        this.wait = this.opts.interval;
        this._cue();        
    };

    private _bindEvents = () => {
        this.slideshow.addEventListener('first-loaded', this._onFirstLoaded, false);
        this.slideshow.addEventListener('all-loaded', this._onAllLoaded, false);
        this.parent.addEventListener('click', () => { this.opts.onClick() });
    }
    
    private _loadSlides = (sources: string[]) => {
        this.slides = this.loader.load(sources, this.opts.transition);
        this.slides.forEach((s) => {
            this.slideshow.appendChild(s.container);
        });
        this.parent.appendChild(this.slideshow);
    }

    private _onFirstLoaded = (e) => {
        if (!this.opts.ensureAllLoaded) { this.start() }   
    }

    private _onAllLoaded = () => {
        if (!this.running) { this.start() };
    }

	private _slide = () => {
        this.slides[this.curr].out();
        this.slides[this.next].in();
        this.interval(this.slides[this.next].duration);
        this._cue();           
    }

	private _cue = () => {
        this.curr = this.next;
		this._setNext();
    }

    private _setNext = () => {
        this.next++;
        if (this.next >= this.slides.length) {
            this.opts.loop ? this.next = 0 : this.stop();
        }
        if (this.opts.ignoreNotLoaded && !this.slides[this.next].loaded) {
            window.setTimeout(() => {this._setNext()}, 100);
        }
    }

    private _onCompleted = () => {
        if (this.callback) {
            window.setTimeout(() => { this.callback() }, this.wait);
        }
    }
    
	private _run = () => {
        window.setTimeout(() => {
            if (this.slides[this.next].loaded || this.opts.ignoreNotLoaded ) {
                this._slide();
            }
            this.running ? this._run() : this._onCompleted(); 
        }, this.wait);
    }
    
}