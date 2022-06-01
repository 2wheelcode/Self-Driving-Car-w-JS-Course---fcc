class Road {
    constructor(x,width,laneCount=3) {
        this.x=x;
        this.width=width;
        this.laneCount=laneCount

        this.left=x-width/2;
        this.right=x+width/2;
        
        // There is a number in JS, but creating your own can alleviate issues
        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        // This has the road object tell us where the borders are
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth=5;
        ctx.strokeStyle='#fff';

        // for loop added to mark the lanes
        // for(let i=0; i<=this.laneCount; i++) { // Needs to be changed to add curves, corners, obstructions, etc.
        for(let i=1; i<=this.laneCount-1; i++) {
            // we use linear interpolation (lerp) to set lanes
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            /* Here is the lerp function:
            function lerp(A,B,t){
                return A+(B-A)*t;
            } */

            // Make the lane lines dashed
            // if(i>0 && i<this.laneCount) {
            ctx.setLineDash([20,20]);
            /* } else {
                ctx.setLineDash([]);
                // This keeps the fog lines solid
             */

            ctx.beginPath();
            // ctx.moveTo(this.left,this.top); // these get changed,
            // ctx.lineTo(this.left,this.bottom); // to the two
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();

            /* ctx.beginPath();
            ctx.moveTo(this.right,this.top);
            ctx.lineTo(this.right,this.bottom);
            ctx.stroke(); */
            // This ^ no longer needed with above this.left changed to x,
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=> {
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}