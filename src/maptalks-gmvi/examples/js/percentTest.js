/**
 * Created by Administrator on 2017/7/11.
 */
/**
 * Created by Administrator on 2017/7/10.
 */
/**
 * Created by Administrator on 2017/7/10.
 */
/**
 * Created by Administrator on 2017/6/27.
 */
var popup=new GL.Popup();

function init() {
    //初始化gaeainfo地图
    this.map = new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            zoom:2,
            maxZoom:8
        });

    var url4="http://58.210.98.62:7080/Layers_20170323_WYL/Layers/_alllayers/";
    var orginal4="119.75,32.25";
    var resolutions4 = [9.765664903423653E-4, 4.882832451711827E-4,  2.4414162258559134E-4, 1.2207081129279567E-4, 6.103540564766688E-5,
        3.0517702822564394E-5, 1.5258851412551242E-5, 7.629425705006574E-6,3.814712853772333E-6,1.90735154359766E-6];
    var maxBounds4 = "119.89,30.75;121.406,32.08" ;
    var crs={
        origin:orginal4,
        resolutions:resolutions4,
        code: "4326"
    }


    var layer4 =  GL.LayerLookup.createGaeaTiledLayer(url4, {
        origin: orginal4,
        resolutions: resolutions4,
        maxBounds: maxBounds4,
        format:'png',
        preview: 'assets/images/basemap-esri.png'
    },crs);
    map.addBaseLayer(layer4);
    canvasTest();
}



//热区测试
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
            fillStyle:randomColor(), ///覆盖option中的值
            id:GL.H.uuid(),
            count:100*Math.random()
        });

    }

    var dataSet = new GL.GMVI.DataSet(data);
    var options = {
        // strokeStyle:'#006283',//默认black
        fillStyle:'gray',
        size:50,
        // fillStyle:'black',
        draw: 'percent',
        methods: {
            click: function (item) {
                console.log(item);
                if(!item)
                    return;
                var latlng=item.location.latlng;
                console.log(latlng)
                popup.setLngLat(latlng);
                popup.setContent(item.id);
                map.openPopup(popup)
            }
        },
    }
    var canvasLayer= new GL.GMVI.CanvasLayer(dataSet,options)
    this.map.addLayer(canvasLayer);//.addTo(this.map);

}

GL.ready(init,'conf.json');

