import { IHttpRequest } from '../../shared/ihttp-request'
import { HttpResponse } from '../helpers/http-response'
import { InvalidParamError, MissingParamError } from '../errors'

export class LoginRouter {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly authUseCase: any, private readonly emailValidator: any) {}

    async route (httpRequest: IHttpRequest) {
        try {
            const { email, password } = httpRequest.body

            if (!email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }

            if (!this.emailValidator.isValid(email)) {
                return HttpResponse.badRequest(new InvalidParamError('email'))
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
