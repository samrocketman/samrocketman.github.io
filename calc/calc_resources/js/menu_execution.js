/*********************************************\
*                                             *
*             Start of Menu Code              *
*                                             *
\*********************************************/
//Toggle functions for the View Menu
function set_titles()
{//builtin, runs on init()
		calc.memory.title="Shows if there is something stored in memory";
		calc.backbtn.title="Delete a character from Equation from right to left";
		calc.delbtn.title="Clears the Equation";
		calc.ac.title="Clears the Equation and the memory";
		calc.mClear.title="Clears the memory";
		calc.btn7.title="Inserts the character 7";
		calc.btn8.title="Inserts the character 8";
		calc.btn9.title="Inserts the character 9";
		calc.divide.title="Inserts the '/' character";
		calc.b6.title="Inserts an exponential equation [e^x]";
		calc.b7.title="Inserts a natural log equation";
		calc.mRecall.title="Recalls the memory into the Equation (inserts)";
		calc.btn4.title="Inserts the character 4";
		calc.btn5.title="Inserts the character 5";
		calc.btn6.title="Inserts the character 6";
		calc.multiply.title="Inserts the '*' character";
		calc.c6.title="Inserts the modulo operator";
		calc.c7.title="Power of X to Y";
		calc.mStore.title="Computes and then stores the Equation into memory";
		calc.btn1.title="Inserts the character 1";
		calc.btn2.title="Inserts the character 2";
		calc.btn3.title="Inserts the character 3";
		calc.subtract.title="Inserts the '+' character";
		calc.d6.title="Inserts bit shift left operator";
		calc.d7.title="Inserts bit shift right operator";
		calc.mPlus.title="Computes and then adds Equation to the value stored in memory";
		calc.btn0.title="Inserts the character 0";
		calc.e3.title="Changes the negativity of the whole equation";
		calc.dot.title="Inserts the '.' character";
		calc.add.title="Inserts the '+' character";
		calc.enter.title="Computes the current Equation";
		calc.e7.title="Computes and then inverts the current Equation";
		calc.pi.title="Inserts 'pi'";
		calc.parl.title="Inserts the '(' character";
		calc.parr.title="Inserts the ')' character";
		calc.f4.title="Inserts 'cos('";
		calc.f5.title="Inserts 'sin('";
		calc.f6.title="Inserts 'tan('";
		calc.ekey.title="Inserts the 'e' character [1e3=1x10^3=1000] (not exp)";
		calc.g1.title="Inserts 'acos('";
		calc.g3.title="Inserts 'asin('";
		calc.g5.title="Inserts 'atan('";
		calc.log.title="Computes and then takes the log of the current equation";
		
}

function toggle_keys(opt)
{//builtint (this is the two input modes)
	//toggle hotkeys when focused on calc display
	if(opt)
	{
		if(opt=='on')
			enableKeys=true;
		else if(opt=='off')
			enableKeys=false;
	}
}

function roundFloat(num,float_val)
{
	if(document.getElementById('float').value=='Not Set' || document.getElementById('float').value=='null')
	{
		alert('Float Not Set');
	};
	if(compute.result(display.value))
	{
		display.value=compute.roundFloat(compute.result(display.value),floatset);
	}
	return void(0);
}

function setFloat()
{
	var floatObj=document.getElementById('float');
	var thevalue=prompt('Set the number of decimal places for rounding',floatset); 
	if(thevalue)
	{
		if(!compute.test.regex(thevalue,/[0-9\-]/))
			alert('Letters and symbols not allowed.\nOnly numbers');
		else if(thevalue>17)
			alert('Float can\'t go above 17 digits.');
		else
		{
			floatObj.innerHTML=thevalue;
			floatset=thevalue;
		}
	}
	return void(0);
}

function convBase(base1,base2)
{
	var b1,b2;
	switch(base1)
	{
		case "bin":
			b1=2;
			break;
		case "dec":
			b1=10;
			break;
		case "hex":
			b1=16;
			break;
		case "oct":
			b1=8;
			break;
	}
	switch(base2)
	{
		case "Bin":
			b2=2;
			break;
		case "Dec":
			b2=10;
			break;
		case "Hex":
			b2=16;
			break;
		case "Oct":
			b2=8
			break;
	}
	display.value = compute.d2b(compute.b2d(display.value,b1),b2);
}

function convTemp(temp1,temp2)
{
	display.value = eval("temperature."+temp1+"."+temp2+"("+display.value+")");
}

function unitCheck()
{
	//Change the conversion lists based on the display
	
	//Base converter
	//Example: if there are chars that can't be converted such as there is a 2 then binary to whatever will be hidden
	var isBin,isDec,isHex,isOct;
	isBin=compute.test.regex(display.value,/[01]/);
	isDec=compute.test.regex(display.value,/[0-9]/);
	isHex=compute.test.regex(display.value,/[0-9A-F]/i);
	isOct=compute.test.regex(display.value,/[0-7]/);
	
	document.getElementById("bin").style.display=(isBin)?"":"none";
	document.getElementById("dec").style.display=(isDec)?"":"none";
	document.getElementById("hex").style.display=(isHex)?"":"none";
	document.getElementById("oct").style.display=(isOct)?"":"none";
	document.getElementById("nooption1").style.display=(isBin||isDec||isHex||isOct)?"none":"";
	
	//Temp converter
	var isCon,isCel,isFah,isKel,isRan,isRea;
	try
	{
		var temp
		temp=compute.showErrors;
		compute.showErrors=false;
		if(!compute.result(display.value)&&display.value!='0')
		{
			compute.showErrors=temp;
			throw "error";
		}
		compute.showErrors=temp;
		var disp=compute.result(display.value);
		isCon=(compute.test.regex(disp,/[0-9\-\.]/))?1:0;
		isCel=(disp>=-273.15)?1:0;
		isFah=(disp>=-459.66999999999996)?1:0;
		isKel=(disp>=0)?1:0;
		isRan=(disp>=0)?1:0;
		isRea=(disp>=-218.51999999999998)?1:0;
	}
	catch(e)
	{
		isCon=false;
	}
	document.getElementById("celsius").style.display=(isCon&&isCel)?"":"none";
	document.getElementById("fahr").style.display=(isCon&&isFah)?"":"none";
	document.getElementById("kelvin").style.display=(isCon&&isKel)?"":"none";
	document.getElementById("rankine").style.display=(isCon&&isRan)?"":"none";
	document.getElementById("reaumur").style.display=(isCon&&isRea)?"":"none";
	document.getElementById("nooption2").style.display=(isCon&&isCel||isFah||isKel||isRan||isRea)?"none":"";
}

function groupEquation()
{
	if(compute.groupEquation(calc.display.value))
	{
		calc.display.value = compute.groupEquation(calc.display.value);
	}
	return void(0);
}

/*********************************************\
*                                             *
*                IE Only Code                 *
*                                             *
\*********************************************/
//copy and past functions
function docmd(cmdID)
{
	//cmdID=1 then copy equation text, else paste into display by adding a char from right to left
	if(cmdID)
	{
		field=document.calc.display.createTextRange();
		field.execCommand("Copy");
	}
	else
	{
		field=document.getElementById("paste").createTextRange();
		field.execCommand("Paste");
		addChar(document.getElementById("paste").value)
	}
}