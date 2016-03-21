function cityArea(map) {
	this.map = map.map;
}
cityArea.prototype={
	loadCity:function(cityList,styleJson,countyName){//添加区域效果
		if(this.featureType){
			this.featureType = null;//将记录清空
			this.loadJsonDatas(cityList,'country');
		}else if(cityList!=='city'){
			this.loadJsonDatas(cityList,'city');
		}
        if(!!this.areaLayer){
           this.areaLayer.removeAllFeatures();
        }
        var areaLayer = '';
        if(!this.areaLayer){
            var layerObj = this.map.getLayersByName('areaLayers');
            this.layerObj = layerObj;
            // if(layerObj.length > 0){//若存在先清空
            // 	this.map.removeLayer(layerObj);
            // }
        
            if(selectStyle.fontShow){
                areaLayer = new OpenLayers.Layer.Vector('areaLayers', {
                    styleMap: new OpenLayers.StyleMap({
                        default: {
                            fillColor: '${color}',
                            label:'${areaname}',
                            fillOpacity:mapStyle.fillOpacity,
                            strokeColor: mapStyle.strokeColor,
                            strokeWidth:mapStyle.strokeWidth,
                            fontFamily:'宋体',
                            fontSize:mapStyle.fontSize,
                            fontColor:mapStyle.fontColor,
                            labelOutlineWidth:mapStyle.labelOutlineWidth,
                            labelOutlineColor:mapStyle.labelOutlineColor},
                        select: {fillColor: selectStyle.fillColor,label:'${key}',fillOpacity:selectStyle.fillOpacity, strokeColor: selectStyle.strokeColor,strokeWidth:selectStyle.strokeWidth,cursor:selectStyle.cursor}
                    })
                }); 
            }else{
                areaLayer = new OpenLayers.Layer.Vector('areaLayers', {
                    styleMap: new OpenLayers.StyleMap({
                        default: {fillColor: '${color}',
                            label:'${areaname}',
                            fillOpacity:mapStyle.fillOpacity,
                            strokeColor: mapStyle.strokeColor,
                            strokeWidth:mapStyle.strokeWidth,
                            fontFamily:'宋体',
                            fontSize:mapStyle.fontSize,
                            fontColor:mapStyle.fontColor,
                            labelOutlineWidth:mapStyle.labelOutlineWidth,
                            labelOutlineColor:mapStyle.labelOutlineColor},
                        select: {fillColor: selectStyle.fillColor,label:'',fillOpacity:selectStyle.fillOpacity, strokeColor: selectStyle.strokeColor,strokeWidth:selectStyle.strokeWidth,cursor:selectStyle.cursor}
                    })
                }); 
            }
            this.map.addLayers([areaLayer]);
        }else{
            areaLayer = this.areaLayer;
        }
		
		//获取行政区域信息
		var geojson_format = new OpenLayers.Format.GeoJSON();
	    var jsonDatas = this.areaJson;
		for(var key in jsonDatas){
			var obj = new Object({});
            var tempJson = jsonDatas[key];
			obj.key = tempJson.name;
            obj.parentName = tempJson.parentName;
			obj.type='area';
			if(mapStyle.fontShow){
				obj.areaname =tempJson.name;
			}else{
				obj.areaname = '';
			}
			if(styleJson){
				for(var jKey in styleJson){
					if(styleJson[jKey].name === obj.key){
						obj.color = styleJson[jKey].color;
						if(selectStyle.defaultFont){
							obj.areaname = styleJson[jKey].name;
						}
						break;
					}else{
						obj.color = mapStyle.fillColor;
					}
				}
			}else{
				obj.color = mapStyle.fillColor;
			}
			tempJson.properties = obj;
			//console.info(jsonDatas[key]);
			if(typeof(countyName)!=='undefined'){
				if(tempJson.name !== countyName){
					continue;
				}
			}
			areaLayer.addFeatures(geojson_format.read(tempJson));
			this.areaLayer = areaLayer;
		}
	},
	loadCountry:function(cityList,styleJson,countyName){//根据市名添加市下县
		this.featureType = 'country';
		this.loadCity(cityList,styleJson,countyName);
	},
	load21City:function(styleJson){//加载全省21个市的方法
		var areaJson = [];
		var jsonData = gd21City.features;
		for(var jKey in jsonData){
			areaJson.push(jsonData[jKey]);
		}
		this.areaJson = areaJson;
		this.loadCity('city',styleJson);
	},
	load86Country:function(styleJson){//加载全省86个县的方法
		var areaJson = [];
		var jsonData = gd86Country.features;
		for(var jKey in jsonData){
			areaJson.push(jsonData[jKey]);
		}
		this.areaJson = areaJson;
		this.loadCity('city',styleJson);
	},
	load98Country:function(){
		
	},
    loadTargetArea: function(parentName){
        var areaJson = [];
		var jsonData = gd86Country.features;
		for(var jKey in jsonData){
            console.info(jsonData[jKey]);
            if(jsonData[jKey].parentName === parentName){
                areaJson.push(jsonData[jKey]);
            }
		}
		this.areaJson = areaJson;
		this.loadCity('city');
    },
	loadJsonDatas:function(cityList,areaType){
		var areaJson = [];
		var jsonData = [];
		var nameList = cityList.split(",");
		if(areaType === 'city'){//市县分别进行不同的解析
			jsonData = gd21City.features;
			for(var jiKey in jsonData){
				for(var niKey in nameList){
					if(jsonData[jiKey].name === nameList[niKey]){
						areaJson.push(jsonData[jiKey]);
						break;
					}
				}	
			}
		}else{
			jsonData = gd86Country.features;
			for(var joKey in jsonData){
				for(var noKey in nameList){
					if(jsonData[joKey].parentName === nameList[noKey]){
						areaJson.push(jsonData[joKey]);
					}
				}	
			}
		}
		this.areaJson = areaJson;
	},
	addSelectEvent:function(showJson,clickBack){//图层选择事件
		var mapDiv = document.getElementById(cache.mapDivId);
		var areaLayer = this.areaLayer;
		this.map.events.register('mousemove',this.map,function(mobj){
			var areaObj = document.getElementById('showLayer');
			if(areaObj){
				var divWidth = areaObj.offsetWidth;
				var divHeight = areaObj.offsetHeight;
				var mapWidth = mapDiv.offsetWidth;
				var mapHeight = mapDiv.offsetHeight;
				var mapTop = mapDiv.offsetTop;
				var mapLeft = mapDiv.offsetLeft;
				var tempobjY = mobj.offsetY + mapTop;
				var tempobjX = mobj.offsetX + mapLeft;
				if(mobj.offsetX+divWidth+10>mapWidth){//如果在超出右边界
					tempobjX -= (divWidth + 20);
				}
				if(mobj.offsetY+divHeight+10>mapHeight){//如果走出下边界
					tempobjY -= (divHeight + 20);
				}
				areaObj.style.top = tempobjY + 10 + 'px';
				areaObj.style.left = tempobjX + 10 + 'px';
			}		
		});
		// var cuAlpLayer = [];
		// var layerObj = this.map.getLayersByName('pointLayer');
		// if(layerObj.length > 0){//若存在先清空
		// 	cuAlpLayer.push(layerObj[0]);
		// }
		// cuAlpLayer.push(areaLayer);
		var aFeatureList = areaLayer.features;
		for(var fKey in aFeatureList){//attributes
			for(var sKey in showJson){
				if(showJson[sKey].name === aFeatureList[fKey].attributes.key){
					aFeatureList[fKey].attributes.html = showJson[sKey].content;
				}
			}
		}

		var keyRecord = '';
		var layerEvent = new OpenLayers.Control.SelectFeature([areaLayer],{
		    hover: true,
			//multiple:true,
			highlightOnly: selectStyle.highlightOnly,
			// toggle: true,
			//renderIntent: 'select',
	        onSelect: function(lev){//featurehighlighted
				// var evName = lev.attributes.key;
				// areaLayer.setZIndex(745);
				var showHtml = lev.attributes.html;
				if(showHtml){
				}else{
					showHtml = '';
				}
				//删除生成的DIV
				var reDiv = document.getElementById('showLayer');
				if(reDiv){
					reDiv.parentNode.removeChild(reDiv);
				}
				//创建显示框DIV
				var contentDiv = document.createElement('div');
				contentDiv.setAttribute('id','showLayer');
				contentDiv.style.width='auto';
				contentDiv.style.height='auto';
				contentDiv.style.position='absolute';
				// contentDiv.style.left='0';
				// contentDiv.style.top='0';
				contentDiv.style.zIndex="999";
				contentDiv.innerHTML=showHtml;
				// document.body.appendChild(contentDiv);
				document.getElementById(cache.mapDivId).appendChild(contentDiv);
	        },
			onUnselect:function(lev){
				document.getElementById('showLayer').style.display = 'none';
			},
			callbacks:{
				click:function(lev){
					if(clickBack){//则用户需要时返回回调函数
						function reBack(){//回调函数
							return clickBack(lev.attributes.key);
						}
						reBack(clickBack);
					}
				}
			}
		});
		this.map.addControls([layerEvent]);
		layerEvent.activate();//使控件生效
        this.layerEvent = layerEvent;
	},
    getAreaLayer: function () {
        return this.areaLayer;
    }
};