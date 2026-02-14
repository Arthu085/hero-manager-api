import { InvalidProjectMetricException } from '../exceptions/invalid-project-metric.exception';

export class ProjectEnchantment {
  private constructor(private readonly value: number) {}

  static create(enchantment: number): ProjectEnchantment {
    if (enchantment === null || enchantment === undefined) {
      throw new InvalidProjectMetricException(
        'Encantamento do projeto é obrigatório',
      );
    }

    if (enchantment < 0 || enchantment > 100) {
      throw new InvalidProjectMetricException(
        'Encantamento do projeto deve estar entre 0 e 100',
      );
    }

    return new ProjectEnchantment(enchantment);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ProjectEnchantment): boolean {
    return this.value === other.value;
  }
}
