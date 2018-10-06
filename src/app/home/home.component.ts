import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Search } from '../models/search';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  searchForm: FormGroup;
  // state = 'inactive';
  cities: string[] = [];
  disrticts: string[] = [];
  states: string[] = [];
  locations: Array<Search> = [];
  cityCollection:string = 'myCities';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _afs: AngularFirestore,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit(): void {
    const self = this;

    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.state.valueChanges.subscribe(value => {
      if (value) {
        this.city.setValue('');
        this.district.setValue('');
        let districtList = this.locations.filter(x => x.state == value).map(x => x.district);
        this.disrticts = districtList.filter(function (v, i) {
          return districtList.indexOf(v) == i
        });
      } else {
        this.disrticts = [];
      }
    })


    this._afs.collection(this.cityCollection).valueChanges().subscribe(data => {
      self.locations = data as Search[];
      self.cities = self.locations.map(x => x.city);
      let stateList = self.locations.map(x => x.state);
      self.states = stateList.filter(function (v, i) {
        return stateList.indexOf(v) == i
      });
    });
  }

  private _filter(value: string): string[] {
    if (value) {
      this.state.setValue('');
      this.district.setValue('');
      this.district.clearValidators();
      this.district.updateValueAndValidity();
      const filterValue = value.toLowerCase();
      return this.cities.filter(option => option != null && option.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }
  }

  createForm(): any {
    this.searchForm = this._formBuilder.group({
      city: [''],
      state: [''],
      district: ['']
    });
  }

  doSearch() {
    if (this.city.value) {
      this._router.navigate(['search', this.city.value ]);
    }
    if (!this.city.value && this.state.value) {
      if (this.district.value) {
        this._router.navigate(['search', this.state.value, this.district.value]);
      } else {
        this.district.setValidators([Validators.required]);
        this.district.updateValueAndValidity();
      }
    }
  }

  get city() { return this.searchForm.get('city'); }
  get state() { return this.searchForm.get('state'); }
  get district() { return this.searchForm.get('district'); }
}
