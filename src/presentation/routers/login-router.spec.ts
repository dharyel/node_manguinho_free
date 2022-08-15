interface IHttpRequest {
    body: any;
}

interface IHttpResponse {
    statusCode: number;
    body: any;
}

class HttpResponse {
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

class LoginRouter {
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
    }
}

class MissingParamError extends Error {
    constructor (paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamError'
    }
}

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
