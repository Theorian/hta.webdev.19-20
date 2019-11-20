import { Button } from './Button.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('btn_enabled', 'assets/btn_enabled.png')
    this.load.image('btn_disabled', 'assets/btn_disabled.png')
    this.load.image('btn_rollover', 'assets/btn_rollover.png')
  }

  create() {
    var header = this.add.rectangle(this.scale.width / 2, 25 + 50, this.scale.width - 40, 50, 0x333333);
    header.setOrigin(0.5)
    
    this.dollars = 0;
    this.dollarsText = this.add.text(25, 55, "$0");
    this.dollarButton = new Button(this, 100, 130, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Find money')
    this.dollarButton.setCallback(this.incrementDollars, this)

    this.knives = 0;
    this.knivesText = this.add.text(25, 80, "");
    this.knifeButton = new Button(this, this.scale.width - 100, 130, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Buy knife')
    this.knifeButton.setCallback(this.incrementKnives, this)


    this.mugButton = new Button(this, this.scale.width - 100, 190, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Mug')
    this.mugButton.setCallback(this.mug, this)

    if (this.next != null) {
      this.nextButton = new Button(this, 100, 110, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Next')
      // this.nextButton.setCallback(function () { this.scene.start(this.next); }, this)
      // this.nextButton.setEnabled(false)
    }

  }

  update() {
    if (this.dollars >= 10) {
      this.knifeButton.setVisible(true)
    } else {
      this.knifeButton.setVisible(false)
    }

    if (this.knives >= 1) {
      this.mugButton.setVisible(true)
    } else {
      this.mugButton.setVisible(false)
    }
  }

  incrementDollars() {
    this.dollars += Phaser.Math.Between(1, 3);
    this.updatedollarsText()
  }

  incrementKnives() {
    if (this.dollars >= 10) {
      this.dollars -= 10
      this.knives++
      this.updatedollarsText()
      this.updateKnivesText()
    }
  }

  mug() {
    if (this.knives >= 1) {
      this.knives--
      this.dollars +=  Phaser.Math.Between(10, 20)
      this.updatedollarsText()
      this.updateKnivesText()
    }
  }

  updatedollarsText() {
    this.dollarsText.setText("$" + this.dollars)
  }

  updateKnivesText() {
    this.knivesText.setText("knives: " + this.knives)
  }
}
