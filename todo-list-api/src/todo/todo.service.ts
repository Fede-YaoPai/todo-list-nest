import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.interface";
import { CryptoService } from "src/utils/crypto.service";

@Injectable()
export class TodoService {

  constructor(private cryptoService: CryptoService) {}

  private storage: Array<Todo> = [];

  public getAll(): Array<Todo> {
    return this.storage;
  }

  public getById(id: string): Todo | undefined {
    return this.storage.find((item: Todo) => item.id === id);
  }

  public add(itemToAdd: Todo): Todo {
    const newItemWithId: Todo = {
      ...itemToAdd,
      id: this.cryptoService.getRandomUUID()
    };

    this.storage.push(newItemWithId);

    return newItemWithId;
  }

  public delete(id: string): Todo | undefined {
    const indexToDelete: number = this.storage.findIndex((item: Todo) => item.id === id);

    if (indexToDelete > -1 && indexToDelete < this.storage.length) {
      return this.storage[indexToDelete];
    }

    return undefined;
  }

  public updatePatch(itemToPatch: Todo): Todo | undefined {
    const itemIndex: number = this.storage.findIndex((item: Todo) => item.id === itemToPatch.id);
    const itemFromStorage: Todo | undefined = this.storage[itemIndex];

    if (itemIndex === -1 || !itemFromStorage) {
      return undefined;
    } 

    this.storage[itemIndex] = {
      ...itemFromStorage,
      ...itemToPatch
    };

    return itemFromStorage;
  } 

}