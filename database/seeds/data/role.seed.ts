import { DataSource } from 'typeorm';
import { RoleEntity } from 'src/modules/user/domain/entities/role.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { Seed } from '../interfaces/seed.interface';

export class RoleSeed implements Seed {
  name = 'RoleSeed';

  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const roleRepository = this.dataSource.getRepository(RoleEntity);

    const roles = [{ name: RoleEnum.ADMIN }, { name: RoleEnum.USUARIO }];

    for (const roleData of roles) {
      const exists = await roleRepository.findOne({
        where: { name: roleData.name },
      });

      if (!exists) {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log(`Role ${roleData.name} criada`);
      } else {
        console.log(`Role ${roleData.name} já existe`);
      }
    }
  }
}
