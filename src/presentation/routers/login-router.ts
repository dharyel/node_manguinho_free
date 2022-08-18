import { IHttpRequest } from '../../shared/ihttp-request'
import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly authUseCase: any) {}

    route (httpRequest: IHttpRequest) {
        try {
            const { email, password } = httpRequest.body

            if (!email) {
                return HttpResponse.badRequest('email')
            }

            if (!password) {
                return HttpResponse.badRequest('password')
            }

            const accessToken = this.authUseCase.auth(email, password)

            if (!accessToken) {
                return HttpResponse.unauthorizedError()
            }

            return HttpResponse.ok({ accessToken })
        } catch (error) {
            console.log(error)
            return HttpResponse.serverError()
        }
    }
}
