import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Launches } from '../launches/launches.model';
import { LaunchesdataService } from '../launches/launchesdata.service';
import { FilterService } from './filter.service';

import { Moment } from 'moment';

@Component({
  selector: 'app-filterss',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  products = [];
    tempproducts=[]; 
    filter:any;
    public launches:any=[];
  public data:any=[];
  constructor(private launchservice:LaunchesdataService
    ,private formBuilder: FormBuilder, private studentService: FilterService) { }

  ngOnInit(): void {
    this.getlaunc();
  }
  studentForm = this.formBuilder.group({
    name: '',
    dateOfBirth: '',
    admDateRange: this.formBuilder.group({
      startDate: '',
      endDate: ''
    })
  });
  onFormSubmit() {
    this.studentService.saveStudent(this.studentForm.value);
    this.studentForm.reset();
  }
  handleYearSelected(normalizedYear: Moment) {
    console.log("normalizedYear: ", normalizedYear.toDate());
  }
  handleMonthSelected(normalizedMonth: Moment) {
    console.log("normalizedMonth: ", normalizedMonth.toDate());
  }
  getlaunc(){
    const res = this.launchservice.getlaunchesData();
    res.subscribe((res:Launches[]) => {
      this.filter =this.launches = res;
      console.log(this.launches)
    });
    this.launchservice.data.subscribe((item:any) => {
      this.data = item;
     
    });}
    
  
  
  }
  
 

  


