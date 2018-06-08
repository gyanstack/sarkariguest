import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchForm: FormGroup;
  state = 'inactive';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  createForm(): any {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  doSearch() {
    if (this.search.value) {
      this._router.navigate(['search', this.search.value]);
    }
  }

  get search() { return this.searchForm.get('search'); }
}
