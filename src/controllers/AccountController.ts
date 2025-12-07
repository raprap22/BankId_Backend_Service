import { Request, Response } from 'express';
import { accountService } from '../services/account.service';

export class AccountController {
  static async add(req: Request, res: Response) {
    try {
      const { packet, customer_id, balance } = req.body;

      const result = await accountService.addAccount(packet, customer_id, balance);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { packet, balance } = req.body;

      const result = await accountService.updateAccount(id, packet, balance);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result = await accountService.deleteAccount(id);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAccounts(req: Request, res: Response) {
    try {
      const data = await accountService.getAllAccount();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'server error' });
    }
  }

  static async getAccountsByCustomer(req: Request, res: Response) {
    try {
      const { customer_id } = req.params;
      const data = await accountService.getAccountsByCustomerService(customer_id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'server error' });
    }
  }

  static async getAccountById(req: Request, res: Response) {
    try {
      const { id_account } = req.params;
      const data = await accountService.getAccountByIdService(id_account);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'server error' });
    }
  }
}
