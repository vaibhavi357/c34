var hypnoticBall;
var database;
var position;

//step1 = create the database
// step2 = register the app
// step3 = get the connection string and put it in index.html

function setup(){
    // create the database and save it
    database = firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //point to a particular position in the database
    var hypnoticBallPosition = database.ref('ball/position');
    // add a listener to the place where we are pointiing, if any value changes for the ball position call readPosition function
    // if something goes wrong with readPosition then call showError function
    hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
// display the ball only when the position is available
    if (position !== undefined) {
        if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
    }

    
}

// write new values of x and y to the database(update x and y values)
function writePosition(x,y){
    // set will set new values for x and y in the database, it uses json format as many values can be set
    // always use a ',' to saperate attributes in the json format
    database.ref('ball/position').set({
        'x':position.x + x, 
        'y':position.y + y
    });
}

// read the position of the ball from the database and consider the data coming from the database as data
// hence data is arguement for readPosition
function readPosition(data){
    //val extracts the values from the data
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError(){
    console.log("error in reading from the database");
}
