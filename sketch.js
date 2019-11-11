var panorama;
var gmap;
var headingSV = 20;
var windows =[1,2,5,8,13,16, 21, 23];

var locationIndex = 0;

var locations = [
{lat: 40.808029, lng: -73.963859}, {lat:35.659363, lng:139.700964}, {lat:40.7235499, lng:-73.9792336}, {lat: 40.7423643, lng: -73.9889526}, {lat: -8.0104812, lng: -34.8546019}, {lat: 37.3965581, lng: 126.6364439}, {lat: 37.3938247, lng: 126.6430511}, {lat: 52.5136312, lng: 13.4177136}, {lat:40.72976017315663,lng:-73.99156880081819},{lat:35.6595699,lng:139.7005703}
];

var locationNow;
var mouseDown = false;
var pov;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


function setup() {
  // window.setInterval(switchLocation, 10000);
  // console.log("started");
  frameRate(30);
  noCanvas();
  $("#graphic").show();
}

function showInfo(index){
  $("#modal #wrap #info").append(data[index].info);
  select("#modal").show();
}

function hideInfo(){
  select("#modal").hide();
}


function draw() {
  if(!isMobile){
  headingSV = map(mouseX, windowWidth, 0,0,165);
   // var p = map(winMouseY,0, windowHeight, 30,-30);
  // headingSV += 0.05;
 panorama.setPov({
      heading:headingSV,
      // pitch: p,
      pitch: pov.pitch,
      zoom: pov.zoom
    });
}
}

function mousePressed(){
  if(!isMobile){
  mouseDown = true;
  switchLocation();
}
}

function mouseReleased(){
  pov = panorama.getPov();
  headingSV = pov.heading;
  mouseDown = false;
}

function switchLocation(){
  locationNow = randomLocation();
  panorama.setPosition(locationNow);

}

function randomLocation(){
  // var locationIndex = Math.floor(Math.random()*locations.length);
  var loc = locations[Math.floor(Math.random()*locations.length)];
  return loc;
}

function initMap() {

  // pick a random location
  // locationNow = locations[locationIndex];
  locationNow = randomLocation();
  // locationNow = randomLocation;

  panorama = new google.maps.StreetViewPanorama(
            document.getElementById('gmap'),
            {
              position: locationNow,
              pov: {heading: headingSV, pitch: 0},
              zoom: 1
            });

  panorama.setOptions({
    disableDefaultUI:true,
    showRoadLabels: false,
    panControl:false,
    scrollwheel: false
    });
    pov = panorama.getPov();
}