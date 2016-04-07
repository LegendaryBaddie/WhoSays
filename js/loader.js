/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

window.onblur=function(){
	console.log("blur at "+Date());
	app.main.pauseGame();
}

window.onfocus=function(){
	console.log("focus at "+ Date());
	app.main.resumeGame();
}
var images = new Array();
window.onload = function(){
	console.log("window.onload called");
    //preload array via https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
   
   
			function preload(load,arrayToLoad) {
				for (var i = 0; i < load.length; i++) {
					arrayToLoad[i] = new Image();
					arrayToLoad[i].src = load[i];
				}    
			}
            var stuff=[
				"media/board/board.png",
                "media/board/cyan_UP.png",
                "media/board/cyan_DOWN.png",
                "media/board/green_UP.png",
                "media/board/green_DOWN.png",
                "media/board/magenta_UP.png",
                "media/board/magenta_DOWN.png",
                "media/board/orange_UP.png",
                "media/board/orange_DOWN.png",
                "media/board/yellow_UP.png",
                "media/board/yellow_DOWN.png"];
              var demonStuff=[];
              for(var i=0;i<60;i++)
              {
                   
                  if(i>9){
                 demonStuff.push("media/demonGIF/demon00"+i.toString()+".png");
                  }else{
                 demonStuff.push("media/demonGIF/demon000"+i.toString()+".png");
                  }
              } 
			preload(stuff,app.main.images);
            preload(demonStuff,app.main.DEMON.demonGIF);
	app.main.init();
}