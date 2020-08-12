import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/scifi_platform_BG1.jpg";
import tiles from "../assets/scifi_platformTiles_32x32.png";
import star from "../assets/star.png"
import platform from "../assets/platform.png";
import { accelerate, decelerate } from "../utils";

let box;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    // this.load.spritesheet('tiles', tiles, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // });

    // this.load.image("knight", knight)

    this.load.image("star", star);
    this.load.image("platform", platform);
  },
  create: function create() {
    this.add.image(400, 300, "background");
    let plat1 = this.add.image(400, 300, "platform");
    plat1.scaleX = 0.2;
    plat1.scaleY = 0.2;
    // plat2 = this.add.image(400, 300, "platform");
    // plat3 = this.add.image(400, 300, "platform");
    // plat4 = this.add.image(400, 300, "platform");


    // const stars = this.physics.add.group({
    //   key: 'star',
    //   repeat: 5,
    //   setScale: { x: 0.2, y: 0.2 },
      // setXY: { x:400, y: 300 }
    // });
    // debugger;


    // stars.children.iterate(function (child) {
    //   debugger;
    //   // child.setXY(400, 300)
    //   // child.body.x = 400
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setVelocityX(150 - Math.random() * 300);
    //   child.setVelocityY(150 - Math.random() * 300);
    //   child.setBounce(1, 1);
    //   child.setCollideWorldBounds(true);
    // });

    // let firstX = 100;
    // for(let i = 0; i < stars.children.entries.length; i++){
      // let curChild = stars.children.entries[i];
      // curChild.setX(400, 300);
      // curChild.body.x = 100 + (i * 50);
      // curChild.body.y = 100;
      // curChild.body.x = 400;
      // curChild.body.y = 400;
      // curChild.setVelocityX(0);
      // curChild.setAccelerationY(-1000);
      // curChild.setVelocityY(0);
      // curChild.body.x = firstX + (i * 50);
      // curChild.body.y = 100;
      // curChild.body.velocity.y = -1000;
    // }

    cursors = this.input.keyboard.createCursorKeys();


    // box = this.physics.add.image(400, 100, "tiles", 15);
    box = this.physics.add.image(400, 100, "knight", 15);


    // const processCollision = (box, star) => {
    //   star.destroy();
    //   const starsLeft = stars.countActive();
    //   if (starsLeft === 0) {
    //     this.scene.start('winscreen');
    //   }
    // }

    // this.physics.add.collider(
    //   stars,
    //   box,
    //   processCollision,
    //   null,
    //   this
    // );

    const platformProcessCollision = (box, platform) => {
      // star.destroy();
      // const starsLeft = stars.countActive();
      // if (starsLeft === 0) {
        // this.scene.start('winscreen');
      // }
      box.body.acceleration.y = -1000;
    }

    this.physics.add.collider(
      platforms,
      box,
      platformProcessCollision,
      null,
      this
    );



    // box.setBounce(1, 1);
    box.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = box.body;
    box.has_jumped = false;
    let upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    debugger;

    // if (cursors.space.isDown) {
    //   const x = decelerate(velocity.x);
    //   const y = decelerate(velocity.y);
    //   box.setVelocity(x, y)
    // }

    // if(Phaser.Input.Keyboard.JustDown(spacebar)){
    //   velocity.y = -300;
    // }


    // if (cursors.up.isDown) box.setVelocityY(accelerate(velocity.y, -1));
    // if (cursors.up.isDown){
    //   if(!box.has_jumped){
    //     velocity.y = -300;
    //     box.has_jumped = true;
    //   }
    // };

    if(Phaser.Input.Keyboard.JustDown(upArrow)){
      velocity.y = -450;
    }

    if (cursors.right.isDown) {
      if(box.body.velocity.x < 0){
        box.body.velocity.x = 0
      }
      box.setVelocityX(accelerate(velocity.x, 2));
      // console.log(box.body.velocity.x);
    };

    if (cursors.down.isDown) box.setVelocityY(accelerate(velocity.y, 2));

    if (cursors.left.isDown){
      if(box.body.velocity.x > 0){
        box.body.velocity.x = 0
      }

      box.setVelocityX(accelerate(velocity.x, -2));

      if(box.body.velocity.x < -300){
        box.body.velocity.x = -300;
      }
      // console.log(box.body.velocity.x);
    };

    if(box.body.velocity.x > 0){
      box.body.velocity.x -= 5;
    }else if(box.body.velocity.x < 0){
      box.body.velocity.x += 5;
    }

  }
});