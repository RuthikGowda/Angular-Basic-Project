import { inject, Injectable } from '@angular/core';
import { IPersonInfo } from '../Model/iuser-cred';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { myConstants } from '../staticData/myConstants';
import { environment } from '../../environments/environment.development';
import { SweetAlertzService } from './sweet-alertz.service';

@Injectable({
  providedIn: 'root',
})
export class EmpServiceService {
  http = inject(HttpClient);
  swtAlrtzSrv = inject(SweetAlertzService);

  private prodSubject = new BehaviorSubject<IPersonInfo | null>(null);
  readonly prod$ = this.prodSubject.asObservable();

  private empDataSubject = new BehaviorSubject<IPersonInfo[]>([]);
  empData$ = this.empDataSubject.asObservable();

  refreshEmpData() {
    this.http
      .get<IPersonInfo[]>(environment.ASPNET_API_URL + 'getAllEmployeeData', {
        headers: myConstants.headers,
      })
      .subscribe((data) => {
        this.empDataSubject.next(data);
      });
  }
  editEmp(_employee: IPersonInfo) {
    console.log('Editing employee in Service:', _employee);
    this.prodSubject.next(_employee); // Update the BehaviorSubject with the selected employee
  }

  addData(employee: IPersonInfo): Observable<Response> {
    console.log('Adding employee to API:', JSON.stringify(employee));

    return this.http.post<Response>(
      environment.ASPNET_API_URL + 'updateUserProfile',
      employee,
      {
        headers: myConstants.headers,
      }
    );
  }

  deleteData(empId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.ASPNET_API_URL}deleteByID`, {
      headers: myConstants.headers,
      params: { id: String(empId) },
    });
  }
}
