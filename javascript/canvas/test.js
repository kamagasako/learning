$(document).ready(() => {
  let canvas = $('#canvas')[0];
  let context = canvas.getContext('2d');

  let img = new Image();
  img.src = 'map.png';
  context.drawImage(img, 0, 0);

  //context.setTransform(1, 0, 0, 1, 100, 100);
  //context.rotate(45 * Math.PI / 180);
  let rad = 45 * Math.PI / 180;
  context.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 100, 100);

  let car = new Image();
  car.src = 'car.png';
  context.drawImage(car, 0, 0, 100, 100);
});
