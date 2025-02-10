// Note: A lot of this code is reused from Rocket Patrol Mods

// Event trigger so that menu stuff isn't triggered more than once
let enteredMenuScene = false

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") // Basically gives names the key to this object menuScene
    }

    

    preload() {
        // Loads the assets

        // Images for the Main Menu
        this.load.image('titleScreen', './assets/titleScreen.png')
        this.load.spritesheet('titleScreenButtons', './assets/titleScreenButtons.png', { // Has to be different since there's multiple sprites in this image
            frameWidth: 160,
            frameHeight: 144,
            startFrame: 0,
            endFrame: 1
        })

        // Images/Sprites for Play.js
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
        this.load.audio('menuMusic', 'assets/menuMusic.mp3');


    }

    create() {
        if(enteredMenuScene != true) {
            // Animation for buttons on title screen
            this.anims.create({
            key: 'menuButtons',
            frames: this.anims.generateFrameNumbers('titleScreenButtons', { start: 0, end: 1, first: 0 }),
            frameRate: 1,
            repeat: -1
        }) 

            // Animation configuration for the slime when walking
            this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('slimeWalk', { start: 0, end: 3, first: 0 }),
            frameRate: 4,
            repeat: -1
        })

            // Triggers menu event flag
            enteredMenuScene = true
            
            // The Background Music
            this.menuMusic = this.sound.add('menuMusic')
            this.menuMusic.volume = 0.3
            this.menuMusic.loop = true
            this.menuMusic.play()
        }

        // Title Screen Image
        let titleScreen = this.add.sprite(game.config.width / 2, game.config.height / 2, 'titleScreen')



        let buttonSprite = this.add.sprite(game.config.width / 2, game.config.height / 2, 'titleScreenButtons')
        buttonSprite.play('menuButtons')



        // Define keys for menu
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }



    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('playScene')
            this.cameras.main.fadeOut(200, 226, 243, 228)
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start('creditsScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('controlsScene')
        }
    }
}