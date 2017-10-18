export namespace SlideShowEvents {
    
    export const slideLoaded = (i, src) => {
        return new CustomEvent(
            "slide-loaded", 
            {
                detail: {
                    message: "SLIDE:: loaded",
                    index: i,
                    src: src
                },
                bubbles: true,
                cancelable: true
            }
        );
    }

    export const firstLoaded = () => {
        return new CustomEvent(
            "first-loaded", 
            {
                detail: {
                    message: "LOADER:: first-loaded",
                    time: new Date(),
                },
                bubbles: true,
                cancelable: true
            }
        );
    }

    export const allLoaded = () => {
        return new CustomEvent(
            "all-loaded", 
            {
                detail: {
                    message: "LOADER:: all-loaded",
                    time: new Date(),
                },
                bubbles: true,
                cancelable: true
            }
        );
    }
}