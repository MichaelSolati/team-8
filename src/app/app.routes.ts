import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';

const appRoutes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'city/:city',
  component: CityComponent
}];

export const appRouting = RouterModule.forRoot(appRoutes);