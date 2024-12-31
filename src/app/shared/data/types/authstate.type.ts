import { User } from "firebase/auth"

export type TAuthUser =  User | undefined | null;

export type TAuthState = {
 user : TAuthUser
}