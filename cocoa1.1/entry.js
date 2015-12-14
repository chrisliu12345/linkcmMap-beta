$(function(){
	var cbDatas = {
		"title" : "消息渠道：",
		"defaultChecked" : [],
		"list" : [{"value" : "1","text" : "短信"},
            {"value" : "2","text" : "大喇叭"},
            {"value" : "3","text" : "LED显示屏"}
		]
	};
	var checkBoxC = checkBoxComp.init(cbDatas,cheackBoxBack);
	var selectDatas = {
			"title":"灾害类型：",
			"cite":"请选择省份",
			'id' : 'province',
			"defaultCheck" : "",
			"list":[{ "value" : "1", "text" : "广东省"},
			{"value" : "2", "text" : "江苏省"},
			{"value" : "3", "text" : "辽宁省"}]
	};
	var selectDiv = selectComp.init('100',selectDatas,selectBack);
	var radioDatas = {
		"title" : "灾害等级：",
		"name" : "warnLevel",
		"defaultChecked" : "6",
		"list" : [{"value" : "1","text" : "红"},
			{"value" : "2","text" : "橙"},
			{"value" : "3","text" : "黄"},
			{"value" : "4","text" : "蓝"},
			{"value" : "5","text" : "白"},
			{"value" : "6","text" : "其他"}
		]
	};
	var radioDiv = radioComp.init(radioDatas);
	var areaDatas = {
		"title" : "影响区域：",
		"list" : [
			{"value":"1","text":"潭水镇"},
			{"value":"2","text":"潭水镇"},
			{"value":"3","text":"潭水镇"},
			{"value":"4","text":"潭水镇"},
			{"value":"5","text":"潭水镇"},
			{"value":"6","text":"潭水镇"},
			{"value":"7","text":"潭水镇"},
			{"value":"8","text":"潭水镇"},
			{"value":"9","text":"潭水镇"},
			{"value":"10","text":"潭水镇"},
			{"value":"11","text":"潭水镇"},
			{"value":"12","text":"潭水镇"},
			{"value":"13","text":"潭水镇"}]
	};
	var areaDiv = effectAreaComp.init(areaDatas);
	var btnDatas = {"list":[{"value":"reset","text":"重置"},
							{"value":"send","text":"发送"}]
						}; 
	var btn = buttonComp.init(btnDatas);
	compTools.addComps('targetComps',[checkBoxC,selectDiv,radioDiv,areaDiv,btn],btn,'send',sendBack);
	
	function cheackBoxBack(compDatas){
		if(compDatas.checked){
			var textDiv = textAreaComp.init(compDatas.text);
			compTools.appendTo(areaDiv,textDiv);
			compDatas.obj.childComp = textDiv;
		}else{
			compTools.removeComp(compDatas.obj.childComp);
		}
	}

	var dKindDiv = null;
	function selectBack(compDatas){
		var cityDatas = {};
		if(compDatas.value === '2'){
			cityDatas = {
				"cite":"请选择城市",
				'id' : 'city',
				"defaultCheck" : "",
				"list":[{ "value" : "1", "text" : "南京市"},
				{"value" : "2", "text" : "苏州市"},
				{"value" : "3", "text" : "无锡市"}]
			};
		}else if(compDatas.value === '1'){
			cityDatas = {
				"cite":"请选择城市",
				'id' : 'city',
				"defaultCheck" : "",
				"list":[{ "value" : "1", "text" : "广州市"},
				{"value" : "2", "text" : "深圳市"},
				{"value" : "3", "text" : "东莞市"}]
			};
		}else if(compDatas.value === '3'){
			cityDatas = {
				"cite":"请选择城市",
				'id' : 'city',
				"defaultCheck" : "",
				"list":[{ "value" : "1", "text" : "沈阳市"},
				{"value" : "2", "text" : "大连市"},
				{"value" : "3", "text" : "铁岭市"}]
			};
		}
		
		if(dKindDiv !== null){
			compTools.removeComp(dKindDiv);
		}
		if(cityDatas.list.length > 0){
			dKindDiv = selectComp.init('100',cityDatas);
			compTools.insertTo(selectDiv,dKindDiv);
		}
	}

	function sendBack(datas){
		if(datas === 'reset'){
			var newComp = effectAreaComp.init(areaDatas);
			compTools.resetComp(newComp,areaDiv);
			areaDiv = newComp;
		}else{
			console.info(datas);	
		}
	}
});