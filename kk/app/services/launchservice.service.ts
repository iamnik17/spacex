import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LaunchserviceService {
 
  constructor(private http:HttpClient) { }
  apiURL='https://api.spacexdata.com/v3/launches';
 
  fetchDataall(){
    console.log("Fetch data from api ");
    var ans=this.http.get(this.apiURL);
  return(ans);
   }
   //service for upcoming and past launches
   FilterLaunch(collectionname:any){
    console.log("Fetch data from api");
    var ans=this.http.get(this.apiURL+"/"+collectionname);
  return(ans);
   }
   //service for success ,fail & launches & fetch date data
   FilterCond(collectionname:any){
    console.log("Fetch data from api");
    var ans=this.http.get(this.apiURL+"?"+collectionname);
  return(ans);
   }
  
  
   
   
}
