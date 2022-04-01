var fps = 2;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var width;
var height;
var context;
var agents = [];
var tileSize = 130;
var currenrChangeIndex = 0;

window.addEventListener('resize', initScene);
window.addEventListener('load', initScene);

function initScene(){
    width  = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    height = (window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight)  * 0.998;

    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");

    let agentNum = Math.ceil(width / tileSize) * Math.ceil(height / tileSize);
console.log("agentNum: " + agentNum);
    for(let i =0; i<=agentNum; i++){
        agents.push(randomRange(1,5));
    }

    
    animate();
}

function randomRange(min, max){
    return Math.random() * (max - min) + min;
}

const animate = () => {
    now = Date.now();
    delta = now - then;
    
    if (delta > interval) {
        then = now - (delta % interval);

        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        let cols = Math.ceil(width / tileSize);
        numCells = cols * Math.ceil(height / tileSize);
        for(let i=0; i<numCells;i++){
            let col = i % cols;
            let row = Math.floor(i / cols);

            let x = col * tileSize;
            let y = row * tileSize;
            //let w = 15;
            //let h = 15;

            context.save();
            context.translate(x, y);
            
            //context.strokeStyle = "#FF0000";
            //context.strokeRect(0, 0, tileSize, tileSize);

            context.strokeStyle = "#000000";
            context.lineWidth = 5;
            //renderTile(agents[i]);
           // console.log(agents[i]);
            if(agents[i] < 2){
                context.beginPath();
                context.moveTo(0, tileSize * 0.5);
                context.lineTo(tileSize, tileSize * 0.5);
                context.moveTo(tileSize * 0.5, 0);
                context.lineTo((tileSize * 0.5), tileSize);
                context.stroke();
            }else if(agents[i] < 3){
                context.beginPath();
                context.arc(tileSize * 0.5, tileSize * 0.5, tileSize * 0.35, 0, 2 * Math.PI);
                context.moveTo(0, tileSize * 0.5);
                context.lineTo(tileSize * 0.15, tileSize * 0.5);

                context.moveTo(tileSize * 0.5, 0);
                context.lineTo(tileSize * 0.5, tileSize * 0.15);

                context.moveTo(tileSize, tileSize * 0.5);
                context.lineTo(tileSize * 0.85, tileSize * 0.5);

                context.moveTo(tileSize * 0.5, tileSize);
                context.lineTo(tileSize * 0.5, tileSize * 0.85);

                context.stroke();
            }else if(agents[i] < 4){
                context.beginPath();
                context.arc(0, 0, tileSize * 0.5, 0, 0.5 * Math.PI);
                context.stroke();
                context.beginPath();
                context.arc(tileSize, tileSize, tileSize * 0.5, 1.0 * Math.PI, 1.5 * Math.PI);                
                context.stroke();
            }else if(agents[i] < 5){
                context.beginPath();
                context.arc(0, tileSize, tileSize * 0.5, 1.5 * Math.PI, 2 * Math.PI);
                context.stroke();
                context.beginPath();
                context.arc(tileSize, 0, tileSize * 0.5, 1.5, 1 * Math.PI);                
                context.stroke();
            }
            context.restore();
        }


        // randomiz change
        let numOfChange = 1;//Math.round(numCells * 0.005);
        console.log("numOfChange: " + numOfChange);
        let changeIndex;
        let changeType;
        for(let c =0 ; c < numOfChange; c++){
            changeIndex = Math.round(randomRange(0, numCells));
            changeType = Math.floor(randomRange(1, 5));
            agents[changeIndex] = changeType;

            console.log("changeIndex: " + changeIndex + "\tchangeType: " + changeType + "\tagents[changeIndex]: " + agents[changeIndex]);
        }


        /*agents[currenrChangeIndex++] = Math.floor(randomRange(1, 5));

        if(currenrChangeIndex >= numCells){
            currenrChangeIndex = 0;
        }*/
    }
console.log("animate END!");
    requestAnimationFrame(animate);
}

