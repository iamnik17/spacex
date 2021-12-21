import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteringComponent } from './spacex/filtering/filtering.component';

import { LaunchdataComponent } from './spacex/launchdata/launchdata.component';

const routes: Routes = [{path:"",component:LaunchdataComponent},
{path:"filtering/:id",component:FilteringComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
