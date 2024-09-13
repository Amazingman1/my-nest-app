import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ImgModule } from './img/img.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, ImgModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
