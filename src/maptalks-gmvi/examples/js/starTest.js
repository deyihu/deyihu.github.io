
// var popup=new GL.Popup();
var map;

function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    canvasTest();
}



function  canvasTest() {
    var data = [];
    var poiList=gsAreaPoi.data;
    for( var i=0;i<100;i++){
        var poiInfo=poiList[i];
        var lng=poiInfo.lng;
        var lat=poiInfo.lat;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [lng,lat],
            },
            color:randomColor(), ///覆盖option中的值
            // id:GL.H.uuid()
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        // strokeStyle:'#006283',//默认black
        fillStyle:'yellow',
        size:20,
        draw: 'star'
    }
    var canvasLayer= new maptalks.GMVI.CanvasLayer('jalsdfjalsjf',dataSet,options)
    map.addLayer(canvasLayer);//.addTo(this.map);
    map.on('click',function(e){
        let d=canvasLayer.identify(e);
        if(d){
           console.log(d)
        }
     })


}
init();

