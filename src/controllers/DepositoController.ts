import { Request, Response } from 'express';
import { depositoService } from '../services/deposito.service';

export class DepositoController {
  static async add(req: Request, res: Response) {
    try {
      const { name, yearly_return } = req.body;

      if (isNaN(yearly_return)) {
        return res.status(400).json({ message: 'yearly_return must be numeric 1' });
      }

      const result = await depositoService.addADeposito(name, yearly_return);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, yearly_return } = req.body;

      const result = await depositoService.updateDeposito(id, name, yearly_return);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result = await depositoService.deleteDeposito(id);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getDepositos(req: Request, res: Response) {
    try {
      const data = await depositoService.getAllDeposito();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'server error' });
    }
  }
}
