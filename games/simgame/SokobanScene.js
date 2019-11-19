import { BoxSprite } from './BoxSprite.js';
import { PlayerSprite } from './PlayerSprite.js';
import { Button } from './Button.js';

export class SokobanScene extends Phaser.Scene {
    constructor(name, next) {
        super({
            key: name
        })
        this.name = name
        this.next = next
        this.boxGroup = null
        this.player = null
    }

    create() {
        console.log('SokobanScene create: ' + this.name)
        const TILESIZE = this.game.TILESIZE
        const INDENT = this.game.INDENT
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background')

        var jsonMapData = this.cache.json.get(this.name)
        this.boxGroup = new Phaser.GameObjects.Group()
        this.player = new PlayerSprite(this, 10, 10)
        this.game.TILESIZE = jsonMapData.tilewidth
        this.mapData = jsonMapData.layers[0]

        for (var yy = 0; yy < this.mapData.height; yy++) {
            for (var xx = 0; xx < this.mapData.width; xx++) {
                if (this.isWall(xx, yy)) {
                    this.add.image(xx * TILESIZE, yy * TILESIZE + INDENT, 'wall')
                } else if (this.isTarget(xx, yy)) {
                    this.add.image(xx * TILESIZE, yy * TILESIZE + INDENT, 'target')
                } else if (this.isEmpty(xx, yy)) {
                    this.add.image(xx * TILESIZE, yy * TILESIZE + INDENT, 'empty')
                }
            }
        }

        this.resetBoard()

        // this.add.image(INDENT / 2, 25, 'sokoban_logo')
        this.resetButton = new Button(this, INDENT / 2, 60, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Reset')
        this.resetButton.setCallback(this.resetBoard, this)
        if (this.next != null) {
            this.nextButton = new Button(this, INDENT / 2, 110, 'btn_enabled', 'btn_disabled', 'btn_rollover', 'Next')
            this.nextButton.setCallback(function () { this.scene.start(this.next); }, this)
            this.nextButton.setEnabled(false)
        }

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
            this.moveLeft()
        } if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
            this.moveRight()
        } if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
            this.moveUp()
        } if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
            this.moveDown()
        }
        if (this.next != null) {
            this.nextButton.setEnabled(this.isComplete() && this.next != null)
        }
    }

    resetBoard() {
        this.boxGroup.clear(true, true)
        this.player.destroy()
        this.boxGroup = new Phaser.GameObjects.Group()
        this.player = new PlayerSprite(this, 10, 10)
        this.add.existing(this.player)
        for (var yy = 0; yy < this.mapData.height; yy++) {
            for (var xx = 0; xx < this.mapData.width; xx++) {
                if (this.isPlayer(xx, yy)) {
                    this.player.moveTo(xx, yy)
                } else if (this.isBox(xx, yy)) {
                    var box = new BoxSprite(this, xx, yy)
                    this.add.existing(box)
                    this.boxGroup.add(box)
                    box.setTarget(this.isTarget(xx, yy))
                }
            }
        }
    }

    isPlayer(xx, yy) {
        var d = this.mapData.data[xx + yy * this.mapData.width]
        return d == 6
    }

    isWall(xx, yy) {
        var d = this.mapData.data[xx + yy * this.mapData.width]
        return d == 5
    }

    isEmpty(xx, yy) {
        if (this.getBox(xx, yy)) { return false; }
        var d = this.mapData.data[xx + yy * this.mapData.width]
        return d != 5
    }

    isTarget(xx, yy) {
        var d = this.mapData.data[xx + yy * this.mapData.width]
        return (d == 7) || (d == 2)
    }

    isBox(xx, yy) {
        var d = this.mapData.data[xx + yy * this.mapData.width]
        return (d == 4) || (d == 2)
    }

    getBox(xx, yy) {
        for (const box of this.boxGroup.children.entries) {
            if (box.xPos == xx && box.yPos == yy) { return box }
        }
        return null
    }

    isComplete() {
        for (const box of this.boxGroup.children.entries) {
            if (!this.isTarget(box.xPos, box.yPos)) { return false; }
        }
        return true
    }

    moveUp() {
        const box = this.getBox(this.player.xPos, this.player.yPos - 1)
        if (box) {
            if (this.isEmpty(this.player.xPos, this.player.yPos - 2)) {
                this.player.moveUp()
                box.moveUp()
                box.setTarget(this.isTarget(box.xPos, box.yPos))
            }
        } else if (!this.isWall(this.player.xPos, this.player.yPos - 1)) {
            this.player.moveUp()
        }
    }

    moveDown() {
        const box = this.getBox(this.player.xPos, this.player.yPos + 1)
        if (box) {
            if (this.isEmpty(this.player.xPos, this.player.yPos + 2)) {
                this.player.moveDown()
                box.moveDown()
                box.setTarget(this.isTarget(box.xPos, box.yPos))
            }
        } else if (!this.isWall(this.player.xPos, this.player.yPos + 1)) {
            this.player.moveDown()
        }
    }

    moveLeft() {
        const box = this.getBox(this.player.xPos - 1, this.player.yPos)
        if (box) {
            if (this.isEmpty(this.player.xPos - 2, this.player.yPos)) {
                this.player.moveLeft()
                box.moveLeft()
                box.setTarget(this.isTarget(box.xPos, box.yPos))
            }
        } else if (!this.isWall(this.player.xPos - 1, this.player.yPos)) {
            this.player.moveLeft()
        }
    }

    moveRight() {
        const box = this.getBox(this.player.xPos + 1, this.player.yPos)
        if (box) {
            if (this.isEmpty(this.player.xPos + 2, this.player.yPos)) {
                this.player.moveRight()
                box.moveRight()
                box.setTarget(this.isTarget(box.xPos, box.yPos))
            }
        } else if (!this.isWall(this.player.xPos + 1, this.player.yPos)) {
            this.player.moveRight()
        }
    }
}
