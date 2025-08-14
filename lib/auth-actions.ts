"use server"
import {signIn , signOut } from '@/auth'

export const login = async () => {
    return await signIn("google" , {redirectTo : "/"})
}
export const loginWithGithub = async () => {
    return await signIn("github", {redirectTo : "/"})    
}   

export const loginWithGoogle = async () => {
    return await signIn("google", {redirectTo : "/"})
}

export const logout = async () => {
    return await signOut({redirectTo : "/"})
}