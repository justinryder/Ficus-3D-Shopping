# Ficus-3D-Shopping

http://ficus-2016-02.justin-ryder.com

Three proof of concepts of 3D product displays built during a 2 day hackathon.
All prototypes were built using web technologies with no need for browser plugins.
Best viewed on modern browsers/devices.

Team:
- John Wojtkielewicz
- Justin Ryder
- Patrick Mulcahy
- Thom Collins

# Thing One
http://ficus-2016-02.justin-ryder.com/threejs.html

Implemented by Justin Ryder

Products and shelves modeled/textured by Thom Collins

Built using three.js (WebGL/canvas wrapper)

- WASD - Move character
- Click - Products to take them off the shelf/put them back
- Add to Cart - When "holding" a product to add it to your cart
- Move over the cashier (to your right) to checkout when you have items in your cart

# Thing Two
http://ficus-2016-02.justin-ryder.com/jw.html

Implemented by John Wojtkielewicz

Assets by Thom Collins

Built using Sprite3D.js (CSS transform library)

- WASD - Move camera
- Click products to add to your order

# Thing Three
http://ficus-2016-02.justin-ryder.com/css3thingything.html

Implemented by Patrick Mulcahy

Assets by Thom Collins

Built using CSS transforms
Keyboard support with keymaster.js
Touch support with hammer.js

*Keyboard and Mouse*
- click product to focus
- click+drag on product to rotate
- click+drag+left/right on page to move between shelves 
- shift+click+drag - simulates pinch zoom
- up, down, left, right - rotate product
- shift+up, shift+down, shift+left, shift+right - "snap to" rotation
- ctrl+up, ctrl+down, ctrl+left, ctrl+right - move product in view port along x and y axis
- ctrl+[plus], ctrl+[minus] - zoom in or out
- shift+enter - reset product state
- esc - place product back on shelf

*Touch*
- Tap product to focus
- Pan on product to rotate
- Pinch to zoom in and out on focused product
- Swipe left/right to move between shelves
