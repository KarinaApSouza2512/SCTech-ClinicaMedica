import { Role } from '../enums/Role';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppError';
import { comparePassword } from '../utils/hash';
import { signAccessToken } from '../utils/jwt';
import { PublicUser, UserService } from './UserService';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: PublicUser;
}

export class AuthService {
  private readonly userService = new UserService();

  async register(input: RegisterInput): Promise<PublicUser> {
    const user = await this.userService.create(input);
    return this.userService.toPublic(user);
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const email = input.email.trim().toLowerCase();
    const user = await UserRepository.findByEmailWithPassword(email);

    // Resposta generica: nao revela se o e-mail existe ou se a senha esta incorreta.
    if (!user || !(await comparePassword(input.password, user.password))) {
      throw AppError.unauthorized('Credenciais invalidas');
    }

    const token = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    return { token, user: this.userService.toPublic(user) };
  }
}
