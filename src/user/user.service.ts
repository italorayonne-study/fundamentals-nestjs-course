import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ birthAt, email, name, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email,
        password,
        createdAt: new Date(),
        name,
        updatedAt: new Date(),
        birthAt,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    const userList = await this.prisma.user.findMany();
    const users = [];

    userList.map((user) => {
      users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Intl.DateTimeFormat('pt-BR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }).format(user.createdAt),
        birthAt: user.birthAt,
      });
    });

    return {
      success: true,
      status: 200,
      data: users,
    };
  }
}
