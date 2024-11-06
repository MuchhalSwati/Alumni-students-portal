import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import {Student} from '../interfaces/StudentInfo.model';
import {Dept, StudDepartment} from '../interfaces/Department.model';
import {StudentRecord} from '../interfaces/StudentRecord.model';
import { UpdateRecord } from '../interfaces/UpdateStudentRecord';
import { StudentUpdateInfo } from '../interfaces/StudentupdateInfo.model';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "https://localhost:44356/student";
public studentInfoSubject$ = new BehaviorSubject<StudentUpdateInfo | null>(null);

  constructor(private http:HttpClient) { }

  getStudentCreditInfo(universityId:string,studentId:string):Observable<Student[]>{
    return this.http.get<Student[]>(this.APIUrl+'/'+universityId+'/'+ studentId+'/studentCreditInfo')
  }

  getStudentListUnderDepartment(universityId:string,departmentId:string):Observable<Dept>{
    return this.http.get<Dept>(this.APIUrl+'/'+universityId+'/'+ departmentId+'/department')
  }
  
   addStudentRecord(data:StudentRecord):Observable<{ studentId: number }>{
    console.log(`in student srevice`);
     return this.http.post<{studentId: number}>(this.APIUrl + '/studentRecord', data)
   }

   updateStudentRecord(universityId:string,studentId:string, data:Partial<UpdateRecord>):Observable<UpdateRecord>{
    return this.http.put<UpdateRecord>(this.APIUrl + '/' +universityId+ '/' +studentId+'/StudentUpdate', data)
  }


  updateStudentInfo(studentUpdateInfo:StudentUpdateInfo)
  {
    this.studentInfoSubject$.next(studentUpdateInfo);
    console.log('in update student function');
  }

  // getStudentdata() {
  //   console.log('in observable');
  //   return this.studentInfoSubject.asObservable();
    
  // }

  deleteStudentRecord(universityId:number, studentId: number)
  {
    //https://localhost:44356/Student/1/1010/StudentDelete
    console.log(`in shared service delete student record function ${universityId}, ${studentId}`)
     return this.http.delete(this.APIUrl + '/' +universityId+ '/' +studentId+'/StudentDelete');
  }
}
