export class Deposito {
  id: string;
  name: string;
  yearly_return: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.yearly_return = Number(data.yearly_return);
  }
}
