$(function(){
	var map = new buildMap('map');
	map.createMap();
    // map.refreshUrl('http://vmap0.tiles.osgeo.org/wms/vmap0');
	// createPolygon(map);
	// var control = new mapControl(map);
	// control.addZoomBar();
	// control.addViewMap();
	// control.addPosition();
	// control.addLayerSwitcher();
	/*var pic = new picLayer(map);
	var wmsJson = {
		"dateTime":"2015-08-08 20:14:00"
	};
	pic.addWms('ref','actionPath',wmsJson);
	var wmsJson2 = {
		"dateTime":"2015-07-08 20:14:00"
	};
	pic.refreshWms('ref',wmsJson2);
	pic.setWmsShow('ref',false);*/
	var pic = new picLayer(map);
	pic.addImage('resources/img/10.jpg',[104,20,122,30]);
	// pic.refreshImage('resources/img/11.jpg');
	
	// var imageList = ['resources/img/1.jpg','resources/img/2.jpg','resources/img/3.jpg','resources/img/4.jpg','resources/img/5.jpg','resources/img/6.png','resources/img/7.jpg','resources/img/8.jpg','resources/img/9.jpg'];
	// pic.startImageAnimate(imageList,1000,true);
	// pic.stopImageAnimate();

	//添加区域例子
	var area = new cityArea(map);
	// var styleJson = [
	// 	{"name":"增城市","color":"yellow"},
	// 	{"name":"从化市","color":"green"},
	// 	{"name":"广州市","color":"blue"}
	// ];
	// area.loadCity('广州,河源',styleJson);
	//area.loadCountry('广州',styleJson,'从化市');
	//  area.load86Country(styleJson);
	var styleJson = [
		{"name":"广州","color":"yellow"},
		{"name":"惠州","color":"orange"},
		{"name":"潮州","color":"green"},
		{"name":"湛江","color":"gray"}
	];
	area.load21City(styleJson);

	var labelJson = [{'fid': 'gdzj','x':0,'y':0},
		{'fid': 'gdmm','x':25,'y':0},
		{'fid': 'gdyf','x':20,'y':10},
		{'fid': 'gdjm','x':30,'y':0},
		{'fid': 'gdhz','x':0,'y':30}];
	area.updateLabelXY(labelJson);
	//  var showJson = [
	//  	{"name":"增城市","content":"<div style='border:1px solid #000;background:white;'><span>高温</span></div>"},
	//  	{"name":"从化市","content":"<div style='border:1px solid #000;background:white;'><span>大风</span></div>"},
	//  	{"name":"广州市","content":"<div style='border:1px solid #000;background:white;'><span>大雨</span></div>"}
	//  ];
	//  area.addSelectEvent(showJson);//添加选中事件
	
	// 添加点例子
	var shape = new mapShape(map);
	var pointJson = [
		{"type":"A","name":"G1234","lon":"113","lat":"23","text":"12","img":"marker.png","imgWidth":"20","imgHeight":"20"},
		{"type":"B","name":"G1235","lon":"108","lat":"20","text":"23","img":"marker-blue.png","imgWidth":"20","imgHeight":"20"},
		{"type":"C","name":"G1236","lon":"118","lat":"18","text":"34","img":"marker-gold.png","imgWidth":"20","imgHeight":"20"}
	];
	shape.addPoints(pointJson);
	// var pointShowJson = [
	// 	{"name":"G1234","content":"<div style='border:1px solid #000;background:white;'><span>高温</span></div>"},
	// 	{"name":"G1235","content":"<div style='border:1px solid #000;background:white;'><span>大风</span></div>"},
	// 	{"name":"G1236","content":"<div style='border:1px solid #000;background:white;'><span>寒冷</span></div>"}
	// ];
	// shape.addPointsEvent(pointShowJson,pointBack);
    
    var layerArr = [];
    layerArr.push(area.getLayer());
    layerArr.push(shape.getLayer());
    map.addEventToLayers(layerArr,pointBack);

	
	shape.showPoint(['A','B']);
	// shape.addMarkers(pointJson);
	// var draw = new drawTool(map);
	// draw.drawPoint();
	// draw.drawPath();
	// draw.drawRegularPoygon('circle');
	// draw.drawPolygon();
	// draw.clearDraw();
	
	// var distance = new DistanceTool(map);
	// distance.addDistanceTool();
	function pointBack(obj){
		console.info(obj);
        /*area.loadTargetArea(obj.attributes.key);
        map.deactivateEvent();
        shape.hidePoint(['A']);
        pic.refreshImage('resources/img/11.jpg');
        window.setTimeout(function(){
            area.load21City(styleJson);
            map.activateEvent();
            shape.showPoint(['A']);
            // map.moveTo(121,18,6);
            pic.refreshImage('resources/img/10.jpg');
        },2000);*/
	}
});

