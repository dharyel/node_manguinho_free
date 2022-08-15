interface HttpRequest {
    body: any;
}

interface HttpResponse {
    statusCode: number;
}

class LoginRouter {
    route (httpRequest: HttpRequest) {
        if (!httpRequest.body.email || !httpRequest.body.password) {
            const httpResponse: HttpResponse = {
                statusCode: 400
            }
            return httpResponse
        }
    }
}

describe('Login Router', () => {
    test('Should return 400 if no e-mail is provided', () => {
    // 400 = bad request
    // sut = system under test. É quem está sendo testado
    // nesse caso, sut seria o loginRouter
        const sut = new LoginRouter()
        const httpRequest: HttpRequest = {
            body: {
                password: 'any_password'
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse?.statusCode).toBe(400)
    })

    test('Should return 400 if no password is provided', () => {
        // 400 = bad request
        // sut = system under test. É quem está sendo testado
        // nesse caso, sut seria o loginRouter
        const sut = new LoginRouter()
        const httpRequest: HttpRequest = {
            body: {
                email: 'any_email@mail.com'
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse?.statusCode).toBe(400)
    })
})