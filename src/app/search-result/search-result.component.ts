import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
// import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { departmentLogo } from '../shared/utils/codeUtil';

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
  city: string;
  state: string;
  district: string;
  collapsed: boolean;
  location: string;
  searchTerm = [];
  private searchSubject = new Subject<string[]>();
  searchTerm$ = this.searchSubject.asObservable();
  guestHouseCollection: string = 'myGuestHouses';
  constructor(
    public db: AngularFireDatabase,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.searchTerm$.subscribe(x => {
      this.notifySearchChanges();
    });
  }

  ngOnInit() {
    this.collapsed = true;
    this._route.params.subscribe((params) => {
      this.city = params['city'];
      this.state = params['state'];
      this.district = params['district'];
      this.doSearch();
      this.getDepartments();
    });
  }

  doSearch() {
    const self = this;
    if (this.city) {
      this.location = this.city;
      this._afs.collection(this.guestHouseCollection, ref => ref.where('city', '==', this.city))
        .valueChanges().subscribe(data => {
          this.searchList = data;
        });
    }
    else if (this.state && this.district) {
      this.location = this.district;
      this._afs.collection(this.guestHouseCollection, ref => ref.where('district', '==', this.district))
        .valueChanges().subscribe(data => {
          this.searchList = data;
        });
    }
  }

  getDepartments() {
    this._afs.collection('departments').valueChanges().subscribe(data => {
      this.departmentList = data;
    });
  }

  getImagePath(department: string) {
    return this.departmentList.length ? this.departmentList.find(x => x.name == department).imgSrc : '';
  }

  updateSearch(event, data) {
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
          this._afs.collection(this.guestHouseCollection, ref => ref.where('city', '==', this.city).where('department', '==', element)).valueChanges().subscribe(data => {
            data.forEach(function (gst) {
              self.searchList.push(gst);
            });
          });
        }
        else if (this.district) {
          this._afs.collection(this.guestHouseCollection, ref => ref.where('district', '==', this.district).where('department', '==', element)).valueChanges().subscribe(data => {
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
