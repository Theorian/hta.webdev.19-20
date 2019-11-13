import { TextButton } from "./text-button.js/index.js";

export class MainScene extends Phaser.Scene {
  create() {
    this.clickCount = 0;
    this.clickCountText = this.add.text(100, 200, "");

    this.incrementButton = new TextButton(
      this,
      100,
      100,
      "Find Dollar",
      { fill: "#0f0 " },
      () => this.incrementClickCount()
    );
    this.add.existing(this.incrementButton);

    // this.decrementButton = new TextButton(this, 100, 150, 'Decrement Count', { fill: '#0f0 '}, () => this.decrementClickCount());
    // this.add.existing(this.decrementButton);

    this.updateClickCountText();
  }

  incrementClickCount() {
    this.clickCount += 1;
    this.updateClickCountText();
  }

  // decrementClickCount() {
  //   this.clickCount -= 1;
  //   this.updateClickCountText();
  // }

  updateClickCountText() {
    this.clickCountText.setText("Dollars found: " + this.clickCount);
  }
}
