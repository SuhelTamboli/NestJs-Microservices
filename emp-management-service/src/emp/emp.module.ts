import { Module } from '@nestjs/common';
import { EmpService } from './emp.service';
import { EmpController } from './emp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/emp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmpController],
  providers: [EmpService],
})
export class EmpModule {}
