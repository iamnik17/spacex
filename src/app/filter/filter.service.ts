import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  saveStudent(student) {
    console.log(JSON.stringify(student));
  }
}
