var upuid='426';/*您的UID，用户消费后可以获得40%的收益，提现120:1   通过get传递，传递一次后绑定，一直有效到下一次通过此参数访问*/
var website='qiwen';/*修改此处*/
var Domain='44api';/*大陆为44api,其它地区为ysv8*/
var title='天下奇闻异事大全';/*标题*/
if(typeof(localStorage) == "undefined"){
var localStorage={
	getItem:function(key){return uni.getStorageSync(key);},

setItem:function(key,data){
uni.setStorage({
						key: key,
						data: data,
						success: (res) => {
							
						},
						fail: () => {
							
						}
					})


}
}
}
var lang=localStorage.getItem("lang"); 
if(!lang){lang='zh';}
var optionss=localStorage.getItem("user"); 
if(optionss){var userdata=JSON.parse(optionss);}else{var userdata=false;}
var ysv8hex=localStorage.getItem("ysv8hex"); 
var optionss=localStorage.getItem("bucketcdn"); 
if(optionss){var bucketcdn=optionss;}else{var bucketcdn='https://i.44api.com/upload/';}
var optionss=localStorage.getItem("imgcdn");
if(optionss){var imgcdn=optionss;}else{var imgcdn='https://iimg.44api.com/upload/';}
if(Domain=='44api'){
	var www = 'https://'+lang+'-ysv8.'+Domain+'.com/';
}else{
var www = 'https://'+lang+'.'+Domain+'.com/';	
	
}

var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var day = myDate.getDate(); 
var newDay = year + "/" + month + "/" + day;
var ajaxbool = false;
var ajaxi=0;
var l=[];
function forum(arr){
	var arr2=[];
	var j=0;
	for (var i in arr) {
		if(!in_array(arr[i]['id'],arr2)){/*删除重复*/
			arr2.push(arr[i]);
			j++;
		}
if(j>45) break;/*最多45*/
		}
	return arr2;
}
var str_in_array=function(search, array) {
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
}
function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false;
    } else {
        return true;
    }
}
var in_array=function(id,myarr,mode){
  mode = typeof mode !== 'undefined' ? mode : false;
for (var arr2i = 0;arr2i < myarr.length; arr2i++) {
if(id==myarr[arr2i]['id']){
  if (mode !== false) return myarr[arr2i][mode];
return true;
}
}
return false;
}
var isArray=function (obj) {/*判断是否是数组*/
return Object.prototype.toString.call(obj) === '[object Array]';
}
var setdata_ebook=function(data, smode, content, pagtime){/*文章列表处理*/
  if(isArray(data) !=true) return false
  var ajaxj = data.length;
  var k;
  for (var i = 0; i < ajaxj; i++) {
   if (smode == "up") { k = ajaxj - i - 1;}else{k=i;}
    data[k]['id'] = Number(data[k]['id']);
    if (pagtime < data[k]['id'] || pagtime == 0) {pagtime = data[k]['id'];}
   if(('img' in data[k]) && data[k]['img']!=null){
		
	  data[k]['img'] =data[k]['img'].replace(/\{m\}/g, '')
	  data[k]['img'] = data[k]['img'].replace(bucketcdn, '')
		data[k]['imglist']=data[k]['img'].split(",");
	  data[k]['img'] = data[k]['imglist'][0];

   }else{
		 data[k]['imglist']=[];
		 
	 }
   if(('vs' in data[k]) && data[k]['vs']!=null){
   data[k]['vs'] =data[k]['vs'].replace(/\{m\}/g, '')
   data[k]['vs'] = data[k]['vs'].replace(bucketcdn, '')
   }
   
    if (in_array(data[k]['id'], content) == false) {
        if (smode == "up") {
        content.unshift(data[k])
        }else{
          content.push(data[k])
        }
      }
  }
  return [content, pagtime,ajaxj];
}


var setdata_f=function(data, smode, content, pagtime){/*文章列表处理*/
  if(isArray(data) !=true) return false
  var ajaxj = data.length
  var k;
  for (var i = 0; i < ajaxj; i++) {
   if (smode == "up") { k = ajaxj - i - 1;}else{k=i;}
    data[k]['btime'] = Number(data[k]['btime']);
    if (pagtime > data[k]['btime'] || pagtime == 0) {pagtime = data[k]['btime'] }
   if(('img' in data[k]) && data[k]['img']!=null){
		
	  data[k]['img'] =data[k]['img'].replace(/\{m\}/g, '')
	  data[k]['img'] = data[k]['img'].replace(bucketcdn, '')
		data[k]['imglist']=data[k]['img'].split(",");
	  data[k]['img'] = data[k]['imglist'][0];

   }else{
		 data[k]['imglist']=[];
		 
	 }
   if(isArray(userdata['forum']) && in_array(data[k]['id'],userdata['forum'])){ data[k]['follow']=true}else{
  data[k]['follow']=false
	}
	 
   
    if (in_array(data[k]['id'], content) == false) {
        if (smode == "up") {
        content.unshift(data[k]);
        }else{
          content.push(data[k]);
        }
      }
  }
  return [content, pagtime,ajaxj];
}

