import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,} from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


@Component({
  selector: 'page-marker-house',
  templateUrl: 'marker-house.html',
})
export class MarkerHousePage {
  house_marker_sel:string;
  houseInfoList: Array<any>;
  name:string;
  city:string;
  type:string;
  area:string;
  sub:string;
  price:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public http: HttpProvider,) {
      this.house_marker_sel = navParams.get('mapHouse');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  initdata(){
    this.http.loadData('houseList',{house_floor_own:this.house_marker_sel}).subscribe(
      res=>{
        let results = JSON.parse(res).results;
        console.log(results);
        this.houseInfoList = [];
        for(const item of results){
            this.houseInfoList.push({
              name:item.house_id,
              city:item.house_zxmz,
              type:item.house_property,
              area:item.house_mkarea,
              sub:item.house_pay_type,
              price:item.house_price
            })
        }
      }
    )
  }
  ionViewDidLoad() {
    this.initdata();
  }

}
