import { InvalidProjectDescriptionException } from '../exceptions/invalid-project-description.exception';

export class ProjectDescription {
  private constructor(private readonly value: string) {}

  static create(description: string): ProjectDescription {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      throw new InvalidProjectDescriptionException(
        'Descrição do projeto é obrigatória',
      );
    }

    if (trimmedDescription.length < 10) {
      throw new InvalidProjectDescriptionException(
        'Descrição do projeto deve ter no mínimo 10 caracteres',
      );
    }

    if (trimmedDescription.length > 1000) {
      throw new InvalidProjectDescriptionException(
        'Descrição do projeto deve ter no máximo 1000 caracteres',
      );
    }

    return new ProjectDescription(trimmedDescription);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectDescription): boolean {
    return this.value === other.value;
  }
}
