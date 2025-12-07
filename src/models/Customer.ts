export class Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = Number(data.role);
  }
}
