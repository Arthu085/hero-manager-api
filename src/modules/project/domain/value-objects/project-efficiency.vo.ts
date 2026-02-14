import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectEfficiency {
  private constructor(private readonly value: number) {}

  static create(efficiency: number): ProjectEfficiency {
    if (efficiency === null || efficiency === undefined) {
      throw new InvalidProjectMetricException(
        'Eficiência do projeto é obrigatória',
      );
    }

    if (efficiency < 0 || efficiency > 100) {
      throw new InvalidProjectMetricException(
        'Eficiência do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectEfficiency(efficiency);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectEfficiency): boolean {
    return this.value === other.value;
  }
}
