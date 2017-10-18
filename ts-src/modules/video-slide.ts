import {Slide} from './slide';

export class VideoSlide extends Slide {
    constructor(index: number, src: string, transition: string) {
        super(index, src, transition);
        this.tagName = 'video';
        super._init();
        this.defineSources();
    }

    bindEvents(): void {
        this.content.onloadeddata = () => {
            super.setLoaded();
            this.duration = this.content.duration * 1000;
        }
        super.bindEvents();        
    }

    defineSources(): void {
        super.defineSources();
        this.srcArray.forEach(src => {
            let el = document.createElement('source');
            el.src = src;
            this.content.appendChild(el);
        });
    }

    in(): void {
        super.in();
        this.content.play();
    }

}