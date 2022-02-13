import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwerk roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any): void {
    this.coffees.push({
      id: this.coffees[this.coffees.length - 1].id + 1,
      ...createCoffeeDto,
    });
  }

  update(id: string, updateCoffeeDto: any): void {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      //update coffee
      for (const key in updateCoffeeDto) {
        existingCoffee[key] = updateCoffeeDto[key];
      }
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex !== -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
