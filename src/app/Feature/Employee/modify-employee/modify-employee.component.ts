import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { IPersonInfo } from '../../../Model/iuser-cred';
import { CommonModule } from '@angular/common';
import { EmpServiceService } from '../../../Service/emp-service.service';
import { SweetAlertzService } from '../../../Service/sweet-alertz.service';

@Component({
  selector: 'app-modify-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modify-employee.component.html',
  styleUrl: './modify-employee.component.css',
})
export class ModifyEmployeeComponent implements OnInit {
  fb = inject(FormBuilder);
  empSrv = inject(EmpServiceService);
  swtAlrtzSrv = inject(SweetAlertzService);
 

  readonly submitTxt$ = this.empSrv.submitTxt$;

  addNewEmployee() {
    this.empSrv.updateBtnTxt();
    this.empForm.reset();
  }

  @Output() employeeAdd = new EventEmitter<any>();

  readonly empEdit$ = this.empSrv.prod$;

  ngOnInit(): void {
    this.empEdit$.subscribe((data) => {
      if (data) {
        this.empForm.patchValue(data);
        console.log('Employee data patched:', data);
      } else {
        console.log('No employee data to patch');
      }
    });
  }

  empForm = this.fb.nonNullable.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
    dateOfBirth: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: this.fb.nonNullable.array([
      this.fb.nonNullable.group({
        id: [0],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        phoneNumberType: ['',Validators.required],
      }),
    ]),
    address: this.fb.nonNullable.array([
      this.fb.nonNullable.group({
        id: [0],
        street: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        postalCode: ['',Validators.required],
        addressType: ['',Validators.required],
      }),
    ]),
  });

  onSubmit() {
    if(this.empForm.invalid) 
      return alert('Please fill out all required fields correctly before submitting the form.');
    this.swtAlrtzSrv.showLoading('Submitting form');
    debugger;
    console.log('Form submitted:', this.empForm.value);
    const raw = this.empForm.getRawValue();
    const data: IPersonInfo = {
      ...raw,
      dateOfBirth: raw.dateOfBirth
        ? new Date(raw.dateOfBirth).toISOString().split('T')[0]
        : '',
    };
    console.log('in child', data);
    this.employeeAdd.emit(data);
  }
}
