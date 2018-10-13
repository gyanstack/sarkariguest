import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
// import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { guestHouseCollection, departmentCollection, cityCollection } from '../shared/utils/codeUtil';
import * as _ from 'lodash';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { startWith, map, debounceTime } from '../../../node_modules/rxjs/operators';
import { Search } from '../models/search';

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
            animate('0.3s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class SearchResultComponent implements OnInit {
  searchList = Array<any>();
  departmentList: Array<any> = [];
  cities: string[] = [];
  city: string;
  state: string;
  district: string;
  collapsed: boolean;
  location: string;
  searchTerm = [];
  filteredOptions: Observable<string[]>;
  searchForm: FormGroup;
  private searchSubject = new Subject<string[]>();
  searchTerm$ = this.searchSubject.asObservable();
  public error: string;
  constructor(
    private _formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.createForm();
    this.searchTerm$.subscribe(x => {
      this.notifySearchChanges();
    });
  }

  ngOnInit() {
    this.collapsed = false;
    this._route.params.subscribe((params) => {
      this.city = params['city'];
      this.state = params['state'];
      this.district = params['district'];
      this.fCity.setValue(this.city);
      this.doSearch();
      this.getDepartments();
    });

    this.filteredOptions = this.fCity.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value))
    );
  }

  doSearch() {
    let prevCity = this.city;
    this.city = this.fCity.value;
    if (this.city) {
      this.location = this.city;
      this._afs.collection(guestHouseCollection, ref => ref.where('city', '==', this.city))
        .valueChanges().subscribe(data => {
          if (data.length > 0)
            this.searchList = data;
          else {
            this.city = prevCity;
            this.location = prevCity;
            this.fCity.setValue(prevCity);
          }
        });
    }
    else if (this.state && this.district) {
      this.location = this.district;
      this._afs.collection(guestHouseCollection, ref => ref.where('district', '==', this.district))
        .valueChanges().subscribe(data => {
          if (data.length > 0)
            this.searchList = data;
        });
    }
  }

  getDepartments() {
    this._afs.collection(departmentCollection).valueChanges().subscribe(data => {
      this.departmentList = _.orderBy(data, 'name');
    });
  }

  getImagePath(department: string) {
    return this.departmentList.length ? this.departmentList.find(x => x.name == department).imgSrc : '';
  }

  updateSearch(event) {
    const self = this;
    var selected = event.option.value;
    if (event.option.selected) {
      self.searchTerm.push(selected);
    } else {
      const index = self.searchTerm.indexOf(selected);
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

  viewDetail(item: any) {
    this._router.navigate(['searchDetail', item.city, item.department, item.srNo]);
  }

  notifySearchChanges() {
    const self = this;
    self.searchList = [];
    if (self.searchTerm.length) {
      self.searchTerm.forEach(element => {
        if (this.city) {
          this._afs.collection(guestHouseCollection, ref => ref.where('city', '==', this.city).where('department', '==', element)).valueChanges().subscribe(data => {
            data.forEach(function (gst) {
              self.searchList.push(gst);
            });
          });
        }
        else if (this.district) {
          this._afs.collection(guestHouseCollection, ref => ref.where('district', '==', this.district).where('department', '==', element)).valueChanges().subscribe(data => {
            data.forEach(function (gst) {
              self.searchList.push(gst);
            });
          });
        }
      });
    } else {
      this.doSearch();
    }
  }

  createForm(): any {
    this.searchForm = this._formBuilder.group({
      fCity: ['']
    });
  }

  private _filter(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      if (this.cities.length == 0) {
        this._afs.collection(cityCollection).valueChanges().subscribe(data => {
          var locations = data as Search[];
          this.cities = _.orderBy(locations.map(x => x.city));
        });
      }
      let result = this.cities.filter(option => option != null && option.toLowerCase().indexOf(filterValue) === 0);
      if (result.length == 0) {
        this.error = "No result found."
      }
      return result;
    } else {
      return [];
    }
  }

  get fCity() { return this.searchForm.get('fCity'); }


  // doSearch() {
  //   const self = this;
  //   this.db.list(`/locations/${this.location.toLowerCase()}`).valueChanges().subscribe((data) => {
  //     data.forEach(function (res) {
  //       const result = res as Array<any>;
  //       result.forEach(function (gst) {
  //         self.searchList.push(gst);
  //       });
  //     });
  //   });
  // }

  // getDepartments() {
  //   const self = this;
  //   this.departmentList = this.db.list(`/departments`).valueChanges();
  //   this.departmentList.subscribe(x => {
  //   })
  // }

  // notifySearchChanges() {
  //   const self = this;
  //   self.searchList = [];
  //   if (self.searchTerm.length) {
  //     self.searchTerm.forEach(element => {
  //       this.db.list(`/locations/${this.location.toLowerCase()}/${element.toLowerCase()}`).valueChanges().subscribe((data) => {
  //         data.forEach(function (gst) {
  //           self.searchList.push(gst);
  //         });
  //       });
  //     });
  //   } else {
  //     this.doSearch();
  //   }
  // }
}
