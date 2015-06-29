//commonly used functions throughout the help system
function updateList()
{
	parent.leftFrame.selectTopic(parent.leftFrame.document.getElementById(this.document.title));
	
	//uncomment this if using the highlight function of the Zoom Search Engine
	highlight();
}
window.onload=updateList;

function email(user,domain)
{
	var protocol='mailto:',at='@';
	document.write('<'+'a href="'+protocol+user+at+domain+'">'+user+at+domain+'<'+'/a>');
}