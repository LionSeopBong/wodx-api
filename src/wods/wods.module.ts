import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WodsController } from './wods.controller';
import { WodsService } from './wods.service';
import { Wod } from './wod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wod])],
  controllers: [WodsController],
  providers: [WodsService],
  exports: [WodsService],
})
export class WodsModule {}
