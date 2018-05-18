///<reference path="../../assets/js/jquery.d.ts"/>
import { Component,ViewChild ,ElementRef} from '@angular/core';
import { NavController, ModalController, ActionSheetController, ToastController} from 'ionic-angular';
import { CityPage } from './city/city';
import { MarkerHousePage } from '../marker-house/marker-house';
import { HttpProvider } from '../../providers/http/http';

declare var BMap;
declare var BMAP_ANCHOR_TOP_RIGHT;
// declare var BMapLib;

// declare var BMap_Symbol_SHAPE_POINT;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/home.scss']
})
export class HomePage {
  items:Array<any>;
  myInput:string;
  searchQuery:string;
  city:string = "长沙";
  clickCity:string;
  //地图上用户选择的房源
  mapHouse:string;
  // ViewChild可以获取到当前组件视图中的单个元素
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  cityMarker:any;
  housemarker:any;
  public cityPoint: object = {};
  // 地铁线路
  subLine:string;
  color:string;
  polyline:any;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public http: HttpProvider,
              public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController) {
  }
  
  ionViewDidEnter() {
    let that = this;
    let map = this.map = new BMap.Map(this.map_container.nativeElement);//创建地图实例
    map.enableScrollWheelZoom(true);
    // 根据城市名定位地图
    map.centerAndZoom(this.city, 12);
    //添加定位控件----------------------------------------------
    let geolocationControl = new BMap.GeolocationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      offset: new BMap.Size(20,100),
      showAddressBar:false,
    });
    geolocationControl.addEventListener("locationSuccess", function(e){
      let geoCity = e.addressComponent.city;
      that.city = geoCity.substr(0,2);
    });
    map.addControl(geolocationControl);
    
    //添加地铁控件------------------------------------------------
    function subwayControl(){
      this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	    this.defaultOffset = new BMap.Size(20, 140);
    }
    subwayControl.prototype = new BMap.Control();
    subwayControl.prototype.initialize = function(map){
      let div = document.createElement('div');
      $(div).css({
        width :"34px",
        height:"32px",
        border: "1px solid #d9d7d5",
        "border-radius": "3px",
        background : "url(../../assets/imgs/subway.png) no-repeat -12px -12px",
        "background-size":"55px 57px",
        "box-shadow": "1px 1px 1px rgba(0,0,0,.2)",
      });
      $(div).click(() => {
        that.presentActionSheet();
      })
      map.getContainer().appendChild(div);
      return div;
    }
    this.map.addControl(new subwayControl);
    //画出行政区域------------------------------------------------
      this.http.loadData('city', this.cityPoint).subscribe(
        res => {
          let city = JSON.parse(res);
          let results = city.results;
          console.log(results);
          for(const item of results){
           let pt = new BMap.Point(item.city_lng,item.city_lat);
           let myIcon = new BMap.Icon("../../assets/imgs/map-icon.png",new BMap.Size(90,90));
           let marker = this.cityMarker =  new BMap.Marker(pt,{icon:myIcon});
           map.addOverlay(marker);
           let label = new BMap.Label(item.city_name,{offset:new BMap.Size(22,35)});
           label.setStyle({
             border: "none",
             background:"none",
             "font-size":"16px",
             color:"#fff",
  
           });
           marker.setLabel(label);
           //  marker添加点击定位到区域事件
          marker.addEventListener("click",()=>{
            console.log(item.city_name);
            this.clickCity = item.city_name;
            this.houseMarker();
          });
          }
        },
        err => {
          console.log(err);
        }); 
        
}
  openModal(event){
    let modal = this.modalCtrl.create(CityPage);
    // 接收城市选择出来的数据
    modal.onDidDismiss(data =>{
      this.city = data;
      this.ionViewDidEnter();
    })
    modal.present();
  }
  //显示地铁线
  presentActionSheet() {
    if(this.city == "永州"){
      let toast = this.toastCtrl.create({
        message:'该城市暂时没有地铁服务',
        duration:3000,
        position: 'middle',
      });
      toast.present();
    }else if(this.city == "长沙"){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '1号线',
            handler: () => {
              this.subLine = "1号线";
              this.color = "#FF0000";
              this.map.centerAndZoom(new BMap.Point(112.982265, 28.208791), 14);
              this.showSub();
            }
          },
          {
            text: '2号线',
            handler: () => {
              this.subLine = "2号线";
              this.color = "#33FFFF";
              this.map.centerAndZoom(new BMap.Point(112.93081, 28.213884), 14);
              this.showSub();
            }
          },
          {
            text: '磁浮快线',
            handler: () => {
              this.subLine = "磁浮快线";
              this.color = "#CC66FF";
              this.map.centerAndZoom(new BMap.Point(113.147481, 28.186761), 14);
              this.showSub();
            }
          }
        ]
      });
      actionSheet.present();
    }
   
  }
  //读取用户选择的地铁线
  showSub(){
    //先清除上一次画的地铁线
    // this.map.removeOverlay(this.polyline);
    this.map.clearOverlays();
    this.http.loadData('subLine', {sub_line: this.subLine}).subscribe(
      res => {
        let results = JSON.parse(res).results;
        console.log(results);
        let subPoint = [];
        for(const item of results){
          let pt = new BMap.Point(item.line_lon,item.line_lat);
          subPoint.push(pt);
        }
        //画折线
        this.polyline = new BMap.Polyline(
          subPoint,
          {
            strokeColor:this.color,
            strokeWeight:4, 
            strokeOpacity:0.8
          });
         this.map.addOverlay(this.polyline); 
      })
  }
  //房源打点
  houseMarker(){
    //先清除上一次画的地址线
    // this.map.clearOverlays();
    let all = this.map.getOverlays();
    for(const i of all){
      i.hide();
    }
    this.http.loadData('houseMaker', {houseinfo_area_detail:this.clickCity}).subscribe(
      res =>{
        let house = JSON.parse(res);
        let results = house.results;
        console.log(results);
        let viewpoint = [];
        for(const item of results){
          //解析地址
          let geo = new BMap.Geocoder();
          geo.getPoint(item.houseinfo_add,(point)=>{
              if(point){
                let add = new BMap.Point(point.lng,point.lat);
                viewpoint.push(add);
                let label = new BMap.Label(item.houseinfo_name,{offset:new BMap.Size(10,0)});
                label.setStyle({
                  border: "none",
                  background:"none",
                  "font-size":"16px",
                  color:"#fff",
                  "background-color": "#ea5403",
                  "border-radius":"4px",
                  padding:"5px",
       
                });
                let marker = this.housemarker = new BMap.Marker(add,label);
                this.map.addOverlay(marker);
                marker.setLabel(label);
                label.addEventListener("click",()=>{
                  this.mapHouse = item.houseinfo_name;
                  console.log(item.houseinfo_name);
                  this.openHouseModal();
                });
              }
          },this.city);
        }
        console.log(viewpoint);
        //将视野调整到最佳
        // this.map.centerAndZoom(this.clickCity,14);
        this.map.setViewport(viewpoint);
      }
    )
  }
  openHouseModal(){
    let myModal = this.modalCtrl.create(MarkerHousePage,{mapHouse:this.mapHouse});
    myModal.present();
  }
  getItems(event) {
    console.log(this.myInput)
    if (this.myInput.indexOf('1') > -1) {
      this.items = [
        '1',
        '12'
      ]
    } else {
      this.items = [

      ]
    }
  }


}
