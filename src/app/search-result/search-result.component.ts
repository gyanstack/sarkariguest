import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchList = Array<any>();
  location: string;
  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.location = "manali";
    this.db.list('/locations', ref => ref.equalTo(this.location, 'location')).valueChanges().subscribe((data) => {
      this.searchList = data;
    });
  }

}
