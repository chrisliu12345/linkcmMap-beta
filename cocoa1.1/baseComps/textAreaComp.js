var textAreaComp = {
	init : function(textTitle){
		var areaTextDiv = document.createElement('div');
		areaTextDiv.setAttribute('class','messageBox');
		var labelE = document.createElement('label');
		labelE.setAttribute('class','MBlabel');
		if(textTitle !== ''){
			labelE.innerHTML = textTitle + '：';
		}
		var inTextDiv = document.createElement('div');
		inTextDiv.setAttribute('class','messageBox-textarea');
		var areaCon = document.createElement('textarea');
		areaCon.setAttribute('class','paddLR10');
		areaCon.setAttribute('rows','3');
		areaCon.setAttribute('cols','30');
		areaCon.style.width = '100%';
		areaCon.style.height = '100%';
		areaCon.onblur = function(){
			var textV = {};
			textV['textarea'+textTitle] = areaCon.value;
			areaTextDiv.attributes.tempdatas = textV;
		};
		var initContent = {};
		initContent['textarea'+textTitle] = '';
		areaTextDiv.attributes.tempdatas = initContent;
		inTextDiv.appendChild(areaCon);
		areaTextDiv.appendChild(labelE);
		areaTextDiv.appendChild(inTextDiv);
		return areaTextDiv;
	}
};