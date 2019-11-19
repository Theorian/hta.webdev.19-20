import { SokobanSprite } from './SokobanSprite.js';

export class BoxSprite extends SokobanSprite {

    constructor(scene, xx, yy) {
        super(scene, 'box', xx, yy)
    }

    setTarget(onTarget) {
        if (onTarget) {
            this.setTexture('box2')
        } else {
            this.setTexture('box')
        }
    }
}