function createPolygon(map){
	var polygonStyles = new OpenLayers.StyleMap(
		{"default": {
			fillOpacity: 0, 
			strokeColor: "#00B8F6", 
			strokeWidth: 3
		}
	});
	var polygonLayer = new OpenLayers.Layer.Vector("polygon",{styleMap: polygonStyles});
	map.map.addLayers([polygonLayer]);
	// var polygonStr = 'POLYGON((112.2 18.049,112.5416 18.0826,112.8701 18.1823,113.1728 18.3441,113.4381 18.5619,113.6559 18.8272,113.8177 19.1299,113.9174 19.4584,113.951 19.8,113.9174 20.1416,113.8177 20.4701,113.6559 20.7728,113.4381 21.0381,113.1728 21.2559,112.8701 21.4177,110.8863 22.3154,109.2187 22.9107,108.2907 23.402,107.709 24.109,107.6428 24.1634,107.5672 24.2037,107.4853 24.2286,107.4 24.237,107.3147 24.2286,107.2328 24.2037,107.1572 24.1634,107.091 24.109,107.0366 24.0428,106.9963 23.9672,106.9714 23.8853,106.963 23.8,107.035 22.8,107.0497 22.6508,107.0932 22.5072,107.1639 22.375,107.8904 21.2922,108.0264 21.1264,109.2167 19.8167,109.4489 19.6262,111.2272 18.3441,111.5299 18.1823,111.8584 18.0826,112.2 18.049))';
	var polygonStr = [];
	var polygonFeature = [];
	polygonStr.push('POLYGON((114.061970134472 19.8,114.033682624305 20.1042128344965,113.949679595487 20.3991823159559,113.812513437541 20.6759459459459,113.626351874766 20.9260944016184,113.396851332045 21.142027048729,113.130985067236 21.3171828830624,112.83683129226 21.4462398832255,112.523327720721 21.5252767175744,112.2 21.5518918918919,111.876672279279 21.5252767175744,111.56316870774 21.4462398832255,111.269014932764 21.3171828830624,111.003148667955 21.142027048729,110.773648125234 20.9260944016184,110.587486562459 20.6759459459459,110.450320404513 20.3991823159559,110.366317375695 20.1042128344965,110.338029865528 19.8,110.366317375695 19.4957871655035,110.450320404513 19.2008176840441,110.587486562459 18.9240540540541,110.773648125234 18.6739055983816,111.003148667955 18.457972951271,111.269014932764 18.2828171169376,111.56316870774 18.1537601167745,111.876672279279 18.0747232824256,112.2 18.0481081081081,112.523327720721 18.0747232824256,112.83683129226 18.1537601167745,113.130985067236 18.2828171169376,113.396851332045 18.457972951271,113.626351874766 18.6739055983816,113.812513437541 18.9240540540541,113.949679595487 19.2008176840441,114.061970134472 19.8))');
polygonStr.push('POLYGON((113.263982933984 19.8,113.24781864246 19.9738359054266,113.199816911707 20.142389894832,113.121436250023 20.3005405405405,113.015058214152 20.4434825152105,112.883915046883 20.5668725992737,112.731991466992 20.6669616474642,112.563903595577 20.7407085047003,112.384758697555 20.7858724100425,112.2 20.8010810810811,112.015241302445 20.7858724100425,111.836096404423 20.7407085047003,111.668008533008 20.6669616474642,111.516084953117 20.5668725992737,111.384941785848 20.4434825152105,111.278563749977 20.3005405405405,111.200183088293 20.142389894832,111.15218135754 19.9738359054266,111.136017066016 19.8,111.15218135754 19.6261640945734,111.200183088293 19.457610105168,111.278563749977 19.2994594594595,111.384941785848 19.1565174847895,111.516084953117 19.0331274007263,111.668008533008 18.9330383525358,111.836096404423 18.8592914952997,112.015241302445 18.8141275899575,112.2 18.7989189189189,112.384758697555 18.8141275899575,112.563903595577 18.8592914952997,112.731991466992 18.9330383525358,112.883915046883 19.0331274007263,113.015058214152 19.1565174847895,113.121436250023 19.2994594594595,113.199816911707 19.457610105168,113.263982933984 19.8))');
polygonStr.push('POLYGON((112.465995733496 19.8,112.461954660615 19.8434589763566,112.449954227927 19.885597473708,112.430359062506 19.9251351351351,112.403764553538 19.9608706288026,112.370978761721 19.9917181498184,112.332997866748 20.0167404118661,112.290975898894 20.0351771261751,112.246189674389 20.0464681025106,112.2 20.0502702702703,112.153810325611 20.0464681025106,112.109024101106 20.0351771261751,112.067002133252 20.0167404118661,112.029021238279 19.9917181498184,111.996235446462 19.9608706288026,111.969640937494 19.9251351351351,111.950045772073 19.885597473708,111.938045339385 19.8434589763566,111.934004266504 19.8,111.938045339385 19.7565410236434,111.950045772073 19.714402526292,111.969640937494 19.6748648648649,111.996235446462 19.6391293711974,112.029021238279 19.6082818501816,112.067002133252 19.5832595881339,112.109024101106 19.5648228738249,112.153810325611 19.5535318974894,112.2 19.5497297297297,112.246189674389 19.5535318974894,112.290975898894 19.5648228738249,112.332997866748 19.5832595881339,112.370978761721 19.6082818501816,112.403764553538 19.6391293711974,112.430359062506 19.6748648648649,112.449954227927 19.714402526292,112.465995733496 19.8))');


	for(var key in polygonStr){
		var geometry = new OpenLayers.Geometry.fromWKT(polygonStr[key]);
		var reFeature = new OpenLayers.Feature.Vector(geometry);
		polygonFeature.push(reFeature);
	}
	
	polygonLayer.addFeatures(polygonFeature);
}