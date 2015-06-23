# zkgpio demo package for Raspberry Pi 2
Access GPIO with Javascript and HTML on Raspberry Pi by a webpage locally or remotely as below.
You can add more programming logic in JavaScript.
    
    <html>
    <head>
        <meta charset="utf-8">
        <title>GPIO output sample</title>
        <script src="zkgpio.js"></script>
    <script>
    var pi;
    
    function init(){
      pi = zkgpio.plugin();
      pi.setupGpio();
      var rev = pi.piBoardRev();
      document.getElementById('ver').innerHTML = rev;
    };
    </script>
    </head>
    <body onload="init()">
    <h1>GPIO Output Sample using BCM GPIO 4</h1>
    <p>Version Number: <span id="ver"></span></p>
    <ol>
      <li><button onclick="pi.setupGpio()">Setup Gpio</button></li>
      <li><button onclick="pi.pinMode(4, zkgpio.OUTPUT)">Set Pin 4 to output</button></li>
      <li><button onclick="pi.digitalWrite(4, zkgpio.HIGH)">HIGH</button></li>
      <li><button onclick="pi.digitalWrite(4, zkgpio.LOW)">LOW</button></li>
    </ol>
    </body>
    </html>





The package runs on Raspberry Pi debian port, RASPBIAN [https://www.raspberrypi.org/downloads/].


This is a early early stage evaluation version. Your feedback, suggestion and question (also "like in FB", "share with friends" etc.) are very very important. Please email me at jack.wong@zetakey.com

It is part of <hw.js>[https://github.com/zetakey/hw.js] project that we are planning to add more hardware supports.


Install Procedure
-----------------
1.  download the package onto your Raspberry Pi
    wget http://hwjs.zetakey.com/zkgpio/package/zkbrowser_3.3.1.0-1_armhf.deb

2.  install the linux debian package
    sudo dpkg -i zkbrowser_3.3.1.0-1_armhf.deb

Uninstall
--------
    sudo apt-get remove zkbrowser

Run it
------
    zkbrowser

User profiles
-------------
User profiles and data are located at home/pi/zkbrowser/

Try local page
--------------
    zkbrowser
In the URL bar, type 
    file:///gpio_input.html

Create your own stuff
--------------------
1.  Modify or create your own JS/HTML/CSS files (e.g index.html) under /zkbrowser/
2.  in the URL bar, type
    file:///index.html

Credentials
-----------
It is a Zetakey HTML5 browser for Raspberry Pi with javascript plugin to gpio from WiringPi [http://wiringpi.com/]

Contact info
------------
Email: jack.wong@zetakey.com  
Website: http://www.zetakey.com  
