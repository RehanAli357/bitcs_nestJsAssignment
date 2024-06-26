import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entity/cats.entity';
import { Between, Repository } from 'typeorm';
import { catsDto } from './dto/cats.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  getAllCats(page: number = 1, limit: number = 10): Promise<Cat[]> {
    if (page > 0 && limit > 0) {
      try {
        const offset = (page - 1) * limit;
        return this.catRepository.find({
          take: limit,
          skip: offset,
        });
      } catch (error) {
        console.log(error.message);
        throw new BadRequestException({ message: 'Unable to fetch the data' });
      }
    } else {
      throw new BadRequestException({ message: 'Wrong Page Value send' });
    }
  }

  getCatDetails(id: number): Promise<Cat> {
    return this.catRepository.findOne({ where: { id } });
  }

  searchCat(from: number, to: number) {
    return this.catRepository.find({ where: { age: Between(from, to) } });
  }

  addCat(
    name: string,
    breed: string,
    age: number,
    level: number,
  ): Promise<Cat> {
    try {
       return this.catRepository.save({ name, breed, age });
    } catch (err) {
      console.log(err.message);
      throw new BadRequestException({ message: 'Unable to save' });
    }
  }

  async updateCat(
    id: number,
    name: string,
    breed: string,
    age: number,
    level: number,
  ): Promise<Cat> {
    try {
      await this.catRepository.update(id, { name, breed, age });
      const updatedCat = await this.catRepository.findOne({ where: { id } });
      if (!updatedCat) {
        throw new BadRequestException({
          message: `Cat with id ${id} not found`,
        });
      }
      return updatedCat;
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to update cat details`,
      });
    }
  }

  async deleteCat(id: number, level: number) {
    const deleteResult = await this.catRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new BadRequestException({
        message: `Cat with id ${id} not found`,
      });
    }
    return deleteResult;
  }
}
