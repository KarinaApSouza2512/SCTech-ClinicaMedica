import { Role } from '../enums/Role';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppError';
import { hashPassword } from '../utils/hash';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export class UserService {
  toPublic(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async create(input: CreateUserInput): Promise<User> {
    const email = normalizeEmail(input.email);
    const existing = await UserRepository.findByEmail(email);

    if (existing) {
      throw AppError.conflict('E-mail ja cadastrado');
    }

    const user = UserRepository.create({
      name: input.name.trim(),
      email,
      password: await hashPassword(input.password),
      role: input.role ?? Role.ATTENDANT,
    });

    return UserRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw AppError.notFound('Usuario nao encontrado');
    }

    return user;
  }

  findByEmailWithPassword(email: string): Promise<User | null> {
    return UserRepository.findByEmailWithPassword(normalizeEmail(email));
  }
}
