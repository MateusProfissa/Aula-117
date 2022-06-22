function preload() {
    classfier = ml5.imageClassfier("DootleNet");
}


function setup() {
    canvas = createCanvas(280, 280); 
    canvas.center();
    background("white");
    canvas.mouseRelased(classfyCanvas);
    var speak2 = window.speechSynthesis; 

    video = createCapture(VIDEO);
    video.hide();
    video.size(300, 300);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}


function clearCanvas() {
    background("white");
}


function modelLoaded() {
    console.log("O PoseNet foi iniciado.");
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    result = results[0].label;

    document.getElementById("label").innerHTML = "Nome: " + result.replace("_" , " ");
    document.getElementById("confidense").innerHTML = "Precisão: " + Math.round(results[0].confidense * 100) + "%";

    speak_text = new SpeechSynthesisUtterance(result.replace("_", " "));
    speak2.speak(speak_text);
}


function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}


function classfyCanvas() {
    classfier.classfy(canvas, gotResult);
}