/*********************************************\
*                                             *
*           Functions below run other         *
*     functions when pressing certain keys    *
*                                             *
\*********************************************/
//Thanks to http://www.quirksmode.org/ for comprehensive documentation on keystrokes and JavaScript in different browsers.
//http://www.quirksmode.org/js/keys.html

//setup the key detection
function keyEvents() {//load this into oninit or your init function
	document.defaultAction = false;
	document['onkeydown'] = detectEvent;
}
function detectEvent(e) {
	resetMenu();
	var evt = e || window.event;
	if(enableKeys)
	{
		if('function'==typeof evt.preventDefault)
		{
			evt.preventDefault();
		}
		else
		{
			evt.returnValue=false;
		}
	}
	
	if(evt.type=='keydown')
	{
		keydown(evt.keyCode,evt.shiftKey);
	}
}

//carry out functionality
function keydown(keyCode,shiftKey)
{
	if(enableKeys)
	{
		if(shiftKey)
		{
			switch(keyCode)
			{
				case 48://')'
					calc.parr.focus();
					if(display.value!='0')addChar(')');
					break;
				case 53://'%'
					calc.c6.focus();
					if(display.value!='0')addChar('%');
					break;
				case 54://'^'
					calc.c7.focus();
					if(display.value!='0')addChar('^');
					break;
				case 56://'*' main keyboard
					calc.multiply.focus();
					addChar('*');
					break;
				case 57://'('
					calc.parl.focus();
					addChar('(');
					break;
				case 67://clear the memory when C is pressed (button MC)
					calc.mClear.focus();
					ClearMem();
					break;
				case 69://insert e when E key is pressed
					calc.ekey.focus();
					addChar('e');
					break;
				case 77://add to memory when M is pressed (button M+)
					calc.mPlus.focus();
					MemPlus();
					break;
				case 80://insert pi when P is pressed
					calc.pi.focus();
					addChar('pi');
					break;
				case 82://recall the memory when R is pressed (button MR)
					calc.mRecall.focus();
					RecallMem();
					break;
				case 83://store the memory when S is pressed (button MS)
					calc.mStore.focus();
					StoreMem();
					break;
				case 61://Opera
				case 187://IE8
				case 107://'+' in other browsers
					calc.add.focus();
					addChar('+');
					break;
				case 188://'<'
					calc.d6.focus()
					if(display.value!='0')addChar('<<');
					break;
				case 190://'>'
					calc.d7.focus()
					if(display.value!='0')addChar('>>');
					break;
			}
		}
		else
		{
			//detect the keys pressed
			switch(keyCode)
			{
				case 8://Backspace Key
					deleteChar();
					calc.backbtn.focus();
					break;
				case 13://Enter key
				case 187://IE8 '=' main keyboard
				case 61://'=' sign opera
					calc.enter.click();
					calc.enter.focus();
					break;
				case 67://clear the memory when C is pressed (button MC)
					calc.mClear.focus();
					ClearMem();
					break;
				case 69://insert e when E key is pressed
					calc.ekey.focus();
					addChar('e');
					break;
				case 77://add to memory when M is pressed (button M+)
					calc.mPlus.focus();
					MemPlus();
					break;
				case 80://insert pi when P is pressed
					calc.pi.focus();
					addChar('pi');
					break;
				case 82://recall the memory when R is pressed (button MR)
					calc.mRecall.focus();
					RecallMem();
					break;
				case 83://store the memory when S is pressed (button MS)
					calc.mStore.focus();
					StoreMem();
					break;
				case 48://main keyboard
				case 96://0
					calc.btn0.focus();
					addChar('0');
					break;
				case 49:
				case 97://1
					calc.btn1.focus();
					addChar('1');
					break;
				case 50://main keyboard
				case 98://2
					calc.btn2.focus();
					addChar('2');
					break;
				case 51://main keyboard
				case 99://3
					calc.btn3.focus();
					addChar('3');
					break;
				case 52://main keyboard
				case 100://4
					calc.btn4.focus();
					addChar('4');
					break;
				case 53://main keyboard
				case 101://5
					calc.btn5.focus();
					addChar('5');
					break;
				case 54://main keyboard
				case 102://6
					calc.btn6.focus();
					addChar('6');
					break;
				case 55://main keyboard
				case 103://7
					calc.btn7.focus();
					addChar('7');
					break;
				case 56://main keyboard
				case 104://8
					calc.btn8.focus();
					addChar('8');
					break;
				case 57://main keyboard
				case 105://9
					calc.btn9.focus();
					addChar('9');
					break;
				case 42://'*' in Opera
				case 106://'*' in other browsers
					calc.multiply.focus();
					if(display.value!='0')addChar('*');
					break;
				case 43://'+' in Opera
				case 107://'+' in other browsers
					calc.add.focus();
					addChar('+');
					break;

				case 45://'-' in Opera
				case 189://IE8
				case 109://'-' in other browsers
					calc.subtract.focus();
					addChar('-');
					break;
				case 46://Delete Key in others (or period in Konqueror)
					if(konqueror)
					{
						calc.dot.focus();
						addChar('.');
					}
					else
					{
						calc.delbtn.focus();
						display.value=0;
					}
					break;
				case 47://'/' in Opera
				case 191://main keyboard
				case 111://'/' in other browsers
					calc.divide.focus();
					if(display.value!='0')addChar('/');
					break;
				case 78://'.' in Opera
				case 190://'.' on main keyboard
				case 110://'.' in other browsers
					if(!konqueror)
					{
						calc.dot.focus();
						addChar('.');
					}
					break;
				case 127://Delete key in Konqueror
					if(konqueror)
					{
						calc.delbtn.focus();
						display.value=0;
					}
					break;
			}
		}
		return false;
	}
}