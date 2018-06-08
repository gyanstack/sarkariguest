import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchList = Array<any>();
  location: string;
  constructor(
    public db: AngularFireDatabase,
    private _router: Router,
    private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.location = params['term'];
      this.doSearch(this.location);
    });
  }

  doSearch(searchTerm: string) {
    this.db.list(`/locations/${this.location}/bsnl`).valueChanges().subscribe((data) => {
      this.searchList = data;
    });
  }

}
