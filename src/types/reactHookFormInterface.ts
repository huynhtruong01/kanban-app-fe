import { IAuthLogin, IAuthSignup } from './authInterface'

export type IRegisterRHF = IAuthLogin | IAuthSignup

export type INameRHF = IAuthLogin & IAuthSignup
