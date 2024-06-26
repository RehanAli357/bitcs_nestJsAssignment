import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { catsDto } from './dto/cats.dto';
import { AuthGuard } from '@nestjs/passport';
import { CatsGuard } from './cats.guard';

@Controller('cats')
export class CatsController {
  constructor(private CatsService: CatsService) {}

  @Get('/')
  getAllCats(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.CatsService.getAllCats(page, limit);
  }

  @Get('/:id?')
  getCatDetails(@Param('id', ParseIntPipe) id: number) {
    return this.CatsService.getCatDetails(id);
  }

  @Get('/search')
  searchCat(
    @Query('from', ParseIntPipe) from: number,
    @Query('to', ParseIntPipe) to: number,
  ) {
    return this.CatsService.searchCat(from, to);
  }

  @UseGuards(CatsGuard)
  @SetMetadata('endpointPermissions', 2)
  @Post()
  addCat(@Body() catsDto: catsDto) {
    return this.CatsService.addCat(
      catsDto.name,
      catsDto.breed,
      catsDto.age,
      catsDto.userId,
    );
  }

  @UseGuards(CatsGuard)
  @SetMetadata('endpointPermissions', 2)
  @Put('/:id')
  updateCat(@Param('id', ParseIntPipe) id: number, @Body() catsDto: catsDto) {
    return this.CatsService.updateCat(
      id,
      catsDto.name,
      catsDto.breed,
      catsDto.age,
      catsDto.userId,
    );
  }

  @UseGuards(CatsGuard)
  @SetMetadata('endpointPermissions', 3)
  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number, @Body() catsDto: catsDto) {
    return this.CatsService.deleteCat(id, catsDto.userId);
  }
}
