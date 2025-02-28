import {Body, Controller, Get, Inject, Post, Req, UseGuards} from '@nestjs/common';
import {NATS_SERVICE} from "../config";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError} from "rxjs";
import {LoginUserDto, RegisterUserDto} from "./dto";
import {AuthGuard} from "./guards/auth.guard";
import {User} from "./decorators";
import {CurrentUser} from "./interfaces/current-user.interface";
import {Token} from "./decorators";


@Controller('auth')
export class AuthController {
    constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.natsClient.send('auth.login.user', loginUserDto).pipe(
            catchError((err) => {
                throw new RpcException(err);
            }),
        );
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.natsClient.send('auth.register.user', registerUserDto).pipe(
            catchError((err) => {
                throw new RpcException(err);
            }),
        );
    }

    @UseGuards(AuthGuard)
    @Get('verify')
    verify(@User() user: CurrentUser, @Token() token: string) {
        // console.log(user);
        return {user, token};
        // console.log(req['token']);
        // return this.natsClient.send('auth.verify.user', {}).pipe(
        //     catchError((err) => {
        //         throw new RpcException(err);
        //     }),
        // );
    }
}
