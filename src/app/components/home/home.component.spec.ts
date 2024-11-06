import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { SharedService } from 'src/app/services/shared.service';
import { AlertifyService } from 'src/app/services/Alertify.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sharedServiceMock: any;
  let alertifyServiceMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      addStudentRecord: jest.fn().mockReturnValue(of({ studentId: 1 }))
    };

    alertifyServiceMock = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: AlertifyService, useValue: alertifyServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.studentForm).toBeDefined();
    expect(component.studentForm.controls['firstName']).toBeDefined();
    expect(component.studentForm.controls['lastName']).toBeDefined();
    expect(component.studentForm.controls['startDate']).toBeDefined();
    expect(component.studentForm.controls['lastDate']).toBeDefined();
    expect(component.studentForm.controls['departmentId']).toBeDefined();
    expect(component.studentForm.controls['firstYear']).toBeDefined();
    expect(component.studentForm.controls['secondYear']).toBeDefined();
    expect(component.studentForm.controls['thirdYear']).toBeDefined();
    expect(component.studentForm.controls['fourthYear']).toBeDefined();
    expect(component.studentForm.controls['fifthYear']).toBeDefined();
  });

  it('should validate form fields', () => {
    const firstName = component.studentForm.controls['firstName'];
    firstName.setValue('');
    expect(firstName.valid).toBeFalsy();
    firstName.setValue('John');
    expect(firstName.valid).toBeTruthy();

    const departmentId = component.studentForm.controls['departmentId'];
    departmentId.setValue('abc');
    expect(departmentId.valid).toBeFalsy();
    departmentId.setValue('12');
    expect(departmentId.valid).toBeTruthy();

    const firstYear = component.studentForm.controls['firstYear'];
    firstYear.setValue('abc');
    expect(firstYear.valid).toBeFalsy();
    firstYear.setValue('121');
    expect(firstYear.valid).toBeFalsy();
    firstYear.setValue('120');
    expect(firstYear.valid).toBeTruthy();
  });

  it('should call addStudentRecord and show success message on submit', () => {
    const model = component.getModel();
    component.onClickSubmit();
    expect(sharedServiceMock.addStudentRecord).toHaveBeenCalledWith(model);
    expect(alertifyServiceMock.success).toHaveBeenCalledWith('Successfully added student record with ID: 1');
  });

  it('should reset the form on submit', () => {
    const resetSpy = jest.spyOn(component.studentForm, 'reset');
    component.onClickSubmit();
    expect(resetSpy).toHaveBeenCalled();
  });
});

function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
