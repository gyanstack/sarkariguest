import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  galleryList: Array<Gallery>;

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router) {

  }

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery(): void {
    this.galleryList = this._dashboardService.galleryList();
  }

  navigateToCity(city: string) {
    this._router.navigate(['search', city]);
  }

}
