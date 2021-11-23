import { server } from "../common"

export const putUser = async (data) => {
    return (
        await fetch(server + 'profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    )
}