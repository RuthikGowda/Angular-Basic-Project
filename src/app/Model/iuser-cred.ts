export interface IUserCred {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPersonInfo{
    id :number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string ; // Use ISO format for date, nullable
    email:string;
    phone: IPhone[];
    address: IAddress[];  
}

export interface IPhone{
    id:number;
    phoneNumber: string;
    phoneNumberType: string; // e.g., 'Mobile', 'Home', 'Work'
}

export interface IAddress{ 
    id :number;
    addressType: string; // e.g., 'Home', 'Work'
    street: string;
    city: string;
    state: string;
    PostalCode: string;

}