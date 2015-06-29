/********************************************************\
*     Created by Sam Gleske                              *
*     http://www.pages.drexel.edu/~sag47/                *
*     Please keep this intact in order to use code       *
*                                                        *
*     All code written is by Sam Gleske unless otherwise *
*     stated...                                          *
\********************************************************/

// Quick SETUP
var _folder_list_font="verdana"; //this is the font for the folders and items (CSS format)


/* Start of the FOLDER ENGINE */
// global vars
var activeTopic=null;
var oldStyle=null;
var msie=(navigator.userAgent.indexOf("MSIE")!=-1)?1:0;
function selectTopic(topic)
{
	if(activeTopic && activeTopic != topic)
	{
		if(oldStyle)
		{
			//restore backed up style
			activeTopic.style.backgroundColor = oldStyle.backgroundColor;
			activeTopic.style.borderBottomColor = oldStyle.borderBottomColor;
			activeTopic.style.borderRightColor = oldStyle.borderRightColor;
			activeTopic.style.borderTopColor = oldStyle.borderTopColor;
			activeTopic.style.borderLeftColor = oldStyle.borderLeftColor;
			activeTopic.style.color = oldStyle.color;
			activeTopic=null;
		}
		oldStyle=null
	}
	
	if(!oldStyle)
	{
		//back up old style
		oldStyle=new Object();
		oldStyle.backgroundColor = topic.style.backgroundColor;
		oldStyle.borderBottomColor = topic.style.borderBottomColor;
		oldStyle.borderRightColor = topic.style.borderRightColor;
		oldStyle.borderTopColor = topic.style.borderTopColor;
		oldStyle.borderLeftColor = topic.style.borderLeftColor;
		oldStyle.color = topic.style.color;
	}
	
		//set new styles
		topic.style.backgroundColor="#06C";
		topic.style.borderLeftColor="#039";
		topic.style.borderRightColor="#06F";
		topic.style.borderTopColor="#039";
		topic.style.borderBottomColor="#06F";
		topic.style.color="#FFF";
		activeTopic=topic;
}
function shide_(folder,section)
{
	if(document.getElementById(section).style.display == "none")
	{
		document.getElementById(section).style.display = "";
		document.getElementById(folder).innerHTML = "<img alt=\"[-]\" src=\"folderview/minus.gif\" style=\"text-decoration:none;border:none\"><img alt=\" \" src=\"folderview/folder_open.gif\" style=\"text-decoration:none;border:none\">";
	}
	else
	{
		document.getElementById(section).style.display = "none";
		document.getElementById(folder).innerHTML = "<img alt=\"[+]\" src=\"folderview/plus.gif\" style=\"text-decoration:none;border:none\"><img alt=\" \" src=\"folderview/folder.gif\" style=\"text-decoration:none;border:none\">";
	}
	return;
}
function writeExpandAll(beforeText_,afterText_)
{
	if(!msie)
	{//Do not write links if user is using Internet Explorer
		if(beforeText_ && afterText_)
		{
			document.write('<span name="explode_implode_links_">'+beforeText_+'</span><a href="javascript:void(0)" onclick="explode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[+]" src="folderview/plus.gif" style="text-decoration:none;border:none">all folders</a>, ');
			document.writeln('<a href="javascript:void(0)" onclick="imlpode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[-]" src="folderview/minus.gif" style="text-decoration:none;border:none">all folders</a><span name="explode_implode_links_">'+afterText_+'</span><br>');
		}
		else if(beforeText_)
		{
			document.write('<span name="explode_implode_links_">'+beforeText_+'</span><a href="javascript:void(0)" onclick="explode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[+]" src="folderview/plus.gif" style="text-decoration:none;border:none">all folders</a>, ');
			document.writeln('<a href="javascript:void(0)" onclick="imlpode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[-]" src="folderview/minus.gif" style="text-decoration:none;border:none">all folders</a><br>');
		}
		else if(afterText_)
		{
			document.write('<a href="javascript:void(0)" onclick="explode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[+]" src="folderview/plus.gif" style="text-decoration:none;border:none">all folders</a>, ');
			document.writeln('<a href="javascript:void(0)" onclick="imlpode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_"><img alt="[-]" src="folderview/minus.gif" style="text-decoration:none;border:none">all folders</a><span name="explode_implode_links_">'+afterText_+'</span><br>');
		}
		else
		{
			document.write('<a href="javascript:void(0)" onclick="explode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_" class="item_link_"><img alt="[+]" src="folderview/plus.gif" style="text-decoration:none;border:none">all folders</a>, ');
			document.writeln('<a href="javascript:void(0)" onclick="imlpode_all_folders_()" onfocus="this.blur()" style="text-decoration: none" name="explode_implode_links_" class="item_link_"><img alt="[-]" src="folderview/minus.gif" style="text-decoration:none;border:none">all folders</a><hr>');
		}
	}
	return;
}
function explode_all_folders_()
{
	var j;
	var myElemArray1=document.getElementsByName("subfolder_");
	for(j=0;j<myElemArray1.length;j++)
	{
		myElemArray1[j].style.display="";
	}

	var myElemArray2=document.getElementsByName("folder_status_");
	for(j=0;j<myElemArray2.length;j++)
	{
		myElemArray2[j].innerHTML="<img alt=\"[-]\" src=\"folderview/minus.gif\" style=\"text-decoration:none;border:none\"><img alt=\" \" src=\"folderview/folder_open.gif\" style=\"text-decoration:none;border:none\">";
	}
}
function imlpode_all_folders_()
{
	var j;
	var myElemArray1=document.getElementsByName("subfolder_");
	for(j=0;j<myElemArray1.length;j++)
	{
		myElemArray1[j].style.display="none";
	}

	var myElemArray2=document.getElementsByName("folder_status_");
	for(j=0;j<myElemArray2.length;j++)
	{
		myElemArray2[j].innerHTML="<img alt=\"plus\" src=\"folderview/plus.gif\" style=\"text-decoration:none;border:none\"><img alt=\" \" src=\"folderview/folder.gif\" style=\"text-decoration:none;border:none\">";
	}
}
function genLink(link,name,target)
{
	document.write('<a href="'+link+'" class="item_link_" name="subfolder_link_" id="'+name+'" target="'+target+'" onclick="selectTopic(this)" onfocus="this.blur()">'+name+'</a>');
	document.writeln('<br>');
	return;
}
function scriptalert_(func,msg)
{
	alert("JavaScript ERROR!\n\nFunction: "+func+"\n\nReason: "+msg);
	return;
}
function Folder(findex,fname)
{
	document.writeln('<a href="javascript:void(0)" onclick="shide_(\'f'+findex+'_\',\''+fname+findex+'_1_\');" class="outer_" onfocus="this.blur()" name="main_folder_"><span class="inner_"><span id="f'+findex+'_" name="folder_status_"><img alt=\"plus\" src=\"folderview/plus.gif\" style=\"text-decoration:none;border:none\"><img alt=\" \" src=\"folderview/folder.gif\" style=\"text-decoration:none;border:none\"></span> '+fname+'</span></a><br>');
	document.writeln('<div id="'+fname+findex+'_1_" class="subfolder_" name="subfolder_" style="display:none">');
	return;
}
function FolderEnd()
{
	document.writeln('</div>');
	return;
}
function apply_global_folder_list_styles_()
{
	var i,j;
	var _namelist_=new Array();
		_namelist_[0]="main_folder_";
		_namelist_[1]="subfolder_";
		_namelist_[2]="subfolder_link_";
		_namelist_[3]="external_link_";
		_namelist_[4]="_html_text_";
		_namelist_[5]="explode_implode_links_";
		_namelist_[6]="folder_status_";
	
	for (i=0;i<_namelist_.length;i++)
	{
		//apply the styles to all the class names
		var myElemArray=document.getElementsByName(_namelist_[i]);
		for(j=0;j<myElemArray.length;j++)
		{
			myElemArray[j].style.fontFamily=_folder_list_font;
		}
	}
	return;
}
// FOLDER ENGINE end

// finishing functions
window.onload=_init_list_of_finishing_functions;
function _init_list_of_finishing_functions()
{
	//here is a list of functions to execute after the page loads
	apply_global_folder_list_styles_();
	return;
}

/* Changlog Dates(mm/dd/yyyy)

FolderView UI Special Edition for Help Systems 1.0.0.1 01/18/2008
* When genLink writes the entry it adds the name of the genLink to be the I.D. This way the page can call the
  link using selectTopic() within the help documentation itself.  For this reason your genLink name should be
  the exact same as the title of that page.
* Updated the writeExpandAll() function to incorporate the new pictures for opening closing folder icons
* Changed the alt text of plus/minus images to [+]/[-]
* Changed the alt text of the folders to be a no break space

FolderView UI Special Edition for Help Systems 1.0 01/16/2008
* This is a hacked and slimmed version of FolderView UI 1.0.0.2, several options have been removed and code has 
  been optimized for displaying as a menu part of a help documentation system.  Several features have also been
  added to complement the help system.
* Removed the title (popup bar) functions
* Replaced plus/minus with folder icons
* Added topic highlighting when user is viewing
End of Changelog*/