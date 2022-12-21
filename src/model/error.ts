
export class ProfileNotFoundError extends Error {

    constructor(name: string) {
        super(`Profile with name ${name} does not exists!`)
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ProfileNotFoundError.prototype)
    }
}

export class ProfileAlreadyExistsError extends Error {

    constructor(name: string) {
        super(`Profile with name ${name} already exists!`)
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ProfileAlreadyExistsError.prototype)
    }
}

export class ProfileCannotBeDeletedError extends Error {

    constructor(name: string) {
        super(`Profile with name ${name} cannot be deleted!`)
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ProfileCannotBeDeletedError.prototype)
    }
}
