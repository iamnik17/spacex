import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LaunchesComponent } from './launches/launches.component';
import { PaginationComponent } from './pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatatimePipe } from './datatime.pipe';
import { DropdowndataComponent } from './dropdowndata/dropdowndata.component';
// import { FilterComponent } from './filter/filter.component';
import { GenericListFilterModule } from 'generic-list-filter';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { SpxFilterComponent } from './spx-filter/spx-filter.component';
// import { SpxTableComponent } from './spx-table/spx-table.component';
// import { SpxDetailsModelComponent } from './spx-details-model/spx-details-model.component';
// import{DemoMaterialModule}from'@angular/material'
// import {DemoMaterialModule} from './material-module';

// import { MatDialog } from '@angular/material/dialog';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import{MatInputModule}from'@angular/material/input'
// import { MatFormFieldModule } from '@angular/material/form-field';

// import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LaunchesComponent,
    PaginationComponent,
    DatatimePipe,
    DropdowndataComponent,
    DatePickerComponent,
    HeaderComponent,
    
    // FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    GenericListFilterModule,
    ModalModule.forRoot(),
    // DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ModalModule,
    // MatDialog,
    // MatDatepickerModule,MatInputModule,
    // MatFormFieldModule, 
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
    // MatInputModule, 
    // MatDatepickerModule,
    // MatMomentDateModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
