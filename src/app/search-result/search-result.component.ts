import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        // query(':leave', [
        //   stagger(100, [
        //     animate('0.2s', style({ opacity: 0 }))
        //   ])
        // ], { optional: true }),
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
  departmentList: Observable<any>;
  location: string;
  collapsed: boolean;
  searchTerm = [];
  private searchSubject = new Subject<string[]>();
  searchTerm$ = this.searchSubject.asObservable();
  constructor(
    public db: AngularFireDatabase,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.searchTerm$.subscribe(x => {
      this.notifySearchChanges();
    });
  }

  ngOnInit() {
    this.collapsed = true;
    this._route.params.subscribe((params) => {
      this.location = params['term'];
      this.doSearch();
      this.getDepartments();
    });
  }

  doSearch() {
    const self = this;
    this.db.list(`/locations/${this.location.toLowerCase()}`).valueChanges().subscribe((data) => {
      data.forEach(function (res) {
        const result = res as Array<any>;
        result.forEach(function (gst) {
          self.searchList.push(gst);
        });
      });
    });
  }

  getDepartments() {
    const self = this;
    this.departmentList = this.db.list(`/departments`).valueChanges();
  }

  updateSearch(event: any) {
    const self = this;
    if (event.target.checked) {
      self.searchTerm.push(event.target.value.toLowerCase());
    } else {
      const index = self.searchTerm.indexOf(event.target.value.toLowerCase());
      self.searchTerm.splice(index, 1);
    }
    this.searchSubject.next(self.searchTerm);
  }

  cancelSearch() {
    this.collapsed = true;
    if (this.searchTerm.length) {
      this.searchTerm = [];
      this.searchSubject.next(this.searchTerm);
    }
  }

  notifySearchChanges() {
    const self = this;
    self.searchList = [];
    if (self.searchTerm.length) {
      self.searchTerm.forEach(element => {
        this.db.list(`/locations/${this.location.toLowerCase()}/${element.toLowerCase()}`).valueChanges().subscribe((data) => {
          data.forEach(function (gst) {
            self.searchList.push(gst);
          });
        });
      });
    } else {
      this.doSearch();
    }
  }
}
