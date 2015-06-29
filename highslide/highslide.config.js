/**
 * Site-specific configuration settings for Highslide JS
 * Settings initially set up using the Highslide JS Editor and then manually customized
 * 		Highslide JS Editor - http://highslide.com/editor/
 * All JavaScript programmed using:
 * 		Aptana Studio - http://www.aptana.com/
 * 		Notepad++ - http://notepad-plus.sourceforge.net/
 *
 * highslide.config.js overrides highslide-with-gallery.js
 */
hs.graphicsDir = 'highslide/graphics/';
hs.showCredits = false;
hs.creditsPosition = 'below';
hs.outlineType = 'custom';
hs.dimmingOpacity = 0.65;
hs.fadeInOut = true;
hs.align = 'center';
hs.allowMultipleInstances = false;
hs.captionEval = 'this.a.title';
hs.headingEval = '\'Images created using <a href="http://www.gimp.org/" target="_blank" style="cursor:pointer">GIMP</a> and <a href="http://www.inkscape.org/" target="_blank" style="cursor:pointer">Inkscape</a>.\'';
hs.restoreCursor = '';
hs.lang.restoreTitle = 'Click image to view next slide. Click and drag to move. Use arrow keys for next and previous. Click [X] in upper right corner of image to close gallery.';
hs.registerOverlay({
		html: '<div class="closebutton" onclick="return hs.close(this)" title="Close"></div>',
		position: 'top right',
		useOnHtml: true,
		fade: 2 // fading the semi-transparent overlay looks bad in IE
	});
// Add the slideshow controller
hs.addSlideshow({
		slideshowGroup: 'group1',
		interval: 5000,
		repeat: true,
		useControls: true,
		fixedControls: false,
		overlayOptions: {
				className: 'text-controls',
				opacity: '0.75',
				position: 'bottom center',
				offsetX: '0',
				offsetY: '-15',
				relativeTo: 'viewport',
				hideOnMouseOut: false
			},
		thumbstrip: {
				mode: 'vertical',
				position: 'middle right',
				relativeTo: 'viewport'
			}
	});
	
// gallery config object
var config1 = {
		slideshowGroup: 'group1',
		thumbnailId: 'thumb1',
		numberPosition: 'caption',
		transitions: ['expand', 'crossfade']
	};


/**
 * custom functions to overwrite default functions of Highslide JS
 */
//disabled default click action of overlay with the following function
hs.dim = function(exp) {
	if (!hs.dimmer) {
		hs.dimmer = hs.createElement ('div', 
			{ 
				className: 'highslide-dimming',
				owner: '',
				onclick: function() {
						//disabled the default action to close the gallery when dimmed overlay is clicked
						return false;
				}
			}, { 
				position: 'absolute',
				visibility: 'visible',
				left: 0,
				opacity: 0 
			}, hs.container, true);
		hs.addEventListener(window, 'resize', hs.setDimmerSize);
	}
	hs.dimmer.style.display = '';
	hs.setDimmerSize();
	hs.dimmer.owner += '|'+ exp.key;
	if (hs.geckoMac && hs.dimmingGeckoFix) 
		hs.setStyles(hs.dimmer, {
			background: 'url('+ hs.graphicsDir + 'geckodimmer.png)',
			opacity: 1
		});
	else
		hs.animate(hs.dimmer, { opacity: exp.dimmingOpacity }, hs.dimmingDuration);
}


//changed the default action for clicking the image.
//image now goes to next slide instead of closing the gallery.
hs.removeEventListener(document, 'mousedown', hs.mouseClickHandler);
hs.removeEventListener(document, 'mouseup', hs.mouseClickHandler);
hs.mouseClickHandler = function(e) 
{	
	if (!e) e = window.event;
	if (e.button > 1) return true;
	if (!e.target) e.target = e.srcElement;
	
	var el = e.target;
	while (el.parentNode
		&& !(/highslide-(image|move|html|resize)/.test(el.className)))
	{
		el = el.parentNode;
	}
	var exp = hs.getExpander(el);
	if (exp && (exp.isClosing || !exp.isExpanded)) return true;
		
	if (exp && e.type == 'mousedown') {
		if (e.target.form) return true;
		var match = el.className.match(/highslide-(image|move|resize)/);
		if (match) {
			hs.dragArgs = { exp: exp , type: match[1], left: exp.x.pos, width: exp.x.size, top: exp.y.pos, 
				height: exp.y.size, clickX: e.clientX, clickY: e.clientY };
			
			
			hs.addEventListener(document, 'mousemove', hs.dragHandler);
			if (e.preventDefault) e.preventDefault(); // FF
			
			if (/highslide-(image|html)-blur/.test(exp.content.className)) {
				exp.focus();
				hs.hasFocused = true;
			}
			return false;
		}
	} else if (e.type == 'mouseup') {
		
		hs.removeEventListener(document, 'mousemove', hs.dragHandler);
		
		if (hs.dragArgs) {
			if (hs.styleRestoreCursor && hs.dragArgs.type == 'image') 
				hs.dragArgs.exp.content.style.cursor = hs.styleRestoreCursor;
			var hasDragged = hs.dragArgs.hasDragged;
			
			if (!hasDragged &&!hs.hasFocused && !/(move|resize)/.test(hs.dragArgs.type)) {
				//Clicking on the image will now send slideshow to next image instead of closing
				hs.next();
			} 
			else if (hasDragged || (!hasDragged && hs.hasHtmlExpanders)) {
				hs.dragArgs.exp.doShowHide('hidden');
			}
			if (hasDragged) hs.setDimmerSize(exp);
			
			hs.hasFocused = false;
			hs.dragArgs = null;
		
		} else if (/highslide-image-blur/.test(el.className)) {
			el.style.cursor = hs.styleRestoreCursor;		
		}
	}
	return false;
}
hs.addEventListener(document, 'mousedown', hs.mouseClickHandler);
hs.addEventListener(document, 'mouseup', hs.mouseClickHandler);