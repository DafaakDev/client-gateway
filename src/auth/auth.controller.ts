import {Controller, Inject, Post} from '@nestjs/common';
import {NATS_SERVICE} from "../config";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError} from "rxjs";


@Controller('auth')
export class AuthController {
    constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {
    }

    @Post('login')
    login() {
        return this.natsClient.send('auth.login.user', {}).pipe(
            catchError((err) => {
                throw new RpcException(err);
            }),
        );
    }

    @Post('register')
    register() {
        return this.natsClient.send('auth.register.user', {}).pipe(
            catchError((err) => {
                throw new RpcException(err);
            }),
        );
    }

    @Post('verify')
    verify() {
        return this.natsClient.send('auth.verify.user', {}).pipe(
            catchError((err) => {
                throw new RpcException(err);
            }),
        );
    }
}
