import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  city: string;
  department: string;
  srNo: number;
  guestHouseCollection: string = 'myGuestHouses';
  searchDetail: any;
  commentForm: FormGroup;
  logo:string;

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
      this.srNo = +params['srNo'];
      this.getDetail();
    });
  }

  getDetail(): any {
    this._afs.collection(this.guestHouseCollection, ref => ref
      .where('city', '==', this.city)
      .where('department', '==', this.department)
      .where('srNo', '==', this.srNo)).valueChanges().subscribe(data => {
        this.searchDetail = data[0];
        this.getImagePath(this.searchDetail.department)
      });
  }

  getImagePath(department: string) {
    this._afs.collection('departments', ref => ref.where('name', '==', department))
      .valueChanges().subscribe(data => {
        let obj = data[0] as any;
        this.logo = obj.imgSrc;
      });
  }

  createForm(): any {
    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}
