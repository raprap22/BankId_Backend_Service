import { DepositoRepository } from '../repositories/DepositoRepository';

export class DepositoService {
  private depositoRepo: DepositoRepository;

  constructor() {
    this.depositoRepo = new DepositoRepository();
  }

  async addADeposito(name: string, yearly_return: number) {
    if (isNaN(yearly_return)) {
      throw new Error('yearly_return must be a number1');
    }

    const newDeposito = await this.depositoRepo.create({
      name,
      yearly_return,
    });

    return newDeposito;
  }

  async updateDeposito(id: number, name: string, yearly_return: number) {
    const updated = await this.depositoRepo.update(id, { name, yearly_return });
    if (!updated) throw new Error('Deposito not found');
    return updated;
  }

  async deleteDeposito(id: number) {
    const ok = await this.depositoRepo.delete(id);
    if (!ok) throw new Error('Deposito not found');
    return { message: 'Deposito deleted' };
  }

  async getAllDeposito() {
    const ok = await this.depositoRepo.getAllDepositos();
    if (!ok) throw new Error('Error');
    return ok;
  }
}

export const depositoService = new DepositoService();
