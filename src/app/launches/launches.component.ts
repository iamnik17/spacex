import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Launches } from './launches.model';
import { LaunchesdataService } from './launchesdata.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelcontentComponent } from '../modelcontent/modelcontent.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
 loading= false;
    //  pagination//  
    // appliedFilterValues:any
  //  pagination//
  // appliedFilterValues:any
  modalRef?: BsModalRef;
  // loading:boolean;
  launch_success:any;
  filterList = {
    launch_success : ['failed','success','upcoming'],
    // sector: ['IT', 'Agriculture', 'Medical']
    //here you can add as many filters as you want.
    };  
  details: any;
  // loading:boolean;
  // success: boolean | undefined;
  
    // dataSource = ELEMENT_DATA;
  constructor(private launcheservice:LaunchesdataService,
    private modalService: BsModalService,
    ) { }
  // selected: {start: Moment, end: Moment};
  public launches:any=[];
  totalLength:any;
  filter:any;
  page:number = 1;
   public length:any;
   active = null;
  

   data:Launches[]=[];
   offset = 0;
   limit = 10;
  //  active = null;
  @Input() list:any;
@Output() onFilterChange = new EventEmitter();
    
  ngOnInit(): void {
    this.getlaunches();
    
  }

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
  const res = this.launcheservice.getlaunchesData();
  res.subscribe((res:Launches[]) => {
    this.filter =this.launches = res;
    console.log(this.launches)
  });
  this.launcheservice.data.subscribe((item:any) => {
    this.data = item;
   
  });
 }
 
 copyData=this.launches;
 filterChange(appliedfilters:any) {
   debugger
   this.copyData=this.launches
  console.log(appliedfilters);
 this.launch_success=appliedfilters.appliedFilterValues.launch_success;

 if(this.launch_success === 'success')
 {
  //  console.log(this.launch_success);  
   this.filter=this.launches.filter(nik =>nik.launch_success);
  //  this.launches.push(this.launch_success) 
   console.log();
   console.log(this.launch_success);
  //  this.launches=this.launches.filter((res: { launch_success: any; })=>res.launch_success===this.launch_success)
 } 
 else if(this.launch_success === 'upcoming'){
  this.filter=this.launches.filter(nik  =>!nik.launch_success && nik.upcoming);
 } else if(this.launch_success === 'failed'){
  this.filter=this.launches.filter(nik  =>!nik.launch_success && !nik.upcoming);
 }
 
 
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
launchType(dropdownMenu:any,){
  
}
}
  function res(res: any, arg1: any, arg2: boolean): any {
  throw new Error('Function not implemented.');
}

