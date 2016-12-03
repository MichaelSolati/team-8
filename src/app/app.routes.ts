import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [{
  path: '',
  component: HomeComponent
}];

export const appRouting = RouterModule.forRoot(appRoutes);