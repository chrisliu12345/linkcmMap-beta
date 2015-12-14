function drawTool(map){
	this.map=map.map;
}
drawTool.prototype={//画画工具
	drawPolygon:function(){
		//工具默认样式
		var drawOptions =	{
				'label':'',
				'labelXOffset':'70',
				'labelYOffset':'-12',
				'strokeColor': '#FF0000',
				'strokeOpacity': 1,
				'strokeWidth': 2,
				'fillColor': '#FF0000',
				'fillOpacity': 0.5,
				'pointRadius': 6
		};
		//建立多边形承载器
		var polygonLayer = new OpenLayers.Layer.Vector("Polygon", {
			styleMap: new OpenLayers.StyleMap({
		        default: {
					fillColor: 'red',
					fillOpacity:'0.6',
					strokeColor: 'blue',
					strokeWidth:'1'
				}
		    })
		});
		this.initDraw(drawOptions,polygonLayer,'Polygon');
		this.polygonLayer = polygonLayer;
	},
	drawPath:function(){
		//工具默认样式
		var drawOptions =	{
				'label':'',
				'strokeColor': 'green',
				'strokeOpacity': 1,
				'strokeWidth': 2,
				'pointRadius': 6
		};
		//建立多边形承载器
		var pathLayer = new OpenLayers.Layer.Vector("Path", {
			styleMap: new OpenLayers.StyleMap({
		        default: {
					fillColor: 'red',
					fillOpacity:'0.6',
					strokeColor: 'green',
					strokeWidth:'2'
				}
		    })
		});
		this.initDraw(drawOptions,pathLayer,'LineString');
		this.pathLayer = pathLayer;
	},
	drawPoint:function(){
		//工具默认样式
		var drawOptions =	{
				'strokeColor': 'green',
				'strokeOpacity': 1,
				'strokeWidth': 2,
				'labelXOffset':'70',
				'labelYOffset':'-12',
				'pointRadius': 6,
				'label':'${key}'
				//  "single" : true,
	            // "double" : false,
	            // "pixelTolerance" : 0,
	            // "stopSingle" : true,
	            // "stopDouble" : false
		};
		// var context = {
		//     // getZIndex: function(feature) {
		//     //     return (feature.geometry instanceof OpenLayers.Geometry.Point) ? 1 : 0;
		//     // },
		// 	getLabel: function(feature){
		// 		if(feature){
		// 			console.info(feature.attributes.key);
		// 			return feature.attributes.key;
		// 		}
		// 		return '';
		// 	}
		// };
		var template = OpenLayers.Util.applyDefaults({
	        graphicWidth: 35,
	        graphicHeight: 46,
	        graphicYOffset: -38,
	        graphicOpacity: 1,
	        // graphicZIndex: "${getZIndex}",
	        externalGraphic: 'marker.png',
	        strokeColor: 'blue',
	        strokeWidth: 3,
	        strokeOpacity: 0.5,
			label:'${getLabel}'
	    }, OpenLayers.Feature.Vector.style['default']);
		var temporarystyle = OpenLayers.Util.applyDefaults({
			labelXOffset:70,
			labelYOffset:-12,
			pointRadius: 6,
			label:'点击地图进行标记',
			strokeWidth: 3,
		    strokeColor: 'red',
		    graphicName: 'square'
		}, OpenLayers.Feature.Vector.style.temporary);

		var styleMap = new OpenLayers.StyleMap({
		    "default": new OpenLayers.Style(template, {context: {
				getLabel:function(feature){
					return feature.attributes.key;
				}
			}}),
		    "temporary": new OpenLayers.Style(temporarystyle)
		});
		var pointLayer = new OpenLayers.Layer.Vector('Point', {
			styleMap: styleMap
		});
		this.initDraw(drawOptions,pointLayer,'Point');
		this.pointLayer = pointLayer;
	},
	drawRegularPoygon:function(shapeType){
		var sideCount = '';
		if(shapeType === 'triange'){
			sideCount = '3';
		}else if(shapeType === 'square'){
			sideCount = '4';
		}else if(shapeType === 'pentagon'){
			sideCount = '5';
		}else if(shapeType === 'hexagon'){
			sideCount = '6';
		}else if(shapeType === 'circle'){
			sideCount = '50';
		}
		//工具默认样式
		var drawOptions =	{
			'fillColor':'red',
			'fillOpacity':'0',
			'strokeColor': 'green',
			'strokeOpacity': '0',
			'strokeWidth': '0',
			'label':'点击地图进行拖动',
			'labelXOffset':'70',
			'labelYOffset':'-12',
			// 'pointRadius': 6,
			'sides':sideCount,
			'irregular': true
		};
		//建立多边形承载器
		var regularPlygonLayer = new OpenLayers.Layer.Vector("RegularPolygon", {
			styleMap: new OpenLayers.StyleMap({
		        default: {
					fillColor: 'red',
					fillOpacity:'0.6',
					strokeColor: 'blue',
					strokeWidth:'1'
				}
		    })
		});
		this.initDraw(drawOptions,regularPlygonLayer,'RegularPolygon');
		this.regularPlygonLayer = regularPlygonLayer;
	},
	initDraw:function(drawOptions, drawLayer, drawType){//通用工具
		var drawControls = {
            point: new OpenLayers.Control.DrawFeature(drawLayer,OpenLayers.Handler.Point,{
				handlerOptions:drawOptions,
				featureAdded:function(obj){//完成图形后的监听事件
					console.info("finished");			
					obj.attributes={
						key:'llllll'
					};	
					// obj.layer.styleMap.styles.default.defaultStyle.label = '';
					// drawLayer.redraw();
					polygon.handlerOptions.label = '';
					dragControl.activate();
					clickFeatureControl.deactivate();//这两个监听需要处理，不然会引起无法删除feature的BUG
				
					var pLonLat = new OpenLayers.LonLat(obj.geometry.x,obj.geometry.y);
					var pixel = this.map.getPixelFromLonLat(pLonLat);
					//创建显示框DIV
					var contentDiv = document.createElement('div');
					contentDiv.setAttribute('id','pointText');
					contentDiv.style.width='auto';
					contentDiv.style.height='auto';
					contentDiv.style.position='absolute';
					contentDiv.style.left=pixel.x;
					contentDiv.style.top=pixel.y+25;
					contentDiv.style.zIndex="999";
					contentDiv.innerHTML="<div>输入名称<input id='textVal' type='text'><input id='textSure' type='button' value='确定'/></div>";
					document.body.appendChild(contentDiv);
					var teDiv = document.getElementById('textSure');
					if(teDiv){//为输入框添加事件
						teDiv.onclick=function(){
							var reDiv = document.getElementById('pointText');
							if(reDiv){
								var contentVal = document.getElementById('textVal').value;
								obj.attributes={
									key:contentVal
								};
								//改变标注点文本
								// obj.layer.styleMap.styles.default.defaultStyle.label = contentVal;
								// drawLayer.redraw();
								
								reDiv.parentNode.removeChild(reDiv);
							}
						};
					}
				}
			}),        
            line: new OpenLayers.Control.DrawFeature(drawLayer,OpenLayers.Handler.Path,{
				handlerOptions:drawOptions,
				featureAdded:function(obj){//完成图形后的监听事件
					console.info("finished");
					polygon.handlerOptions.label = '';
					dragControl.activate();
					clickFeatureControl.deactivate();//这两个监听需要处理，不然会引起无法删除feature的BUG
				}
			}),       
            polygon: new OpenLayers.Control.DrawFeature(drawLayer,OpenLayers.Handler.Polygon,{
				handlerOptions:drawOptions,
				featureAdded:function(obj){//完成图形后的监听事件
					console.info("finished");
					polygon.handlerOptions.label = '';
					dragControl.activate();
					clickFeatureControl.deactivate();//这两个监听需要处理，不然会引起无法删除feature的BUG
					// dragControl.activate();
					// clickFeatureControl.activate();
				}
			}),
			RegularPolygon: new OpenLayers.Control.DrawFeature(drawLayer,OpenLayers.Handler.RegularPolygon,{
				handlerOptions:drawOptions,
				featureAdded:function(obj){//完成图形后的监听事件
					console.info("finished");
					polygon.handlerOptions.label = '';
					dragControl.activate();
					clickFeatureControl.deactivate();//这两个监听需要处理，不然会引起无法删除feature的BUG
				}
			})
        };
		var polygon = '';
		if(drawType === 'Polygon'){
			polygon = drawControls.polygon;
		}else if(drawType === 'LineString'){
			polygon = drawControls.line;
		}else if(drawType === 'Point'){
			polygon = drawControls.point;
		}else if(drawType === 'RegularPolygon'){
			polygon = drawControls.RegularPolygon;
		}
		
		polygon.handler.callbacks.point = function(pt){
       		console.log(pt);
	    };
		this.map.addControl(polygon);
		polygon.activate();

		// var polygon = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Polygon,drawOptions);
		this.map.addControl(polygon);
		polygon.activate();     
		this.map.addLayer(drawLayer);
		
		//添加可拖动监听
		var dragType = 'OpenLayers.Geometry.'+drawType;
		if(drawType === 'RegularPolygon'){
			dragType = 'OpenLayers.Geometry.Polygon';
		}
		var dragControl = new OpenLayers.Control.DragFeature(drawLayer, {
		    geometryTypes: [dragType],
		    onEnter: function(obj) {
				console.info("enter");
				clickFeatureControl.activate();
				polygon.handlerOptions.label = '双击删除';
		    },
		    onLeave: function(obj) {
				console.info("out");
				polygon.handlerOptions.label = '';
		    }
		});
		this.map.addControl(dragControl);
		dragControl.activate();
		
		//增加额外监听
		var clickFeatureControl = new (OpenLayers.Class(OpenLayers.Control, {
		    initialize: function(polygon, options) {
		        OpenLayers.Control.prototype.initialize.apply(this, [options]);
		        this.layer = polygon;
		        this.handler = new OpenLayers.Handler.Feature(
		            this, polygon, {
		                dblclick: this.dbClickFeature,
						click:this.clickFeature
		            }
		        );
		    },
		    dbClickFeature: function(feature) {
				console.info("dbClick");
				drawLayer.removeFeatures([feature]);
				dragControl.deactivate();
				clickFeatureControl.activate();
				polygon.handlerOptions.label = '';
				// this.map.viewPortDiv.innerHTML='';
				// this.map.viewPortDiv.outerHTML='';
				// (this.map.getLayersByName('OpenLayers.Handler.'+drawType))[0].removeAllFeatures();
				// (this.map.getLayersByName(drawType))[0].removeAllFeatures();
		    },
			clickFeature:function(feature){
				console.info("click2");
			}
		}))(drawLayer);
		this.map.addControl(clickFeatureControl);
		clickFeatureControl.activate();
	},
	clearDraw:function(drawType){
		if(drawType){
			if(drawType === 'point'){
				this.map.removeLayer(this.pointLayer);
			}else if(drawType === 'path'){
				this.map.removeLayer(this.pathLayer);
			}else if(drawType === 'plygon'){
				this.map.removeLayer(this.polygonLayer);
			}else if(drawType === 'regularPlygon'){
				this.map.removeLayer(this.regularPlygonLayer);
			}
		}else{
			if(this.pointLayer){
				this.map.removeLayer(this.pointLayer);
			}
			if(this.pathLayer){
				this.map.removeLayer(this.pathLayer);
			}
			if(this.polygonLayer){
				this.map.removeLayer(this.polygonLayer);
			}
			if(this.regularPlygonLayer){
				this.map.removeLayer(this.regularPlygonLayer);
			}
		}
	}
};