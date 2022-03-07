export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: File | null,
  token: string
}

export interface RegisterUser {
  email: string,
  displayName: string,
  password: string,
  passwordRepeat: string,
  avatar: File | null
}

export interface FieldError {
  message: string
}

export interface  RegisterError {
  error: {
    password: FieldError,
    email: FieldError,
    displayName: FieldError
  }
}
