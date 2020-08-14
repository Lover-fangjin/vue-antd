var viewer = null;
// WIDGET = {ID: 'U9R4b4i5rq'}; //竖版 
WIDGET = {FID: 'tvqG3MpB20'}; // 头部悬浮
var config = {
  // services:'http://192.168.10.185:8086', // 小褚
  services:'http://121.36.90.178/police_api', // 线上
  // arcgicServices: 'http://192.168.10.236:6080/arcgis/rest/services',

  duration:1500, //弹出框消失时间
  
  // 初始视角
  startViewer: {
    poisiton: {longitude: 116.571665, latitude: 39.698289, height: 6749},
    euler: {heading: 332.104136, pitch: -34.130097, roll: 0}
  },

}
