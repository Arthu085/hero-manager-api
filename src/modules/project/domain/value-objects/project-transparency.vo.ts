import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectTransparency {
  private constructor(private readonly value: number) {}

  static create(transparency: number): ProjectTransparency {
    if (transparency === null || transparency === undefined) {
      throw new InvalidProjectMetricException(
        'Transparência do projeto é obrigatória',
      );
    }

    if (transparency < 0 || transparency > 100) {
      throw new InvalidProjectMetricException(
        'Transparência do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectTransparency(transparency);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectTransparency): boolean {
    return this.value === other.value;
  }
}
