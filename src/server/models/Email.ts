import emailValidator from "node-email-verifier"

// Representa um endereço de e-mail
class Email {
    public value: string

    constructor(value: string) {
        this.value = value
    }
}

async function CreateEmail(value: string): Promise<Email> {
    let valid = await emailValidator(value)

    if (valid) {
        return new Email(value)
    }

    throw new Error("Invalid e-mail address")
}

export { Email, CreateEmail }
