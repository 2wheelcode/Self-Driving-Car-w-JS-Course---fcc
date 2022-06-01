// Canvas will be the road
const canvas = document.getElementById('myCanvas');
// canvas.height =  window.innerHeight; // this gets moved into the animate function
canvas.width = 200;

// Draw the car on the canvas
const ctx = canvas.getContext('2d');
const road=new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(3), 100, 30, 50);
// car.draw(ctx); // this gets moved into the animate function

// Animate the car
animate();

// Define the animate function 18:30 
function animate() {
    car.update(road.borders);
    canvas.height =  window.innerHeight;

    // Creates the overhead "view/camera effect", incl restore() below
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7); // height positions car on screen 

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore(); // second part of camera view effect
    requestAnimationFrame(animate);
}