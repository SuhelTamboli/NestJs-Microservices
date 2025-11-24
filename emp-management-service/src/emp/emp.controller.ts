import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmpService } from './emp.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('emp')
export class EmpController {
  constructor(private readonly empService: EmpService) {}

  @Post()
  createEmployee(@Body() emp: CreateEmployeeDto) {
    return this.empService.createEmployee(emp);
  }

  @Get()
  fetchAllEmployees() {
    return this.empService.getAllEmployees();
  }

  @Post(':id')
  deleteEmployeeById(@Param('id') id: number) {
    return this.empService.deleteEmployee(id);
  }

  @Patch(':empid')
  updateEmployee(
    @Param('empid') empid: number,
    @Body() emp: CreateEmployeeDto,
  ) {
    return this.empService.updateEmployeeDetails(empid, emp);
  }
}
