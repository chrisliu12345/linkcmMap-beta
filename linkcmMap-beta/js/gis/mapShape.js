function mapShape(map){//添加不同的图形
	this.map=map.map;
}
mapShape.prototype={
	addPoints:function(pointJson){//添加点
		//添加一个规则
		var ruleLow = new OpenLayers.Rule({
		    filter: new OpenLayers.Filter.Function({
		          evaluate: function(properties) {
		              return properties;
		          }
		      }),
		    symbolizer: {
				externalGraphic:'${imgPath}',label:'${text}',labelXOffset:'15',labelYOffset:'10',cursor:'pointer',graphicWidth:'${width}',graphicHeight:'${height}',graphicOpacity:1
		    }
		});
		//建立图层样式
        var pointStyle = new OpenLayers.Style();
		pointStyle.addRules([ruleLow]);
		var layerObj = this.map.getLayersByName('player');
		if(layerObj.length > 0){//若存在先清空
			this.map.removeLayer(layerObj);
		}
		//建立图层承载容器
        var pointLayer = new OpenLayers.Layer.Vector("player");
		pointLayer.styleMap = new OpenLayers.StyleMap(pointStyle);
        this.map.addLayer(pointLayer);
		var pfList = [];
		for(var pKey in pointJson){
			var tempJson = pointJson[pKey];
			var point = new OpenLayers.Geometry.Point(tempJson.lon,tempJson.lat);
			var pointFeature = new OpenLayers.Feature.Vector(point);
			var sText = tempJson.text;
			if(sText){
			}else{
				sText = '';
			}
			 pointFeature.attributes = {
	   			imgPath:tempJson.img,
				key:tempJson.name,
				text:sText,
				width:tempJson.imgWidth,
				height:tempJson.imgHeight,
				type:'point',
			 	pointKind:tempJson.type//用于判断点的类型
	        };
			pfList.push(pointFeature);
		}
		pointLayer.addFeatures(pfList);
		this.pointLayer = pointLayer;
		this.pointList = pfList;
	},
	addPointsEvent:function(showJson,callBack){//图层选择事件
		var pointLayer = this.pointLayer;
		this.map.events.register('mousemove',this.map,function(pobj){
			var pointObj = document.getElementById('showLayer');
			if(pointObj){
				pointObj.style.top = pobj.pageY+10;
				pointObj.style.left = pobj.pageX+10;
			}		
		});
		// var cuAlpLayer = [];
		// var layerObj = this.map.getLayersByName('areaLayers');
		// if(layerObj.length > 0){//若存在先清空
		// 	cuAlpLayer.push(layerObj[0]);
		// }
		// cuAlpLayer.push(pointLayer);
		var aFeatureList = pointLayer.features;
		for(var fKey in aFeatureList){//attributes
			for(var sKey in showJson){
				if(showJson[sKey].name === aFeatureList[fKey].attributes.key){
					aFeatureList[fKey].attributes.html = showJson[sKey].content;
				}
			}
		}
		var pointLayerEvent = new OpenLayers.Control.SelectFeature([pointLayer],{
		    hover: true,
			// highlightOnly: true,
			//toggle: true,
	        onSelect: function(lev){
				//pointLayer.setZIndex(745);
				var showHtml = lev.attributes.html;
				if(showHtml){
				}else{
					showHtml = '';
				}
				//删除生成的DIV
				var reDiv = document.getElementById('showLayer');
				if(reDiv){
					reDiv.parentNode.removeChild(reDiv);
				}
				//创建显示框DIV
				var contentDiv = document.createElement('div');
				contentDiv.setAttribute('id','showLayer');
				contentDiv.style.width='auto';
				contentDiv.style.height='auto';
				contentDiv.style.position='absolute';
				contentDiv.style.zIndex="999";
				contentDiv.innerHTML=showHtml;
				document.body.appendChild(contentDiv);
				
				if(lev.attributes.type === 'point'){
					if(pointSelectStyle.status){//选中变大
						lev.attributes.width = parseInt(lev.attributes.width)+parseInt(15);
						lev.attributes.height = parseInt(lev.attributes.height)+parseInt(15);
						pointLayer.redraw();
					}
				}
				if(callBack){
					var objEle = {};
					objEle.type = 'onSelect';
					objEle.ele = lev;
					callBack(objEle);
				}
	        },
			onUnselect:function(lev){
				if(lev.attributes.type === 'point'){
					if(pointSelectStyle.status){//移出缩小
						lev.attributes.width = parseInt(lev.attributes.width)-parseInt(15);
						lev.attributes.height = parseInt(lev.attributes.height)-parseInt(15);
						pointLayer.redraw();
					}
				}
				document.getElementById('showLayer').style.display = 'none';
				if(callBack){
					var objEle = {};
					objEle.type = 'onUnselect';
					objEle.ele = lev;
					callBack(objEle);
				}
			},
			callbacks:{
				click:function(lev){
					if(callBack){
						var objEle = {};
						objEle.type = 'click';
						objEle.ele = lev;
						callBack(objEle);
					}
					//console.info(lev);
				}
			}
		});
		console.info(this.map);
		this.map.addControls([pointLayerEvent]);
		pointLayerEvent.activate();//使控件生效
	},
	/**
	 * 对点进行过滤
	 */
	hidePoint: function(types){
		var points = this.pointLayer.features;
		var filter = [];
		for(var key in points){
			var tempPoint = points[key];
			for(var ft in types){
				if(tempPoint.attributes.pointKind === types[ft]){
					filter.push(tempPoint);
				}
			}
		}
		this.pointLayer.removeFeatures(filter);
	},
	showPoint: function (types){
		var points = this.pointList;
		var filter = [];
		for(var key in points){
			var tempPoint = points[key];
			for(var ft in types){
				if(tempPoint.attributes.pointKind === types[ft]){
					filter.push(tempPoint);
				}
			}
		}
		this.pointLayer.addFeatures(filter);
	},
	addMarkers:function(markJson){
		//向地图添加标注
		var markers = new OpenLayers.Layer.Markers( "Markers" );
	    this.map.addLayer(markers);//创建一个用于存放markers对象的markers,并将它加入到map对象中
	
		for(var mkey in markJson){
			//创建一个markers对象的表现形态
		    var size = new OpenLayers.Size(markJson[mkey].imgWidth,markJson[mkey].imgHeight);
		    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		    var icon = new OpenLayers.Icon(markJson[mkey].img,size,offset);
			markers.addMarker(new OpenLayers.Marker(
				new OpenLayers.LonLat(markJson[mkey].lon,markJson[mkey].lat),icon));
		}
		this.markers = markers;
	},
	addMarkersEvent:function(showJson){
		// var markers = this.markers;
		// markers.events.register("mouseover", markers ,function(e){
		// 	console.info("1");	
		// });
	},
	getPointLayer: function(){
		return this.pointLayer;
	}
};