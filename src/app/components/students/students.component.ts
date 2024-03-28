import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import {Student} from '../../interfaces/StudentInfo.model';
import { Subject, Subscription, Unsubscribable, delay, filter, takeUntil } from 'rxjs';


@Component({
  selector: 'pm-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {


  private subscription:Subscription | undefined;
  protected universityId:string|null;
  protected studentId:string|null;;
  studentsCreditInfo:Student[] = [];
  //detailView:Student[]=[];
  view:boolean = false;
  //private destroy$ = new Subject<void>();


  constructor(private service: SharedService, private route: ActivatedRoute,private router:Router) {  
   
  }

  ngOnInit(): void 
  {  
    //  this.router.events
    // .pipe(
    //   filter(event => (event instanceof NavigationEnd)))
    //   .subscribe((event:NavigationEnd) =>{
    //     const editRoutePattern = '/students/edit/';
    //     if(event.url.includes(editRoutePattern))
    //     {
    //       console.log(` URL after redirect${event.url}`);
    //       this.callfunction();
    //     }
    //     else{
    //       console.log(`not redirected from student update component ${event}`)
    //     }
    //   })

   this.student_subscription();
   
  }

  student_subscription()
  {
    this.subscription = this.service.getStudentdata().subscribe((info) =>{
      if(info)
      {
        this.studentId = info.studentId,
        this.universityId = info.universityid
        console.log('in student component')
        console.log(`In ngonint:${this.studentId}`)
        console.log(`In ngonint${this.universityId}`)
        this.getStudentInfo();
      }
      this.view = true;
      console.log(`view in ngoninit ${this.view}`);
     });
  }

  getStudentInfo():void {
  this.service.getStudentCreditInfo(this.universityId, this.studentId).subscribe((data) => {
      this.studentsCreditInfo = data;
      console.log(this.studentsCreditInfo);
      console.log(`In getstudentInfo:${this.studentId}`)
      console.log(`In getstudentInfo${this.universityId}`)
    })
  }

  // viewDetail():void{
  //   //this.detailView = this.studentsCreditInfo;
  //   this.view = !this.view
  // }

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    //   console.log(`StudentId:${this.studentId}` )
    //   console.log(`UniversityId:${this.universityId}`)
    // this.destroy$.next();
    // this.destroy$.complete();
    this.service.updateStudentInfo(null)
    }
  }

//}
  


