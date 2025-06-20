export interface IUserCred {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPersonInfo{
    firstName: string;
    lastName: string;
    dateOfBirth: Date; // Use ISO format for date

    phone: IPhone[];
    address: IAddress;  
}

export interface IPhone{
    phoneNumber: string;
    phoneType: string; // e.g., 'Mobile', 'Home', 'Work'
}

export interface IAddress{ 
    addressType: string; // e.g., 'Home', 'Work'
    street: string;
    city: string;
    state: string;
    zipCode: string;

}