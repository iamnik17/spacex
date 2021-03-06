import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Launches } from './launches.model';
import { LaunchesdataService } from './launchesdata.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  selected:any= { startDate: moment, endDate: moment }
  alwaysShowCalendars: boolean;

  ranges: any = {
    'Past week': [
      moment().subtract(1, 'year').startOf('week'),
      moment().subtract(1, 'week').endOf('week'),
    ],
    'Past month': [
      moment().subtract(12, 'month').startOf('month'),
      moment().subtract(11, 'month').endOf('month'),
    ],
    'Past 3 months': [
      moment().subtract(15, 'months').startOf('month'),
      moment().subtract(12, 'month').endOf('month'),
    ],
    'Past 6 months': [
      moment().subtract(18, 'month').startOf('month'),
      moment().subtract(12, 'month').endOf('month'),
    ],
    'Past year': [
      moment().subtract(2, 'year').startOf('year'),
      moment().subtract(1, 'year').endOf('year'),
    ],
    'Past 2 years': [
      moment().subtract(3, 'year').startOf('year'),
      moment().subtract(2, 'month').endOf('month'),
    ],
    
  }
  loading = false;
  modalRef?: BsModalRef;
  // loading:boolean;
  launch_success = 'all';
  filterList = {
    launch_success: ['failed', 'success', 'upcoming', 'all'],
  };
  // modalRef?: BsModalRef;
  // title:any;
  //filter
  filter:any;
    appliedfilters: any;
    // loading:boolean=false;
    // spaceData:any;
    details: any;
    // enabled: boolean;
    // opened: boolean;
    // expectOne: any;
  // details: any;
  localeConfig = {
    format: 'MM/DD/YYYY',
    displayFormat: 'DD MMM y',
    direction: 'ltr',
    separator: ' To ',
    cancelLabel: 'Cancel',
    customRangeLabel: 'Custom range',
  };
  
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  // pickerDirective: DaterangepickerDirective;
  constructor(public launcheservice: LaunchesdataService,
    public modalService: BsModalService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    
  }
  
  // selected: {start: Moment, end: Moment};
  
  public launches:any=[];
  totalLength:any;
  page:number = 1;
   public length:any;

   data:Launches[]=[];
   filtertarget:any; 
   inputSizes: {};
  offset = 0;
  limit = 10;
  
  //  active = null;
  @Input() list: any;
  @Output() onFilterChange = new EventEmitter();
  // @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;

  ngOnInit():void {
    // console.log('la unches', this.launch_success)
    this.getlaunches();
    this.alwaysShowCalendars = true;
    this.route.params.subscribe(x =>
        console.log(x)
        )

  }
  

  // mouseEnter(input: any) {
  //   this.active = input;
  // }

  modal(template:any=null,ans:any=null) {
    this.details = ans;
    this.modalRef = this.modalService.show(template, Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
    // console.log("nikhils")
  }
  
  closeModal() {
    this.modalRef?.hide();
    this.details = undefined
  }

  

  

  getlaunches() {
    // console.log(moment);
    // this.ranges = {
    //   'Today': [moment(), moment()],
    //   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    //   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //   'This Month': [moment().startOf('month'), moment().endOf('month')],
    //   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    //   'All Launches':[moment(), moment()]
    // }
    this.route.params.subscribe(c => {
      // console.log(c);
      if (c['launchType'] !== undefined) {
        this.launch_success = c['launchType'];
        // console.log(c['launchType']);

      }
      if (c['start'] !== undefined) {
        if (c['launchType'] !== undefined && c['launchType'] !== 'all') {
          this.launcheservice[c['launchType']](c['start'], c['end']).subscribe(x =>
            this.filter = this.launches = x);
        }
        else {
          const res = this.launcheservice.getlaunchesData(c['start'], c['end']);
          res.subscribe((res: Launches[]) => {
            this.filter = this.launches = res;
            // console.log(this.launches)
          });
        }
      } else {
        if (c['launchType'] !== undefined && c['launcheType'] !== 'all') {
          this.launcheservice[c['launchType']]().subscribe(x =>
            this.filter = this.launches = x);
        } else {
          const res = this.launcheservice.getlaunchesData(c['start'], c['end']);
          res.subscribe((res: Launches[]) => {
            this.filter = this.launches = res;
            // console.log(this.launches)
          });
        }
      }

    })

    // this.launcheservice.data.subscribe((item:any) => {
    //   this.data = item;

    // });
  }

  // datechange(date: any=null) {
    // console.log(date);
  // }
  startDate:any;
  endDate:any;

      // dateRangeCreated(event:any=null) { 
        // this.startDate;
        // this.endDate; 
               // this.pickerDirective.open();
        // console.log(event)
        // console.log(this.selected.startDate._d.toLocaleDateString(),this.selected.endDate._d.toLocaleDateString())
        // start:this.selected.startDate._d.toLocaleDateString(),
      
        // this.launcheservice.getlaunchesData(this.selected)
        // this.routebyfilter(event.startDate._d.toLocaleDateString(),event.endDate._d.toLocaleDateString());
        // console.log(e);
            // this.filter = this.filter;  
            // new Date(this.startDate) && new Date(this.endDate)
       
        // console.log(e[0]);
        // this.filter = this.launches.filter(m => {
          
        //   console.log(m);
        // }  )  
       
          // }

  copyData = this.launches;
  filterChange(appliedfilters:any) {
    debugger
    this.copyData = this.launches
    // console.log(appliedfilters);
    this.launch_success = appliedfilters.appliedFilterValues.launch_success;

    this.routebyfilter();

    // this.launch_success=appliedfilters.
    // console.log(this.launches);
    // this.launch_success=appliedfilters;
    // console.log(this.launch_success=appliedfilters)



    /*let you have selected India as country and IT sector.
  
    you will get an object here i.e.
  
   { appliedFilterValues: {country: "India",sector: "IT"}
   isFilter: true
   }
    */

  }
  // button_clk() {
  //   this.ifus = !this.ifus
  // }
  
  // selected: any = { startDate: moment, endDate: moment }
  public _d:any;
  datesUpdated(event:any=null) {

    // console.log("event", event);
    // this.date.emit({
    //   start:this.selected.startDate._d.toLocaleDateString(),
    //   end:this.selected.endDate._d.toLocaleDateString(),
    // })
    // this.launcheservice.getlaunchesData(this.selected.startDate._d.toLocaleDateString(),this.selected.endDate._d.toLocaleDateString()).subscribe(
    //   x=>     this.filter =this.launches = x
    // )

    this.routebyfilter(event.startDate._d.toLocaleDateString(), event.endDate._d.toLocaleDateString());
    

  }
  // startDate:any;
  // endDate:any;
  routebyfilter(start?: any, end?: any) {
    if (start !== undefined) {
      // console.log(start, end, this.launch_success)
      this.router.navigate(['/launches', start, end, this.launch_success])
    } else {
      this.route.params.subscribe(x => {
        // console.log(x);
        if (x['start'] !== undefined) {
          this.router.navigate(['/launches', x['start'], x['end'], this.launch_success])
        }
        else {
          this.router.navigate(['/launches', this.launch_success])
        }

      }
      )
      // this.router.navigate([])
      // path start, end, filter type
    }
  }
}
/**
 * all launches [];
 * asort by date 
 * a[0].date, a[a.length-1].date
 * 
 */


