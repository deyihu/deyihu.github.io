

var map;
// var popup=new GL.Popup();

var layer;

var data1 = [];

function init() {
    map = new maptalks.Map("map-container", {
        // center : [175.46873, -37.90258],
        center: [31.30150538026905, 120.61955565318601].reverse(),
        zoom: 9,
        pitch: 30,
        maxPitch: 60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl: {
            'content': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer: new maptalks.TileLayer('tile', {
            urlTemplate: '//a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c', 'd']
        })
    });
    var img = new Image();
    img.src = 'assets/icons/0001.png';
    img.addEventListener("load", function () {
        img.width = img.height = 20;
        canvasTest(img);
    }, false);

}

function generate(num, img) {
    for (var i = 0; i < num; i++) {
        var lng = -170 + Math.random() * 360;
        var lat = -70 + Math.random() * 150;
        data1.push({
            geometry: {
                type: 'Point',
                coordinates: [lng, lat]
            },
            count: 100 * Math.random(),
            time: Math.random() * 100,
            icon: img,
            id: i
        });
    }
}




function canvasTest(img) {
    generate(150000, img);
    dataSet1 = new maptalks.GMVI.DataSet(data1);
    var options = {
        draw: 'icon',
        fillStyle: 'red',
        size: 10
    }
    layer = new maptalks.GMVI.CanvasLayer('ajfljalfas', dataSet1, options);
    map.addLayer(layer);
    map.on('click', function (e) {
        let d = layer.identify(e);
        if (d) {
            console.log(d)
        }
    })

}



init();
