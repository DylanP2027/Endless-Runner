// Some of this is taken from Scrolling States

class Slime extends Phaser.physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this) // Add slime to existing scene
        scene.physics.add.existing(this) // Adds physics to the scene

        this.body.setSize(this.width, this.height) // Might be slightly offset, could cause some hitbox issues later


    }

    update() {
        if(!this.isGrounded) {
            if(keyJUMP.isDown && this.jumps < 2) {

            }
        }


    }


}