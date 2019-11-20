import { Button } from './Button.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('btn_enabled', 'assets/btn_enabled.png')
    this.load.image('btn_disabled', 'assets/btn_disabled.png')
    this.load.image('btn_rollover', 'assets/btn_rollover.png')
    this.load.image('bg', 'assets/bg.png')
    this.load.image('speech', 'assets/speech.png')

    this.load.spritesheet("narrator", "assets/bap.png", {
      frameWidth: 288,
      frameHeight: 288
    });

    this.load.spritesheet("cat", "assets/ShadowCat.png", {
      frameWidth: 160,
      frameHeight: 160
    });


  }

  create() {
    this.header = this.add.rectangle(this.scale.width / 2, 25 + 50, this.scale.width - 40, 50, 0x333333);
    this.header.setOrigin(0.5)

    this.dollars = (localStorage.getItem('dollars')) ? JSON.parse(localStorage.getItem('dollars')) : 0;
    this.dollarsText = this.add.text(25, 55, "$0");
    this.dollarButton = new Button(this, 100, 130, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Find money')
    this.dollarButton.setCallback(this.incrementDollars, this)
    this.updateDollarsText()

    this.knives = (localStorage.getItem('knives')) ? JSON.parse(localStorage.getItem('knives')) : 0;;
    this.knivesText = this.add.text(25, 80, "");
    this.knifeButton = new Button(this, this.scale.width - 100, 130, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Buy knife')
    this.knifeButton.setCallback(this.incrementKnives, this)
    if (this.knives > 0) this.updateKnivesText()

    this.mugButton = new Button(this, this.scale.width - 100, 190, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Mug some(thing,one)', '10px')
    this.mugButton.setCallback(this.mug, this)

    this.bg = this.add.sprite(this.scale.width, this.scale.height + 50, "bg");
    this.bg.setOrigin(.5, 1)
    this.bg.setScale(4)

    this.speech = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "speech");
    this.speech.setScale(4)
    this.speech.setAlpha(.5)

    this.progressStep = (localStorage.getItem('progressStep')) ? JSON.parse(localStorage.getItem('progressStep')) : 0;;

    this.resetButton = new Button(this, this.scale.width - 80, this.scale.height - 30, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Reset Game')
    this.resetButton.setCallback(() => {
      localStorage.removeItem('dollars')
      localStorage.removeItem('knives')
      localStorage.removeItem('progressStep')

      this.progressStep = 0
      this.knives = 0
      this.dollars = 0
      this.scene.start('StartScene');
    }, this)

    if (this.dollars == 0) this.incrementDollars()


    this.narratorText = "It doesn't look like you have \n"
    this.narratorText += "many options. Here's $" + this.dollars + " since\n"
    this.narratorText += "you look like you need it more\n"
    this.narratorText += "than me. You should probably\n"
    this.narratorText += "find a way to get some more \n"
    this.narratorText += "money. That way you can get out\n"
    this.narratorText += "of this terrible place.\n"
    this.speechText = this.add.text(40, 255, this.narratorText);

    this.anims.create({
      key: "narrator",
      frames: this.anims.generateFrameNumbers("narrator"),
      frameRate: 30,
      repeat: -1
    });

    this.narrator = this.add.sprite(0, this.scale.height, "narrator");
    this.narrator.setOrigin(0, 1)

    this.narrator.play("narrator");


    this.anims.create({
      key: "cat",
      frames: this.anims.generateFrameNumbers("cat"),
      frameRate: 5,
      repeat: -1
    });

    this.cat = this.add.sprite(0, this.scale.height, "cat");
    this.cat.setOrigin(0, 1)

  
    if (this.progressStep > 3) {
      this.speech.setAlpha(0)
      this.narrator.setAlpha(0)
      this.speechText.setAlpha(0)
    } else {
      this.cat.setAlpha(0)
    }

    // this.narrator.setScale(0.5,0.5);
    this.cat.play("cat");

    this.tweenNarrator = this.tweens.add({
      targets: [this.narrator, this.speech, this.speechText],
      alpha: { from: 1, to: 0 },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      delay: 1000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      paused: true,
      onComplete: () => {
        this.progressStep = 4
      },
      onCompleteScope: this
    });


    this.tweenCat = this.tweens.add({
      targets: this.cat,
      alpha: { from: 0, to: 1 },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      delay: 1200,
      repeat: 0,            // -1: infinity
      yoyo: false,
      paused: true
    });

    this.input.on('pointerdown', function (pointer) {
      this.updateScreen()
    }, this);

    this.updateScreen()

  }

  updateScreen() {
    if (this.dollars >= 10) {

      this.progressStep = (this.progressStep == 0) ? 1 : this.progressStep

      this.knifeButton.setVisible(true)
    } else {
      this.knifeButton.setVisible(false)
    }

    if (this.knives >= 1) {
      this.mugButton.setVisible(true)
    } else {
      this.mugButton.setVisible(false)
    }

    this.progressStep = (this.dollars > 100 && this.progressStep <= 1) ? 2 : this.progressStep

    this.progressStep = (this.dollars > 200 && this.progressStep <= 2) ? 3 : this.progressStep

    switch (this.progressStep) {
      case 1:
        localStorage.setItem('progressStep', 1)
        this.narratorText = "Look at you! It's not much.\n"
        this.narratorText += "But it looks like you have\n"
        this.narratorText += "enough to buy a cheap knife.\n"
        this.narratorText += "I'm not recommending anything.\n"
        this.narratorText += "But you have to find a way \n"
        this.narratorText += "to leave this slum.\n"
        this.speechText.setText(this.narratorText);
        break;
      case 2:
        localStorage.setItem('progressStep', 2)
        this.narratorText = "I don't want to know how you\n"
        this.narratorText += "did it. But you seem have \n"
        this.narratorText += "more money! \n\nWatch out, I saw "
        this.narratorText += "a shadow cat \nlurking around. "
        this.narratorText += "They love \nmoney. They'll "
        this.narratorText += "take your's and \neveryone else's.\n"
        this.speechText.setText(this.narratorText);
        break;
      case 3:
        localStorage.setItem('progressStep', 3)
        this.narratorText = "OMG there it is! \n"
        this.narratorText += "I'm leaving\n"
        this.speechText.setText(this.narratorText)
        this.tweenNarrator.play()
        this.tweenCat.play()
        this.dollars = 0;
        this.updateDollarsText()
        break;
      case 4:
        localStorage.setItem('progressStep', 4)
        break;
    }
  }

  incrementDollars() {
    this.dollars += Phaser.Math.Between(1, 3);
    localStorage.setItem('dollars', this.dollars);
    this.updateDollarsText()
  }

  incrementKnives() {
    if (this.dollars >= 10) {
      this.dollars -= 10
      localStorage.setItem('dollars', this.dollars);

      this.knives++
      localStorage.setItem('knives', this.knives);

      this.updateDollarsText()
      this.updateKnivesText()
    }
  }

  mug() {
    if (this.knives >= 1) {
      this.knives--
      localStorage.setItem('knives', this.knives);

      this.dollars += Phaser.Math.Between(10, 20)
      localStorage.setItem('dollars', this.dollars);

      this.updateDollarsText()
      this.updateKnivesText()
    }
  }

  updateDollarsText() {
    this.dollarsText.setText("$" + this.dollars)
  }

  updateKnivesText() {
    this.knivesText.setText("knives: " + this.knives)
  }
}
