import { server } from "../common"

export const auth = async (data = { email: '', password: '' }) => {
    const responce = await fetch(server + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!(responce && responce.status === 200)) throw new Error('cannot resolve the auth');

    return responce
}

export const signIn = async ({ firstName = '', lastName = '', email = '', password = '', userType = 0, state=false }) => {
    const responce = await fetch(server+'signin',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            userType,
            state
        }
        )
    })

    if (!(responce && responce.status === 200)) throw new Error('cannot resolve the auth');

    return responce
}