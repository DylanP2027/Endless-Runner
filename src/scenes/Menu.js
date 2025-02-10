class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") // Basically gives names the key to this object menuScene
    }

    

    preload() {
        // Loads the assets
        this.load.image('layerMain', './assets/layerMain.png')
        this.load.image('layerForeground', './assets/layerForeground.png')
        this.load.image('layerBackground1', './assets/layerBackground.png')
        this.load.image('layerBackground2', './assets/layerBackground2.png')
        this.load.image('layerSky', './assets/layerBackgroundSky.png')
        this.load.spritesheet('slimeWalk', './assets/slimeWalk.png', { // Has to be different since there's multiple sprites in this image
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 3
        })
        this.load.spritesheet('slimeJump', './assets/slimeWalk.png', { // Has to be different since there's multiple sprites in this image
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 3
        })

        // load audio

    }

    create() {
        // Animation configuration for explosion
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('slimeWalk', { start: 0, end: 3, first: 0 }),
            frameRate: 6
        })

        //TODO: CHANGE THE FONT TO PRESS START 2P
        let menuConfig = { 
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.titleScreen = this.add.image(0, 0, 'title-screen').setOrigin(0, 0)

        // Menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL: The Forgotten Mods', menuConfig).setOrigin(.5)
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(.5)

        // Define keys for difficulty
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }



    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}