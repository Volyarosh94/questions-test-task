import { Equal } from 'typeorm';
import { AppDataSource } from '../db/dataSource';
import { Question } from '../entities/question.entity';

export class QuestionRepository {
  private questionRepository = AppDataSource.getRepository(Question);

  async create(questionData: Question): Promise<Question> {
    try {
      return await this.questionRepository.save(questionData);
    } catch (error) {
      throw new Error(error);
    }
  };

  async findAll(): Promise<Question[]> {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  async findOne(id: string): Promise<Question> {
    try {
      return await this.questionRepository.findOne({ where: { id: Equal(id) } });
    } catch (error) {
      throw new Error(error);
    }
  };

  async update(questionToUpdate: Question): Promise<Question> {
    try {
      return await this.questionRepository.save(questionToUpdate);
    } catch (error) {
      throw new Error(error);
    }
  };

  async delete(questionToDelete: Question): Promise<Question> {
    try {
      return await this.questionRepository.remove(questionToDelete);
    } catch (error) {
      throw new Error(error);
    }
  };

};
