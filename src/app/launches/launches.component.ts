import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Launches } from './launches.model';
import { LaunchesdataService } from './launchesdata.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelcontentComponent } from '../modelcontent/modelcontent.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit 
{
 loading= false;
  modalRef?: BsModalRef;
  // loading:boolean;
  launch_success = 'all';
  filterList = {
    launch_success : ['failed','success','upcoming','all'],
    };  
  details: any;
  // loading:boolean;
  // success: boolean | undefined;
  
    // dataSource = ELEMENT_DATA;
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
  constructor(private launcheservice:LaunchesdataService,
    private modalService: BsModalService,
    private router:Router,
    private route: ActivatedRoute
    ) {
      this.alwaysShowCalendars = true;
     }
  // selected: {start: Moment, end: Moment};
  public launches:any=[];
  totalLength:any;
  filter:any;
  page:number = 1;
   public length:any;
   active = null;
   ifus:boolean=true;

   data:Launches[]=[];
   offset = 0;
   limit = 10;
  //  active = null;
  @Input() list:any;
@Output() onFilterChange = new EventEmitter();
    
  ngOnInit(): void {
    console.log('la unches',this.launch_success)
    this.getlaunches();
this.route.params.subscribe(x=> console.log(x))
    
  }
  /**
   * {
   * start:gfgfgf,
   * end: ghjgjgkj,
   * filtertype: hfghf,
   * }
   * 
   */

  mouseEnter(input : any){
    this.active = input;
 }

 modal(template:any,ans:any){
   this.details = ans;
  this.modalRef = this.modalService.show(template, Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
  console.log("nikhils")
 }
 closeModal(){
   this.modalRef?.hide();
  this.details =undefined }

 mouseLeave(input : any){
    this.active = null;     
 }
 getlaunches(){
   this.route.params.subscribe(c => {console.log(c);
    if(c['launchType'] !== undefined){
         this.launch_success= c['launchType'];
         console.log(c['launchType']);

    }
   if(c['start'] !== undefined){
    if(c['launchType'] !== undefined && c['launchType']!=='all'){
      this.launcheservice[c['launchType']](c['start'],c['end']).subscribe(x=>
        this.filter = this.launches = x );
    }
    else{
    const res = this.launcheservice.getlaunchesData(c['start'],c['end']);
    res.subscribe((res:Launches[]) => {
      this.filter =this.launches = res;
      console.log(this.launches)
    });
  }
   } else  {
    if(c['launchType'] !== undefined && c['launcheType']=='all'){
      this.launcheservice[c['launchType']]().subscribe(x=>
        this.filter = this.launches = x);
    }else{
    const res = this.launcheservice.getlaunchesData(c['start'],c['end']);
    res.subscribe((res:Launches[]) => {
      this.filter =this.launches = res;
      console.log(this.launches)
    });}
   }

  })

  // this.launcheservice.data.subscribe((item:any) => {
  //   this.data = item;
   
  // });
 }
 datechange(date:any){
   console.log(date);
 }
 
 copyData=this.launches;
 filterChange(appliedfilters:any) {
   debugger
   this.copyData=this.launches
  console.log(appliedfilters);
 this.launch_success=appliedfilters.appliedFilterValues.launch_success;

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
button_clk(){
  this.ifus=!this.ifus
}
selected: any={startDate:moment,endDate:moment}
dateRangeCreated(event:any){
  
   console.log("event",event);
    // this.date.emit({
    //   start:this.selected.startDate._d.toLocaleDateString(),
    //   end:this.selected.endDate._d.toLocaleDateString(),
    // })
// this.launcheservice.getlaunchesData(this.selected.startDate._d.toLocaleDateString(),this.selected.endDate._d.toLocaleDateString()).subscribe(
//   x=>     this.filter =this.launches = x
// )
   
  this.routebyfilter(event.startDate._d.toLocaleDateString(),event.endDate._d.toLocaleDateString());
  // this.launcheservice.getlaunchesData(this.selected.startDate._d.toLocaleDateString(),this.selected.endDate._d.toLocaleDateString()).subscribe(
  //     x=>     this.filter =this.launches = x
  //     )
  //     console.log(this.filter);
      
}
routebyfilter(start?:any, end?:any){
  if(start !== undefined){
    console.log(start,end,this.launch_success)
    this.router.navigate(['/launches',start,end,this.launch_success])
  } else { this.route.params.subscribe(x=> {console.log(x);
    if(x['start'] !== undefined){
    this.router.navigate(['/launches',x['start'],x['end'],this.launch_success])}
 else{
  this.router.navigate(['/launches',this.launch_success])
}

   }
  )
  // this.router.navigate([])
  // path start, end, filter type
    }
  }
}


