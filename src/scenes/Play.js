// speed at which the background scrolls
this.scrollSpeed = 1

this.isGrounded = false // Checks to see if it can double jump

this.jumps = 2 // Sets it so that you cannot jump right after loading in

class Play extends Phaser.Scene {
    constructor() {
        super("playScene") // Basically gives names the key to this object menuScene
    }

    init() {
        // Value of Gravity
        this.physics.world.gravity.y = 1800

        // variables for the slime
        this.jumpVelocity = -450
        this.maxJumps = 2
        
        this.totalMass = 100 // Starting size of the slime

        this.score = 0

        this.summonTime = false
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
        this.slime = this.physics.add.sprite(15, game.config.height/2, 'slimeWalk')
        this.slime.anims.play('walk', true)

        // Adds the foreground
        this.layerForeground = this.add.tileSprite(0, 0, 160, 144, 'layerForeground').setOrigin(0, 0)

        // Add collider
        this.physics.add.collider(this.slime, this.layerMain, () => {
            this.isGrounded = true;
            this.jumps = 0;
            this.slime.anims.play('walk', true);
        })

        // Sound effect for returning back to the main menu
        this.menuSelectionSoundReturn = this.sound.add('menuSelectionSoundReturn')
        this.menuSelectionSoundReturn.volume = 0.3

        // Sound effect for jumping
        this.jumpSound = this.sound.add('jumpSound')
        this.jumpSound.volume = 0.3

        // Sound effect for dying
        this.deathSound = this.sound.add('deathSound')
        this.deathSound.volume = 0.6

        this.scoreText = this.add.text(10, 10, `EXP: ${this.score}`, {
            fontSize: '8px',
            font: 'Verdana'
        })

        this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateScore,
            callbackScope: this,
            loop: true // Keeps repeating
        })

        this.time.addEvent({
            delay: 1000,
            callback: this.updateSummonTime,
            callbackScope: this,
            loop: true
        })
    }
    

    update() {
        // Parallaxing background
        this.layerBackground2.tilePositionX += (0.05 * scrollSpeed)
        this.layerBackground1.tilePositionX += (0.1 * scrollSpeed)
        this.layerForeground.tilePositionX += (0.75 * scrollSpeed)

        if(this.summonTime) {
            let randNum = Math.random()

            if (randNum < 0.25) {
                // Don't summon anything
            }
            else if(randNum >= 0.25 && randNum < 0.5) {
                // Rock Enemy
                this.rock = this.physics.add.image(game.config.width+5, game.config.height-16, 'rock')
                this.summonTime = false
                // Collider for rock and ground
                this.physics.add.collider(this.rock, this.layerMain)
        
                // Add collider for slime and rock
                this.physics.add.collider(this.slime, this.rock, () => {
                    this.deathSound.play()
                    this.scene.start('gameOverScene')
                })

                this.rock.setVelocityX(-75 * scrollSpeed);
            }
            else if (randNum >= 0.5 && randNum <0.75) {
                // Summon Knight
                this.summonTime = false
            }
            else {
                // Summon Wall
                this.summonTime = false

                this.wallBottom = this.physics.add.image(game.config.width, game.config.height-32, 'wallBottom')
                // Collider for rock and ground
                this.physics.add.collider(this.wallBottom, this.layerMain)
        
                // Add collider for slime and rock
                this.physics.add.collider(this.slime, this.wallBottom, () => {
                    this.deathSound.play()
                    this.scene.start('gameOverScene')
                
                })

                this.wallBottom.setVelocityX(-75 * scrollSpeed);
            }
        }

        // For the different lengths of holding the jump button
        // High jump
        if (this.isGrounded && Phaser.Input.Keyboard.JustDown(keyJUMP) && this.jumps <= 2) {
            this.slime.setVelocityY(this.jumpVelocity);
            this.isJumping = true;

            this.jumpSound.play()

            if(this.jumps == 0) {
                this.cameras.main.shake(50, 0.005)
            }

            this.jumps += 1

            this.slime.anims.play('jumpRise', true)
        }

        // Short Jump
        if (this.isJumping && Phaser.Input.Keyboard.JustUp(keyJUMP) && this.jumps <= 2) {
            this.isJumping = false
            this.jumps += 1
            if (this.slime.body.velocity.y < this.jumpVelocity / 2) {
                this.slime.setVelocityY(this.jumpVelocity / 2); // Reduce velocity for short jump
            }
        }



        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
            this.menuSelectionSoundReturn.play()
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.start('playScene')
            this.deathSound.play()
        }
    }



    updateScore() {
        this.score += 1; // Increment score
        this.scoreText.setText(`EXP: ${this.score}`); // Updates text
    }

    updateSummonTime() {
        this.summonTime = true
    }
}