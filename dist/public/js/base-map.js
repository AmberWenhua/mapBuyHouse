$(function () {
    var map = new BMap.Map("map"); // 创建地图实例
    var point = new BMap.Point(121.478125,31.229649); // 创建点坐标
// var mapStyle={  style : "grayscale" };
// map.setMapStyle(mapStyle); //个性化地图
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    window.setTimeout(function(){
        map.panTo(new BMap.Point(116.409, 39.918)); //panTo()方法将让地图平滑移动至新中心点，如果移动距离超过了当前地图区域大小，则地图会直跳到该点。
    }, 2000);
});