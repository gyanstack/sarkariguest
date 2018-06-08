import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(200, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SearchResultComponent implements OnInit {
  searchList = Array<any>();
  location: string;
  collapsed: boolean;
  constructor(
    public db: AngularFireDatabase,
    private _router: Router,
    private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.collapsed = true;
    this._route.params.subscribe((params) => {
      this.location = params['term'];
      this.doSearch(this.location);
    });
  }

  doSearch(searchTerm: string) {
    const self = this;
    this.db.list(`/locations/${this.location}`).valueChanges().subscribe((data) => {
      data.forEach(function (res) {
        const result = res as Array<any>;
        result.forEach(function (gst) {
          self.searchList.push(gst);
        });
      });
    });
  }

}
