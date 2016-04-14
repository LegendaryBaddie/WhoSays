// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	console.log("sound.js module loaded");
	var bgAudio = undefined;
	var effectAudio = undefined;
	
	var effectSounds = ["Alan_squeak.mp3","Button_Down_sound.mp3","Button_DownUp_sound.mp3","gecko.mp3","moto1_scream.mp3","rabbit_crash.mp3","rabbit_jump.mp3","demon_pop.mp3"];
	

	function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.25;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.3;
	}
		
	function stopBGAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
	function playBGAudio(){
        bgAudio.play();
    }
	function playEffect(currentEffect){
		effectAudio.src = "media/Sound/" + effectSounds[currentEffect];
		effectAudio.play();
		
	}
		return{
            init:init,
            stopBGAudio:stopBGAudio,
            playEffect:playEffect,
            playBGAudio:playBGAudio
        };
}());