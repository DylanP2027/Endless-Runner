// Name: Dylan Paras
// Title: Don't Kill Me Just Because I'm a Level 1 Slime!
// Completed in (roughly): 15 hours
//
//
// Creative Tilt Justification:
//  Do Something Technically Interesting?
//    While it isn't necessarily original or terribly difficult, I implemented a high score tracker
//    that keeps track of your score even if the page is refreshed. It stores your score locally
//    and draws upon it whenever the new high score is shown or determined. I'm pretty proud of myself
//    in this regard since I didn't think I could develop an entire game. This feature is neat
//    since I can show others what score I got on my game without having to screenshot. The player
//    is able to just pick up the game and play without having to recite what their high score was.
//    I referenced Professor Altice's Paddle Parkour since he had mentioned that it contained a way
//    to track high scores beyond a single session. I thought this was interesting and created my own
//    version, using his as a guide.
//
//  Have a Great Visual Style?
//    Even though I'm proud of my technical stuff, I'm especially proud of how the visual style turned
//    out. I'm not a good artist, but I used to do a little bit of pixel art a few years ago, so it
//    was fun drawing again. I attempted to use the original Gameboy screen as a reference, using only
//    4 colors for the entire project and sticking to the original screen size of the Gameboy. While,
//    I didn't make the song, I did create the SFX and thought they turned out solid. They fit what
//    I needed them to do, such as for the menus or jumping. I wouldn't say that I'm trying anything
//    clever, but I took a refined approach to this project, working with my strengths and forcing
//    myself to work with the limitations of the Gameboy's screen size and color pallete range. This
//    ended up working in my favor since the limited color pallete forced me to get creative with shading
//    and let me get away with not shading some portions of different sprites or backdrops.
//
//
//
// References:
//  General Reference for my Slime Animation - https://www.youtube.com/watch?v=J8MH-k0Fa6Y&t=69s
//
//  My Own Rocket Patrols Mode Repository
//
//  Professor Altice's CP-Scrolling-States Repository
//
//  Professor Altice's PaddleParkourP3 Respository
//
//  Professor Altice's MovementStudies Repository
//
//  Phaser Documentation
//
//  Where I got my music from - https://freemusicarchive.org/genre/Chiptune/
//
//  Where I got the color pallete from - https://lospec.com/palette-list/kirokaze-gameboy
//
//  Where I did my pixel art - https://www.pixilart.com/
//
//  Where I created my sprite sheets - https://www.finalparsec.com/tools/sprite_sheet_maker



let config = {
    type: Phaser.AUTO,
    width: 160,
    height: 144,
    pixelArt: true,
    zoom: 5,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    scene: [ Menu, Controls, Credits, Play, GameOver ]
  }
  
  let game = new Phaser.Game(config) // Sets up the new phaser game.
  
  let keyJUMP, keyRESET, keyUP, keyDOWN, keyRIGHT, keyLEFT // Reserved keyboard bindings.
  
  // Sets the UI size
  let borderUISize = game.config.height / 15
  let borderPadding = borderUISize / 3