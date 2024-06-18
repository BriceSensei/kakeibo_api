import { faker } from "@faker-js/faker";

export class Helper {
  static getRandomFromArray(list: Array<any>): any {

    const randomEntityNumber: number = faker.number.int({
      min: 1,
      max: list.length - 1,
    });
    
    return list[randomEntityNumber];
  }
}
