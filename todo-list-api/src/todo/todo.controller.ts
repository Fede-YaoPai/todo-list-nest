import { Body, Controller, Delete, Get, InternalServerErrorException, Logger, Param, Patch, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.interface";

@Controller('todo')
export class TodoController {
  
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  public getAll(): Array<Todo> {
    this.logger.log('Handling getAll() request...');
    
    return this.todoService.getAll();
  }

  @Get(':id')
  public getById(@Param('id') id: string): Todo {
    this.logger.log('Handling getById() request...');
    
    return this.todoService.getById(id);
  }

  @Post('add')
  public add(@Body() itemToAdd: Todo): Todo {
    this.logger.log('Handling add() request...');

    return this.todoService.add(itemToAdd);
  }

  @Delete('delete')
  public delete(@Param('id') id: string): Todo {
    this.logger.log('Handling delete() request...');

    return this.todoService.delete(id);
  }

  @Patch('patch')
  public updatePatch(@Body() itemToPatch: Todo): Todo {
    this.logger.log('Handling updatePatch() request...');

    const patchedItem: Todo | undefined = this.todoService.updatePatch(itemToPatch);

    if (!patchedItem) {
      throw new InternalServerErrorException();
    }

    return patchedItem;
  }

}