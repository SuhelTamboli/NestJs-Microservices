import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmpService } from './emp.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('emp')
export class EmpController {
  constructor(private readonly empService: EmpService) {}

  @Post()
  @ApiOperation({ summary: 'create an employee' })
  createEmployee(@Body() emp: CreateEmployeeDto) {
    return this.empService.createEmployee(emp);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  fetchAllEmployees() {
    return this.empService.getAllEmployees();
  }

  @Post(':id')
  @ApiOperation({ summary: 'delete an employee' })
  deleteEmployeeById(@Param('id') id: number) {
    return this.empService.deleteEmployee(id);
  }

  @Patch(':empid')
  @ApiOperation({ summary: 'update an employee' })
  updateEmployee(
    @Param('empid') empid: number,
    @Body() emp: CreateEmployeeDto,
  ) {
    return this.empService.updateEmployeeDetails(empid, emp);
  }
}
