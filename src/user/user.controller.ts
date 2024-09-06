/*
 * @Author: wangxuan wangxuan
 * @Date: 2024-08-16 14:58:22
 * @LastEditors: wangxuan wangxuan
 * @LastEditTime: 2024-08-19 16:19:22
 * @FilePath: /my-nest-app/src/user/user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

type LoginDto = {
  username: string;
  password: string;
  captcha: string;
  code: string;
};

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCaptcha(@Req() req: any, @Res() res: any) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: any) {
    const { username, password, code } = loginDto;
    if (req.session.code.toLowerCase() !== code.toLowerCase()) {
      return {
        code: 1,
        msg: '验证码错误',
      };
    } else {
      console.log(username, password);
      return {
        code: 200,
        msg: '登录成功',
      };
    }
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { code: 200, data: createUserDto };
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Headers() header: any) {
    console.log(header);
    return { code: 200 };
    // return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
