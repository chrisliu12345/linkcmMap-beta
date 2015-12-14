function showTargetMessage(){
	loadTargetMsg();
	msgTrackEvent();
}

function loadTargetMsg(){
	var areaDatas = {"title" : "影响区域：","list" : ""};
	var url = "http://127.0.0.1:8080/dss-data/gisInfo/gis-info!getTownListByGemotry.action?geomtry="+lastPolygonVertices;
	$.ajax({type:"GET",url:url,success:function(rDatas){
		areaDatas.list = rDatas;
		compTools.clearCompsById(['yjddDiv']);
		targetMsgComp.init('yjddDiv',['短信','大喇叭'],'其他',areaDatas);
	}});
}

function msgTrackEvent(){
	//防止多次绑定
	$('#msgMinMax').unbind();
	$('#msgMaxClose').unbind();
	$('#msgMinClose').unbind();
	$('#msgMinMax').click(function(){
		compTools.clearCompsById(['trackMin']);
		$('#msgMin').hide();
		$('#msgMax').show();
		targetTrackComp.initMax('trackMax');
	});
	$('#msgMaxClose').click(function(){
//		compTools.removeComp(pagingComp.getPageComp('trackMax'));
		compTools.clearCompsById(['tragetType','tragetKind','tragetChose']);
		$('#msgMax').hide();
		targetTrackComp.clearTrackInterval();
	});
	$('#msgMinClose').click(function(){
		compTools.clearCompsById(['trackMin']);
		$('#msgMin').hide();
		targetTrackComp.clearTrackInterval();
	});
	mouse4MoveRainWindow("msgMaxTitle","msgMax");//添加窗口拖动事件
}