import { Injectable } from '@angular/core';
import { Gallery } from '../models/gallery';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  public galleryList(): Array<Gallery> {
    const list = Array<Gallery>();

    const item1 = new Gallery();
    item1.imgSrc = '../../assets/images/img1.png';
    item1.subTitle = 'Solang Valley';
    item1.city = "Shimla";
    list.push(item1);

    const item2 = new Gallery();
    item2.imgSrc = '../../assets/images/img2.png';
    item2.subTitle = 'Kanatal';
    item2.city = 'Dehradun';
    list.push(item2);
    
    const item4 = new Gallery();
    item4.imgSrc = '../../assets/images/img1.png';
    item4.subTitle = 'Solang Valley';
    item4.city = 'Manali';
    list.push(item4);

    const item3 = new Gallery();
    item3.imgSrc = '../../assets/images/img3.png';
    item3.subTitle = 'Mumbai';
    item3.city = 'Mumbai';
    list.push(item3);

    const item6 = new Gallery();
    item6.imgSrc = '../../assets/images/img2.png';
    item6.subTitle = 'Kanatal';
    item6.city = 'Nainital';
    list.push(item6);

    const item5 = new Gallery();
    item5.imgSrc = '../../assets/images/img1.png';
    item5.subTitle = 'Solang Valley';
    item5.city = 'Shimla';
    list.push(item5);
    
    const item8 = new Gallery();
    item8.imgSrc = '../../assets/images/img3.png';
    item8.subTitle = 'Mumbai';
    item8.city = 'Mumbai';
    list.push(item8);

    const item7 = new Gallery();
    item7.imgSrc = '../../assets/images/img1.png';
    item7.subTitle = 'Solang Valley';
    item7.city = 'Manali';
    list.push(item7);

    return list;
  }
}
