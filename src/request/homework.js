import { server } from "../common"

const homeworkUrl = `${server}homework`

export const putHomeworkValue = async (lessonId, studentId, homeworkId, value) => {
    const responce = await fetch(`${homeworkUrl}/${lessonId}/${studentId}/${homeworkId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value })
    })

    // console.log(await (responce.json()))

    if (!(responce && responce.status === 200)) throw new Error('Cannot set the value');

    return responce
}

export const postHomeworks = async(lessonId, title='', description='', base=0, limitDate='', percent=0) => {
    const responce = await fetch(`${homeworkUrl}/${lessonId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  
            title,
            description,
            base,
            limitDate,
            percent,
        })
    })

    if (!(responce && responce.status === 200)) throw new Error('Cannot set the value');

    return responce;
}
