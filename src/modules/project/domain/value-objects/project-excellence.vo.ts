import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectExcellence {
  private constructor(private readonly value: number) {}

  static create(excellence: number): ProjectExcellence {
    if (excellence === null || excellence === undefined) {
      throw new InvalidProjectMetricException(
        'Excelência do projeto é obrigatória',
      );
    }

    if (excellence < 0 || excellence > 100) {
      throw new InvalidProjectMetricException(
        'Excelência do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectExcellence(excellence);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectExcellence): boolean {
    return this.value === other.value;
  }
}
