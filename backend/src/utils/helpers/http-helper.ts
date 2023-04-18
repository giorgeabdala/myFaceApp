import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(error: string) {
        super(
            {
                statusCode: HttpStatus.FORBIDDEN,
                success: false,
                body: error,
            },
            HttpStatus.FORBIDDEN,
        );
    }
}

export class BadRequestException extends HttpException {
    constructor(error: string) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                success: false,
                body: error,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}

export class ServerErrorException extends HttpException {
    constructor(error: string) {
        super(
            {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                body: error,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

export const okHttp = (data: any) => ({
    statusCode: HttpStatus.OK,
    success: true,
    body: data,
});

export const forbidden = (error: string) => {
    throw new ForbiddenException(error);
};

export const badRequest = (error: string) => {
    throw new BadRequestException(error);
};

export const serverError = (error: string) => {
    throw new ServerErrorException(error);
};
