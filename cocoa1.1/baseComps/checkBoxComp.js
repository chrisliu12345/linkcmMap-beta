var checkBoxComp = {
	init : function(jsonDatas,callback){
		var boxDiv = document.createElement('div');
		boxDiv.setAttribute('class', 'marTpad');
		var listDatas = jsonDatas.list;
		var defaultV = [];
		if(typeof(jsonDatas.defaultChecked) !== 'undefined'){
			defaultV = jsonDatas.defaultChecked;
		}
		if(typeof(jsonDatas.title) !== 'undefined'){
			var labelE = document.createElement('label');
			labelE.setAttribute('class','marR10');
			labelE.innerHTML = jsonDatas.title;
			boxDiv.appendChild(labelE);
		}
		var defList = [];
		var deSelectList = [];
		for(var key in listDatas){
			var cbInput = document.createElement('input');
			if(defaultV.indexOf(listDatas[key].value) !== -1){
				cbInput.setAttribute('checked','checked');
				cbInput.setAttribute('status','selected');
				var nObj = new Object({});
				nObj.value = listDatas[key].value;
				nObj.text = listDatas[key].text;
				defList.push(nObj);
				deSelectList.push(cbInput);
			}else{
				cbInput.setAttribute('status','');
			}
			cbInput.setAttribute('type','checkbox');
			cbInput.setAttribute('value',listDatas[key].value);
			cbInput.setAttribute('text',listDatas[key].text);
			var spanDiv = document.createElement('span');
			spanDiv.setAttribute('class','marR10');
			spanDiv.innerHTML = listDatas[key].text;
			boxDiv.appendChild(cbInput);
			boxDiv.appendChild(spanDiv);
		}
		this.defaultSelect = deSelectList;
		boxDiv.addEventListener('click',function(iObj){
			var cIobj = compTools.getEventTarget(iObj);
			var nodeName = cIobj.nodeName;
			var backValue = '';
			var backText = '';
			var checkStatus = true;
			var tmepObj = null;
			var blindComs = null;
			if(nodeName === 'INPUT'){
				var objStatus = cIobj.attributes.status;
				tmepObj = cIobj;
				if(objStatus.value === 'selected'){
					objStatus.value = ''; 
					checkStatus = false;
				}else{
					objStatus.value = 'selected';
				}
				if(typeof(tmepObj.attributes.blindComp) !== 'undefined'){
					blindComs = tmepObj.attributes.blindComp;
				}
				backValue = cIobj.attributes.value.value;
				backText = cIobj.attributes.text.value;
				var tempDatas = [];
				var iList = boxDiv.children;
				
				for(var iKey in iList){
					if(iList[iKey].nodeName === 'INPUT'){
						if(iList[iKey].attributes.status.value === 'selected'){
							var nObj = new Object({});
							var iValue = iList[iKey].attributes.value.value;
							var iText = iList[iKey].attributes.text.value;
							nObj.id = iValue + iText;
							nObj.value = iValue;
							nObj.text = iText;
							nObj.obj = tmepObj;
							nObj.blindComp = blindComs;
							tempDatas.push(nObj);
						}
					}
				}
				var callDatas = {"checkBox":tempDatas};
				boxDiv.attributes.tempdatas = callDatas;
				if(callback){
					var backObj = {};
					backObj.id = backValue + backText;
					backObj.value = backValue;
					backObj.text = backText;
					backObj.obj = tmepObj;
					backObj.blindComp = blindComs;
					backObj.checked = checkStatus;
					backEvent(backObj);
				}
			}
		});
		function backEvent(callDatas){
			callback(callDatas);
		}
		var defDatas = {"checkBox":defList};
		boxDiv.attributes.tempdatas = defDatas;
		this.boxDiv = boxDiv;
		return boxDiv;
	},
	blindTo : function(focuComp,compValue){
		var cbList = this.boxDiv.getElementsByTagName('input');
		for(var i=cbList.length-1;i>=0;i--){
			if(cbList[i].getAttribute('value') === compValue){
				cbList[i].attributes.blindComp = focuComp;
				break;
			}
		}
	}
};