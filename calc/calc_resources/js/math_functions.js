/*********************************************\
*                                             *
*              Calc buttons Code              *
*                                             *
\*********************************************/
function addChar(character) 
{
	if(display.value.toString()==null || display.value=="0")
		display.value=character;
	else
	{
		if(character=="pi"||character=='('||character=='sin('||character=='cos('||character=='tan('||character=='asin('||character=='acos('||character=='atan('||character=='e^('||character=='log('||character=='ln(')
		{
			if(compute.test.regex(display.value.charAt(display.value.length-1),/[0-9i\)]/i))
				display.value+='*'+character;
			else
				display.value+=character;
		}
		else
		{
			if(compute.test.regex(display.value.charAt(display.value.length-1),/[\)i]/i)&&!compute.test.regex(character.toString(), /[\)\+\-\*\/\^%<>]/i))
				display.value+='*'+character;
			else
				display.value+=character;
		}
	}
}

function deleteChar()
{//deletes a char from right to left in display
	//detect trig functions but delete single chars if trig functions are misspelled
	if(display.value.charAt(display.value.length-1)=='('&&(display.value.charAt(display.value.length-4)=='s'||display.value.charAt(display.value.length-4)=='c'||display.value.charAt(display.value.length-4)=='t'))
	{
		if(display.value.charAt(display.value.length-5)=='a')
		display.value=display.value.substring(0,display.value.length-5);//delete acos(, asin(, atan(
		else
			display.value=display.value.substring(0,display.value.length-4);//delete cos(, sin(, tan(
	}
	else if((display.value.charAt(display.value.length-1)=='i'&&display.value.charAt(display.value.length-2)=='p')||(display.value.charAt(display.value.length-1)=='<'&&display.value.charAt(display.value.length-2)=='<')||(display.value.charAt(display.value.length-1)=='>'&&display.value.charAt(display.value.length-2)=='>'))
	{
		display.value=display.value.substring(0,display.value.length-2);//delete two chars from the end
	}
	else
	{
		display.value=display.value.substring(0,display.value.length-1);//delete single char from the end
	}
	if(display.value=='')
	{
		display.value=0;//if there are no chars to delete,then set display=0
	}
}
function display_compute()
{
	if(compute.result(display.value.toString()).toString()!="false")
	{
		compute.degreesMode=document.getElementById('degrees').checked;
		display.value=compute.result(display.value.toString());
	}
}
function flip()
{
	if(compute.result(display.value.toString()))
	{
		if(display.value=='pi')
		{
			display.value=eval("1/3.1415926535897932384626433832795");
		}
		else
		{
			display.value=eval("1/("+compute.result(display.value.toString())+")");
		}
	}
	else
	{
		return false;
	}
}
function StoreMem()
{
	if(compute.result(display.value.toString()))
	{
		if(display.value!=0)
		{
			mem=compute.result(display.value.toString());
			store=true;
			calc.memory.value="M";
		}
	}
	else
	{
		return false;
	}
}
function ClearMem()
{
	mem="";
	store=false;
	calc.memory.value="";
	return;
}
function RecallMem()
{
	if(store)
		addChar(mem);
	else
		return false;
}
function MemPlus()
{
	if(compute.result(display.value.toString()))
	{
		if(mem)
		{
			arg=eval(mem+"+"+compute.result(display.value.toString()));
			mem=arg;
		}
	}
}