import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { LaunchesComponent } from './launches/launches.component';

const routes: Routes = [
  {path:"",component:LaunchesComponent},

  {path:"launches/:start/:end/:launchType",component:LaunchesComponent},
  {path:"launches/:launchType",component:LaunchesComponent},

  {path:"filter",component:FilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
