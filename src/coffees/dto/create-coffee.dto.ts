import { IsString } from 'class-validator';

// if the request hits our endpoint with invalid properties in the body
// the app will automatically respond with 400 bad request
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
