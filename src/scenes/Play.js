// speed at which the background scrolls
this.scrollSpeed = 1

this.isGrounded = false // Checks to see if it can double jump

class Play extends Phaser.Scene {
    constructor() {
        super("playScene") // Basically gives names the key to this object menuScene
    }

    init() {
        // Value of Gravity
        this.physics.world.gravity.y = 1800

        // variables for the slime
        this.jumpVelocity = -500
        this.maxJumps = 2
        
        this.totalMass = 100 // Starting size of the slime
    }

    create() {
        // Defines control for this scene
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
        // Fade in animation
        this.cameras.main.fadeIn(1000, 226, 243, 228)
    
        // Layers of sprites
        this.layerSky = this.add.sprite(0, 0, 'layerSky').setOrigin(0, 0)
        this.layerBackground2 = this.add.tileSprite(0, 0, 160, 144, 'layerBackground2').setOrigin(0, 0)
        this.layerBackground1 = this.add.tileSprite(0, 0, 160, 144, 'layerBackground1').setOrigin(0, 0)
        this.layerMain = this.physics.add.staticImage(game.config.width/2, game.config.height-8, 'layerMain')
        
        // Add the slime
        this.slime = this.physics.add.sprite(15, game.config.height/2, 'slimeWalk', 'walk')

        // Adds the foreground
        this.layerForeground = this.add.tileSprite(0, 0, 160, 144, 'layerForeground').setOrigin(0, 0)

        // Add collider
        this.physics.add.collider(this.slime, this.layerMain, () => {
            this.isGrounded = true
        })        
    }
    

    update() {
        // Parallaxing background
        this.layerBackground2.tilePositionX += (0.05 * scrollSpeed)
        this.layerBackground1.tilePositionX += (0.1 * scrollSpeed)
        this.layerForeground.tilePositionX += (0.75 * scrollSpeed)

        if(this.isGrounded && Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.slime.body.velocity.y = this.jumpVelocity
            this.isGrounded = false
        }



        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.start('playScene')
        }
    }

}