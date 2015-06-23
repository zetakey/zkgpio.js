/*
 * zkgpio.js
 *  Javascript GPIO plugin interface for Raspberry Pi
 *  It is part of <hw.js> from Zetakey
 *  Author: Jack Wong <jack.wong@zetakey.com>
 *	Copyright (c) 2015 Zetakey Solutions Limited
 ************************************************************************
 *
 ***********************************************************************
 */

 /**
  * A GPIO javascript module for Raspberry Pi 2, <zkgpio.js>
  * @example
  *         <html>
  *         <head>
  *            <meta charset="utf-8">
  *             <title>GPIO input sample</title>
  *            <script src="zkgpio.js"></script>
  *         <script>
  *         var pi;
  *         function init(){
  *          pi = zkgpio.plugin();
  *          pi.setupGpio();
  *          var rev = pi.piBoardRev();
  *          document.getElementById('ver').innerHTML = rev;
  *         };
  *
  *         </script>
  *         </head>
  *         <body onload="init()">
  *           <h1>GPIO Input Sample using BCM GPIO 3</h1>
  *         <p>Version Number: <span id="ver"></span></p>
  *
  *         <ol>
  *           <li><button onclick="pi.setupGpio()">Setup Gpio</button></li>
  *           <li><button onclick="pi.pinMode(3, zkgpio.INPUT)">Set BCM 3 (jumper pin 5) to input</button></li>
  *           <li><button onclick="document.getElementById('status').innerHTML = pi.digitalRead(3);">Read pin 4</button></li>
  *         </ol>
  *         <p>Pin Status: <span id="status"></span></p>
  *
  *         <p>Circuit: </p>
  *         <ul>
  *           <li> BCM Pin 3 / Jumper Pin 5  - Button Pin 1</li>
  *           <li> Button Pin 3 - GND</li>
  *           <p>BCM Pin 3 is pull up internally to 3V3. When button pressed, it connects to GND</p>
  *         </ul>
  *
  *         <p>Note: Please check the hardware connection and click in sequence or kill your board.</p>
  *         </body>
  *
  *         </html>
  * @example
  *         <html>
  *         <head>
  *         <meta charset="utf-8">
  *         <title>GPIO output sample</title>
  *         <script src="zkgpio.js"></script>
  *       <script>
  *       var pi;
  *
  *       function init(){
  *       pi = zkgpio.plugin();
  *       pi.setupGpio();
  *       var rev = pi.piBoardRev();
  *       document.getElementById('ver').innerHTML = rev;
  *
  *       };
  *       </script>
  *
  *       </head>
  *       <body onload="init()">
  *       <h1>GPIO Output Sample using BCM GPIO 4</h1>
  *       <p>Version Number: <span id="ver"></span></p>
  *       <ol>
  *       <li><button onclick="pi.setupGpio()">Setup Gpio</button></li>
  *       <li><button onclick="pi.pinMode(4, zkgpio.OUTPUT)">Set the BCM 4(Jumpber pin 7) to output</button></li>
  *       <li><button onclick="pi.digitalWrite(4, zkgpio.HIGH)">Go HIGH</button></li>
  *       <li><button onclick="pi.digitalWrite(4, zkgpio.LOW)">Go LOW</button></li>
  *       </ol>
  *
  *       <p>Circuit: </p>
  *       <ul>
  *       <li> BCM Pin 4 / Jumper Pin 7  - LED Anode (longer leg)</li>
  *       <li> LED Cathode (shorter leg) - 330 Resistor</li>
  *       <li> 330 Resistor              - GND</li>
  *       </ul>
  *       <p>Note: Please check the hardware connection and click in sequence or kill your board.</p>
  *
  *       </body>
  *       </html>
  *
  * @module zkgpio
  * @main zkgpio
  */
