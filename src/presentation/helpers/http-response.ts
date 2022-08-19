import { IHttpResponse } from '../../shared/ihttp-response'
import { ServerError, UnauthorizedError } from '../errors'

export class HttpResponse {
    static ok (data: any) {
        const response: IHttpResponse = {
            statusCode: 200,
            body: data
        }

        return response
    }

    static badRequest (error: any) {
        const response: IHttpResponse = {
            statusCode: 400,
            body: error
        }

        return response
    }

    static serverError () {
        const response: IHttpResponse = {
            statusCode: 500,
            body: new ServerError()
        }

        return response
    }

    static unauthorizedError () {
        return {
            statusCode: 401,
            body: new UnauthorizedError()
        }
    }
}
