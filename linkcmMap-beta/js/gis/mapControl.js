function mapControl(map){//地图控件
	this.map = map.map;
}
mapControl.prototype={
	addLoadingPanel:function(){//地图加载动画效果
		this.map.addControl(new OpenLayers.Control.LoadingPanel());
	},
	addZoomBar:function(){//添加地图缩放工具条
		this.map.addControl(new OpenLayers.Control.PanZoomBar());
	},
	addViewMap:function(){//缩略地图
		this.map.addControl(new OpenLayers.Control.OverviewMap());
	},
	addPosition:function(){//显示鼠标坐标
		this.map.addControl(new OpenLayers.Control.MousePosition());
	},
	addLayerSwitcher:function(){//显示地图所加图层开关
		this.map.addControl(new OpenLayers.Control.LayerSwitcher());
	}
};