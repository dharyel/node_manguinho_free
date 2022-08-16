import { IHttpResponse } from '../../shared/ihttp-response'
import { MissingParamError } from './missing-param-error'

export class HttpResponse {
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
}
