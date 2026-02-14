import { DataSource } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { RoleEntity } from 'src/modules/user/domain/entities/role.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { Seed } from '../interfaces/seed.interface';
import * as bcrypt from 'bcrypt';

export class UserSeed implements Seed {
  name = 'UserSeed';

  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(UserEntity);
    const roleRepository = this.dataSource.getRepository(RoleEntity);

    const adminRole = await roleRepository.findOne({
      where: { name: RoleEnum.ADMIN },
    });

    const userRole = await roleRepository.findOne({
      where: { name: RoleEnum.USUARIO },
    });

    if (!adminRole || !userRole) {
      console.log('Roles não encontradas. Execute a RoleSeed primeiro.');
      return;
    }

    const users = [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123456', 10),
        character: 'Superman',
        role: adminRole,
      },
    ];

    for (const userData of users) {
      const exists = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (!exists) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`Usuário ${userData.name} criado`);
      } else {
        console.log(`Usuário ${userData.email} já existe`);
      }
    }
  }
}
