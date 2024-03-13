import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import {Student} from '../interfaces/StudentInfo.model';
import {Dept, StudDepartment} from '../interfaces/Department.model';
import {StudentRecord} from '../interfaces/StudentRecord.model';
import { UpdateRecord } from '../interfaces/UpdateStudentRecord';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "https://localhost:44356/student";
  constructor(private http:HttpClient) { }

  getStudentCreditInfo(universityId:string,studentId:string):Observable<Student[]>{
    return this.http.get<Student[]>(this.APIUrl+'/'+universityId+'/'+ studentId+'/studentCreditInfo')
  }

  getStudentListUnderDepartment(universityId:string,departmentId:string):Observable<Dept>{
    return this.http.get<Dept>(this.APIUrl+'/'+universityId+'/'+ departmentId+'/department')
  }
  
   addStudentRecord(data:StudentRecord){
     return this.http.post<StudentRecord>(this.APIUrl + '/studentRecord', data)
   }

   updateStudentRecord(universityId:string,studentId:string, data:any):Observable<UpdateRecord>{
  //   const url = `${this.APIUrl}/StudentUpdate?univId=${universityId}&studentId=${studentId}`;
  // // Customize headers if needed
  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   // Add any other headers here
  // });
    return this.http.put<UpdateRecord>(this.APIUrl + '/' +universityId+ '/' + studentId+'/StudentUpdate', data)
  }
}
