// Created by Sam Gleske - 01/04/2008 (mm/dd/yyyy)

/*temperature object
 * Usage (fahr stands for fahrenheit):
 *		temperature.celsius.toFahr(int a) - returns int
 *		temperature.celsius.toKelvin(int a) - returns int
 *		temperature.celsius.toRankine(int a) - returns int
 *		temperature.celsius.toReaumur(int a) - returns int
 *		temperature.fahr.toCelsius(int a) - returns int
 *		temperature.fahr.toKelvin(int a) - returns int
 *		temperature.fahr.toRankine(int a) - returns int
 *		temperature.fahr.toReaumur(int a) - returns int
 *		temperature.kelvin.toCelsius(int a) - returns int
 *		temperature.kelvin.toFahr(int a) - returns int
 *		temperature.kelvin.toRankine(int a) - returns int
 *		temperature.kelvin.toReaumur(int a) - returns int
 *		temperature.rankine.toCelsius(int a) - returns int
 *		temperature.rankine.toFahr(int a) - returns int
 *		temperature.rankine.toKelvin(int a) - returns int
 *		temperature.rankine.toReaumur(int a) - returns int
 *		temperature.reaumur.toCelsius(int a) - returns int
 *		temperature.reaumur.toFahr(int a) - returns int
 *		temperature.reaumur.toKelvin(int a) - returns int
 *		temperature.reaumur.toRankine(int a) - returns int
 */

var temperature={
	celsius:{
		toFahr:function(n){
				return (n*1.8)+32;
			},
		toKelvin:function(n){
				return n+273.15;
			},
		toReaumur:function(n){
				return n*.8;
			},
		toRankine:function(n){
				return (n+273.15)*1.8
			}
		},
	fahr: {
		toCelsius:function(n){
				return (n-32)/1.8;
			},
		toKelvin:function(n){
				return ((n-32)/1.8)+273.15;
			},
		toRankine:function(n){
				return n-32+(273.15*1.8);
			},
		toReaumur:function(n){
				return (n-32)/2.25;
			}
		},
	kelvin:{
		toCelsius:function(n){
				return n-273.15;
			},
		toFahr:function(n){
				return ((n-273.15)*1.8)+32;
			},
		toRankine:function(n){
				return n*1.8;
			},
		toReaumur:function(n){
				return (n-273.15)*.8;
			}
		},
	rankine:{
			toCelsius:function(n){
					return (n/1.8)-273.15;
				},
			toFahr:function(n){
					return n-(273.15*1.8)+32;
				},
			toKelvin:function(n){
					return n/1.8;
				},
			toReaumur:function(n){
					return ((n/1.8)-273.15)*.8;
				}
		},
	reaumur:{
		toCelsius:function(n){
				return n*1.25;
			},
		toFahr:function(n){
				return (n*2.25)+32;
			},
		toKelvin:function(n){
				return (n/.8)+273.15;
			},
		toRankine:function(n){
				return ((n/.8)+273.15)*1.8;
			}
		}
	}