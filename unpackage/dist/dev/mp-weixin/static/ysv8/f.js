if(typeof(localStorage) == "undefined"){
var localStorage={
	getItem:function(key){return uni.getStorageSync(key);},

setItem:function(key,data){
uni.setStorage({key: key,data: data});
}
}
}
var apiid='f';
var postactive='Comthread'/*评论*/
var datalook=[];/*查看*/
 var datafav=[];/*收藏*/
 var datacom=[];/*评论*/
 var datadown=[];/*下载*/
var optionss=localStorage.getItem("datalook"+apiid); 
if(optionss){datalook=JSON.parse(optionss);}
var optionss=localStorage.getItem("datafav"+apiid); 
if(optionss){datafav=JSON.parse(optionss);}
var optionss=localStorage.getItem("datacom"+apiid); 
if(optionss){datacom=JSON.parse(optionss);}
function add_fav(arr){
for (var arr2i = 0;arr2i < datafav.length; arr2i++) {
if(arr['id']==datafav[arr2i]['id']){
datafav.splice(arr2i,1);
return false;
}
}
if(datafav.length>100){
datafav.splice(0,10);
}
var news_sub={
 id:arr['id'],
  user:arr['user'],
    avatar:arr['avatar'],
      uid: arr['uid'],
 btime:arr['btime'],
 posts:arr['posts'],
  etime:arr['etime'],
 title:arr['title'],
 vs:arr['vs'],
 }
datafav.push(news_sub);
return true;
}
function add_array(arr, myarr,del) {
  for (var arr2i = 0; arr2i < myarr.length; arr2i++) {
    if (arr['id'] == myarr[arr2i]['id']) {
      var news_sub = {
       id: arr['id'],
       name: arr['name'],
       img:arr['img'],
       threads:arr['threads'],
       json: arr['json'],
       btime: arr['btime'],
      }
      if(!del) myarr.push(news_sub);
      myarr.splice(arr2i, 1);
      return [myarr,false];
    }
  }

  if (myarr.length > 100) {
    myarr.splice(0, 10);
  }

  var news_sub = {
   id: arr['id'],
   name: arr['name'],
   img:arr['img'],
   threads:arr['threads'],
   json: arr['json'],
   btime: arr['btime'],
  }
  myarr.push(news_sub);
  return [myarr,true];
}



module.exports ={
	apiid:apiid,
	postactive:postactive,
	datalook:datalook,
	datafav:datafav,
	datacom:datacom,
	add_array:add_array,
	add_fav:add_fav,
	}