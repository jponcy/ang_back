import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { User } from './user';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll() {
    return this.service
        .getAll()
        .pipe(
          map((users: User[]) => users.map(d => ({id: d.id, username: d.username}))),
        );
  }

  @Get(':id')
  getOne(@Param() params: {[key: string]: string}) {
    return this.service.getOne(+params.id);
  }
}
