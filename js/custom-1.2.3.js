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
 *         none
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
            {
                location.href=location.href+"#"+this.get('href');
            }
            else
            {
                location.href=location.href.split('#')[0]+"#"+this.get('href');
            }
            getPage(this.href);
            this.blur();
        }
    });
	
	//setting up initial page loading
    if(location.href.indexOf('#')==-1)
    {
        getPage($('startpage').href);
    }
    else
    {
        getPage(location.href.split('#')[0] + location.href.split('#')[1]);
    }
}

/**
 * Function: getPage()
 * Description: Uses AJAX and page transitions to load web pages.  If the function is called twice for the same page then it simply scrolls to the content instead of loading the page all over again.
 * Arguments:
 *         url         = string; Internet URL to the page to be loaded (can be full domain path or a link relational to index.html)
 *         override    = bool; Overrides the default action of only scrolling to content and forces loading of the page
 */
function getPage(url,override){
    //If the page has been loaded then don't bother reloading it but scroll to it unless the override is set.
    if(url==current_page && !override)
    {
        scrollToContent();
        return;
    }
    ajax = new Request({
        url: url,
        method: 'get',
        onSuccess: function(response) {
            content.hide();
            $('content').set('html',response);
            content.slideIn('vertical');
			current_page=url;
            scrollToContent();
        }
    });
    ajax.cancel();
    if(content.open)
    {
        content.slideOut();
    }
    setTimeout("ajax.send()",550);
}

/**
 * Function: scrollToContent()
 * Description: Scrolls to the active page content when called.
 * Arguments:
 *         none
 */
function scrollToContent(){
    
    if(content.open)
    {
        scroll.toElement('content');
    }
    else
    {
        setTimeout("scrollToContent()",100);
    }
}

/**
 * Function: randomQuote()
 * Description: Generates a random quote from a list of pre-defined quotes and loads it into the banner on the front page.
 * Arguments:
 *         none
 */
function randomQuote()
{
    var Quotes = new Array(),i=0;
    
    //These are my favorite things to say/quote
    Quotes[i++]="Change is inevitable, and those who adapt most quickly are most likely to survive.";
    Quotes[i++]="My take on life: to each his own";
    Quotes[i++]="Even though, Sir, I do not agree with what you say... I will defend to the death your right to say it.";
    Quotes[i++]="Heheheheehehhehee, YEA Peter Griffin.......";
    Quotes[i++]="Tonight, on the 'Q'. Giggedy Gee, Giggedy Goo.";
    Quotes[i++]="If I had h-r-t, I could add 'u' and get hurt or add 'e-a' and get a heart but I would rather add 'u' and get hurt than have a heart without u!";
    Quotes[i++]="What lies behind us and what lies before us are tiny matters compared to what lies within us.";
    
    //load a random quote into the page
    $('banner_text').set('html','"'+Quotes.getRandom()+'"');
}

/** Format for citing others' work.
 * @author Name (email)
 * @copyright none
 * @license none
 * @sourcelink http://source
 * @dependency none
 * Function: fxn()
 * Description: What does the function accomplish?
 * Arguments:
 *         none
 */
