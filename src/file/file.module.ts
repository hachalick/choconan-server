import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/CategoryProduct.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from 'src/menu/menu.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { ImageEntity } from 'src/modules/entity/mysql/Image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryProductMenuEntity,
      UserEntity,
      ImageEntity,
    ]),
    MenuModule,
    JwtModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
