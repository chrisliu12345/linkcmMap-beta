/**
 * 测距工具
 */
function DistanceTool(map){
	this.map = map.map;
}
DistanceTool.prototype={
	addDistanceTool : function(){
		//工具默认样式
		var drawOptions =	{
				'label':'',
				'strokeColor': 'green',
				'strokeOpacity': 1,
				'strokeWidth': 2,
				'pointRadius': 6
		};
		//建立多边形承载器
		var drawLayer = new OpenLayers.Layer.Vector("Path", {
			styleMap: new OpenLayers.StyleMap({
		        default: {
					fillColor: 'red',
					fillOpacity:'0.6',
					strokeColor: 'green',
					strokeWidth:'2'
				}
		    })
		});
		
		var drawControls = {       
            line: new OpenLayers.Control.DrawFeature(drawLayer,OpenLayers.Handler.Path,{
				handlerOptions:drawOptions,
				featureAdded:function(obj){//完成图形后的监听事件
					console.info("finished");
					// polygon.handlerOptions.label = '';
					// dragControl.activate();
					// clickFeatureControl.deactivate();//这两个监听需要处理，不然会引起无法删除feature的BUG
				},
				callbacks:function(obj){
					console.info(obj);
					// var distance = OpenLayers.Util.distVincenty({lon:"",lat:""},{lon:"",lat:""});
				}
			})
        };
		var polygon = drawControls.line;
		
		var lastLon = '';//record lonlat
		var lastLat = '';
		var lastDistance = 0;
		polygon.handler.callbacks.point = function(pt){
			if(lastLon !== ''){
				var distance = OpenLayers.Util.distVincenty({lon:lastLon,lat:lastLat},{lon:pt.x,lat:pt.y});
				console.log(distance+lastDistance);
				lastLon = pt.x;
				lastLat = pt.y;
				lastDistance += distance;
			}else{
				lastLon = pt.x;
				lastLat = pt.y;
			}
	    };
		// var polygon = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Polygon,drawOptions);
		
		this.map.addControl(polygon);
		polygon.activate();  
		this.map.addLayer(drawLayer);
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
				// drawLayer.removeFeatures([feature]);
				// dragControl.deactivate();
				// clickFeatureControl.activate();
				// polygon.handlerOptions.label = '';
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
		
		this.polygon = polygon;
	},
	removeDistanceTool : function(){
		if(this.polygon){
			this.polygon.deactivate();
		}
	}
};