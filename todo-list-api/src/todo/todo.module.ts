import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { CryptoService } from "src/utils/crypto.service";

@Module({
  controllers: [
    TodoController
  ],
  providers: [
    TodoService,
    CryptoService
  ]
})
export class TodoModule {}