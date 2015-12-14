var trackComp = {
	init : function(jsonDatas){
		var parentE = document.createElement('div');
		parentE.hidden = true;
		parentE.setAttribute('class','inforTracking-box');
		var ulE = document.createElement('ul');
		var dataList = jsonDatas.list;
		var tempInVal = {};
		for(var key in dataList){
			var liE = document.createElement('li');
			liE.innerHTML = dataList[key].text;
			var spanE = document.createElement('span');
			spanE.innerHTML = dataList[key].value;
			liE.appendChild(spanE);
			if(dataList[key].text === '日期：'){
				var statusE = document.createElement('span');
				statusE.setAttribute('class','floatR10');
				statusE.style.color = 'red';
				liE.appendChild(statusE);
				
				tempInVal[jsonDatas.id] = parentE;
				parentE.belongsChild = statusE;
				statusE.attributes.msg = jsonDatas.msg;
				statusE.attributes.msgId = jsonDatas.id;
				statusE.attributes.status = jsonDatas.status;
				this.compsRecord = compTools.compRecord(this.compsRecord,jsonDatas.id,parentE);
			}
			ulE.appendChild(liE);
		}
		if(typeof(this.intervals) !== 'undefined'){
			clearInterval(this.intervals);
		}
		var url = 'http://127.0.0.1:8080/dss-data/track/track!getTrackMsgById.action';
		var parInterval = setInterval(function(){
			var idArray = [];
			for(var bKey in trackComp.compsRecord){
				if(!trackComp.compsRecord[bKey].hidden){
					var comspChild = trackComp.compsRecord[bKey].belongsChild;
					if(comspChild.attributes.status === '0'){
						idArray.push(comspChild.attributes.msgId);
					}
				}
			}
			var reqDatas = {"idArray":idArray.toString()};
			$.ajax({type:'GET',data:reqDatas,url:url,success:function(rDatas){
				for(var bKey in trackComp.compsRecord){
					if(!trackComp.compsRecord[bKey].hidden){
						var comspChild = trackComp.compsRecord[bKey].belongsChild;
						if(comspChild.attributes.status === '0'){
							for(var key in rDatas){//判断是否同一对象
								if(rDatas[key].id === comspChild.attributes.msgId){
									comspChild.innerHTML = rDatas[key].msg;
									comspChild.attributes.status = rDatas[key].status;
									break;
								}
							}
						}
					}
				}
			}});
		},5000);
		parentE.appendChild(ulE);
		this.intervals = parInterval;
		return parentE;
	},
	initTrackStatus : function(reqArrComps){
		for(var bKey in reqArrComps){
				console.info(!reqArrComps[bKey].hidden);
		}
		trackComp.compsRecord = reqArrComps;
	},
	clearTrackInterval : function(){
		clearInterval(this.intervals);
	}
};