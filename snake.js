const canvas = document.querySelector('canvas')   

const ctx=canvas.getContext('2d');  //dimension

// static snake bt we need dinamic snake;
// ctx.fillStyle='blue'                //color of snake
// ctx.fillReact(0,0,50,40)             //two are cordinate of box and two are height and width..

// dynamic snake.....
let square=50;           // for height and width.
let snakeCell=[[0,0]]   //cordinates btaiga...
let bHight = 500;
let bWidth = 500;
let direction='right';
let gameOver =false;
let foodG = generateRandomCell();
let score = 0;

document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){
        direction='right';
        // console.log(direction)
    }
    else if(e.key==='ArrowLeft'){
        direction='left';
    }
    else if(e.key==='ArrowDown'){
        direction='down';
        // console.log(direction)
    }
    else {
        direction='up';
    }

})

function update(){            // update will update the cordinates or size or movent of snake in it...
    let headX =  snakeCell[snakeCell.length-1][0] ;                    //gives x cordinate...
    let headY =  snakeCell[snakeCell.length-1][1] ;
    let newX;
    let newY;
    if(direction==='right'){
        newX=headX+square;
        newY=headY ;

        if(newX===bWidth){
             // id.clearRect(newX, newY, bwidth, bheight);
            gameOver=true;
        }
    }
    else if(direction==='left'){
        newX=headX-square;
        newY=headY ;
        if(newX<0){
            gameOver=true;
        }
    }
    else if(direction==='down'){
        newX=headX
        newY=headY+square 
        if(newY===bHight){
            gameOver=true
        }
    }
    else // (direction==='up')
    {
        newX=headX
        newY=headY-square 
        if(newY<0){
        // if(newY<=bHight){
            gameOver=true
        }
    }

    snakeCell.push([newX,newY])             //add new value..
    if(newX===foodG[0] && newY===foodG[1]){
    // if(newHead===foodG[0] && newHeadY===foodG[1]){
        foodG = generateRandomCell();
        score++;
    }
    else{
        snakeCell.shift() ;                       //to remove the backward array

    }

}


function generateRandomCell(){
    return[
        Math.round(Math.random()*(bWidth-square)/square)*square,
        
        Math.round(Math.random()*(bHight-square)/square)*square,
    ]
     }                     //  to generate random functions... 


function draw(){             //it get update values and drawa the same on screen...  or gar draw krni ho toh bh ismein krenge 
    
    
    if(gameOver===true){
        clearInterval (id) ;     //doubt....                 //to stop the snake at game over function...
        ctx.font= '40px sans-sarif'
        ctx.fillStyle='blue'
        ctx.fillText('gameover')
        return;

    }
    ctx.clearRect(0 ,0 , bWidth , bHight)

    for(let cell of snakeCell){
        ctx.fillRect(cell[0],cell[1],square,square)  

    //draw food
    ctx.fillStyle = 'pink'
    ctx.fillRect(foodG[0],foodG[1],square,square)


    //    text draw
    ctx.font='40px sans-sarif';
    ctx.fillText(`score ${score}`,20,20);
     
    }                                                  

}

let id = setInterval(function(){
    update();
    draw();
},100)

