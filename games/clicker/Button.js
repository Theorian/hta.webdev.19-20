export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, enabledImage, disabledImage, rolloverImage, text, textSize = '16px') {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enabled = true;
        this.enabledImage = enabledImage;
        this.disabledImage = disabledImage;
        this.rolloverImage = rolloverImage;

        this.button = this.scene.add.sprite(0, 0, enabledImage).setInteractive();
        this.text = this.scene.add.text(0, 0, text, { fontFamily: 'Verdana, Tahoma, serif', fontSize: textSize, fill: '#fff' });
        Phaser.Display.Align.In.Center(this.text, this.button);

        this.add(this.button);
        this.add(this.text);

        this.button.on('pointerover', function () {
            if (this.enabled) {
                this.button.setTexture(rolloverImage);
            }
        }.bind(this));

        this.button.on('pointerout', function () {
            this.button.setTexture(enabledImage);
        }.bind(this));

        this.scene.add.existing(this);
    }

    setCallback(func, scope) {
        this.button.on('pointerdown', func.bind(scope))
    }

    setEnabled(b) {
        if (b) {
            this.button.setTexture(this.enabledImage);
            this.button.setInteractive();
        } else { 
            this.button.setTexture(this.disabledImage);
            this.button.disableInteractive();
        }
        this.enabled = b;
    }
}