var setdata=function(data, smode, content, pagtime){/*文章列表处理*/
  if(isArray(data) !=true) return false
  var ajaxj = data.length;
  var k;
  for (var i = 0; i < ajaxj; i++) {
   if (smode == "up") { k = ajaxj - i - 1;}else{k=i;}
    data[k]['btime'] = Number(data[k]['btime']);
    if (pagtime > data[k]['btime'] || pagtime == 0) {pagtime = data[k]['btime'] }
   if(('img' in data[k]) && data[k]['img']!=null){
		
	  data[k]['img'] =data[k]['img'].replace(/\{m\}/g, '')
	  data[k]['img'] = data[k]['img'].replace(bucketcdn, '')
		data[k]['imglist']=data[k]['img'].split(",");
	  data[k]['img'] = data[k]['imglist'][0];

   }else{
		 data[k]['imglist']=[];
		 
	 }
   if(('vs' in data[k]) && data[k]['vs']!=null){
   data[k]['vs'] =data[k]['vs'].replace(/\{m\}/g, '')
   data[k]['vs'] = data[k]['vs'].replace(bucketcdn, '')
   }
   
    if (in_array(data[k]['id'], content) == false) {
        if (smode == "up") {
        content.unshift(data[k])
        }else{
          content.push(data[k])
        }
      }
  }
  return [content, pagtime,ajaxj];
}

/*基本函数：时间格式化，翻译，缩微图前缀，大图前缀，API请求前缀*/
module.exports ={
	setdata:setdata,/*加载数据格式化*/
	userdata:userdata,
	title:title,
	www:www,/*API请求前缀*/
	Domain:Domain,
	localStorage:localStorage,
	website:website,
	isNumber:isNumber,
	lang:lang,/*语言区*/
	forum:forum,
	setdata_ebook:setdata_ebook,
	ysv8hex:ysv8hex,/*用户登录状态维护*/
	upuid:upuid,/*推广uid*/
	bucketcdn:bucketcdn,/*缩微图前缀*/
	imgcdn:imgcdn,/*大图前缀*/
  isArray:isArray,
	in_array:in_array,
	setdata_f:setdata_f,
timeStamp2String:function(time){/*时间格式化*/
var datetime = new Date()
datetime.setTime(time * 1000);
var y = datetime.getFullYear();
var m = datetime.getMonth() + 1;
var d = datetime.getDate();
var h = datetime.getHours();
var n = datetime.getMinutes();
var s = datetime.getSeconds();
 if (y == year && month == m && day == d) {return h + ":" + n + ":" + s;}
 if (y == year) {return m + '-' + d + ' ' + h + ":" + n;
  }

  return y + "-" + m + "-" + d;
},
muialert:function(data,zurl){
	 zurl = typeof zurl !== 'undefined' ? zurl : false;
	 if(data['code']=='200'){
		 uni.showModal({
		 	title: "成功",
		 	content: data['info'],
		 	showCancel: false,
		 	confirmText: "确定"
		 });
		 return false;
		 }
if(data['code']=='301'){
ysv8hex='no';
localStorage.setItem("ysv8hex",'no');
uni.showModal({
content:data['info'],
																	showCancel:false,
																	success: (e) => {
																	uni.navigateTo({
																						url: '/pages/user/index?data=login'
																					});	
																		}
																})
}else if(data['code']=='302'){
	
uni.showModal({
content:data['info'],
																	showCancel:false,
																	success: (e) => {
	uni.navigateTo({
						url: '/pages/user/web?url=https://'+lang+'.ysv8.com/pay.html'
					});
		}
	})
}else if('url'  in data){
	uni.showModal({
	content:data['info'],
																		showCancel:false,
																		success: (e) => {
																			
					uni.navigateTo({
										url: '/pages/user/web?url=https://'+lang+'.ysv8.com'+data['url']
									});	
						
					}
				
					})
}else{
	
	uni.showModal({
		title: "错误",
		content: data['info'],
		showCancel: false,
		confirmText: "确定"
	});
}
},
get_id:function(myarr,id){
	for (var arr2i = 0;arr2i < myarr.length; arr2i++) {
	if(id==myarr[arr2i]['id']){
		return myarr[arr2i];
		}
		}
		return false;
},
langfun:function(str){/*YSv8翻译系统*/
if(lang=='zh') return str;
if (str in l) return l[str];/*JS获取*/
var optionss=localStorage.getItem(lang+str); /*缓存获取*/
if(optionss) return optionss;
uni.request({
			url: 'https://i.44api.com/fy/'+encodeURIComponent(str)+'/'+lang+'.html',
			data: {
				noncestr: Date.now()
			},
			success: (res) => {
				localStorage.setItem(lang+str,res.data.info);
			},
			fail: (err) => {
				console.log('request fail', err);
				uni.showModal({
					content:err.errMsg,
					showCancel:false
				})
			},
			complete:()=> {
			
			}
		})
return str;
}
		}
		
		
		
		
		