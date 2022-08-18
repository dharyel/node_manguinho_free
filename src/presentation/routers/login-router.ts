import { IHttpRequest } from '../../shared/ihttp-request'
import { HttpResponse } from '../helpers/http-response'
import { MissingParamError } from '../helpers/missing-param-error'

export class LoginRouter {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly authUseCase: any) {}

    async route (httpRequest: IHttpRequest) {
        try {
            const { email, password } = httpRequest.body

            if (!email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }

            if (!password) {
                return HttpResponse.badRequest(new MissingParamError('password'))
            }

            const accessToken = await this.authUseCase.auth(email, password)

            if (!accessToken) {
                return HttpResponse.unauthorizedError()
            }

            return HttpResponse.ok({ accessToken })
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}
