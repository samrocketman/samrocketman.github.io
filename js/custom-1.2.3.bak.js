/**
 * @author Sam Gleske
 * @created 06/06/2008
 * @copyright Copyright 2009 Gleske Productions
 * @license The MIT License
 * @dependency mootools-1.2.3-core.js, mootools-1.2.3.1-more.js
 */

//global variables to be used by the dynamic page loader/transitions
var content,ajax,current_page,scroll;

//load init() function when page loads
onload=init;

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
	scroll = new Fx.Scroll(window, {
		wait: false,
		duration: 1000,
		transition: Fx.Transitions.Quad.easeInOut
	});
	
	//write in span tags in the menu links so custom underline colors are available (compatibility for future templates)
	$('mainmenu').getElements('a').each(function(el){
		el.innerHTML='<span>'+el.innerHTML+'</span>';
	});
	
	//attach an event to each menu link to use dynamic page loading and the scrolling transition
	$('mainmenu').getElements('a').addEvents({
		'click': function(e){
			//prevent the default action when clicking link (load page instead of visiting URL)
			e.stop();
			
			if(location.href.indexOf('#')==-1)
				location.href=location.href+"#"+this.get('href');
			else
				location.href=location.href.split('#')[0]+"#"+this.get('href');
			getPage(this.href);
			this.blur();
		}
	});
	if(location.href.indexOf('#')==-1)
		getPage($('startpage').href);
	else
		getPage(location.href.split('#')[1]);
}

/**
 * Function: getPage()
 * Description: Uses AJAX and page transitions to load web pages.  If the function is called twice for the same page then it simply scrolls to the content instead of loading the page all over again.
 * Arguments:
 * 		url			= string; Internet URL to the page to be loaded (can be full domain path or a link relational to index.html)
 * 		override	= bool; Overrides the default action of only scrolling to content and forces loading of the page
 */
function getPage(url,override){
	//If the page has been loaded then don't bother reloading it but scroll to it unless the override is set.
	if(url==current_page && !override)
	{
		scrollToContent();
		return;
	}
	else
		current_page=url;
		ajax = new Request({
			url: url,
			method: 'get',
			onSuccess: function(response) {
				$('content').set('html',response);
				content.hide();
				content.slideIn('vertical');
				scrollToContent();
			}
		});
	ajax.cancel();
	if(content.open)
		content.slideOut();
	setTimeout("content.hide();ajax.send()",550);
}

/**
 * Function: scrollToContent()
 * Description: Scrolls to the active page content when called.
 * Arguments:
 * 		none
 */
function scrollToContent(){
	
	if(content.open)
		scroll.toElement('content');
	else
		setTimeout("scrollToContent()",100);
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

/**
 * Function: writePlaylist()
 * Description: Writes the html for the playlist.  Did this little workaround so my page can be validated.
 * Arguments:
 * 		none
 */
function writePlaylist()
{
	document.open("text/html");
	document.writeln('<div style="text-align: right; margin-left: auto; visibility:visible; margin-right: auto; width:450px;"><embed style="width:435px; visibility:visible; height:270px;" allowScriptAccess="never" src="http://www.musicplaylist.us/mc/mp3player-othersite.swf?config=http://www.musicplaylist.us/mc/config/config_black_noautostart_shuffle.xml&mywidth=435&myheight=270&playlist_url=http://www.musicplaylist.us/loadplaylist.php?playlist=34434082" menu="false" quality="high" width="435" height="270" name="mp3player" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" border="0"/><BR><a href=http://www.musicplaylist.us><img src=http://www.musicplaylist.us/mc/images/create_black.jpg border=0></a><a href=http://www.musicplaylist.us/standalone/34434082 target=_blank><img src=http://www.musicplaylist.us/mc/images/launch_black.jpg border=0></a><a href=http://www.musicplaylist.us/download/34434082><img src=http://www.musicplaylist.us/mc/images/get_black.jpg border=0></a> </div>');
	document.close();
}

/** Format for citing others' work.
 * @author Name (email)
 * @copyright none
 * @license none
 * @sourcelink http://source
 * @dependency none
 * Description: What does the function accomplish?
 */