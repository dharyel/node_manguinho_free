import validator from 'validator'

class EmailValidator {
    isValid (email: string) {
        return validator.isEmail(email)
    }
}

const makeSut = () => {
    return new EmailValidator()
}

describe('E-mail validator', () => {
    test('Should return true if validator returns true', () => {
        const sut = makeSut()
        const isEmailValid = sut.isValid('valid_email@mail.com')

        expect(isEmailValid).toBe(true)
    })

    test('Should return false if validator returns false', () => {
        const sut = makeSut()
        const isEmailValid = sut.isValid('invalid_email@')

        expect(isEmailValid).toBe(false)
    })
})
