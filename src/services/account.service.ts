import { AccountRepository } from '../repositories/AccountRepository';
import { generateUniqueId } from '../utils';

export class AccountService {
  private accountRepo: AccountRepository;

  constructor() {
    this.accountRepo = new AccountRepository();
  }

  async addAccount(packet: number, customer_id: string, balance: number = 0) {
    const idAccount = generateUniqueId();

    const newAccount = await this.accountRepo.create({
      id: idAccount,
      packet,
      customer_id,
      balance,
    });

    return newAccount;
  }

  async updateAccount(id: number, packet?: number, balance?: number) {
    const updated = await this.accountRepo.update(id, { packet, balance });
    if (!updated) throw new Error('Account not found');
    return updated;
  }

  async deleteAccount(id: number) {
    const ok = await this.accountRepo.delete(id);
    if (!ok) throw new Error('Account not found');
    return { message: 'Account deleted' };
  }

  async getAllAccount() {
    const ok = await this.accountRepo.getAllAccounts();
    if (!ok) throw new Error('Error');
    return ok;
  }

  async getAccountsByCustomerService(customerId: string) {
    const ok = await this.accountRepo.getAccountsByCustomer(customerId);
    if (!ok) throw new Error('Error');
    return ok;
  }
  async getAccountByIdService(accountId: string) {
    const ok = await this.accountRepo.getAccountById(accountId);
    if (!ok) throw new Error('Error');
    return ok;
  }
}

export const accountService = new AccountService();
