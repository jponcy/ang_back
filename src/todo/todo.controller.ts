import { Controller, Get, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('api/v1/todo')
export class TodoController {

  constructor(private readonly service: TodoService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Delete()
  purge() {
    return this.service.purgeFinished();
  }

  @Delete(':id')
  deleteOne(id: number) {
    return this.service.delete(id);
  }
}
