var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor (0xffffff, 1);
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

var queue = new Dequeue();

firstcube = cube.clone();
scene.add( firstcube );
queue.push(firstcube);

var render = function () {
  setTimeout( function() {

        requestAnimationFrame( render );

    }, 1000 / 6);
  // cube.position.x = pos.x;
  // cube.position.y = pos.y;
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

render();