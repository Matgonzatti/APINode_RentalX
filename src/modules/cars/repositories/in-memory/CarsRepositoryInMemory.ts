import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({ name, license_plate, category_id, brand, fine_amount, daily_rate, description }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name, 
      license_plate, 
      category_id, 
      brand, 
      fine_amount, 
      daily_rate, 
      description,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory }