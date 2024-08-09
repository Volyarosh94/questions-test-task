import { QuestionRepository } from '../repository/question.repository';
import { Question } from '../entities/question.entity';
import { QuestionDto } from '../dto/question.dto';

export class QuestionService {
  private questionRepository: QuestionRepository = new QuestionRepository();

  async create(questionDto: QuestionDto): Promise<Question> {
    try {
      const { text } = questionDto;

      const question = new Question();
      question.text = text;

      return await this.questionRepository.create(question);
    } catch (error) {
      throw new Error(error);
    }
  };

  async getAll(): Promise<Question[]> {
    try {
      return await this.questionRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  async getById(id: string): Promise<Question> {
    try {
      const question: Question = await this.questionRepository.findOne(id);

      return question;
    } catch (error) {
      throw new Error(error);
    }
  };

  async update(id: string, questionDto: QuestionDto): Promise<Question> {
    try {
      const questionToUpdate: Question = await this.getById(id);

      const { text } = questionDto;

      questionToUpdate.text = text;
      questionToUpdate.editingBy = null;

      return await this.questionRepository.update(questionToUpdate);
    } catch (error) {
      throw new Error(error);
    }
  };

  async setEdit(userId: string, questionId: string): Promise<Question | boolean> {
    try {
      const questionToUpdate: Question = await this.getById(questionId);

      if (!questionToUpdate) {
        throw new Error('Question Not Found');
      }

      questionToUpdate.editingBy = userId;

      return await this.questionRepository.update(questionToUpdate);
    } catch (error) {
      throw new Error(error);
    }
  };

  async delete(id: string): Promise<Question> {
    try {
      const questionToDelete: Question = await this.getById(id);

      return await this.questionRepository.delete(questionToDelete);
    } catch (error) {
      throw new Error(error);
    }
  };

};
