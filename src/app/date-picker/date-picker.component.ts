import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { Launches } from '../launches/launches.model';
import { LaunchesdataService } from '../launches/launchesdata.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  filter:any;
  data:Launches[]=[];
  public launches:any=[];
  selected: any={startDate:moment,endDate:moment}
  
  
  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

isInvalidDate = (m: moment.Moment) =>  {
   return this.invalidDates.some(d => d.isSame(m, 'day') )
  // console.log(this.invalidDates);
}

  constructor(private launcheservice:LaunchesdataService) { 
    this.alwaysShowCalendars = true;
  }
  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;
  ngOnInit(): void {
   this.getlaunches()
  }
  getlaunches(){
    const res = this.launcheservice.getlaunchesData();
    res.subscribe((res:Launches[]) => {
      this.filter =this.launches = res;
      console.log(this.launches)
    });
    this.launcheservice.data.subscribe((item:any) => {
      this.data = item;
     
    });
  }
  dateRangeCreated(appliedfilters:any){
    console.log(appliedfilters);
    // console.log(event);
    this.filter=this.launches
  //  this.pickerDirective.open()
  //  console.log(event.startDate);
   console.log(this.selected.startDate._d);
   
  
   


  }
 }
