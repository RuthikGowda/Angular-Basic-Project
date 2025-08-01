import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IPersonInfo } from '../../../Model/iuser-cred';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModifyEmployeeComponent } from '../modify-employee/modify-employee.component';
import { EmpServiceService } from '../../../Service/emp-service.service';
import { catchError, delay, EMPTY, finalize, of, tap } from 'rxjs';
import { SweetAlertzService } from '../../../Service/sweet-alertz.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ModifyEmployeeComponent, AsyncPipe],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {


  cdr = inject(ChangeDetectorRef);
  empSrv = inject(EmpServiceService);
 swtAlrtzSrv = inject(SweetAlertzService);
  totalEmployee: number = 0;
  @ViewChild(ModifyEmployeeComponent)
  modifyEmployeeComponent!: ModifyEmployeeComponent;

ngOnInit() {
 this.empTableRefresh();
}

empTableRefresh():void{
 this.empSrv.refreshEmpData().then((data) => {
    console.log('In refreshin record',data);
    if (data === true) {
      this.swtAlrtzSrv.SuccessTopEnd('Employee data refreshed successfully!');
    }
    else{ 
      this.swtAlrtzSrv.ErrorTopEnd('Error while refreshing the Employee table'); 
    }
  });  
}

 empData$ = this.empSrv.empData$.pipe(
    tap((data) => {
      //this.totalEmployee = data.length + this.employeeData.length;
      console.log('fetching employee data:', data);
      this.totalEmployee = data.length + this.employeeData.length;
      this.cdr.detectChanges();
    }),
    catchError((error) => {
      console.error('Error fetching employee data:', error); 
      return EMPTY;
    }),
    finalize(() => {
      // Any cleanup logic can go here if needed
    })
  );

 

  async onDeleteEmployee(deleteEmp: IPersonInfo) {
    console.log('Delete Employee:', deleteEmp);
    let confirmation = await this.swtAlrtzSrv.confirmDelete(
      `Are you sure you want to delete ${deleteEmp.firstName} ${deleteEmp.lastName}?`
    );

    if (confirmation) {
      console.log('Confirmed deletion for:', deleteEmp);
      debugger;
      this.empSrv
        .deleteData(deleteEmp.email)
        .pipe(
          tap(() => {
            this.swtAlrtzSrv.SuccessTopEnd(
              `${deleteEmp.firstName} ${deleteEmp.lastName} deleted successfully!`
            );
            this.empSrv.refreshEmpData();
          }),
          catchError((error) => {
        console.error('Error deleting employee:', error);
        this.swtAlrtzSrv.ApiError();
        this.empTableRefresh();
        return EMPTY;
          })
        )
        .subscribe();
    }
  }

  onEmployeeSelect(_employee: IPersonInfo) {
    
    this.empSrv.editEmp(_employee);
    console.log('Employee selected in Parent:', _employee);
    this.swtAlrtzSrv.SuccessTopEnd(
      `Selected ${_employee.firstName} ${_employee.lastName} for editing!`
    );
  }

 

  onEmployeeAdd(employee: IPersonInfo) {
    console.info('Adding Employee:', JSON.stringify(employee));
    this.empSrv
      .addData({
        ...employee,
        dateOfBirth: employee.dateOfBirth?.toString().split('T')[0],
      })
      .pipe(
        catchError((error) => {
          console.error('Error adding employee:', error);

          const index = this.employeeData.findIndex(
            (emp) => emp.id === employee.id
          );
          if (index !== -1) {
            this.employeeData[index] = { ...employee };
          } else {
            this.employeeData.push({ ...employee, id: Math.floor((Math.random() * 100) + 1) });
          }
          this.swtAlrtzSrv.ApiError();
          this.modifyEmployeeComponent.empForm.reset();
          this.empTableRefresh();
          if (this.modifyEmployeeComponent) {
            this.modifyEmployeeComponent.empForm.reset();
          }
          // Optionally handle error UI here.
          return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          // this.swtAlrtzSrv.showLoading("form submitted successfully. Refreshing employee data...");
          console.log('Employee added successfully:', response);
          this.swtAlrtzSrv.closeLoading();
          this.swtAlrtzSrv.SuccessTopEnd('Employee added successfully!');
          // Refresh the employee data after successful add
          //this.empSrv.refreshEmpData();
          this.empTableRefresh();
          if (this.modifyEmployeeComponent) {
            this.modifyEmployeeComponent.empForm.reset();
          }
          
        },
      });
  }

  onEmployeeSelectStatic(staticData: IPersonInfo) {
    console.log('Selected Static Employee:', staticData);
    // Logic to handle selection of static employee data
    this.empSrv.editEmp(staticData); // Pass the selected static employee to the service for editing
    this.swtAlrtzSrv.SuccessTopEnd(
      `Selected ${staticData.firstName} ${staticData.lastName} for editing!`
    );
  }

  async onDeleteStaticEmployee(deleteEMp: IPersonInfo) {
    console.log('Delete Static Employee:', deleteEMp);
    let confirmation = await this.swtAlrtzSrv.confirmDelete(
      `Are you sure you want to delete ${deleteEMp.firstName} ${deleteEMp.lastName}?`
    );

    if (confirmation) {
      console.log('Confirmed deletion for:', deleteEMp);
      // Logic to delete the employee from static data
      this.employeeData = this.employeeData.filter(
        (emp) => emp.id !== deleteEMp.id
      );
      this.swtAlrtzSrv.SuccessTopEnd(
        `${deleteEMp.firstName} ${deleteEMp.lastName} deleted successfully!`
      );
    }
  }

  employeeData: IPersonInfo[] = [
    {
      id: 1,
      firstName: 'Ruthik',
      lastName: 'Yogesh',
      email: 'ruthik.yogesh@example.com',
      dateOfBirth: '2024-01-01', // Initialize with current date or a specific date
      phone: [
        {
          id: 0,
          phoneNumber: '123-456-7890',
          phoneNumberType: 'Mobile', // e.g., 'Mobile', 'Home', 'Work'
        },
      ],
      address: [
        {
          id: 0,
          addressType: 'Home', // e.g., 'Home', 'Work'
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
        },
      ],
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '2024-01-02', // Example date
      phone: [
        {
          id: 1,
          phoneNumber: '987-654-3210',
          phoneNumberType: 'Work',
        },
      ],
      address: [
        {
          id: 1,
          addressType: 'Work',
          street: '456 Elm St',
          city: 'Othertown',
          state: 'NY',
          postalCode: '67890',
        },
      ],
    },
  ];
}
