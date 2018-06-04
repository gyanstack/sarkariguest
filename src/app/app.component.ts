import { Component } from '@angular/core';
import { routerTransition } from './core/router.transition';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'app';

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }
}