var zkgpio = (function () {

//private
  var initialized,
      pluginObj;

//Emulated functions
/**
 * Contains all plugin methods
 *
 * @class plugin
 * @constructor
 * @namespace zkgpio
 * @example
 *         var pi = zkgpio.plugin();  //construct the zkgpio plugin
 *         pi.setupGpio();            //setup the gpio
 */

  var emulatedPlugin = {
// Core wiringPi functions

        setup: function(){console.log("setup called.");},
        setupSys: function(){console.log("setupSys called.");},

        /**
         * @method setupGpio
         * @description Set up the GPIO plugin using BCM's pin numbering.
         * @example
         *         var pi = zkgpio.plugin();
         *         pi.setupGpio();
         */
        setupGpio: function(){console.log("setupGpio called.");},
        setupPhys: function(){console.log("setupPhys called.");},

        pinModeAlt: function(a, b){console.log("pinModeAlt called."+" arg[0]="+ a +", arg[1]="+b);},

        /**
        * @method pinMode
        * @param {number} pin - Pin number, based on your setup function
        * @param {number} mode - The mode can be output(zkgpio.OUTPUT) or input(zkgpio.INPUT).
        * @description Set the input / output mode
        @ @uses OUTPUT
        * @example
        *         pi.pinMode(3, zkgpio.INPUT);  //Set pin 3 to INPUT
        *         pi.pinMode(4, zkgpio.OUTPUT);  //Set pin 4 to OUTPUT
        *
        */
        pinMode: function(a, b){console.log("PinMode called."+" arg[0]="+ a +", arg[1]="+b);},


        /**
        * @method pullUpDnControl
        * @param {number} pin - Pin number, based on your setup function
        * @param {number} value - The value can be PUD_OFF / PUD_DOWN / PUD_UP
        * @description Set the pull up down control. Some pins may not work because they have internel pull up resistor, e.g BCM 2, 3
        * @example
        *         pi.pullUpDoControl(4, zkgpio.PUD_OFF);  //Set pull up down control of pin 4 to OFF
        */
        pullUpDnControl: function(a, b){console.log("pullUpDnControl called."+" arg[0]="+ a +", arg[1]="+b);},

        /**
        * @method digitalRead
        * @param {number} pin - Pin number, based on your setup function
        * @description Read to the pin
        * @return {number} 1 or 0 - Status on the pin. When in emulation, it also return 1
        * @example
        *         pi.digitalRead(3);  //Read from pin 3
        */
        digitalRead: function(a){console.log("digitalRead called."+" arg[0]="+ a + " emulated output=1");return 1;},

        /**
        * @method digitalWrite
        * @param {number} pin - Pin number, based on your setup function
        * @param {number} value - The value can be 1 (zkgpio.HIGH) or 0 (zkgpio.LOW).
        * @description Write to the pin.
        * @example
        *         pi.digitalWrite(4, zkgpio.HIGH);  //Set pin 3 to HIGH
        */
        digitalWrite: function(a, b){console.log("digitalWrite called."+" arg[0]="+ a +", arg[1]="+b);},
        pwmWrite: function(a, b){console.log("pwmWrite called."+" arg[0]="+ a +", arg[1]="+b);},
        analogRead: function(a){console.log("analogRead called."+" arg[0]="+ a + " emulated output=1");return 1;},
        analogWrite: function(a, b){console.log("analogWrite called."+" arg[0]="+ a +", arg[1]="+b);},

// On-Board Raspberry Pi hardware specific stuff
        /**
        * @method piBoardRev
        * @return {number} value - The version of the board, 1 or 2.
        * @description This returns the board revision of the Raspberry Pi. It will be either 1 or 2. Some of the BCM_GPIO pins changed number and function when moving from board revision 1 to 2, so if you are using BCM_GPIO pin numbers, then you need to be aware of the differences.
        */
        piBoardRev: function(){console.log("piBoardRev called."+" emulated output=2");return 2;},
        wpiPinToGpio: function(a){console.log("wpiPinToGpio called."+" arg[0]="+ a + " emulated output=1");return 1;},
        physPinToGpio: function(a){console.log("physPinToGpio called."+" arg[0]="+ a + " emulated output=1");return 1;},
        setPadDrive: function(a, b){console.log("setPadDrive called."+" arg[0]="+ a +", arg[1]="+b);},
        getAlt: function(a){console.log("getAlt called."+" arg[0]="+ a + " emulated output=1");return 1;},
        pwmToneWrite: function(a, b){console.log("pwmToneWrite called."+" arg[0]="+ a +", arg[1]="+b);},
        digitalWriteByte: function(a){console.log("digitalWriteByte called."+" arg[0]="+ a);},
        pwmSetMode: function(a){console.log("pwmSetMode called."+" arg[0]="+ a);},
        pwmSetRange: function(a){console.log("pwmSetRange called."+" arg[0]="+ a);},
        pwmSetClock: function(a){console.log("pwmSetClock called."+" arg[0]="+ a);},
        gpioClockSet: function(a, b){console.log("gpioClockSet called."+" arg[0]="+ a +", arg[1]="+b);},
      }


  var initPluginObject = function(){
    var str = "";

    pluginObj = document.createElement("Object");
    pluginObj.setAttribute("type", "application/x-webkit-zetakeygpio");
    pluginObj.setAttribute("width", "0");
    pluginObj.setAttribute("height", "0");
    document.body.appendChild(pluginObj);
    console.log("Initialize Plugin Object");


    if (! pluginObj.setTestString) {
        str = "no plugin for 'application/x-webkit-zetakeygpio'.";
        console.log(str);
        return false;
    } else {
        var res1        = pluginObj.setTestString("Zetakey Plugin test");
        var testString  = pluginObj.getTestString();
        str += "get string : " + testString + "<br>";
        str += "set string : " + res1 + "<br>";
        console.log(str);
        return true;
    }
    console.log(str);
  };

  return {
//public
    plugin: function(){
      if(!initialized){
        if( !initPluginObject() ){
          pluginObj = emulatedPlugin;
        }
        initialized = true;
      }
      return pluginObj;
    },

// hardware value
    // Pin modes
    /**
    * Hardware value for OUTPUT, used in pinMode()
    * @property OUTPUT
    * @type Number
    * @example
    *         pi.pinMode(4, zkgpio.OUTPUT);  //Set pin 4 to OUTPUT
    */
    OUTPUT:           	1,
    /**
    * Hardware value for INPUT, used in pinMode()
    * @property INPUT
    * @type Number
    * @example
    *         pi.pinMode(3, zkgpio.INPUT);  //Set pin 3 to INPUT
    */
    INPUT:            	0,
    PWM_OUTPUT:       	2,
    GPIO_CLOCK:       	3,
    SOFT_PWM_OUTPUT:	4,
    SOFT_TONE_OUTPUT:	5,
    PWM_TONE_OUTPUT:	6,
    /**
    * Hardware value for LOW
    * @property LOW
    * @type Number
    * @example
    *         pi.digitalWrite(4, zkgpio.LOW);   //Set pin 4 to LOW
    */
    LOW:              	0,
    /**
    * Hardware value for HIGH
    * @property HIGH
    * @type Number
    * @example
    *         pi.digitalWrite(4, zkgpio.HIGH);  //Set pin 3 to HIGH
    */
    HIGH:			    1,

    // Pull up/down/none
    /**
    * Hardware value for PUD_OFF, pull up down control off
    * @property PUD_OFF
    * @type Number
    * @example
    *         pi.pullUpDoControl(4, zkgpio.PUD_OFF);  //Set pull up down control of pin 4 to OFF
    */
    PUD_OFF:			0,
    /**
    * Hardware value for PUD_DOWN, pull down
    * @property PUD_DOWN
    * @type Number
    * @example
    *         pi.pullUpDoControl(4, zkgpio.PUD_DOWN);  //Set pull up down control of pin 4 to pull down
    */
    PUD_DOWN:		    1,
    /**
    * Hardware value for PUD_UP, pull up
    * @property PUD_UP
    * @type Number
    * @example
    *         pi.pullUpDoControl(4, zkgpio.PUD_UP);  //Set pull up down control of pin 4 to pull up
    */
    PUD_UP:			    2,

    // PWM
    PWM_MODE_MS:		0,
    PWM_MODE_BAL:		1,

  }

})()
