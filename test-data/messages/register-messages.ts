//create enum for register messages in tests register.spec.ts
export enum RegisterMessages {
    SUCCESS_REGISTRATION = 'Account was successfully created. Welcome!',
    PASSWORDS_DO_NOT_MATCH = 'The passwords do not match.',
    EMPTY_VALUE_MESSAGE = 'Please fill out this field.',
    INVALID_EMAIL_MESSAGE = 'Please include an \'@\' in the email address. \'invalidEmailFormat\' is missing an \'@\'.',
    EMPTY_VALIDITY = 'valueMissing',
    TYPE_MISMATCH_VALIDITY = 'typeMismatch'
}