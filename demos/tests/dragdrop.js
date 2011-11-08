var engine = new PFPlay.Engine();
var cybertron = new PFPlay.Scene({name: 'Cybertron'});

var world = new PFPlay.Layer({name: 'layer', x : 320, y : 240});
world.zindex = 2;
world.events.bind('mousemove', function(evt) { 
  var debugPos = document.getElementById('mousep');
  debugPos.innerText = evt.world.x + ', ' + evt.world.y;
});

world.events.bind('keydown', function(evt) {
  var debugKey = document.getElementById('kdown');
  debugKey.innerText = evt.key + '[' + evt.keyCode + ']';
});

var dropArea = new PFPlay.Sprite({src: '../img/grid.png'});
dropArea.dropAcceptEnabled = true;
dropArea.events.bind('dragenter', function(evt) {
  var console = document.getElementById('console2');
  console.innerText = "Drag Enter - " + evt.world.x + " " + evt.world.y;
});
dropArea.events.bind('dragover', function(evt) {
  var console = document.getElementById('console2');
  console.innerText = "Drag Over - " + evt.world.x + " " + evt.world.y;
});
dropArea.events.bind('dragexit', function(evt) {
  var console = document.getElementById('console2');
  console.innerText = "Drag Exit - " + evt.world.x + " " + evt.world.y;
});

var dragBox = new PFPlay.Sprite({src: '../img/blue_square.png'});
dragBox.dragDropEnabled = true;
dragBox.events.bind('dragstart', function(evt) {
  var console = document.getElementById('console');
  console.innerText = "Drag Start - " + evt.world.x + " " + evt.world.y;
});
dragBox.events.bind('dragdrop', function(evt) {
  var console = document.getElementById('console');
  console.innerText = "Drag Drop - " + evt.world.x + " " + evt.world.y;
});

var dragAccept = new PFPlay.Sprite({src: '../img/green_square.png'});
var dragRevoke = new PFPlay.Sprite({src: '../img/red_square.png'});

function loop(sceneManager)
{ 
  var debugTime = document.getElementById('time');
  debugTime.innerText = engine.masterTime;
}

function gameGo()
{
  dragBox.position = {x: 35, y: 325};
  dragBox.dragMoveEnabled = true;
  dropArea.position = {x: 400, y: 150};
  dragAccept.visible = false;
  dragRevoke.visible = false;

  world.addNode(dropArea);
  world.addNode(dragBox);
  world.addNode(dragAccept);
  world.addNode(dragRevoke);
  
  cybertron.addLayer(world);
  
  engine.scenes.addScene(cybertron);
  engine.scenes.activateScene(cybertron);
  
  engine.go(20, loop);
}