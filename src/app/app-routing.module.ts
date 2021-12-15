import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { LaunchesComponent } from './launches/launches.component';

const routes: Routes = [
  {path:"launches",component:LaunchesComponent},
  {path:"filter",component:FilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
