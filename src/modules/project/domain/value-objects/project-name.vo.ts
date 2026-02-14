import { InvalidProjectNameException } from '../exceptions/invalid-project-name.exception';

export class ProjectName {
  private constructor(private readonly value: string) {}

  static create(name: string): ProjectName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new InvalidProjectNameException(
        'Nome do projeto deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedName.length > 200) {
      throw new InvalidProjectNameException(
        'Nome do projeto deve ter no máximo 200 caracteres',
      );
    }

    return new ProjectName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectName): boolean {
    return this.value === other.value;
  }
}
