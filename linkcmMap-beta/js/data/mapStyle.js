var mapStyle={//显示区域基本设置
	fontShow:true,
	fontFamily:'宋体',
	fontSize:'12',
	fontColor:'black',
	labelOutlineWidth:'0',
	labelOutlineColor:'yellow',
	fillColor:'red',
	fillOpacity:'1',
	strokeColor:'#eee',
	strokeWidth:'2',
	wmsUrl:'http://vmap0.tiles.osgeo.org/wms/vmap0',
    // wmsUrl:'../resources/img/4.jpg',
	wmsName:'basic',
	mapLon:'113',
	mapLat:'23',
	mapZoom:'6',
	mapDrag:false//地图是否可以拖动
};

var selectStyle={//图层选中设置
	defaultFont:true,//显示json数据传入的name
	highlightOnly:false,//禁止鼠标移入、出事件
	fontShow:true,//鼠标移入是否显示名称
	fillColor:'blue',
	fillOpacity:'0.5',
	strokeColor:'#eee',
	strokeWidth:'3',
	cursor:'pointer'
};

var pointSelectStyle={//图层选中设置
	status:true//鼠标选中变大
};