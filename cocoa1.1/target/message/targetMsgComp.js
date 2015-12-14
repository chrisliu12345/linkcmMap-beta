var targetMsgComp = {
	init : function(focusId,arrChecked,deRadio,effectAreaDatas){
		var cbDatas = {
			"title" : "消息渠道：","defaultChecked" : [],
			"list" : [{"value" : "1","text" : "短信"},
	            {"value" : "2","text" : "大喇叭"},
	            {"value" : "3","text" : "LED显示屏"}
			]
		};
		//保证数据正确性,转换数值 
		if(arrChecked instanceof Array){
			var tmpL = [];
			for(var tkey in cbDatas.list){
				if(arrChecked.indexOf(cbDatas.list[tkey].text) !== -1){
					tmpL.push(cbDatas.list[tkey].value);
				}
			}
			cbDatas.defaultChecked = tmpL;
		}
		
		var checkBoxC = checkBoxComp.init(cbDatas,cheackBoxBack);
		checkBoxC.setAttribute('class','marTpad');
		
		var selectDatas = {"title":"灾害类型：","cite":"请选择类型",'id' : 'type',"defaultCheck" : "","list":""};
		$.ajax({type:'GET',async:false,url:'http://127.0.0.1:8080/dss-data/target/target!getDemagesType.action',success:function(rDatas){
			selectDatas.list = rDatas;
		}});
		
		var selectDiv = selectComp.init('100',selectDatas,selectBack);
		var radioDatas = {
			"title" : "灾害等级：","name" : "warnLevel","defaultChecked" : "6",
			"list" : [{"value" : "1","text" : "红"},
				{"value" : "2","text" : "橙"},
				{"value" : "3","text" : "黄"},
				{"value" : "4","text" : "蓝"},
				{"value" : "5","text" : "白"},
				{"value" : "6","text" : "其他"}
			]
		};
		if(typeof(deRadio) === 'string'){
			for(var key in radioDatas.list){
				if(deRadio.indexOf(radioDatas.list[key].text) !== -1){
					radioDatas.defaultChecked = radioDatas.list[key].value;
					break;
				}
			}
		}
		var radioDiv = radioComp.init(radioDatas);
		var areaDiv = effectAreaComp.init(effectAreaDatas);
		
		var spanComp = document.createElement('div');
		var spanE = document.createElement('span');
		spanE.setAttribute('class','paddLR10 alarmColor');
		spanE.style.float = 'left';
		spanE.innerHTML = '';
		spanComp.appendChild(spanE);
		
		var btnDatas = {"list":[{"value":"reset","text":"重置"},{"value":"send","text":"发送"}]}; 
		var btn = buttonComp.init(btnDatas,'tempTarget-btn');
		compTools.addComps(focusId,[checkBoxC,selectDiv,radioDiv,areaDiv,spanComp,btn],btn,'send',sendBack);
		
		var cbList = cbDatas.list;
		for(var ckey in cbList){
			var cValue = cbList[ckey].value;
			if(cbDatas.defaultChecked.indexOf(cValue) !== -1){
				var defTextAreaDiv = textAreaComp.init(cbList[ckey].text);
				checkBoxComp.blindTo(defTextAreaDiv,cbList[ckey].value);
				compTools.appendTo(areaDiv,defTextAreaDiv);
			}
		}
		
		function cheackBoxBack(compDatas){
			if(compDatas.checked){
				var textDiv = textAreaComp.init(compDatas.text);
				compTools.appendTo(areaDiv,textDiv);
				checkBoxComp.blindTo(textDiv,compDatas.value);
			}else{
				if(typeof(compDatas.blindComp) !== 'undefined'){
					compTools.removeComp(compDatas.blindComp);
				}
			}
		}
	
		var dKindDiv = null;
		function selectBack(compDatas){
			var kindDatas = {"cite":"请选择种类",'id' : 'kind',"defaultCheck" : "","list":[{"value":"1","text":"某市"}]};
			var reqDatas = {"typeCode":compDatas.value};
			$.ajax({type:'GET',async:false,data:reqDatas,url:'http://127.0.0.1:8080/dss-data/target/target!getDemagesKindByType.action',success:function(rDatas){
				kindDatas.list = rDatas;
			}});
			if(dKindDiv){
				compTools.removeComp(dKindDiv);
			}
			if(kindDatas.list.length > 0){
				dKindDiv = selectComp.init('100',kindDatas);
				compTools.insertTo(selectDiv,dKindDiv);
			}
		}
	
		function sendBack(datas){
			if(datas === 'reset'){
				loadTargetMsg();
			}else{
				var callMsg = '';
				if(datas.textareaLED显示屏 === ''){
					callMsg = '请填写LED显示屏消息内容';
				}
				if(datas.textarea大喇叭 === ''){
					callMsg = '请填写大喇叭消息内容';
				}
				if(datas.textarea短信 === ''){
					callMsg = '请填写短信消息内容';
				}
				if(datas.areaList === ''){
					callMsg = '影响区域不能为空';
				}
				if(typeof(datas.selectkind) !== 'undefined'){
					if(datas.selectkind.text === ''){
						callMsg = '请选择灾害种类';
					}
				}
				if(datas.selecttype.text === ''){
					callMsg = '请选择灾害类型';
				}
				if(typeof(datas.checkBox[0]) === 'undefined'){
					callMsg = '请选择消息渠道';
				}
				if(callMsg === ''){
					var demageKind = '';
					var demageType = '';
					var typeName = '';
					var kindName = '';
					if(datas.selecttype.value === '19000'){
						demageKind = '';
						kindName = '';
					}else{
						demageKind = datas.selectkind.value;
						kindName = datas.selectkind.text;
					}
					demageType = datas.selecttype.value;
					typeName = datas.selecttype.text;
					var url = 'http://127.0.0.1:8080/dss-data/target/target!sendMsg.action';
					var msgObj = '';
					var wayContent = '';
					for(var bKey in datas.checkBox){
						var objName = datas.checkBox[bKey].text;
						msgObj +=  objName + ',';
						if(objName === '短信'){
							wayContent += '短信:'+datas.textarea短信 + '|';
						}else if(objName === '大喇叭'){
							wayContent += '大喇叭:'+datas.textarea大喇叭 + '|';
						}else if(objName === 'LED显示屏'){
							wayContent += 'LED显示屏:'+datas.textareaLED显示屏 + '|';
						}
					}
					wayContent = encodeURI(wayContent);
					msgObj = encodeURI(msgObj);
					typeName = encodeURI(typeName);
					kindName = encodeURI(kindName);
					var reqDatas = {"areaCode":cityCode,"msgWay":msgObj,"typeName":typeName,"kindName":kindName,
							"demageType":demageType,
							"demageKind":demageKind,"demageLevel":datas.radio.value,
							"effectArea":datas.areaList,"wayContent":wayContent,};
					$.ajax({type:'GET',async:false,data:reqDatas,url:url,success:function(rDatas){
						targetTrackComp.initMin('trackMin',rDatas);
						$('#msgMin').show();
						$('#information_issuing').hide();
					}});
				}else{
					spanE.innerHTML = callMsg;
				}		
			}
		}
	}
};