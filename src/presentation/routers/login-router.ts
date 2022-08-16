import { IHttpRequest } from '../../shared/ihttp-request'
import { IHttpResponse } from '../../shared/ihttp-response'
import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
    route (httpRequest: IHttpRequest) : IHttpResponse {
        if (!httpRequest || !httpRequest.body) {
            return HttpResponse.serverError()
        }
        const { email, password } = httpRequest.body

        if (!email) {
            return HttpResponse.badRequest('email')
        }

        if (!password) {
            return HttpResponse.badRequest('password')
        }

        return HttpResponse.serverError()
    }
}
