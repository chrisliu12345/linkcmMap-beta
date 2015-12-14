var browerVComp = {
	init : function(callback){
		   var parentE = document.createElement('div');
		   parentE.setAttribute('class','version-box');
		   var titleE = document.createElement('div');
		   titleE.setAttribute('class','bvDivTitle-1');
		   var titleSpan = document.createElement('span');
		   titleSpan.innerHTML = '版本推荐';
		   var titleP = document.createElement('p');
		   titleE.appendChild(titleSpan);
		   titleE.appendChild(titleP);
		   titleP.setAttribute('class','bvclose');
		   titleP.onclick = function(){
			   browerVComp.close();
			   if(callback){
				   function backEvent(){
					   callback(true);
				   }
				   backEvent();
			   }
		   };
		   var contentE = document.createElement('div');
		   contentE.setAttribute('class','version-con');
		   parentE.appendChild(titleE);
		   parentE.appendChild(contentE);
		   var iconE = document.createElement('div');
		   iconE.setAttribute('class','vesion-left');
		   var imgE = document.createElement('img');
		   iconE.appendChild(imgE);
		   var inDivE = document.createElement('div');
		   inDivE.setAttribute('class','vesion-right');
		    var clearDivE = document.createElement('div');
		   clearDivE.setAttribute('class','clear');
		   contentE.appendChild(iconE);
		   contentE.appendChild(inDivE);
		   contentE.appendChild(clearDivE);
		   var bpE = document.createElement('p');
		   bpE.setAttribute('class','version-title');
		   bpE.innerHTML = '浏览器版本推荐';
		   var listDivE = document.createElement('div');
		   listDivE.setAttribute('class','version-option');
		    inDivE.appendChild(bpE);
		   inDivE.appendChild(listDivE);
		   var ulE = document.createElement('ul');
		   listDivE.appendChild(ulE);
		   var liE1 = document.createElement('li');
		   liE1.innerHTML = 'IE10及以上版本';
		   var liE2 = document.createElement('li');
		   liE2.innerHTML = '火狐38.0.1及以上版本';
		   var liE3 = document.createElement('li');
		   liE3.innerHTML = '谷歌42.0.2311.152及以上版本';
		   var liE4 = document.createElement('li');
		   liE4.innerHTML = '360安全浏览器7.1.1及以上版本';
		   var liE5 = document.createElement('li');
		   liE5.innerHTML = '360极速浏览器7.5.3.318及以上版本';
		   ulE.appendChild(liE1);
		   ulE.appendChild(liE2);
		   ulE.appendChild(liE3);
		   ulE.appendChild(liE4);
		   ulE.appendChild(liE5);
		   imgE.srcset = 'data:image/gif;base64,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';
		   document.body.appendChild(parentE);
		   this.parentE = parentE;
	},
	close : function(){
		if(typeof(this.parentE) !== 'undefined'){
			this.parentE.remove();
		}
	}
};