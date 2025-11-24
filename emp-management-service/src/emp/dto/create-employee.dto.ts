import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only digits' })
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(Male|Female|Other)$/i, {
    message: 'Gender must be Male, Female, or Other',
  })
  gender: string;

  @ApiProperty()
  @IsDateString({}, { message: 'DOB must be in YYYY-MM-DD format' })
  dob: string;

  @ApiProperty({ minimum: 18 })
  @IsNumber()
  @Min(18, { message: 'Age must be 18 or above' })
  age: number;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Salary must be positive' })
  salary: number;
}
