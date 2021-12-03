import { server } from "../common"

const ResumeURL = `${server}resume`

export const getTeacherResume = async (userId) => {
    
      const responce =  await fetch(`${ResumeURL}/teacher/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
    const resp = await responce.json()
    return resp
}