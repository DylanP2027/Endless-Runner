// Name: Dylan Paras
// Title: Don't Kill Me Just Because I'm a Level 1 Slime!
// Completed in (roughly): 
//
//
// Creative Tilt Justification:
//
//
// Citations:

let config = {
    type: Phaser.AUTO,
    width: 160,
    height: 144,
    scene: [Menu, Play, GameOver]
  }
  
  let game = new Phaser.Game(config) // Sets up the new phaser game.
  
  let keyJUMP, keyRESET, keyUP, keyDOWN // Reserved keyboard bindings.
  
  // Sets the UI size
  let borderUISize = game.config.height / 15
  let borderPadding = borderUISize / 3