import { InvalidUserCharacterException } from '../exceptions/invalid-user-character.exception';

export class UserCharacter {
  private constructor(private readonly value: string) {}

  static create(name: string): UserCharacter {
    const trimmedCharacter = name.trim();

    if (!trimmedCharacter || trimmedCharacter.length < 3) {
      throw new InvalidUserCharacterException(
        'Nome do personagem deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedCharacter.length > 200) {
      throw new InvalidUserCharacterException(
        'Nome do personagem deve ter no máximo 200 caracteres',
      );
    }

    return new UserCharacter(trimmedCharacter);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserCharacter): boolean {
    return this.value === other.value;
  }
}
