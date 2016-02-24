function CornPops() {
  CerealBox.call(this, 419, 1213, 728, 'cornpops');
}
CornPops.prototype = Object.create(CerealBox.prototype);
CornPops.prototype.constructor = CornPops;

function CocoPops() {
  CerealBox.call(this, 280, 1172, 900, 'cocopops');
}
CocoPops.prototype = Object.create(CerealBox.prototype);
CocoPops.prototype.constructor = CocoPops;

function Shreddies() {
  CerealBox.call(this, 280, 1217, 729, 'shreddies');
}
Shreddies.prototype = Object.create(CerealBox.prototype);
Shreddies.prototype.constructor = Shreddies;