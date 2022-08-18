import { IHttpRequest } from '../../shared/ihttp-request'
import { IHttpResponse } from '../../shared/ihttp-response'
import { MissingParamError } from '../helpers/missing-param-error'
import { UnauthorizedError } from '../helpers/unauthorized-error'
import { ServerError } from '../helpers/server-error'
import { LoginRouter } from './login-router'
import { InvalidParamError } from '../helpers/invalid-param-error'

const makeSut = () => {
    const authUseCaseSpy = makeAuthUseCase()
    authUseCaseSpy.accessToken = 'valid_token'

    const emailValidatorSpy = makeEmailValidator()
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

    return {
        sut,
        authUseCaseSpy,
        emailValidatorSpy
    }
}

const makeEmailValidator = () => {
    class EmailValidatorSpy {
        isEmailValid: any

        isValid (email: string) {
            return this.isEmailValid
        }
    }

    const emailValidatorSpy = new EmailValidatorSpy()
    emailValidatorSpy.isEmailValid = true

    return emailValidatorSpy
}

const makeAuthUseCase = () => {
    class AuthUseCaseSpy {
        email: string = ''
        password: string = ''
        accessToken: string | null = null

        async auth (email: string, password: string) {
            this.email = email
            this.password = password
            return this.accessToken
        }
    }

    return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
    class AuthUseCaseSpy {
        email: string = ''
        password: string = ''
        accessToken: string | null = null

        async auth (email: string, password: string) {
            throw new Error()
        }
    }

    return new AuthUseCaseSpy()
}

describe('Login Router', () => {
    test('Should return 200 when valid credentials are provided', async () => {
        const { sut, authUseCaseSpy } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        const httpResponse = await sut.route(httpRequest) as IHttpResponse

        expect(httpResponse?.statusCode).toBe(200)
        expect(httpResponse?.body?.accessToken).toBe(authUseCaseSpy.accessToken)
    })

    test('Should return 400 if no e-mail is provided', async () => {
    // 400 = bad request
    // sut = system under test. É quem está sendo testado
    // nesse caso, sut seria o loginRouter
        const { sut } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                password: 'any_password'
            }
        }

        const httpResponse = await sut.route(httpRequest) as IHttpResponse

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', async () => {
        // 400 = bad request
        // sut = system under test. É quem está sendo testado
        // nesse caso, sut seria o loginRouter
        const { sut } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com'
            }
        }

        const httpResponse = await sut.route(httpRequest) as IHttpResponse

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new MissingParamError('password'))
    })

    test('Should call AuthUseCase with correct params', async () => {
        const { sut, authUseCaseSpy } = makeSut()
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        await sut.route(httpRequest)
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    })

    test('Should return 401 when invalid credentials are provided', async () => {
        // 401 = unauthorized = não possui credenciais de autenticação válidas
        // 403 = Forbidden = possui credenciais de autenticação válidas, mas o acesso não foi permitido. Ex: recursos só para Admin
        const { sut, authUseCaseSpy } = makeSut()
        authUseCaseSpy.accessToken = null
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(401)
        expect(httpResponse?.body).toEqual(new UnauthorizedError())
    })

    test('Should return 500 if AuthUseCase has no auth method', async () => {
        const sut = new LoginRouter({}, makeEmailValidator())
        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(500)
        expect(httpResponse?.body).toEqual(new ServerError())
    })

    test('Should return 500 if AuthUseCase throws', async () => {
        const authUseCaseSpy = makeAuthUseCaseWithError()
        authUseCaseSpy.accessToken = 'valid_token'

        const emailValidatorSpy = makeEmailValidator()

        const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(500)
    })

    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorSpy } = makeSut()
        emailValidatorSpy.isEmailValid = false

        const httpRequest: IHttpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }

        const httpResponse = await sut.route(httpRequest) as IHttpResponse

        expect(httpResponse?.statusCode).toBe(400)
        expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
    })
})
