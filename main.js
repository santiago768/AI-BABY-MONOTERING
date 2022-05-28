status = "";
objects = [];
alarm="";


function preload(){
    alarm=loadSound("alarm.mp3");
}



function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    webcam=createCapture(VIDEO);
    webcam.hide();
    objectdetector = ml5.objectDetector("cocossd", modelloded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function draw() {
     image(webcam,0,0,380,380);
    if (status != "") {
        objectdetector.detect(webcam, getresults);
        r= floor(random(255));
        g= floor(random(255));
        b= floor(random(255));
        for (i = 0; i < objects.length; i++) {
            object_name = objects[i].label;
            if(object_name=="person"){
            document.getElementById("objects_detected").innerHTML="baby detected: ";
            alarm.stop();     
            }
            else{
                document.getElementById("objects_detected").innerHTML="baby not detected: ";
                alarm.play();    
            }
            obj_confidence = floor(objects[i].confidence * 100);
            object_x=objects[i].x;
            object_y=objects[i].y;
            object_width=objects[i].width;
            object_height=objects[i].height;
            fill(r,g,b);
            textSize(20);
            text(object_name+" "+obj_confidence+"%",object_x,object_y);
            noFill();
            rect(object_x,object_y,object_width,object_height);

        }
        if(objects.length<0){
            alarm.play()
            document.getElementById("objects_detected").innerHTML="baby Not Found";
        }
    }

}

function modelloded() {
    console.log("model loded succesfuly");
    status = true;
    
}

function getresults(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        objects = r;
    }
}
