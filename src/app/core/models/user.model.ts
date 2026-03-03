export interface UserRegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: {
    city: string;
    region: string;
    street: string;
  };
}