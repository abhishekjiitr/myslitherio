var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor (0xf2fdff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// fucking mod bug
function mod(n, m) {
        return ((n % m) + m) % m;
}
var pos = new Object;

var food = new Object;
food.x = 1;
food.y = 1;
function eat(x, y)
{
	return x == food.x && y == food.y;
}
function collision(list, pos)
{
	var ptr = list._head;
	ptr = ptr._next	;
	while ( ptr != null )
	{
		mynode = ptr._data;
		// console.log("HALO: "+mynode);
		if ( mynode != null )
		{	
			// console.log(pos);
			// console.log(mynode.position);
			if ( mynode.position.x - cside/2 == pos.x && mynode.position.y - cside/2 == pos.y)
				return 1;
		}
		ptr = ptr._next;
	}
	return 0;
}
function seq(list){
        var ptr = list._head;
        while ( ptr._next )
        {
          ptr = ptr._next;
          if ( ptr != null)
          {
          	mydata = ptr._data;
            console.log(mydata.positon);
          }
        }
      };
var direction = "up";
var cside = 1;
var geometry = new THREE.BoxGeometry( cside, cside, cside );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
cube.position.x += cside / 2;
cube.position.y += cside / 2;
pos.x = 0;
pos.y = 1;

	// scene.add( cube.clone() );
var keyboard = new THREEx.KeyboardState();

// generate a grid!
var planeW = 8; // number of squares in x
var planeH = 8; // number of squares in y
var numW = 1; // width of each square 
var numH = 1; // length of each square
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
    new THREE.MeshBasicMaterial( {
        color: 0x000000,
        wireframe: true
    } )
);
plane.position.x += planeW/2;
plane.position.y += planeH/2;
scene.add(plane);

controls = new THREE.OrbitControls( camera, renderer.domElement );


camera.position.set( -planeW * numH/3, -planeH * numW/3, 10); // to get a better view of game
camera.rotation.x += 30 * Math.PI / 180;
camera.rotation.y -= 20 * Math.PI / 180;
camera.rotation.z -= 10 * Math.PI / 180;

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( -1, -1, -1 );
scene.add( directionalLight );
var queue = new Dequeue();
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 1, 1, 1 );
scene.add( directionalLight );
var queue = new Dequeue();

firstcube = cube.clone();
scene.add( firstcube );
queue.push(firstcube);

// add some food
var r = 0.5;
var geometry = new THREE.SphereGeometry( r, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
var render = function () {
  setTimeout( function() {

        requestAnimationFrame( render );

    }, 1000 / 6);
  // cube.position.x = pos.x;
  // cube.position.y = pos.y;
  sphere.position.x = food.x + r;
  sphere.position.y = food.y + r;
  if ( collision(queue, pos) )
	{
		console.log("GAME OVER");
	}

  copy = cube.clone();
  copy.position.x += pos.x;
  copy.position.y += pos.y;
  queue.push(copy);
  scene.add(copy);
  // take input 
  
  if ( !eat(pos.x, pos.y) )
  	{
  		last = queue.shift();
  		scene.remove(last);
  		// queue.pop();
  	}
  else
  	{
  		console.log("EAT");
  		newloc = getFreeLocation(queue);
  		food.x = newloc.x;
  		food.y = newloc.y;
  	}
  if ( keyboard.pressed("up") )
  	{
  		direction = "up";
  	}
  if ( keyboard.pressed("down") )
    {
    	direction = "down";
    }
  if ( keyboard.pressed("left") )
    {
    	direction = "left";
    }
  if ( keyboard.pressed("right") )
    {
    	direction = "right";
    }	
  // console.log(pos.x+ " : "+ pos.y);
  if ( direction == "up" )
  	{
  		pos.y = mod(pos.y + 1, planeH);
  	}
  if ( direction == "down" )
  	{
  		pos.y = mod(pos.y-1, planeH);
  	}
  if ( direction == "left" )
  	{
  		pos.x = mod(pos.x-1, planeW);
  	}
  if ( direction == "right" )
  	{
  		pos.x = mod(pos.x+1, planeW);
  	}
    // cube.rotation.x += 0.1;
	    
  renderer.render( scene, camera );
};
foodpt = getFreeLocation(queue);
food.x = foodpt.x;
food.y = foodpt.y;
render();
function presentIn(list, x, y)
{
	for(var i = 0 ; i < list.length ; i++)
	{
		var listpt = list[i];
		if ( listpt.x == x && listpt.y == y )
			return 1;
	}
	return 0;
}
function getFreeLocation(list)
{
	positions = []
	var ptr = list._head;
	ptr = ptr._next	;
	while ( ptr != null )
	{
		mynode = ptr._data;
		// console.log("HALO: "+mynode);
		if ( mynode != null )
		{	
			// console.log(pos);
			// console.log(mynode.position);
			if ( mynode.position.x - cside/2 == pos.x && mynode.position.y - cside/2 == pos.y)
				{
					var x = mynode.position.x - cside/2;
					var y = mynode.position.y - cside/2;
					var position = new Object();
					position.x = x;
					position.y = y;
					positions.push(position);
				}
		}
		ptr = ptr._next;
	}

	rx = mod(Math.floor(Math.random()*planeW), planeW);
	ry = mod(Math.floor(Math.random()*planeW), planeH);
	console.log(rx + " : " + ry);
	for(var i = 0 ; i < planeW ; i++)
	{
		for ( var j = 0 ; j < planeH ; j++ )
		{
			var posx = mod(rx+i, planeW);
			var posy = mod(ry+j, planeH);
			mypos = new Object();
			mypos.x = posx;
			mypos.y = posy; 
			if ( !presentIn(positions, posx, posy) )
				return mypos;
		}
	}
	var mypos = new Object();
	mypos.x = -1;
	mypos.y = -1;
	return mypos; 
}