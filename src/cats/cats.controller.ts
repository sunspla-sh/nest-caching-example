import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private catsService: CatsService,
  ) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    const cachedValue = await this.cacheManager.get<Cat[]>('cats');
    if (cachedValue) {
      return cachedValue;
    }
    const cats = await this.catsService.findAll();
    await this.cacheManager.set('cats', cats, 1000);
    return cats;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
