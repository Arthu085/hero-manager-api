import { InvalidUserEmailException } from '../exceptions/invalid-user-email.exception';

export class UserEmail {
  private constructor(private readonly value: string) {}

  static create(email: string): UserEmail {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      throw new InvalidUserEmailException('Email é obrigatório');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new InvalidUserEmailException('Email inválido');
    }

    if (trimmedEmail.length > 250) {
      throw new InvalidUserEmailException(
        'Email deve ter no máximo 250 caracteres',
      );
    }

    return new UserEmail(trimmedEmail);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }
}
