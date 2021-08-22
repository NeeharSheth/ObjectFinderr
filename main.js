video="";
status= false;
r= 0;
b= 0;
g= 0;
objects=[];
object="";
x=0;

function preload(){
}

function setup(){
    canvas=createCanvas(300,300);
    canvas.position(550,470);

    video=createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,300,300);
    if(status == "true"){
        objectDetector.detect(video, gotResults);

        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0;i<objects.length;i++){
            if(objects[i].label==object){
            document.getElementById("button_status").innerHTML="Detected "+object;
            fill(r,g,b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        x=1;
        }
        console.log(x);
             if(x==0){
                document.getElementById("button_status").innerHTML="could not detect "+object;
            }
        }
    }
}

function start(){
object= document.getElementById("object_input").value;
object= object.toLowerCase();
if(object){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("other_btn").style.visibility="visible";
    document.getElementById("button_status").innerHTML="Detecting "+object;}
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
}

function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects= results;
}
}