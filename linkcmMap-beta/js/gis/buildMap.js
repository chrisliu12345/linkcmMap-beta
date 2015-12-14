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
	},
	getMap:function(){
		return this.map;
	}
};