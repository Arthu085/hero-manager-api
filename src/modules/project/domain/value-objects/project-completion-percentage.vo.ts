import { InvalidProjectCompletionPercentageException } from '../exceptions/invalid-project-completion-percentage.exception';

export class ProjectCompletionPercentage {
  private constructor(private readonly value: number) {}

  static create(completionPercentage: number): ProjectCompletionPercentage {
    if (completionPercentage === null || completionPercentage === undefined) {
      throw new InvalidProjectCompletionPercentageException(
        'Porcentagem de conclusão do projeto é obrigatória',
      );
    }

    if (completionPercentage < 0 || completionPercentage > 100) {
      throw new InvalidProjectCompletionPercentageException(
        'Porcentagem de conclusão do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectCompletionPercentage(completionPercentage);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectCompletionPercentage): boolean {
    return this.value === other.value;
  }
}
