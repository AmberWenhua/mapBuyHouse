import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ToastController } from 'ionic-angular';
import { HouseInfoPage } from '../house-info/house-info';

@Component({
  selector: 'page-publish-build',
  templateUrl: 'publish-build.html',
})
export class PublishBuildPage {
  public houseinfo_area: string;
  public houseinfo_area_detail: string;
  public houseinfo_name: string;
  public houseinfo_type: string;
  public houseinfo_company: string;
  public houseinfo_floor: string;
  public houseinfo_car_stop: string;
  public houseinfo_dt: string;
  public houseinfo_all_company: string;
  public houseinfo_subway: string;
  public houseinfo_add: string;
  public houseinfo_tel:string;
  public houseinfo_publish_user: string;
  public dataMap: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider, private toastCtrl: ToastController) {
  }

  initData() {
    this.houseinfo_publish_user = sessionStorage.getItem('userName');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      cssClass: 'toast-style'
    });
  
    toast.onDidDismiss(() => {
    });
  
    toast.present();
  }

  publishBuild () {
    this.dataMap = {
      houseinfo_area: this.houseinfo_area,
      houseinfo_area_detail: this.houseinfo_area_detail,
      houseinfo_name: this.houseinfo_name,
      houseinfo_type: this.houseinfo_type,
      houseinfo_company: this.houseinfo_company,
      houseinfo_floor: this.houseinfo_floor,
      houseinfo_car_stop: this.houseinfo_car_stop,
      houseinfo_dt: this.houseinfo_dt,
      houseinfo_all_company: this.houseinfo_all_company,
      houseinfo_subway: this.houseinfo_subway,
      houseinfo_add: this.houseinfo_add,
      houseinfo_tel: this.houseinfo_tel,
      houseinfo_publish_user: this.houseinfo_publish_user
    };
    this.http.loadData('publishBuild',this.dataMap).subscribe(
      res => {
        let mapdata = JSON.parse(res);
        if (mapdata.code === '0') {
          console.log('请求数据错误');
        } else if (mapdata.code === '1') {
          this.presentToast('发布成功');
          setTimeout(() => {
            this.navCtrl.push(HouseInfoPage);
          }, 2000);
        } else if (mapdata.code === '2') {
          console.log('服务器内部错');
        }
      },
      err => {
        console.log('请求失败');
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishBuildPage');
  }

  ionViewWillEnter() {
    this.initData();
  }
}
