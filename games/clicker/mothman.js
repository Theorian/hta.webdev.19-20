

var dps = 0;

var cats = 0;
var hauntedForest = 0;
var intruders = 0;






function buyHauntedForest() {
  var forestCost = 10000;
  if (dollars >= forestCost) {
    hauntedForest = hauntedForest + 1;
    dollars = dollars - forestCost;
    document.getElementById("hauntedForest").innerHTML = hauntedForest;
    document.getElementById("dollars").innerHTML = dollars;
  };
};



function preload() {
  this.load.spritesheet("ShadowCat", "C:\Users\Student\Desktop\coding\ShadowCat.png", {
    frameWidth: 64,
    frameHeight: 64
  });

function create() {

  player.scaleY = 1;
  player.scaleX = 1;

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("ShadowCat", { start: 0, end: 4 }),
    frameRate: 16,
    repeat: -1
  })}}

  function update() {
    player.setVelocity(0);
  
    if (cats > 1) {
      player.anims.play("idle", true)}}