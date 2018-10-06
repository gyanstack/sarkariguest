import { Component, OnInit } from '@angular/core';
import { routerTransition } from './core/router.transition';
import { NavigationEnd, Router, ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
    });
  }
  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }
}
