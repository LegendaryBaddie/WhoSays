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
        posX:200,
        posY:1,
        color:5,
     
        buttonState:undefined,
    }),
    buttonCyan:Object.seal({
        posX:200,
        posY:0,
        color:1,
  
        buttonState:undefined,
    }),
    buttonYellow:Object.seal({
        posX:200,
        posY:0,
        color:9,
       
        buttonState:undefined,
    }),
    buttonGreen:Object.seal({
        posX:200,
        posY:0,
        color:3,
        
        buttonState:undefined,
    }),
      buttonOrange:Object.seal({
        posX:200,
        posY:0,
        color:7,
     
        buttonState:undefined,
    }),
     backgroundPad:Object.seal({
        posX:200,
        posY:0,
        color:0,
     }),
    sButtonHover:false,  
    attemptC:0,
    images:new Array(),
    ALAN:Object.seal({
        posX:0,
        posY:0,
        alanCounter:0,
        alanGIF:new Array(),
        active:false,
    }),
    MOTORCYCLE:Object.seal({
        posX:0,
        posY:0,
        motoCounter:0,
        motoGIF:new Array(),
        active:false,
    }),
    RABBIT:Object.seal({
        posX:0,
        posY:0,
        rabbitCounter:0,
        rabbitGIF:new Array(),
        active:false,
    }), 
    DEMON:Object.seal({
    demonGIF:new Array(),
    demonCounter:0,
    active:false,
    lastMouse:undefined,
    posX:0,
    posY:0,
    veloX:0,
    veloY:0,
    accX:0,
    accY:0,
    }),
    frameSlower:0,
    bouncingBoard:false,
    bouncingChangeX:1,
    bouncingChangeY:1,
    gameState:undefined,
	init : function() {
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.getElementById('c1');
		this.ctx = this.canvas.getContext('2d');
        this.canvas2 = document.getElementById('c2');
        this.ctx2=this.canvas2.getContext('2d');
        
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
               
                this.fillText(this.ctx,this.flash.currentFlash,20,30,"30 Titillium Web","red");
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
             this.fillText(this.ctx,"Simon Says:Distract & Destroy",500,240,"30pt Titillium Web","red");
             if(this.sButtonHover)
             { 
                   this.ctx.fillStyle="black"
                   this.ctx.strokeStyle="white"
             this.ctx.fillRect(730,440,100,25);
              this.ctx.strokeRect(730,440,100,25);
             this.fillText(this.ctx,"Start",755,460,"18pt Titillium Web","white");
             }else{
             this.ctx.fillStyle="white"
             this.ctx.fillRect(730,440,100,25);
             this.fillText(this.ctx,"Start",755,460,"18pt Titillium Web","black");
             }
             return;
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
            this.fillText(this.ctx,"GAMEOVER",540,240,"30pt Titillium Web","red");
            this.fillText(this.ctx,"click to restart",540,440,"30pt Titillium Web","red");
            this.flash.flashList=[0,0,0,0,0,0];
             for(var i =0; i<6;i+=2){
            this.flash.flashList[i]=Math.floor(getRandom(1,6));
            this.bouncingBoard=false;
            this.DEMON.active=false;
            this.RABBIT.active=false;
            this.MOTORCYCLE.active=false;
            this.ALAN.active=false;
        }
        }
        this.fillText(this.ctx,this.attemptC,1320,100,"70pt Titillium Web","red");
        this.fillText(this.ctx,"/"+this.flash.flashList.length/2,1380,100,"70pt Titillium Web","red");
      
        this.animateGifs();
	},

    animateGifs: function()
    {
        
        
       if(this.flash.flashList.length/2>6)
       {this.DEMON.active=true;}
    
        if(this.flash.flashList.length/2>7)
       {this.RABBIT.active=true;}
    
        if(this.flash.flashList.length/2>10)
       {this.MOTORCYCLE.active=true;
        this.RABBIT.active=false;}
       
    
        if(this.flash.flashList.length/2>13)
       {this.ALAN.active=true;
        this.MOTORCYCLE.active=false; }
    
       
        //if motorcycle is active
        if(this.MOTORCYCLE.active&&this.gameState===this.GAMESTATE.FLASHING)
        {
            this.ctx.drawImage(this.MOTORCYCLE.motoGIF[this.MOTORCYCLE.motoCounter],0,200);
            if(this.frameSlower==5)
            {
                this.MOTORCYCLE.motoCounter++;
            }
            if(this.MOTORCYCLE.motoCounter>18)
            {
                this.MOTORCYCLE.motoCounter=0;
            }
            
        }   
        
        //if rabbit is active
        if(this.RABBIT.active&&this.gameState===this.GAMESTATE.FLASHING)
        {
            this.ctx.drawImage(this.RABBIT.rabbitGIF[this.RABBIT.rabbitCounter],400,75);
            if(this.frameSlower==5)
            {
                this.RABBIT.rabbitCounter++;
            }
            if(this.RABBIT.rabbitCounter>31)
            {
                this.RABBIT.rabbitCounter=0;
            }
        }
       
        //if alan is active
        if(this.ALAN.active&&this.gameState===this.GAMESTATE.FLASHING)
        {
         this.ctx.drawImage(this.ALAN.alanGIF[this.ALAN.alanCounter],60,100);
         if(this.frameSlower==5)
         {
             this.ALAN.alanCounter++;
         }   
         if(this.ALAN.alanCounter>102)
         {
             this.ALAN.alanCounter=0;
         }
        }
        //if demon is active 
        if(this.DEMON.active)
        {
        var leng=this.seek(this.DEMON.lastMouse.x,this.DEMON.lastMouse.y);
        this.DEMON.veloX+=this.DEMON.accX;
        this.DEMON.veloY+=this.DEMON.accY;
        if(this.DEMON.veloX>0){
        this.DEMON.veloX-=this.DEMON.veloX*.01;
        }
        if(this.DEMON.veloY>0){
        this.DEMON.veloY-=this.DEMON.veloY*.01;
        }
        if(this.DEMON.veloX>10)
        {
            this.DEMON.veloX=10;
        }
         if(this.DEMON.veloY>10)
        {
            this.DEMON.veloY=10;
        }
           
        this.DEMON.posX+=this.DEMON.veloX;
        this.DEMON.posY+=this.DEMON.veloY;
        this.ctx2.save();
         
         this.ctx2.translate(-430,-100);
       
         if(this.DEMON.lastMouse.x>this.DEMON.posX+130)
        {
          this.ctx2.scale(-1,1);
          this.ctx2.translate(-this.canvas.width,0);
        }
      
        this.ctx2.drawImage(this.DEMON.demonGIF[this.DEMON.demonCounter],0,0);
        this.ctx.drawImage(this.canvas2,this.DEMON.posX-150,this.DEMON.posY-230);
        this.ctx2.clearRect(0,0,1000,1000);
        this.ctx2.restore();
        this.ctx2.clearRect(0,0,1000,1000);       
        if(this.frameSlower==5)
        {
        this.DEMON.demonCounter++;
        }
        //explosion starts at frame 45
        //chase starts at 15
        
        if(leng >500){
            if(this.DEMON.demonCounter>14)
                {
            this.DEMON.demonCounter=0;
             }
        }
        else{
             if(this.DEMON.demonCounter>44)
                {
            this.DEMON.demonCounter=15;
             }
        }
        
        
        }
        this.frameSlower++;
        if(this.frameSlower>5)
        {
            this.frameSlower=0;
        }
    },
     seek:function(xPos,yPos)
     {
       var desiredx = xPos- this.DEMON.posX;  
       var desiredy = yPos -this.DEMON.posY;
       var leng= Math.sqrt((desiredx*desiredx)+(desiredy*desiredy));
        desiredx /=leng;
        desiredy /=leng;
        
        this.DEMON.accX=desiredx*.1;
        this.DEMON.accY=desiredy*.1;
        return leng;
     },
     drawButton: function(ctx,btn)
    {
        if(this.flash.flashList.lengh>5){this.bouncingBoard=true;}
        if(this.bouncingBoard)
        {
            btn.posX+=1*this.bouncingChangeX;
            btn.posY+=1*this.bouncingChangeY;
         
            if(btn.posX>610){
                this.bouncingChangeX=-1;
                btn.posX-=1;
            }
            if(btn.posY>205){
            this.bouncingChangeY=-1;
            btn.posY-=1;
            }
            if(btn.posX<-180)
            {
                this.bouncingChangeX=1;
                btn.posX+=1;
            }
            if(btn.posY<-200)
            {
                this.bouncingChangeY=1;
                btn.posY+=1;
            }
        }
        
        
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
        this.DEMON.lastMouse=mouse;
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