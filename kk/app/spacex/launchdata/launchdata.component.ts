import { Component, OnInit,Input } from '@angular/core';
import { LaunchserviceService } from 'src/app/services/launchservice.service';
import { DatePipe,Location } from '@angular/common';
import{PaginatePipe} from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Observable } from 'rxjs';
import{map} from'rxjs/operators';
import { Moment } from 'moment';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-launchdata',
  templateUrl: './launchdata.component.html',
  template: `
    <ul>
      <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }"> ... </li>
    </ul>
               
    <pagination-controls (pageChange)="p = $event"></pagination-controls>
    `,
  styleUrls: ['./launchdata.component.css']
})

export class LaunchdataComponent implements OnInit {
  public launchdata:any=[];
  public launchid:any=[];
  public msg:any=[];
  public tablemsg:any;
  public mission_name:any;
public rocket_name :any;
public details:any;
public launch_success :any;
public upcoming :any;
public rocket_type :any;
public manufacturer :any;
public nationality:any;
public orbit :any;
public payload_type :any;
public mission_patch_small :any;
public launch_site:any;
public flightno:any;
public internet:any;
public youtube:any;
public wiki:any;
public launchdate:any;
public maxSize:number=9;
public directionLinks:boolean=true;
public autoHide:boolean=false;
public responsive:boolean=true;
public filtertarget:any;
public noresultdiv:boolean=true;
public errordiv:boolean=false;
public startdate:any;
public enddate:any;
public showRangeLabelOnInput:boolean;
public idd:any;
p:number= 1;
myDate = {startDate: moment().subtract(191, 'month').startOf('month'), endDate: moment()}
ranges: any = {
  'All Time':[moment().subtract(191, 'month').startOf('month'), moment()],
  'Past Week': [moment().subtract(6, 'days'), moment()] ,
  'Past Month': [moment().subtract(29, 'days'), moment()],
  'Past 3 Months': [moment().subtract(3, 'month').startOf('month'), moment()],
  'Past 6 Months': [moment().subtract(6, 'month').startOf('month'), moment()],
  'Past Year': [moment().subtract(2, 'year').startOf('month'), moment()],
  'Past 2 Years': [moment().subtract(3, 'year').startOf('month'), moment()]
}
constructor(private location:Location,private laservice:LaunchserviceService,private http:HttpClient,private router:Router,private route:ActivatedRoute,private spinner: NgxSpinnerService) {
 this.showRangeLabelOnInput=true;}
 

  ngOnInit(): void { 
   
this.laservice.fetchDataall().subscribe(
  (response)=>{
this.launchdata=response;
console.log(this.launchdata);


},
  (error)=>{

  }
)}
getflightno(e:any){ var bc=e.target;
 
  console.log(bc);
 var ob=e.target.attributes.for.value.split('#');   
this.mission_name=ob[0];
this.rocket_name=ob[1];
this.details=ob[2];
this.launch_success=ob[3];
this.upcoming=ob[4];
this.rocket_type=ob[5];
this.manufacturer=ob[6];
this.nationality=ob[7];
this.orbit=ob[8];
this.payload_type=ob[9];
this.mission_patch_small=ob[10];
this.launch_site=ob[11];
this.flightno=ob[12];
this.youtube=ob[13];
this.wiki=ob[14];
this.internet=ob[15];
this.launchdate=ob[16];
if(this.upcoming=="true")
  {
  this.msg= 'Upcoming'; 
  }
  else if 
  (this.launch_success=="true"){
   this.msg= 'Success'; 
  }
  else {
    this.msg= 'Failed';
    
  }}
  
rangeClicked(range:any,t:any){
  const datepipe:DatePipe= new DatePipe('en-US');
console.log('[rangeClicked] RANGE IS :',range);
this.startdate=datepipe.transform(range.dates[0]._d,'yyyy-MM-dd');
this.enddate=datepipe.transform(range.dates[1]._d,'yyyy-MM-dd');
console.log(this.startdate);
console.log(this.enddate);

}

datesUpdated(range:any){
  const datepipe:DatePipe= new DatePipe('en-US');
  console.log('[datesUpdated] RANGE IS :',range);
  console.log(range.startDate._d);
  console.log(range.endDate._d);}
  
combinefilter(s:any,t:any){
 
const datepipe:DatePipe= new DatePipe('en-US');
this.startdate=datepipe.transform(s.startDate._d,'yyyy-MM-dd');
this.enddate=datepipe.transform(s.endDate._d,'yyyy-MM-dd');
//if both filter is selected --upcoming/past
 if(t=="upcoming"||t=="past" && s!==null){
  this.filtertarget=t+"?"+"start="+this.startdate+"&end="+this.enddate; 
  this.laservice.FilterLaunch(`${this.filtertarget}`).subscribe(
    (response)=>{
  this.launchdata=response;
  console.log(this.launchdata);
  this.errordiv=false;
  if(this.launchdata.length<1){
    this.errordiv=true;
    this.tablemsg="No Result found for specified filter";
  }
  },
    (error)=>{ 
     })
}
//if both filters selected --success/fail
else if(t=="launch_success=true"||t=="launch_success=false" && s!==null){
  this.filtertarget=t+"&"+"start="+this.startdate+"&end="+this.enddate; ; 
  this.laservice.FilterCond(`${this.filtertarget}`).subscribe(
    (response)=>{
  this.launchdata=response;
  this.errordiv=false;
  if(this.launchdata.length<1){
    this.errordiv=true;
    this.tablemsg="No Result found for specified filter";
  
  }
  },
    (error)=>{
  })  
}}
//if only launch filter selected--upcoming/past
selectlaunchfilter(launchname:any,d:any){
  if(launchname=="upcoming"||launchname=="past" &&d===null){
    this.filtertarget=launchname; 
    this.laservice.FilterLaunch(`${this.filtertarget}`).subscribe(
      (response)=>{
    this.launchdata=response;
    this.errordiv=false;
    if(this.launchdata.length<1){
      this.errordiv=true;
   this.tablemsg="No Result found for specified filter";
    }
    },
      (error)=>{
    })
  }
  //if only launch filter selected--success/fail
else if(launchname=="launch_success=true"||launchname=="launch_success=false" &&d===null)
{this.filtertarget=launchname; 
  this.laservice.FilterCond(`${this.filtertarget}`).subscribe(
    (response)=>{
  this.launchdata=response;
  this.errordiv=false;
  if(this.launchdata.length<1){
    this.errordiv=true;
    this.tablemsg="No Result found for specified filter";
  
   
  }
 },
    (error)=>{
  })}}
  //if only date filter selected
selectdatefilter(datefilter:any){
  const datepipe:DatePipe= new DatePipe('en-US');
this.startdate=datepipe.transform(datefilter.startDate._d,'yyyy-MM-dd');
this.enddate=datepipe.transform(datefilter.endDate._d,'yyyy-MM-dd');
 this.filtertarget="start="+this.startdate+"&end="+this.enddate;
 

  this.laservice.FilterCond(`${this.filtertarget}`).subscribe(
    (response)=>{
  this.launchdata=response;
  console.log(this.launchdata);
  this.errordiv=false;
  if(this.launchdata.length<1){
    this.errordiv=true;
   this.tablemsg="No Result found for specified filter";
   
  }
  },
    (error)=>{
     
      
    }
  )
 
}
}