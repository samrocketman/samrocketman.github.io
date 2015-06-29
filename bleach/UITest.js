/**
  UITest.js v0.2
  Created by Sam Gleske
  Created Feb 3, 2011
  Updated to v0.2 Feb 16, 2012
  this modifies the overlay for the TT Card Deck at ClubBleach.org
**/
alert("experimental code, does not work properly if you currently have cards which are for sale... you might regret it.");
//gay IE shit
var _msie=(navigator.userAgent&&navigator.userAgent.indexOf("_msie")>0)?1:0;

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
        if(elems[i].parentNode.parentNode.getAttribute('class')!="tt_card_slot_unselected")
        {
          toggle_tt_card(current[2]);
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
    var elems=document.getElementsByTagName('img'),count=0,current,last;
    for(var i in elems)
    {
      if(elems[i].id && elems[i].id.substring(0,9)=="tt_image_" && (elems[i-1].id.substring(0,9)=="tt_image_" || elems[i-2].id.substring(0,9)=="tt_image_") && i>0)
      {
        current=elems[i].id.split('_');
        if(elems[i].title==elems[i-1].title || (!elems[i-1].id && elems[i].title==elems[i-2].title))
        {
          if(elems[i].parentNode.parentNode.getAttribute('class')=="tt_card_slot_unselected")
          {
            toggle_tt_card(current[2]);
            count++;
          }
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

function _writeButtons()
{
  //write some buttons into the card deck
  //var elems=document.getElementsByTagName('form');
  var _frm=document.getElementById('tt_cardlist_sort_form');
  var _frm2=document.getElementById('tt_cardlist_form');
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
  _frm2.appendChild(div2);
  
/*  var div2=document.createElement('div');
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
      var id=elems[i].getAttribute('id');
    }
    catch(e)
    {
      //remove any error stuff
    }
    if(method=="get" && id=="tt_cardlist_sort_form")
    {
      elems[i].appendChild(div2);
    }
  }*/
}
_writeButtons()