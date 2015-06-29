/**
 * @author Sam Gleske
 * @created 06/06/2008
 * @dependency mootools-release-1.11.js
 */

//global variables to be used by the dynamic page loader/transitions
var content,ajax,current_page;


/**
 * Function: init()
 * Description: Runs when page is loaded.  Initializes global variables and sets up the page loading/transitions/styles
 * Arguments:
 * 		none
 */
function init(){
	randomQuote();
	setInterval("randomQuote()",10000);
	content = new Fx.Slide('container');
	
	//write in span tags in the menu links so custom underline colors are available (compatibility for future templates)
	$('mainmenu').getElements('a').each(function(el){
		el.innerHTML='<span>'+el.innerHTML+'</span>';
	});
	
	//attach an event to each menu link to use dynamic page loading and the scrolling transition
	/*$('mainmenu').getElements('a').addEvents({
		'click': function(e){
			getPage(this.href);
			this.blur();
			e.preventDefault();
		}
	});*/
	getPage("start.html");
}

/**
 * Function: getPage()
 * Description: Uses AJAX and page transitions to load web pages.  If the function is called twice for the same page then it simply scrolls to the content instead of loading the page all over again.
 * Arguments:
 * 		url			= string; Internet URL to the page to be loaded (can be full domain path or a link relational to index.html)
 * 		override	= bool; Overrides the default action of only scrolling to content and forces loading of the page
 */
function getPage(url,override){
	if(override)
		javascript:alert("Script Debug: override has been set.\n\nNOTE: This is for debugging purposes.  If you see this message and the page you clicked on doesn't load then please contact me.  Otherwise just ignore this message.  It's purpose is to report a rare occurance that happens in my code for unknown reasons.  I have implemented a fix to catch this which this message is part of to alert you that the fix has been executed.  Other than this alert message the page should load like it would if you didn't see it.  As soon as I see this message and confirm the fix works then this alert will be removed.  Sorry if this is annoying.");
	
	//If the page has been loaded then don't bother reloading it but scroll to it unless the override is set.
	if(url==current_page && !override)
	{
		scrollToContent();
		return;
	}
	else
		current_page=url;
	ajax = new Ajax(url, {
			method: 'get',
			update: $('content'),
			onComplete: function() {
				//start_hack: this is to make sure that content is loaded.  For whatever reason it isn't reliable so this hack is necessary
				if($('content').innerHTML=='')
					return getPage(url,true);
				//endof_hack
				content.hide();
				content.slideIn();
				setTimeout("scrollToContent()",550);
			}
		});
	ajax.cancel();
	if(content.open)
		content.slideOut();
	setTimeout("content.hide();ajax.request()",550);
}

/**
 * Function: scrollToContent()
 * Description: Scrolls to the active page content when called.
 * Arguments:
 * 		none
 */
function scrollToContent(){
	var scroll = new Fx.Scroll(window, {
			wait: false,
			duration: 1000,
			transition: Fx.Transitions.Quad.easeInOut
		});
	scroll.toElement('content');
}

/**
 * Function: randomQuote()
 * Description: Generates a random quote from a list of pre-defined quotes and loads it into the banner on the front page.
 * Arguments:
 * 		none
 */
function randomQuote()
{
	var Quotes = new Array();
	
	//These are my favorite things to say/quote
	Quotes[0]="Change is inevitable, and those who adapt most quickly are most likely to survive.";
	Quotes[1]="My take on life: to each his own";
	Quotes[2]="Even though, Sir, I do not agree with what you say... I will defend to the death your right to say it.";
	Quotes[3]="Heheheheehehhehee, YEA Peter Griffin.......";
	Quotes[4]="Tonight, on the 'Q'. Giggedy Gee, Giggedy Goo.";
	Quotes[5]="If I had h-r-t, I could add 'u' and get hurt or add 'e-a' and get a heart but I would rather add 'u' and get hurt than have a heart without u!";
	Quotes[6]="What lies behind us and what lies before us are tiny matters compared to what lies within us.";
	
	//load a random quote into the page
	$('banner_text').innerHTML='"'+Quotes[Math.floor(Quotes.length*Math.random())]+'"';
}

onload=init;