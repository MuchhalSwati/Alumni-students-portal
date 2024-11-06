import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Student } from '../../interfaces/StudentInfo.model';
import { Observable, of, Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/services/Alertify.service';

@Component({
  selector: 'pm-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  protected universityId: string | null;
  protected studentId: string | null;
  studentsCreditInfo: Student[] = [];
  //detailView:Student[]=[];
  view: boolean = false;
  $studentCreditData: Observable<Student[]>;

  constructor(
    private  service: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.student_subscription();
  }

  student_subscription() {
    this.subscription = this.service.studentInfoSubject$.subscribe((info) => {
      if (info) {
        (this.studentId = info.studentId),
          (this.universityId = info.universityid);
        console.log('in student component');
        console.log(`In ngonint:${this.studentId}`);
        console.log(`In ngonint${this.universityId}`);
        this.getStudentInfo();
      }
      this.view = true;
      console.log(`view in ngoninit ${this.view}`);
    });
  }

  getStudentInfo(): void {
    this.$studentCreditData = this.service.getStudentCreditInfo(
      this.universityId,
      this.studentId
    );
  }

  deleteStudentRecord(universityId: number, studentId: number): void {
    console.log(
      `In delete function universityId ${universityId} studentId ${studentId}`
    );
    this.service.deleteStudentRecord(universityId, studentId).subscribe({
      next: (response) => this.resetForm(),
      complete: () =>
        this.alertify.success('Successfully deleted student record'),
    });
  }

  resetForm(): void {
    this.universityId = '';
    this.studentId = '';
    this.studentsCreditInfo = [];
    this.$studentCreditData = of([]);
  }

  ngOnDestroy(): void {
    this.service.updateStudentInfo(null);
  }
}
