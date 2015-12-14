var radioComp = {
	init : function(jsonDatas,callback){
		var radioDiv = document.createElement('div');
		radioDiv.setAttribute('class','marTpad');
		if(typeof(jsonDatas.title) !== 'undefined'){
			var labelE = document.createElement('label');
			labelE.setAttribute('class','marR10');
			labelE.innerHTML = jsonDatas.title;
			radioDiv.appendChild(labelE);
		}
		var listDatas = jsonDatas.list;
		var defMap = {};
		for(var key in listDatas){
			var rValue = listDatas[key].value;
			var rText = listDatas[key].text;
			var radioInput = document.createElement('input');
			if(rValue === jsonDatas.defaultChecked){
				radioInput.setAttribute('checked','checked');
				defMap.value = rValue;
				defMap.text = rText;
			}
			radioInput.setAttribute('type','radio');
			radioInput.setAttribute('name',jsonDatas.name);
			radioInput.setAttribute('value',rValue);
			radioInput.setAttribute('text',rText);
			var tSpan = document.createElement('span');
			tSpan.setAttribute('class','marR10');
			tSpan.innerHTML = rText;
			radioDiv.appendChild(radioInput);
			radioDiv.appendChild(tSpan);
		}
		radioDiv.addEventListener('click',function(iObj){
			var cObj = compTools.getEventTarget(iObj);
			var nodeName = cObj.nodeName;
			if(nodeName === 'INPUT'){
				defMap.value = cObj.attributes.value.value;
				defMap.text = cObj.attributes.text.value;
				var callDatas = {"radio":defMap};
				radioDiv.attributes.tempdatas = callDatas;
				if(callback){
					backEvent(callDatas);
				}
			}
		});
		function backEvent(callDatas){
			callback(callDatas);
		}
		var defDatas = {"radio":defMap};
		radioDiv.attributes.tempdatas = defDatas;
		return radioDiv;
		// document.getElementById('demoRadio').appendChild(radioDiv);
	}
};