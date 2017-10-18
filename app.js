// Adtoox Javascript Test

// feel free to add more functions and/or files
// to structure your code as needed.

/**
 * @param {Object} resources - slideshow resources.
 * @param {{mp4:string, webm:string}} resources.video - video resource, webm and mp4 urls provided.
 * @param {string[]} resources.images - image resources, png urls
 * @param {string} resources.targetUrl - target url for slideshow click
 */

function startApp(resources) {
	let main = createContainer('main-content');
	let c1 = createContainer('big-slide');
	let c2 = createContainer('small-slide');
	let c3 = createContainer('small-slide');
	
	main.appendChild(c1);
	main.appendChild(c2);
	main.appendChild(c3);
	document.body.append(main);

	let slideSources = resources.images;
	slideSources.push(resources.video.mp4 + ';'+ resources.video.webm);
	let slideshowComplete = function(){console.log('Complete');}
	let slideShowClick = function(){window.open(resources.targetUrl, '_blank');}
	
	
	let opts = {
		transition: 'fade',
		sources: slideSources,
		interval: 2000,
		loop: false,
		onClick: slideShowClick
	}
	let opts2 = {
		transition: 'fade',
		sources: slideSources,
		interval: 1500,
		loop: true,
		ignoreNotLoaded: true,
		onClick: slideShowClick
	}
	let opts3 = {
		transition: 'fade',
		sources: slideSources,
		interval: 3500,
		loop: false,
		ensureAllLoaded: true,
		onClick: slideShowClick
	}
	
	let ss1 = new SimpleSlideShow.SlideShow(c1, opts, slideshowComplete);
	let ss2 = new SimpleSlideShow.SlideShow(c2, opts2);
	let ss3 = new SimpleSlideShow.SlideShow(c3, opts3, slideshowComplete);
	
}

var createContainer = function(className) {
	let c = document.createElement('div');
	c.className = className;
	return c;
}
