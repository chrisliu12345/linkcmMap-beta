/**
 * 创建一个基础map
 * mapID,装载地图ID，配置文件
 */
function buildMap(mapID){
	this.map = new OpenLayers.Map(mapID, {controls:[]});
	cache.mapDivId = mapID;
}
buildMap.prototype={
	createMap:function(){
        var map = this.map;
		var wms = new OpenLayers.Layer.WMS(
        	'basicMap',
        	mapStyle.wmsUrl,
        	{layers: mapStyle.wmsName},{}
        );
		if(mapStyle.mapDrag){
			map.addControl(new OpenLayers.Control.Navigation({documentDrag: true}));
		}
		map.addLayer(wms);
		map.setCenter(new OpenLayers.LonLat(mapStyle.mapLon,mapStyle.mapLat),mapStyle.mapZoom);
        this.mapWms = wms;
	},
	getMap:function(){
		return this.map;
	},
    refreshUrl: function(url){
        this.mapWms.url = url;
    },
    addEventToLayers: function(layers,clickBack){
        var layerEvent = new OpenLayers.Control.SelectFeature(layers,{
		    hover: true,
			highlightOnly: selectStyle.highlightOnly,
	        onSelect: function(lev){
                console.info('onSelect',lev);
	        },
			onUnselect:function(lev){
                console.info('onUnselect',lev);
				// document.getElementById('showLayer').style.display = 'none';
			},
			callbacks:{
				click:function(lev){
					if(clickBack){//则用户需要时返回回调函数
						clickBack(lev);
					}
				}
			}
		});
        this.map.addControls([layerEvent]);
		layerEvent.activate();//使控件生效
        this.layerEvent = layerEvent;
    },
    deactivateEvent: function () {
        this.layerEvent.deactivate();//使控件失效
    },
    activateEvent: function () {
        this.layerEvent.activate();//使控件失效
    }
};