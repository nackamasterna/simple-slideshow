export type SlideshowOptions = {
    transition: string
    sources: string[];
    autostart: boolean;
    loop: boolean;
    interval: number;
    ignoreNotLoaded: boolean;
    ensureAllLoaded: boolean;
    onClick: Function;
}

export enum SourceTypes {
    SOURCE_TYPE_IMG,
    SOURCE_TYPE_VIDEO,
    SOURCE_UNSUPPORTED
}
