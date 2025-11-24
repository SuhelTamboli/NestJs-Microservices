import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/emp.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmpService {
  //D.I of repo into service layer
  constructor(
    @InjectRepository(Employee)
    private empRepo: Repository<Employee>,
  ) {}

  //create Emp
  async createEmployee(emp: CreateEmployeeDto) {
    try {
      const employee = await this.empRepo.save(emp);

      if (employee)
        return {
          employee,
          message: 'employee created successfully',
          statusCode: 200,
        };
    } catch (error) {
      // 🔥 MySQL duplicate email error
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Email already exists, please use a different email',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Employee creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //get all emps
  async getAllEmployees() {
    try {
      const employees = await this.empRepo.find();
      return {
        employees,
        message: 'employees fetched successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(
        'Fetching Employees failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //delete emp
  async deleteEmployee(id: number) {
    try {
      const deletedEmployee = await this.empRepo.delete(id);
      return {
        deletedEmployee,
        message: 'employee deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(
        'Deleting Employee failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //update emp
  async updateEmployeeDetails(empid: number, emp: CreateEmployeeDto) {
    try {
      const result = await this.empRepo.update({ empid }, emp);

      // If no rows were updated → employee does NOT exist
      if (result.affected === 0) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      // Fetch the updated employee (optional)
      const updatedEmployee = await this.empRepo.findOneBy({ empid });

      return {
        updatedEmployee,
        message: 'Employee details updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // rethrow known error
      }

      throw new HttpException(
        'Updating Employee failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
