/**
  UITest.js v0.1
  Created by Sam Gleske
  Created Feb 3, 2011
  this is an overlay for the TT Card Deck at ClubBleach.org
**/
//gay IE shit
var _msie=(navigator.userAgent&&navigator.userAgent.indexOf("_msie")>0)?1:0;

var selected="border:2px solid #00ff00;cursor:pointer;";
var not_selected="border:2px solid transparent;cursor:pointer;";

/**
  MSIE Compatibility for setAttribute('style'....
**/
function _rzCC(s){
  // thanks http://www.ruzee.com/blog/2006/07/\
  // retrieving-css-styles-via-javascript/
  for(var exp=/-([a-z])/;exp.test(s);s=s.replace(exp,RegExp.$1.toUpperCase()));
  return s;
}
function _setStyle(element, declaration)
{
  if (declaration.charAt(declaration.length-1)==';')
  {
    declaration = declaration.slice(0, -1);
  }
  var k, v;
  var splitted = declaration.split(';');
  for (var i=0, len=splitted.length; i<len; i++)
  {
    k = _rzCC(splitted[i].split(':')[0]);
    v = splitted[i].split(':')[1];
    eval("element.style."+k+"='"+v+"'");
  }
}

//replaces the current tt_select_group function
function tt_select_group(group)
{
  for (var i=0;i<tt_groups[group].length;i++)
  {
    document.getElementById('tt_checkbox_'+tt_groups[group][i]).checked="checked";
  }
  _findChecked();
}

function _findChecked()
{
  try
  {
    var elems=document.getElementsByTagName('img');
    for(var i in elems)
    {
      if(elems[i].id && elems[i].id.substring(0,9)=="tt_image_")
      {
        var current=elems[i].id.split('_');
        var checkbox=document.getElementById('tt_checkbox_'+current[3]);
        if(checkbox.checked)
        {
          if(_msie)
          {
            _setStyle(elems[i],selected);
          }
          else
          {
            elems[i].setAttribute('style',selected);
          }
        }
      }
    }
  }
  catch(e)
  {
    return false;
  }
}

function _selectDuplicates()
{
  try
  {
    //select duplicates
    _uncheckAllBoxes();
    var elems=document.getElementsByTagName('img');
    var count=0;
    for(var i in elems)
    {
      if(elems[i].id && elems[i].id.substring(0,9)=="tt_image_" && i>0)
      {
        var current=elems[i].id.split('_');
        var last=elems[i-1].id.split('_');
        if(current[2]==last[2])
        {
          _selectionClick(elems[i]);
          count++;
        }
      }
    }
    alert(count+' duplicates have been selected!');
  }
  catch(e)
  {
    return false;
  }
}

function _selectionClick(elem)
{
  try
  {
    var current=elem.id.split('_');
    var checkbox=document.getElementById('tt_checkbox_'+current[3]);
    if(checkbox.checked)
    {//if checkbox is checked then uncheck it
      if(_msie)
        _setStyle(elem,not_selected);
      else 
        elem.setAttribute('style',not_selected);
      checkbox.checked=false;
    }
    else
    {//check the checkbox
      if(_msie)
        _setStyle(elem,selected);
      else 
        elem.setAttribute('style',selected);
      checkbox.checked=true;
    }
  }
  catch(e)
  {
    return false;
  }
}

function _uncheckAllBoxes()
{
  try
  {
    var elems=document.getElementsByTagName('img');
    for(var i in elems)
    {
      if(elems[i].id && elems[i].id.substring(0,9)=="tt_image_")
      {
        var current=elems[i].id.split('_');
        var checkbox=document.getElementById('tt_checkbox_'+current[3]);
        if(_msie)
          _setStyle(elems[i],not_selected);
        else 
          elems[i].setAttribute('style',not_selected);
        checkbox.checked=false;
      }
    }
  }
  catch(e)
  {
    return false;
  }
}

function _init()
{
  try
  {
    //make all the TT card checkboxes on the page disappear
    //prepare the page
    var elems=document.getElementsByTagName('img');
    for(var i in elems)
    {
      if(elems[i].id && elems[i].id.substring(0,9)=="tt_image_")
      {
        
        if(!_msie)
        {
          elems[i].setAttribute('style',not_selected)
          elems[i].setAttribute('onclick','_selectionClick(this)');
          var current=elems[i].id.split('_');
          var checkbox=document.getElementById('tt_checkbox_'+current[3]);
          checkbox.style.display="none";
          //checkbox.checked=false;
          
        }
        else
        {
          _setStyle(elems[i],not_selected);
          elems[i].onclick=_selectionClick(this);
          var current=elems[i].id.split('_');
          var checkbox=document.getElementById('tt_checkbox_'+current[3]);
          checkbox.style.display="none";
        }
      }
    }
    _findChecked();
  }
  catch(e)
  {
    return false;
  }
}
function _writeButtons()
{
  //write some buttons into the card deck
  var elems=document.getElementsByTagName('form');
  var _frm=document.getElementById('tt_sortbox');
  var _elem=document.createElement('input');
  _elem.type="button";
  if(_msie)
    _elem.onlick = _uncheckAllBoxes()
  else 
    _elem.setAttribute('onclick',"_uncheckAllBoxes()");
  _elem.value="Uncheck All";
  //_frm.appendChild(_elem);
  var _elem2=document.createElement('input');
  _elem2.type="button";
  if(_msie)
    _elem2.onlick = _selectDuplicates()
  else 
    _elem2.setAttribute('onclick',"_selectDuplicates()");
  _elem2.value="Select Only Duplicate Cards";
  //_frm.appendChild(_elem2);
  var _elem3=document.createElement('input');
  _elem3.type="button";
  if(_msie)
    _elem3.onlick = _uncheckAllBoxes()
  else 
    _elem3.setAttribute('onclick',"_uncheckAllBoxes()");
  _elem3.value="Uncheck All";
  var _elem4=document.createElement('input');
  _elem4.type="button";
  if(_msie)
    _elem4.onlick = _selectDuplicates()
  else 
    _elem4.setAttribute('onclick',"_selectDuplicates()");
  _elem4.value="Select Only Duplicate Cards";

  var div1=document.createElement('div');
  if(_msie)
    _setStyle(div1,'text-align:right');
  else 
    div1.setAttribute('style','text-align:right');
  div1.appendChild(_elem);
  div1.appendChild(_elem2);
  _frm.appendChild(div1);
  
  var div2=document.createElement('div');
  if(_msie)
    _setStyle(div2,'text-align:right');
  else 
    div2.setAttribute('style','text-align:right');
  div2.appendChild(_elem3);
  div2.appendChild(_elem4);
  
  for(var i in elems)
  {
    try
    {
      var method=elems[i].getAttribute('method');
      var action=elems[i].getAttribute('action');
    }
    catch(e)
    {
      //remove any error stuff
    }
    if(method=="post" && action=="tripletriad.php")
    {
      elems[i].appendChild(div2);
    }
  }
}
//start the process
_init();
_writeButtons();