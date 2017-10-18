import {SlideShowEvents} from '../types/events';

export interface ISlide {
    container: HTMLElement;
    loaded: boolean;
    index: number;
    duration: number;
    setLoaded(): void;
    defineSources(): void;
    in(): void;
    out(): void;
}

export class Slide implements ISlide {
    protected src: string;
    protected transition: string;
    protected content: any;
    protected tagName: string;
    protected srcArray: string[];
    protected primarySrc: string;
    protected fallbackSrc: string;
    public index: number;
    public loaded: boolean = false;
    public container: HTMLDivElement;    
    public duration: number;
    
    constructor(index: number, src: string, transition: string) {
        this.index = index;
        this.src = src;
        this.transition = transition;
    }

    protected _init(): void {
        this.container = document.createElement('div');
        //this.container.classList.add(this.transition);
        this.content = document.createElement(this.tagName);
        this.container.appendChild(this.content);
        this.bindEvents();
    }

    bindEvents(): void {
        this.content.onerror = () => { this.loaded = false };
        this.content.onabort = () => { this.loaded = false };
        this.content.onload = () => { this.setLoaded() };
    }

    setLoaded(): void {
        this.loaded = true;
        this.container.dispatchEvent(SlideShowEvents.slideLoaded(this.index, this.src));
    }

    defineSources(): void {
        this.srcArray = this.src.split(';');
        this.primarySrc = this.srcArray[0];
        this.fallbackSrc = this.srcArray[1] || '';
    }

    public in(): void {
        this.container.classList.add(this.transition);
    }

    public out(): void {
        this.container.classList.remove(this.transition)
    }

}