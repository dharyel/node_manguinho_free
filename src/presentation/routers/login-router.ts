import { IHttpRequest } from '../../shared/ihttp-request'
import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly authUseCase: any) {}

    route (httpRequest: IHttpRequest) {
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

        this.authUseCase.auth(email, password)
    }
}
