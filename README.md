# MIDIchef

Huanqing Hu, Wenhao Xue, Junming Liu, Maihan Wen, Queeny Lin

## Cook your music and get NFT

MIDIchef is a website provide an easy way for users whom may or may not have music knowledge backgroud to produce their own music and earn by selling their music.
:stuck_out_tongue_closed_eyes:

Pro: have fun to make music, protect creator's copyright & make money :money_mouth_face:

Con: limit embed music sample at the start stage

## WEB UI :heart: :orange_heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :brown_heart: :black_heart: :white_heart:

https://www.figma.com/file/bZv6Jdvl5RDlGaeDKvuD4B/MIDIchef?node-id=0%3A1

Theme of the whole website, I would like to be dark & cool & electronic :space_invader:

- Homepage: discover & browse music by genres/track/albums/artist/suggestions

  Reference homepage image(at this moment, I haven't decided the navigation bar yet)
  https://www.audiotool.com/browse/genres
  ![homepage](RefUI/homepage.jpg)

* Music Kitchen: create your music by clicking the grids

  - Embed Music Samplings:
  - - Instrument: piano , strings, woodwind, synth, marimba, erhu
  - - Percussion(打击乐器)：electronic, blocks, kit, conga, cymbal(钹), tambourine(摇铃)
  - - Mic(麦克风)：for recording people sound
  - - [ ] Keyboard is still planing how to put on the page.
  - - [ ] The design of music making page may need to reorganize.
          Reference page https://musiclab.chromeexperiments.com/Song-Maker/song/6332515798745088
          ![musicgrid](RefUI/musicgrid.jpg)

- - Setting (subpage of the music kichen)

- - - Adjustable tempo(120 default)
- - - length how many bars(columns)
- - - beats per bar: how many beats per bar
- - - split beat into: how many small beats per bar
- - - Scale: major(7, do re mi fa so la ti)
- - - chromatic(12, do di re ri mi fa fi so si la li ti)
- - - pentatonic(5, do re mi so la)
- - - Start on key signature (low/middle/high, major 12 keys )
- - - Range (octave) how many rows, which depends on the scales
      ![gridsetting](RefUI/gridsetting.jpg)

* User Profile:

  Tracks/Albums/Favorites/Assets/Network/Wallpage

  - Tracks: songs made by user to sell
  - Albums: ablums created by user
  - Favorites: protential songs may buy (save for later)
  - Assets: Songs boughts from other users
  - Networks: flowers/following
  - Wallpage: comments from other users
    ![dashboard](RefUI/dashboard.jpg)
    Or another way to display

    - Assets: Tracks to sell/Tracks have bought
    - Networks: flowers/following
    - Wallpage: comments from other users
    - [ ] Still planning about the "Assets", and will research other NFT product

    Reference image (random users on audiotool for reference) https://www.audiotool.com/user/bubblicious/tracks

* Product info Page:

  - [ ] Still look for good samples of NFT, and will research other NFT product

* Trading page(subpage of Product page)

  - connect wallet
  - sell & resell
  - all transactions shows on prodution page

  - [ ] will do research other NFT product

## Framework

(Not that important at this moment)

MERN, blockchain(Ethereum/Algorand/Smart Contract)