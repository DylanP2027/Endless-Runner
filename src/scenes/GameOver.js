class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene") // Basically gives names the key to this object menuScene
    }

    create () {
        // Background color
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x332c50).setOrigin(0,0)

        this.cameras.main.fadeIn(1000, 226, 243, 228) // Face in effect

        // Just adds a slime in the corner because the scene feels empty
        let slimeAnimation = this.add.sprite(game.config.width - 15, game.config.height - 15, 'slimeWalk')
        slimeAnimation.play('walk')

        // Keybinds
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        this.menuSelectionSoundReturn = this.sound.add('menuSelectionSoundReturn')
        this.menuSelectionSoundReturn.volume = 0.3

        this.menuSelectionSound = this.sound.add('menuSelectionSound')
        this.menuSelectionSound.volume = 0.3
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
            this.menuSelectionSoundReturn.play()
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.start('playScene')
            this.menuSelectionSound.play()
        }
    }
}