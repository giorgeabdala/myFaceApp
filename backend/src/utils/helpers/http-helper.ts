export interface HttpResponse {
    statusCode: number
    success: boolean,
    body: any
}

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    success: true,
    body: data
})

export const forbidden = (error: string): HttpResponse => ({
    statusCode: 403,
    success: false,
    body: error
})

export const badRequest = (error: string): HttpResponse => ({
    statusCode: 400,
    success: false,
    body: error
})

export const serverError = (error: string): HttpResponse => ({
    statusCode: 500,
    success: false,
    body: error
})