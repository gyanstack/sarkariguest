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
    item1.subTitle = 'Solang Valley, Manali, Himanchal Pradesh';
    list.push(item1);

    const item2 = new Gallery();
    item2.imgSrc = '../../assets/images/img2.png';
    item2.subTitle = 'Kanatal, Uttarakhand';
    list.push(item2);

    const item3 = new Gallery();
    item3.imgSrc = '../../assets/images/img3.png';
    item3.subTitle = 'Mumbai, Maharashtra';
    list.push(item3);

    return list;
  }
}
