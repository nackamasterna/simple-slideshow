import {SlideShowEvents} from '../types/events';
import {SourceTypes} from '../types/common';
import {ISlide} from './slide';
import {ImgSlide} from './img-slide';
import {VideoSlide} from './video-slide';

export class SlideLoader {
    private slideShow: HTMLElement;
    private imgTypes: string[] =['png', 'jpg', 'gif', 'jpeg', 'bmp'];
    private videoTypes: string[] =['webm', 'mp4', 'ogv'];
    private slides: ISlide[];

    constructor(slideshow: HTMLElement) {
        this.slideShow = slideshow
        this.slides = [];
        this.slideShow.addEventListener('slide-loaded', this._onSlideLoaded, false);    
    }

    private _loadSlideSrc = (src: string, t: string, i: number) => {
        let srcExt = src.split('.').pop();
        switch (this._srcType(srcExt)) {
            case SourceTypes.SOURCE_TYPE_IMG:
                this.slides.push(new ImgSlide(i, src, t))
                break;
            case SourceTypes.SOURCE_TYPE_VIDEO:
                this.slides.push(new VideoSlide(i, src, t))
                break;
            default:
                console.error('SimpleSlideShow::Source type unsupported, not loaded: ', src);
                break;
        }
    }

    private _onSlideLoaded = (e) => {
        if (e.detail.index === this.slides[0].index) { 
            this.slideShow.dispatchEvent(SlideShowEvents.firstLoaded());
        }
        if (this.slides.every((s) => s.loaded)) {
            this.slideShow.dispatchEvent(SlideShowEvents.allLoaded());
        }
    }

    private _srcType = (ext: string) : SourceTypes => {
        if (this.imgTypes.indexOf(ext) !== -1) { return SourceTypes.SOURCE_TYPE_IMG; }
        if (this.videoTypes.indexOf(ext) !== -1) { return SourceTypes.SOURCE_TYPE_VIDEO; }
        return SourceTypes.SOURCE_UNSUPPORTED;
    }

    public load = (sources: string[], transition: string) : ISlide[] => {
        sources.forEach((src, index) => {
            this._loadSlideSrc(src, transition, index);
        })
        return this.slides;
    }

}