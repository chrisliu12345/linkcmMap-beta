$(function(){
	var map = new buildMap('map');
	map.createMap();
	
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
	// var pic = new picLayer(map);
	// pic.addImage('image/10.jpg');
	// pic.refreshImage('image/11.jpg');
	
	// var imageList = ['image/1.jpg','image/2.jpg','image/3.jpg','image/4.jpg','image/5.jpg','image/6.png','image/7.jpg','image/8.jpg','image/9.jpg'];
	// pic.startImageAnimate(imageList,1000,true);
	// pic.stopImageAnimate();
	
    var pic = new picLayer(map);
	pic.addImage('../demo/image/10.jpg',[104,20,122,30]);
    
	//添加区域例子
	var area = new cityArea(map);
	// var styleJson = [
	// 	{"name":"增城市","color":"yellow"},
	// 	{"name":"从化市","color":"green"},
	// 	{"name":"广州市","color":"blue"}
	// ];
	// area.loadCity('广州,河源',styleJson);
	// area.loadCountry('广州,河源',styleJson);
	// area.load86Country(styleJson);
	var styleJson = [
		{"name":"广州","color":"yellow"},
		{"name":"惠州","color":"orange"},
		{"name":"潮州","color":"green"},
		{"name":"湛江","color":"gray"}
	];
	area.load21City(styleJson);
	// var showJson = [
	// 	{"name":"增城市","content":"<div style='border:1px solid #000;background:white;'><span>高温</span></div>"},
	// 	{"name":"从化市","content":"<div style='border:1px solid #000;background:white;'><span>大风</span></div>"},
	// 	{"name":"广州市","content":"<div style='border:1px solid #000;background:white;'><span>大雨</span></div>"}
	// ];
	// area.addSelectEvent(showJson);//添加选中事件
	
	// 添加点例子
	var shape = new mapShape(map);
	var pointJson = [
		{"name":"G1234","lon":"113","lat":"23","text":"12","img":"marker.png","imgWidth":"20","imgHeight":"20"},
		{"name":"G1235","lon":"108","lat":"20","text":"23","img":"marker-blue.png","imgWidth":"20","imgHeight":"20"},
		{"name":"G1236","lon":"118","lat":"18","text":"34","img":"marker-gold.png","imgWidth":"20","imgHeight":"20"}
	];
	shape.addPoints(pointJson);
    
     var layerArr = [];
    layerArr.push(area.getLayer());
    layerArr.push(shape.getLayer());
    map.addEventToLayers(layerArr);
	/*var pointShowJson = [
		{"name":"G1234","content":"<div style='border:1px solid #000;background:white;'><span>高温</span></div>"},
		{"name":"G1235","content":"<div style='border:1px solid #000;background:white;'><span>大风</span></div>"},
		{"name":"G1236","content":"<div style='border:1px solid #000;background:white;'><span>寒冷</span></div>"}
	];
	shape.addPointsEvent(pointShowJson);*/
	// var draw = new drawTool(map);
	// draw.drawPoint();
	// draw.drawPath();
	// draw.drawRegularPoygon('circle');
	// draw.drawPolygon();
	// draw.clearDraw();
	
	// var distance = new DistanceTool(map);
	// distance.addDistanceTool();
});