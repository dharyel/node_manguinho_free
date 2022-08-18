import { IHttpResponse } from '../../shared/ihttp-response'
import { MissingParamError } from './missing-param-error'
import { UnauthorizedError } from './unauthorized-error copy'
export class HttpResponse {
    static ok (data: any) {
        const response: IHttpResponse = {
            statusCode: 200,
            body: data
        }

        return response
    }

    static badRequest (paramName: string) {
        const response: IHttpResponse = {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }

        return response
    }

    static serverError () {
        const response: IHttpResponse = {
            statusCode: 500,
            body: new MissingParamError('serverError')
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
