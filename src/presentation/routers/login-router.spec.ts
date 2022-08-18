import { IHttpRequest } from '../../shared/ihttp-request'
import { MissingParamError } from '../helpers/missing-param-error'
import { LoginRouter } from './login-router'

const makeSut = () => {
    class AuthUseCaseSpy {
        email: string = ''
        password: string = ''

        auth (email: string, password: string) {
            this.email = email
            this.password = password
        }
    }

    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)

    return {
        sut,
        authUseCaseSpy
    }
}

describe('Login Router', () => {
    test('Should return 400 if no e-mail is provided', () => {
    // 400 = bad request
    // sut = system under test. É quem está sendo testado
    // nesse caso, sut seria o loginRouter
        const { sut } = makeSut()
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
        const { sut } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com'
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new MissingParamError('password'))
    })

    test('Should call AuthUseCase with correct params', () => {
        const { sut, authUseCaseSpy } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        sut.route(httpRequest)
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    })

    test('Should return 401 when invalid credentials are provided', () => {
        const { sut } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(401)
    })
})
