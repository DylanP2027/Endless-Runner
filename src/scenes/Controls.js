class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene") // Basically gives names the key to this object menuScene
    }

    create() {
        // Background Color
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x332c50).setOrigin(0,0)

        // Text for the controls
        this.add.text(5, 5, 'CONTROLS:')
        this.add.text(15, 35, 'JUMP: Space')
        this.add.text(15, 55, 'RESTART: R')
        this.add.text(15, 75, 'GO BACK: ←')

        // Defines control for this scene
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        
        // Plays the walking animation just because, since the scene felt empty
        let slimeAnimation = this.add.sprite(game.config.width - 15, game.config.height - 15, 'slimeWalk')
        slimeAnimation.play('walk')
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
        }
    }
}