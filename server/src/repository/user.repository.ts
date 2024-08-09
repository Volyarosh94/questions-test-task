import { Equal } from 'typeorm';
import { AppDataSource } from '../db/dataSource';
import { User } from '../entities/user.entity';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async create(userData: User): Promise<User> {
    try {
      return await this.userRepository.save(userData);
    } catch (error) {
      throw new Error(error);
    }
  };

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id: Equal(id) } });
    } catch (error) {
      throw new Error(error);
    }
  };

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  };

};
