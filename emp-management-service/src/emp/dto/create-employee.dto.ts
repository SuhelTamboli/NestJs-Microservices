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
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only digits' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(Male|Female|Other)$/i, {
    message: 'Gender must be Male, Female, or Other',
  })
  gender: string;

  @IsDateString({}, { message: 'DOB must be in YYYY-MM-DD format' })
  dob: string;

  @IsNumber()
  @Min(18, { message: 'Age must be 18 or above' })
  age: number;

  @IsNumber()
  @Min(0, { message: 'Salary must be positive' })
  salary: number;
}
