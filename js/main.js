// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */

app.main = { 
   


    BUTTONSTATE:Object.freeze({
             HOVER:0,
             DOWN:1,
             INACTIVE:2,
     }),
    GAMESTATE:Object.freeze({
            FLASHING:0,
            INPUT:1,
            OVER:2,
            BEGIN:3,
    }),
    buttonMagenta:Object.seal({
        posX:0,
        posY:0,
        color:5,
     
        buttonState:undefined,
    }),
    buttonCyan:Object.seal({
        posX:0,
        posY:0,
        color:1,
  
        buttonState:undefined,
    }),
    buttonYellow:Object.seal({
        posX:0,
        posY:0,
        color:9,
       
        buttonState:undefined,
    }),
    buttonGreen:Object.seal({
        posX:0,
        posY:0,
        color:3,
        
        buttonState:undefined,
    }),
      buttonOrange:Object.seal({
        posX:0,
        posY:0,
        color:7,
     
        buttonState:undefined,
    }),
    attemptC:0,
    images:new Array(),
    gameState:undefined,
	init : function() {
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
        // initialize buttons
       //magenta button       
        
        this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
        //cyan button
            
        this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
        //green
 
        this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
        //yellow
     
        this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
           //Orange
   
        this.buttonOrange.buttonState=this.BUTTONSTATE.INACTIVE;
        //create buttons      
        this.drawButton(this.ctx,this.buttonMagenta);
        this.drawButton(this.ctx,this.buttonCyan);
        this.drawButton(this.ctx,this.buttonGreen);
        this.drawButton(this.ctx,this.buttonYellow);
        for(var i =0; i<6;i+=2){
            this.flash.flashList[i]=Math.floor(getRandom(1,5));
        }
        this.gameState=this.GAMESTATE.FLASHING;
        //mouseEvents
        this.canvas.onmousemove=this.checkMousePos.bind(this);
        this.canvas.onmousedown=this.mouseDown.bind(this);
		// start the game loop
		this.update();
	},
    update: function(){
        this.animationID=requestAnimationFrame(this.update.bind(this));
        
        this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,1480,880);
        if(this.gameState===this.GAMESTATE.FLASHING)
        {
            this.active();
            
            
            if(this.flash.counter>=this.flash.flashLength)
            {
                this.flash.counter=0;
                
                this.increment();
            }else{
               
              
                   this.flash.counter+= 5;
               
                this.fillText(this.ctx,this.flash.currentFlash,20,30,"30 Arial","red");
            }
        
        }
       debugger;
        this.drawButton(this.ctx,this.buttonMagenta);
        this.drawButton(this.ctx,this.buttonCyan);
        this.drawButton(this.ctx,this.buttonGreen);
        this.drawButton(this.ctx,this.buttonYellow);
        if(this.gameState==this.GAMESTATE.OVER)
        {
            this.ctx.fillStyle='black';
            this.fillText(this.ctx,"GAMEOVER",540,240,"30pt Arial","red");
            this.fillText(this.ctx,"click to restart",540,440,"30pt Arial","red");
            this.flash.flashList=[0,0,0,0,0,0];
             for(var i =0; i<6;i+=2){
            this.flash.flashList[i]=Math.floor(getRandom(1,5));
        }
        }
	},
    
     drawButton: function(ctx,btn)
    {
      if(btn.buttonState===this.BUTTONSTATE.INACTIVE)
      {
      ctx.save();
      ctx.drawImage(this.images[btn.color+1],btn.posX,btn.posY);
      ctx.restore();
      
      }
      else if(btn.buttonState===this.BUTTONSTATE.HOVER)
      {
      ctx.save();
      ctx.drawImage(this.images[btn.color],btn.posX,btn.posY);
      ctx.restore();
      }
      else if(btn.buttonState===this.BUTTONSTATE.DOWN)
      {
      ctx.save();
      ctx.drawImage(this.images[btn.color+1],btn.posX,btn.posY);
      ctx.restore();
      }
    },
     checkAttempt(attempt){
         if(this.flash.flashList[this.attemptC*2]==attempt)
         {
            
             return;
         }
         else{
             this.gameState=this.GAMESTATE.OVER;
         }
     },
    mouseDown:function(e)
    {
        if(this.gameState===this.GAMESTATE.OVER)
        {
            this.restart();
        }
        if(this.attemptC*2>=this.flash.flashList.length)
        {
            this.flash.flashList.push(Math.floor(getRandom(1,5)));
            this.flash.flashList.push(0);
            this.restart();
        }
       var check=this.checkMousePos(e);
       switch(check)
       {
           case 0:
           this.buttonMagenta.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(1);
           this.attemptC++;
           break;
           case 1:
           this.buttonCyan.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(2);
           this.attemptC++;
           break;
           case 2:
           this.buttonGreen.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(3);
           this.attemptC++;
           break;
           case 3:
           this.buttonYellow.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(4);
           this.attemptC++;
           break;
       }
    },
    checkMousePos: function(e)
    {
        var mouse= getMouse(e);
        //reset everything to inactive
        this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
        // within magenta 
        //input phase
        if(this.gameState===this.GAMESTATE.INPUT){
        if(mouse.x>this.buttonMagenta.posX&&mouse.x<this.buttonMagenta.posX+this.buttonMagenta.width)
        {
            
            if(mouse.y>this.buttonMagenta.posY&&mouse.y<this.buttonMagenta.posY+this.buttonMagenta.width)
            {
                this.buttonMagenta.buttonState=this.BUTTONSTATE.HOVER;
                return 0;
            }else{
                this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
            }
        }else{
            this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
        }
        // within cyan 
        if(mouse.x>this.buttonCyan.posX&&mouse.x<this.buttonCyan.posX+this.buttonCyan.width)
        {
            
            if(mouse.y>this.buttonCyan.posY&&mouse.y<this.buttonCyan.posY+this.buttonCyan.height)
            {
                this.buttonCyan.buttonState=this.BUTTONSTATE.HOVER;
                return 1;
            }else{
                this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
            }
        }else{
            this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
        }
        // within Green 
        if(mouse.x>this.buttonGreen.posX&&mouse.x<this.buttonGreen.posX+this.buttonGreen.width)
        {
            
            if(mouse.y>this.buttonGreen.posY&&mouse.y<this.buttonGreen.posY+this.buttonGreen.height)
            {
                this.buttonGreen.buttonState=this.BUTTONSTATE.HOVER;
                return 2;
            }else{
                this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
            }
        }else{
            this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
        }
        // within Yellow 
        if(mouse.x>this.buttonYellow.posX&&mouse.x<this.buttonYellow.posX+this.buttonYellow.width)
        {
            
            if(mouse.y>this.buttonYellow.posY&&mouse.y<this.buttonYellow.posY+this.buttonYellow.height)
            {
                this.buttonYellow.buttonState=this.BUTTONSTATE.HOVER;
                return 3;
            }else{
                this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
            }
        }else{
            this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
        }
      
        }
    },
    flash:Object.seal({
        flashList:[0,0,0,0,0,0],
        currentFlash:0.0,
        counter:0.0,
        flashLength:150,
       }),
    increment:function(){
            this.flash.currentFlash++;
            if(this.flash.flashList.length<this.flash.currentFlash)
            {
                this.gameState=this.GAMESTATE.INPUT;
            }   
            this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
        },
    active:function(){
           if(this.flash.flashList[this.flash.currentFlash]==0)
            {
            this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
            }
            //flashred
            
            if(this.flash.flashList[this.flash.currentFlash]==1)
            {
             this.buttonMagenta.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashBlue
            if(this.flash.flashList[this.flash.currentFlash]==2)
            {
             this.buttonCyan.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashGreen
            if(this.flash.flashList[this.flash.currentFlash]==3)
            {
             this.buttonGreen.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashYellow
            if(this.flash.flashList[this.flash.currentFlash]==4)
            {
             this.buttonYellow.buttonState=this.BUTTONSTATE.HOVER;
            }
          
        },
  
  
    
    
    // native stuff
    pauseGame: function(){
        this.paused = true;
        cancelAnimationFrame(this.animationID);
        this.update();
      
    },
    resumeGame: function(){
        cancelAnimationFrame(this.animationID);
        this.paused=false;
        this.update();
   
    },
    restart: function()
    {
 
        this.attemptC=0;
        
        this.flash.currentFlash=0.0;
        this.flash.counter=0.0;
      
       this.gameState=this.GAMESTATE.FLASHING;
    },
	toggleDebug:function()
    {
        this.debug=!this.debug;
    },
	fillText: function(ctx, string, x, y, css, color) {
		ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	drawPauseScreen:function(ctx){
		ctx.save();
		ctx.fillStyle="black";
		ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		this.fillText(ctx,"...PAUSED...",this.WIDTH/2,this.HEIGHT/2,"40pt courier","white");
		ctx.restore();
	},
	
	calculateDeltaTime: function(){
		// what's with (+ new Date) below?
		// + calls Date.valueOf(), which converts it from an object to a 	
		// primitive (number of milliseconds since January 1, 1970 local time)
		var now,fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	}
	
    
    
}; // end app.main