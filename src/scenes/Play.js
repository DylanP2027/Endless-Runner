class Play extends Phaser.Scene {
    constructor() {
        super("playScene") // Basically gives names the key to this object menuScene
    }

    create() {
        // Defines control for this scene
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Fade in animation
        this.cameras.main.fadeIn(1000, 226, 243, 228)

        // Layers of sprites
        this.layerSky = this.add.sprite(0, 0, 'layerSky').setOrigin(0, 0)
        this.layerBackground2 = this.add.tileSprite(0, 0, 160, 144, 'layerBackground2').setOrigin(0, 0)
        this.layerBackground1 = this.add.tileSprite(0, 0, 160, 144, 'layerBackground1').setOrigin(0, 0)
        this.layerMain = this.add.sprite(0, 0, 'layerMain').setOrigin(0, 0)
        this.layerForeground = this.add.tileSprite(0, 0, 160, 144, 'layerForeground').setOrigin(0, 0)
    }

    update() {
        // Parallaxing background
        this.layerBackground2.tilePositionX += 0.05
        this.layerBackground1.tilePositionX += 0.1
        this.layerForeground.tilePositionX += 0.75

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.start('playScene')
        }
    }

}