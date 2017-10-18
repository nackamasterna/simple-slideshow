import {Slide} from './slide';

export class ImgSlide extends Slide {
    constructor(index: number, src: string, transition: string) {
        super(index, src, transition);
        this.tagName = 'img';
        super._init();
        this.defineSources();
    }

    defineSources() {
        super.defineSources();
        this.content.src = this.primarySrc;
        this.content.alt = this.fallbackSrc;
    }

}