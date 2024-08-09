import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserService {
  private userRepository: UserRepository = new UserRepository();

  async create(userDto: UserDto): Promise<User> {
    try {
      const {
        email,
        password,
      } = userDto;

      const user = new User();
      user.email = email;
      user.password = password;

      return await this.userRepository.create(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

};
