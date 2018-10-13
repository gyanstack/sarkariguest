import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Search } from '../models/search';
import { cityCollection } from '../shared/utils/codeUtil';
import * as _ from 'lodash';

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
  error: string;
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
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value))
    );

    this.state.valueChanges.subscribe(value => {
      if (value) {
        this.city.setValue('');
        this.district.setValue('');
        let districtList = this.locations.filter(x => x.state == value).map(x => x.district);
        this.disrticts = _.orderBy(_.uniqBy(districtList));
      } else {
        this.disrticts = [];
      }
    })


    this._afs.collection(cityCollection).valueChanges().subscribe(data => {
      self.locations = data as Search[];
      self.cities = _.orderBy(self.locations.map(x => x.city));
      let stateList = _.uniqBy(self.locations.map(x => x.state));
      self.states = _.orderBy(stateList);
    });
  }

  private _filter(value: string): string[] {
    if (value) {
      this.state.setValue('');
      this.district.setValue('');
      this.district.clearValidators();
      this.district.updateValueAndValidity();
      const filterValue = value.toLowerCase();

      let result = this.cities.filter(option => option != null && option.toLowerCase().indexOf(filterValue) === 0);
      if (result.length == 0) {
        this.error = "No result found."
      }
      return result;
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
    if (this.city.value && this.cities.find(x => x == this.city.value)) {
      this._router.navigate(['search', this.city.value]);
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

  // this.disrticts = districtList.filter(function (v, i) {
  //   return districtList.indexOf(v) == i
  // });
}
