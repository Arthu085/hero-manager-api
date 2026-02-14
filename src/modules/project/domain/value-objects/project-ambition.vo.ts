import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectAmbition {
  private constructor(private readonly value: number) {}

  static create(ambition: number): ProjectAmbition {
    if (ambition === null || ambition === undefined) {
      throw new InvalidProjectMetricException(
        'Ambição do projeto é obrigatória',
      );
    }

    if (ambition < 0 || ambition > 100) {
      throw new InvalidProjectMetricException(
        'Ambição do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectAmbition(ambition);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectAmbition): boolean {
    return this.value === other.value;
  }
}
