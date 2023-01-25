Webcam.set({
    width: 320,
    height: 240,
    flip_horiz: true,
    image_format: 'jpeg',
    jpeg_quality: 90
});


function take_snapshot() {
    Webcam.snap( function(data_uri) {
       // display results in page
       document.getElementById('results').innerHTML = 
           '<img id="imageprev" src="'+data_uri+'"/>';
     } );
}
var cameraOnOff=true;
function camera_control(){
    if(cameraOnOff){
        Webcam.attach( '#my_camera' );
        cameraOnOff=false;
        document.querySelector("#toggleButton").childNodes[0].textContent="Stop Camera"
    }
    else{
        Webcam.reset();
        document.querySelector("#toggleButton").childNodes[0].textContent="Start Camera"
        cameraOnOff=true;
    }
}