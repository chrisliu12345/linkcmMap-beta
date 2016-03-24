function picLayer(map){//创建存放pic类型的容器
	this.map = map.map;
}
picLayer.prototype={
	/**
	 * cLayerName:图层名称，便于后续操作图层
	 * reqeustPath:后台请问地址
	 * wmsJson:设置与后台的请求属性
	 */
	addWms:function(cLayerName,requestPath,wmsJson){//添加wms的方法
		var layNum = this.map.layers.length;
		//创建一个wms对象
		var wmsLayers = new OpenLayers.Layer.WMS(
			cLayerName,
			requestPath,
			wmsJson,
			{singleTile:true,ratio:1,transparent:true}
		);
		this.map.addLayer(wmsLayers);
		this.picWms = wmsLayers;
	},
	setWmsZIndex:function(zIndex){//设置wms层级
		this.map.setLayerIndex(this.picWms, zIndex);
	},
	refreshWms:function(cLayerName,wmsJson){//刷新wms图层
		this.map.getLayersByName(cLayerName)[0].mergeNewParams(wmsJson);
	},
	setWmsShow:function(cLayerName,status){//设置wms图层是否可见
		this.map.getLayersByName(cLayerName)[0].setVisibility(status);
	},
	addImage : function(imgUrl,bounds){
		var mapEPSG = this.map.getProjectionObject();
		var imageBounds = new OpenLayers.Bounds(bounds);
		imageBounds = imageBounds.transform('EPSG:4326',mapEPSG);
		var tempImage = new OpenLayers.Layer.Image(
			'tempImage',
			imgUrl,
			imageBounds,
			imageBounds.getSize(),
			{transparent:true,isBaseLayer:false}
		);
		this.map.addLayers([tempImage]);
		picLayer.tempImage = tempImage;
		// picLayer.prototype.startImageAnimate(true);
	},
	showImage : function(){
		picLayer.tempImage.setVisibility(true);
	},
	hideImage : function(){
		picLayer.tempImage.setVisibility(false);
	},
	refreshImage : function(imgUrl){
		picLayer.tempImage.url = imgUrl;
		picLayer.tempImage.redraw();
	},
	animateImage : function(imageList,index){
		if(picLayer.animateModel){
			picLayer.lastIndex = index;
			var imageControl = window.setTimeout(function(){
				picLayer.prototype.refreshImage(imageList[index]);
				if(picLayer.animateModel){
					if(index === imageList.length-1){
						index = 0;
					}
				}
				if(index < imageList.length-1){
					picLayer.prototype.animateImage(imageList,index+1);
				}
			},picLayer.animateTime);
			picLayer.animateControl = imageControl;
		}
	},
	startImageAnimate : function(imageList,time,model){
		picLayer.animateModel = model;
		picLayer.animateList = imageList;
		picLayer.animateTime = time;
		picLayer.prototype.animateImage(imageList,0);
	},
	stopImageAnimate : function(){
		if(typeof(picLayer.animateModel) !== 'undefined'){
			picLayer.animateModel = false;
		}
	},
	goOnImageAnimate : function(){
		picLayer.animateModel = true;
		picLayer.prototype.animateImage(picLayer.animateList,picLayer.lastIndex+1);
	},
	changeAnimateTime : function(time){
		picLayer.animateTime = time;
	}
};