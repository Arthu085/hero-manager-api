import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectAgility {
  private constructor(private readonly value: number) {}

  static create(agility: number): ProjectAgility {
    if (agility === null || agility === undefined) {
      throw new InvalidProjectMetricException(
        'Agilidade do projeto é obrigatória',
      );
    }

    if (agility < 0 || agility > 100) {
      throw new InvalidProjectMetricException(
        'Agilidade do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectAgility(agility);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectAgility): boolean {
    return this.value === other.value;
  }
}
