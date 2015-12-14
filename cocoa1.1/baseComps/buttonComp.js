var buttonComp = {
	init : function(jsonDatas,className,callback){
		var btnDiv = document.createElement('div');
		btnDiv.setAttribute('class',className);
		var btnDatas = jsonDatas.list;
		for(var key in btnDatas){
			var btnE = document.createElement('button');
			btnE.setAttribute('value',btnDatas[key].value);
			btnE.innerHTML = btnDatas[key].text;
			btnDiv.appendChild(btnE);
		}
		if(callback){
			btnDiv.addEventListener('click',function(iObj){
				backEvent(compTools.getEventTarget(iObj).attributes.value.value);
			});
			function backEvent(type){
				callback(type);
			}
		}
		return btnDiv;
	}
};