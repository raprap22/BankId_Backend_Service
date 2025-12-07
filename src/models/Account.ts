export class Account {
  id: string;
  packet: number;
  customer_id: string;
  balance: number;

  constructor(data: any) {
    this.id = data.id;
    this.packet = data.packet;
    this.customer_id = data.customer_id;
    this.balance = Number(data.balance);
  }
}
