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
     backgroundPad:Object.seal({
        posX:0,
        posY:0,
        color:0,
     }),
    sButtonHover:false,  
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
       
        this.drawButton(this.ctx,this.backgroundPad); 
        this.drawButton(this.ctx,this.buttonMagenta);
        this.drawButton(this.ctx,this.buttonCyan);
        this.drawButton(this.ctx,this.buttonGreen);
        this.drawButton(this.ctx,this.buttonYellow);
        this.drawButton(this.ctx,this.buttonOrange);
              
        for(var i =0; i<6;i+=2){
            this.flash.flashList[i]=Math.floor(getRandom(1,6));
        }
        this.gameState=this.GAMESTATE.BEGIN;
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
       if(this.gameState===this.GAMESTATE.BEGIN)
       {
           this.ctx.globalAlpha=0.3;
       }
       else{
           this.ctx.globalAlpha=1;
       }
       debugger;
        this.drawButton(this.ctx,this.backgroundPad); 
        this.drawButton(this.ctx,this.buttonMagenta);
        this.drawButton(this.ctx,this.buttonCyan);
        this.drawButton(this.ctx,this.buttonGreen);
        this.drawButton(this.ctx,this.buttonYellow);
        this.drawButton(this.ctx,this.buttonOrange);
          if(this.gameState===this.GAMESTATE.BEGIN)
        {
             this.ctx.globalAlpha=1;
             this.fillText(this.ctx,"Prototype Start Screen Lacks Title",500,240,"30pt Arial","red");
             if(this.sButtonHover)
             {
                   this.ctx.fillStyle="black"
                   this.ctx.strokeStyle="white"
             this.ctx.fillRect(730,440,100,25);
             this.ctx.strokeRect(730,440,100,25);
             this.fillText(this.ctx,"Start",755,460,"18pt Arial","white");
             }else{
             this.ctx.fillStyle="white"
             this.ctx.fillRect(730,440,100,25);
             this.fillText(this.ctx,"Start",755,460,"18pt Arial","black");
             }
        }
         if(this.attemptC*2>=this.flash.flashList.length)
        {
            this.flash.flashList.push(Math.floor(getRandom(1,6)));
            this.flash.flashList.push(0);
            this.restart();
        }       
        if(this.gameState==this.GAMESTATE.OVER)
        {
            this.ctx.fillStyle='black';
            this.fillText(this.ctx,"GAMEOVER",540,240,"30pt Arial","red");
            this.fillText(this.ctx,"click to restart",540,440,"30pt Arial","red");
            this.flash.flashList=[0,0,0,0,0,0];
             for(var i =0; i<6;i+=2){
            this.flash.flashList[i]=Math.floor(getRandom(1,6));
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
      else{
      ctx.save();
      ctx.drawImage(this.images[btn.color],btn.posX,btn.posY);
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
        if(this.gameState===this.GAMESTATE.BEGIN)
        {
            
        }
        if(this.gameState===this.GAMESTATE.OVER)
        {
            this.restart();
        }
        if(this.attemptC*2>=this.flash.flashList.length)
        {
            this.flash.flashList.push(Math.floor(getRandom(1,6)));
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
           this.buttonYellow.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(2);
           this.attemptC++;
           break;
           case 2:
           this.buttonGreen.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(3);
           this.attemptC++;
           break;
           case 3:
           this.buttonCyan.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(4);
           this.attemptC++;
           break;
           case 4:
           this.buttonOrange.buttonState=this.BUTTONSTATE.DOWN;
           this.checkAttempt(5);
           this.attemptC++;
           break;
           case 25:
           this.gameState=this.GAMESTATE.FLASHING;
           break;
       }
    },
    checkMousePos: function(e)
    {
        var mouse= getMouse(e);
        //reset everything to inactive
        if(this.gameState===this.GAMESTATE.BEGIN){
         
            if(mouse.x>730&& mouse.x<830 && mouse.y>440 && mouse.y<465)
            {
            this.sButtonHover=true;
            return 25;
            }else{
                this.sButtonHover=false;
            }
        }
        this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
        this.buttonOrange.buttonState=this.BUTTONSTATE.INACTIVE;
        // within magenta 
        //input phase
        if(this.gameState===this.GAMESTATE.INPUT){
       
                var x = 215+this.buttonMagenta.posX;
                var y = 450+this.buttonMagenta.posY;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(x,y);
                this.ctx.quadraticCurveTo(x+50,y+175,x+295,y+195);
                this.ctx.lineTo(x+295,y+95);
                this.ctx.quadraticCurveTo(x+170,y+85,x+145,y)
                this.ctx.closePath();
                if(this.ctx.isPointInPath(mouse.x,mouse.y))
                 {
                this.ctx.restore();
                this.buttonMagenta.buttonState=this.BUTTONSTATE.HOVER;
                return 0;
                 }

        // within yellow 
       
                 x = 210+this.buttonYellow.posX;
                 y = 420+this.buttonYellow.posY;
                this.ctx.beginPath();
                this.ctx.moveTo(x,y);
                this.ctx.quadraticCurveTo(x+55,y-165,x+300,y-185);
                this.ctx.lineTo(x+300,y-90);
                this.ctx.quadraticCurveTo(x+175,y-85,x+150,y);
                this.ctx.closePath();
                if(this.ctx.isPointInPath(mouse.x,mouse.y)){
                this.buttonYellow.buttonState=this.BUTTONSTATE.HOVER;
                return 1;
                 }
        // within Green 
                 x = 522+this.buttonGreen.posX;
                 y = 440+this.buttonGreen.posY;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.ellipse(x,y,131,85,0,Math.PI*2,false);
                this.ctx.closePath();
                if(this.ctx.isPointInPath(mouse.x,mouse.y))
                {
                this.ctx.restore();
                this.buttonGreen.buttonState=this.BUTTONSTATE.HOVER;
                return 2;
                }
        // within cyan 
       
                 x = 535+this.buttonCyan.posX;
                 y = 240+this.buttonCyan.posY;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(x,y);
                this.ctx.quadraticCurveTo(x+235,y,x+300,y+180);
                this.ctx.lineTo(x+150,y+180);
                this.ctx.quadraticCurveTo(x+135,y+100,x,y+90);
                this.ctx.closePath();
                if(this.ctx.isPointInPath(mouse.x,mouse.y)){                   
                this.ctx.restore()
                this.buttonCyan.buttonState=this.BUTTONSTATE.HOVER;
                return 3;
                }
           //within orange
         
       
                 x = 535+this.buttonOrange.posX;
                 y = 650+this.buttonOrange.posY;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(x,y);
                this.ctx.quadraticCurveTo(x+245,y-20,x+300,y-200);
                this.ctx.lineTo(x+150,y-200);
                this.ctx.quadraticCurveTo(x+120,y-110,x,y-100)
                this.ctx.closePath();
                if(this.ctx.isPointInPath(mouse.x,mouse.y))
                {
                this.ctx.restore();
                this.buttonOrange.buttonState=this.BUTTONSTATE.HOVER;
                return 4;
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
            this.buttonOrange.buttonState=this.BUTTONSTATE.INACTIVE;
        },
    active:function(){
           if(this.flash.flashList[this.flash.currentFlash]==0)
            {
            this.buttonMagenta.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonCyan.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonGreen.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonYellow.buttonState=this.BUTTONSTATE.INACTIVE;
            this.buttonOrange.buttonState=this.BUTTONSTATE.INACTIVE;
            }
            //flashred
            
            if(this.flash.flashList[this.flash.currentFlash]==1)
            {
             this.buttonMagenta.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashYellow
            if(this.flash.flashList[this.flash.currentFlash]==2)
            {
             this.buttonYellow.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashGreen
            if(this.flash.flashList[this.flash.currentFlash]==3)
            {
             this.buttonGreen.buttonState=this.BUTTONSTATE.HOVER;
            }
             //flashYellow
            if(this.flash.flashList[this.flash.currentFlash]==4)
            {
             this.buttonCyan.buttonState=this.BUTTONSTATE.HOVER;
            }
          
           //flashYellow
            if(this.flash.flashList[this.flash.currentFlash]==5)
            {
             this.buttonOrange.buttonState=this.BUTTONSTATE.HOVER;
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