"use strict";

var raidinfo=function(id){
	//raidinfo for Dawi DC-7210 RAID SATA2
	var ohtmlloader;
	var zieldiv=document.getElementById(id);
	var url="getDawi.php";
	var tempnode;
	var tid;
	
	var htmlloader=function(url,refunc,errorFunc){
		var loader;
		try{
			loader = new XMLHttpRequest();
		}
		catch(e) {
			try {                        
				loader  = new ActiveXObject("Microsoft.XMLHTTP");// MS Internet Explorer (ab v6)
			} 
			catch(e){
				try {                                
						loader  = new ActiveXObject("Msxml2.XMLHTTP");// MS Internet Explorer (ab v5)
				} catch(e) {
						loader  = null;
						console.log('XMLHttp nicht möglich.');
				}
			}
		}
		
		var startloading=function(){
			if(loader!=null){
				loader.open('GET',url,true);//open(method, url, async, user, password)
				loader.responseType='text'; //!                
				loader.setRequestHeader('Content-Type', 'text/plain'); 
				loader.setRequestHeader('Cache-Control', 'no-cache'); 
				loader.setRequestHeader('Access-Control-Allow-Headers', '*');
				//loader.setRequestHeader('Access-Control-Allow-Origin', '*');
				loader.onreadystatechange = function(e){                
					//console.log(this.readyState,loader.status);
					if (this.readyState == 4) {
						if(loader.status!=200){
							//tid=setTimeout(startloading(),5000);
						}
					}
				};
				loader.onload=function(e){
					if(typeof refunc==="function")refunc(this.responseText);
				}				
				loader.onabort  = function(e){
					console.log("onabort",e);
					if(typeof errorFunc==="function")errorFunc(e);
				}
				loader.onerror = function(e){
					console.log("onerror",e);
					if(typeof errorFunc==="function")errorFunc(e);
					tid=setTimeout(function(){startloading()},5000);
				}
				
				//loader.timeout=15*1000 //ms
				loader.send(null);
				
			}
		}
		//--API--
		this.reload=function(){
			//console.log("reload");
			startloading();
		}
		
		startloading();
	}
	
	var CharToString=function(arr){
		var i,re="";
		for(i=0;i<arr.length;i++){
				re+=String.fromCharCode(parseInt(arr[i]));
		}
		return re;
	}
	
	var reloaddata=function(){
		ohtmlloader.reload()
	}
	
	var refunc=function(data){
		if(tid!=undefined)clearTimeout(tid);
		var i,attrb,s,nodelist;
		//data=html/xml		
		zieldiv.innerHTML=data;
		
		nodelist=zieldiv.getElementsByTagName("error");
		if(nodelist.length>0){
			tid=setTimeout(function(){reloaddata()},30*1000);//30sec
		}
		else{
		
			nodelist=zieldiv.getElementsByTagName("SVPhysDrive");
			for(i=0;i<nodelist.length;i++){
				s="";
				attrb=nodelist[i].getAttribute("id");
				s+="id:"+attrb+'<br>';
				
				attrb=nodelist[i].getAttribute("PluggedIn");
				s+="PluggedIn:"+attrb+'<br>';
				
				attrb=nodelist[i].getAttribute("ReadyForAction");
				s+="ReadyForAction:"+attrb+'<br>';
				
				attrb=nodelist[i].getAttribute("Modified");
				s+="Modified:"+attrb+'<br>';
				
				attrb=nodelist[i].getAttribute("SerialNumber").split('').join('').split(',');
				s+="SerialNumber:"+CharToString(attrb)+'<br>';
				
				attrb=nodelist[i].getAttribute("ExpectedSerialNumber").split('').join('').split(',');
				s+="ExpectedSerialNumber:"+CharToString(attrb)+'<br>';
				
				attrb=nodelist[i].getAttribute("ModelName").split('').join('').split(',');
				s+="ModelName:"+CharToString(attrb)+'<br>';
				
				attrb=nodelist[i].getAttribute("ExpectedModelName").split('').join('').split(',');
				s+="ExpectedModelName:"+CharToString(attrb)+'<br>';
				
				var infotext=document.createElement('p');
				infotext.innerHTML=s;
				nodelist[i].insertBefore(infotext,nodelist[i].childNodes[0]);
			}
			
			
			nodelist=zieldiv.getElementsByTagName("SVPhysPartition");
			var pstatus="";
			for(i=0;i<nodelist.length;i++){
				s="";
				pstatus=parseInt(nodelist[i].getAttribute("status"));
				
				attrb=nodelist[i].getAttribute("Capacity_GB");
				s+="Capacity:"+attrb+'GB<br>';
				
				attrb=nodelist[i].getAttribute("Modified");
				s+="Modified:"+attrb+'<br>';
				
				attrb=nodelist[i].getAttribute("RebuildProgress");			
				if(pstatus===0){
					s+='Status: normal<br>';
				}
				else
				if(pstatus===1){
					s+='Status: RebuildProgress <div class="balken"><div class="balkenvalue" style="width:'+attrb+'%"></div></div>';
					s+=' '+Math.floor(parseFloat(attrb)*100)/100+'%<br>';
				}
				else
				if(pstatus===2){
					s+='Status: Verifying <div class="balken"><div class="balkenvalue" style="width:'+attrb+'%"></div></div>';
					s+=' '+Math.floor(parseFloat(attrb)*100)/100+'%<br>';
				}
				else
				if(pstatus===3){
					s+='Status: <span style="background-color:#fc6868">Unplugged</span>';
				}
				else{
					s+='Status:'+nodelist[i].getAttribute("status")+'<br>';
				}
				
				var infotext=document.createElement('p');
				infotext.innerHTML=s;
				nodelist[i].appendChild(infotext);
			}
			
			
			tid=setTimeout(function(){reloaddata()},30*1000);//next load after 30sec
		}
	}
	
	var create=function(){
		zieldiv.innerHTML="load...";
		tempnode=document.createElement('div');
		ohtmlloader=new htmlloader(url,refunc,undefined);
	}
	
	create();
}

window.addEventListener('load', function (event){new raidinfo('raidinfo');});
