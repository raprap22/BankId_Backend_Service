import { CustomerRepository } from '../repositories/CustomerRepository';
import { signToken } from '../config/jwt';
import bcrypt from 'bcrypt';
import { generateUniqueId } from '../utils';

export class AuthService {
  private customerRepo: CustomerRepository;

  constructor() {
    this.customerRepo = new CustomerRepository();
  }

  async login(email: string, password: string) {
    const customer = await this.customerRepo.findByEmail(email);

    if (!customer) {
      throw new Error('Invalid email or password');
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      throw new Error('Invalid email or password');
    }

    const token = signToken({
      id: customer.id,
      email: customer.email,
      role: customer.role,
    });

    return {
      message: 'Login Successful',
      token,
      role: customer.role,
    };
  }

  async register(name: string, email: string, role: number = 1) {
    const existing = await this.customerRepo.findByEmail(email);
    if (existing) throw new Error("Email already registered");

    const id = generateUniqueId();
    const rawPassword = "BankID123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newCustomer = await this.customerRepo.create({
      id,
      name,
      email,
      password: hashedPassword,
      role
    });

    return {
      message: "Registration successful",
      customer: {
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
        role: newCustomer.role
      },
      defaultPassword: rawPassword
    };
  }
}
