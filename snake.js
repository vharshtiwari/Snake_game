  var scr = document.getElementById('first');
  var c = scr.getContext('2d');

  scr.width = 800;
  scr.height =  800;

  var img =  document.getElementById('btn');
  var b = document.getElementById('initial');
  var f = document.getElementById('head');

  var myf = function(){
    	img.style.display = "none";
 	    b.style.display = "none";
    	f.style.display = "none";
 	}
 
   var direction = 'down';

   var key = {
 			number: 40
 			};
     window.addEventListener('keydown',function (e){
 	    	var code = e.which || e.keycode;
 	 		key.number = code;

 	 		if(key.number == '37'){
 	 				direction = 'left'
 	 		}
 	 		else if (key.number == '38'){
 	 			direction = 'up'
 	 		}
 	 		else if (key.number == '39'){
 	 			direction = 'right'
 	 		}
 	 		else if (key.number == '40'){
 	 			direction = 'down';
 	 		}
			});

	  var snakeSize =32, foodSize = 32 ;
  	  var arr = [];
  	  var count = 0;
  	  var check;

  	  var draw = function(){
         var length = 0;
         for (var i = 20; i>=20-length;i--){
 	        arr.push({x:i,y:0});
          }
        }

	  var foodC = {
			x : Math.floor(Math.random()*24)*32,
			y : Math.floor(Math.random()*24)*32
		 }	

      var asli = function(x,y){
 	     c.fillStyle = 'brown';
         c.fillRect(x*snakeSize ,y*snakeSize, snakeSize, snakeSize);   
         c.strokeStyle = 'white';
         c.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
 		} 
 	 var pizza = function(a,b) {
         c.fillStyle = '#D2691E';
         c.fillRect(a, b, foodSize, snakeSize);
     }
   

     var paint = function() {
        var snakeX = arr[0].x;
        var snakeY = arr[0].y;
        var rx = Math.floor(foodC.x/snakeX);
        var ry = Math.floor(foodC.y/snakeY);
     
        var createFood = function(){
    	    var foodC = {
			 x : Math.floor(Math.random()*24)*32,
			 y : Math.floor(Math.random()*24)*32
		   }
		     for (var i=0; i>arr.length; i++) {
                 var snakeX = arr[i].x;
                 var snakeY = arr[i].y;
      
                if (food.x===snakeX*rx && food.y === snakeY*ry || food.y === snakeY*ry && food.x===snakeX*rx) {
          			  food.x = Math.floor((Math.random() * 24))*25;
          			  food.y = Math.floor((Math.random() * 24))*25;
        		  }
      		    }
		        return foodC;	
		     } 
		   
		   var board =  function(){
    		  c.fillStyle = 'orange';
    		  c.fillRect(695, 21, 50,33);
    		  c.fillStyle = 'black';
    		  c.font =  " 19px roboto";
    		  c.fillText(count, 715, 44, 205);
   		    } 

	   	  var directionCheck = function(check,direction){
	   		  if(check == 'down' &&  direction == 'up'){
	   			   direction = 'down';
                   return true;
              }
             else if(check == 'up' &&  direction == 'down'){
                	direction = 'up';
              	   return true;
              }
              else if(check == 'left' &&  direction == 'right'){
              	    direction = 'left';
              	   return true;
              }
              else if(check == 'right' &&  direction == 'left'){
              	    direction = 'right';
              	    return true;
              }
	   	   }

	       var checkCollision = function(x, y, array) {
                 for(var i = 0; i < array.length; i++) {
            	     if(array[i].x === x && array[i].y === y ){
                		return true;
            	    	}
        	 		} 
        	    return false;     
			   }
		
			if(directionCheck(check,direction)){
					direction = check;
				}
	 
	   		if(direction == 'left'){
			   snakeX--;
    	 	}
 	   		else if(direction == 'up'){
			   snakeY--;
			 }
 	  		 else if(direction == 'right'){
			   snakeX++;
			 }
      		 else if(direction == 'down'){
			   snakeY++;
     	   	 }
			
			myf();
     	
     		if(checkCollision(snakeX,snakeY,arr) || snakeX > 24 || snakeY >24 || snakeY<0 || snakeX<0){
     			  clearTimeout(framerate);
     			  c.clearRect(0,0,800,800);
     			  location.reload();
     			  return;
  			   	}

 			if(snakeX == foodC.x/32 && snakeY == foodC.y/32){	
					var tail = { x: snakeX, y : snakeY };
					createFood();
					count++;
					foodC = createFood();
				}
	     	else{
	  	      		var tail = arr.pop(); 
          	 	 	tail.x = snakeX; 
          	 	 	tail.y = snakeY;          	
             	}	
         
         	arr.unshift(tail);

        	for(var i=0; i< arr.length; i++ ){
         		asli((arr[i].x),(arr[i].y));
         		}
		
			pizza(foodC.x,foodC.y);
			board();

			check =direction;
			
			var clearScr = function() {
	   			c.clearRect(0, 0, scr.width, scr.height);
	   			paint();
	   			}
	      
	      	var speed = 110 -2*count;
	      		if(speed<=50){
	      		speed = 50;
	      	} 
	 	  	var framerate = setTimeout(clearScr, speed);

   	 }	 

			var init = function(){
				draw();
				paint();	
			}
