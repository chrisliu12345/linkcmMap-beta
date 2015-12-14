var targetTrackComp = {
	initMin : function(focusDivId,arrIDs){
		var url = 'http://127.0.0.1:8080/dss-data/track/track!getTrackMsgById.action';
		var reqDatas = {"idArray":arrIDs.toString()};
		$.ajax({type:'GET',async:false,data:reqDatas,url:url,success:function(rDatas){
			var trackmins = [];
			for(var key in rDatas){
				trackmins.push(trackComp.init(rDatas[key]));
			}
			compTools.addComps(focusDivId,trackmins);
		}});
	},
	initMax : function(focusDivId){
		compTools.clearCompsById(['trackMax','tragetType','tragetKind','tragetChose']);
		var typeDatas = {
			"cite":"请选择类型",'id' : 'demageType',"defaultCheck" : "",
			"list":[{ "value" : "1", "text" : "渠道"},{"value" : "2", "text" : "灾害"},
			{"value" : "3", "text" : "内容"}]
		};
		var selectDiv = selectComp.init('100',typeDatas,typeBack);
		compTools.addComps('tragetType',[selectDiv]);
		var btnDatas = {"list":[{"value":"sure","text":"确定"}]}; 
		var tcbtn = buttonComp.init(btnDatas,'msgTrack-btn');
		tcbtn.style.float = 'left';
		compTools.addComps('tragetChose',[tcbtn]);
		compTools.getCompsDataById(['tragetType','tragetKind'],tcbtn,btonBack);
		
		var spanE = document.createElement('span');
		spanE.setAttribute('class','paddLR10 alarmColor');
		spanE.style.float = 'left';
		spanE.style.marginTop = '3px';
		spanE.innerHTML = '';
		compTools.appendTo(tcbtn,spanE);
		
		function btonBack(rDatas){
			var showMsg = '';
			if(rDatas.selectdemageType.text === ''){
				showMsg = '请选择查询类型';
			}else if(rDatas.selectdemageContent.text === ''){
				showMsg = '请选择查询内容';
			}
			spanE.innerHTML = showMsg;
			if(showMsg === ''){
				var typeStr = rDatas.selectdemageType.text;
				var contentStr = rDatas.selectdemageContent.text;
				var filterSql = '';
				if(typeStr === '渠道'){
					filterSql = "receiver='"+contentStr+"'";
				}else if(typeStr === '灾害'){
					if(contentStr.indexOf('预警') !== -1){
						if(contentStr.indexOf('红色') !== -1){
							contentStr = '1';
						}else if(contentStr.indexOf('橙色') !== -1){
							contentStr = '2';
						}else if(contentStr.indexOf('黄色') !== -1){
							contentStr = '3';
						}else if(contentStr.indexOf('蓝色') !== -1){
							contentStr = '4';
						}else if(contentStr.indexOf('白色') !== -1){
							contentStr = '5';
						}else if(contentStr.indexOf('其他') !== -1){
							contentStr = '6';
						}
					}
					filterSql = "kind_name='"+contentStr+"' or type_name = '"+contentStr+"' or warn_level = '"+contentStr+"'";
				}else if(typeStr === '内容'){
					filterSql = "content like '%"+contentStr+"%';";
				}
				var url = 'http://127.0.0.1:8080/dss-data/track/track!getTrackMsgByFilter.action';
				filterSql = encodeURI(filterSql);
				var reqDatas = {"sql":filterSql};
				$.getJSON(url,reqDatas,function(reData){
					var trackmins = [];
					for(var key in reData){
						trackmins.push(trackComp.init(reData[key]));
					}
					pagingComp.init(focusDivId,trackmins,6);
				});
			}
		}
		
		function typeBack(rDatas){
			var tempDatas = {"cite":"请选择内容",'id' : 'demageContent',"defaultCheck" : "","list":""};
			var reqText = rDatas.text;
			reqText = encodeURI(reqText);
			var url = 'http://127.0.0.1:8080/dss-data/target/target!getTypeByFilter.action';
			var reqDatas = {"filter":reqText};
			$.getJSON(url,reqDatas,function(reData){
				tempDatas.list = reData;
				compTools.clearCompsById(['tragetKind']);
				var kindSelect = selectComp.init('100',tempDatas);
				compTools.addComps('tragetKind',[kindSelect]);
			});
		}
		
		var url = 'http://127.0.0.1:8080/dss-data/track/track!getAllTrackMsgByCode.action';
		var reqDatas = {"areaCode":cityCode};
		$.ajax({type:'GET',data:reqDatas,url:url,success:function(rDatas){
			var trackmins = [];
			for(var key in rDatas){
				trackmins.push(trackComp.init(rDatas[key]));
			}
			pagingComp.init(focusDivId,trackmins,6);
		}});
	},
	clearTrackInterval : function(){
		trackComp.clearTrackInterval();
	}
};