import { IHttpRequest } from '../../shared/ihttp-request'
import { MissingParamError } from '../helpers/missing-param-error'
import { LoginRouter } from './login-router'

describe('Login Router', () => {
    test('Should return 400 if no e-mail is provided', () => {
    // 400 = bad request
    // sut = system under test. É quem está sendo testado
    // nesse caso, sut seria o loginRouter
        const sut = new LoginRouter()
        const httpRequest: IHttpRequest = {
            body: {
                password: 'any_password'
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', () => {
        // 400 = bad request
        // sut = system under test. É quem está sendo testado
        // nesse caso, sut seria o loginRouter
        const sut = new LoginRouter()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com'
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new MissingParamError('password'))
    })
})
