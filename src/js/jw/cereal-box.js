function CerealBox(boxDepth, boxHeight, boxWidth, brand) {
  console.log(boxDepth, boxHeight, boxWidth, brand);
  this.boxDepth = boxDepth;
  this.boxHeight = boxHeight;
  this.boxWidth = boxWidth;
  this.brand = brand;
}
CerealBox.prototype = Object.create(Sprite3D.prototype);
CerealBox.prototype.constructor = CerealBox;

CerealBox.prototype.addTo = function(container) {
  container.addChild(
    new Sprite3D()
      .setClassName("boxFront " + this.brand)
      .setPosition(-1*(this.boxWidth/2), -1*(this.boxHeight/2), 0)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxRight " + this.brand)
      .setTransformOrigin( 0, 0 )
      .setPosition(0, -1*(this.boxHeight/2), (this.boxWidth/2))
      .rotateY(90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxLeft " + this.brand)
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*this.boxDepth, -1*(this.boxHeight/2), (this.boxWidth/2))
      .rotateY(-90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBack " + this.brand)
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(this.boxWidth/2), -1*(this.boxHeight/2), this.boxDepth)
      .rotateY(-180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxTop " + this.brand)
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(this.boxWidth/2), 0, (this.boxHeight/2))
      .rotateX(90)
      .rotateY(180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBottom " + this.brand)
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(this.boxWidth/2), -1*this.boxDepth, this.boxHeight/2)
      .rotateX(-90)
      .rotateY(-180)
      .setRotateFirst(true)
      .update()
  );
}

