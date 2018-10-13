import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { guestHouseCollection, departmentCollection } from '../shared/utils/codeUtil';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  city: string;
  department: string;
  srNo: number;
  searchDetail: any;
  commentForm: FormGroup;
  logo: string;

  searchList = Array<any>();
  departmentList: Array<any> = [];
  state: string;
  district: string;
  collapsed: boolean;
  location: string;

  constructor(
    private _router: Router,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.city = params['city'];
      this.department = params['department'];
      this.srNo = params['srNo'];
      this.getDepartments();
      this.getDetail();
      this.loadOtherGuestHOuses();
    });
  }

  getDetail(): any {
    this._afs.collection(guestHouseCollection, ref => ref
      .where('city', '==', this.city)
      .where('department', '==', this.department)
      .where('srNo', '==', this.srNo)).valueChanges().subscribe(data => {
        if (data.length) {
          this.searchDetail = data[0];
          this.getImagePath(this.searchDetail.department)
        }
      });
  }

  getDepartments() {
    this._afs.collection(departmentCollection).valueChanges().subscribe(data => {
      this.departmentList = data;
    });
  }

  getImagePath(department: string) {
    this.logo = this.departmentList.length ? this.departmentList.find(x => x.name == department).imgSrc : '';
  }

  getOtherImagePath(department: string) {
    return this.departmentList.length ? this.departmentList.find(x => x.name == department).imgSrc : '';
  }

  createForm(): any {
    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  loadOtherGuestHOuses() {
    const self = this;
    if (this.city) {
      this.location = this.city;
      this._afs.collection(guestHouseCollection, ref => ref.where('city', '==', this.city))
        .valueChanges().subscribe(data => {
          this.searchList = data;
        });
    }
    else if (this.state && this.district) {
      this.location = this.district;
      this._afs.collection(guestHouseCollection, ref => ref.where('district', '==', this.district))
        .valueChanges().subscribe(data => {
          this.searchList = data;
        });
    }
  }

  viewDetail(item: any) {
    this._router.navigate(['searchDetail', item.city, item.department, item.srNo]);
  }
}
