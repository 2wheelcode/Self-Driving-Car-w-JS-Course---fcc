// Defining the car class
class Car {
    constructor(x,y,width, height) {
        // This is so the car remembers how big it is
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        // Speed and acceleration of the car
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0; // this is added after steering controls introduced

        // This added after sensor.js
        this.sensor=new Sensor(this);

        this.controls=new Controls();
    }

    // Update method
    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders); // tell the sensor to update
    }

    #move() { // This was built in the update() method. It was then cut and pasted into a private method #move()

        if(this.controls.forward) {
            // this.y-=2; // gets changed to the following
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse) {
            // this.y+=2; // gets changed to the following
            this.speed-=this.acceleration;
        }
            // speed, forward and reverse controls, accel, friction, stop
        if(this.speed>this.maxSpeed) {
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2) {
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0) {
            this.speed-=this.friction;
        }

        if(this.speed<0) {
            this.speed+=this.friction;
        }

        if(this.speed<-this.maxSpeed/2) {
            this.speed=-this.maxSpeed/2
        }
        // This is to prevent creep, make the car actually stop
        if(Math.abs(this.speed)<this.friction) {
            this.speed=0;
        }

        if(this.speed!=0) {
            const flip=this.speed>0?1:-1;
            // now we add the turn controls to this IF statement, now the car doesn't rotate like a tank

            // turn controls
            if(this.controls.left) {
                // this.x-=2; // This is the beginning. Basic, now improve it
                this.angle+=0.03;
            }
            if(this.controls.right) {
                // this.x+=2; // This is the beginning. Basic, now improve it
                this.angle-=0.03;
            }
        }
        
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
        // this.y-=this.speed; // this gets removed with the above 2 lines added 
    }

    // ctx = context
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);


        // Translate transition above added after
        ctx.beginPath();
        ctx.rect(
            // this.x-this.width/2, // changed to below with, 
            // this.y-this.height/2, // transition above added
            -this.width/2,
            -this.height/2,
            // ^ divide by 2 makes x & y the center point of the car
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        // Tell the sensor to draw
        this.sensor.draw(ctx);
    }
}
