import { server } from "../common"

const url = `${server}lessons`

export const lessonsByTeacher = async (data = { userId: '' }) => {
    const responce = await fetch(server + 'lessons/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!(responce && responce.status === 200)) throw new Error('cannot get the lessons');

    return responce
}

export const lessonsSelected = async (lessonId) => {
    const responce = await fetch(server + 'lessons/teacher/' + lessonId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (!(responce && responce.status === 200)) throw new Error('cannot get the lessons');

    return responce
}

export const createLesson = async (lesson) => {
    const responce = await fetch(server + 'lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson)
    })

    if (!(responce && responce.status === 200)) throw new Error('cannot get the lessons');

    return responce
}

export const signLesson = async (userId, code) => {
    const responce = await fetch(`${url}/student/${userId}/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!(responce && responce.status === 200)) throw new Error('Cannot set the value');

    return responce;
}

export const getLessonsByStudent = async (userId) => {
    const responce = await fetch(`${url}/student/${userId}`, {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!(responce && responce.status === 200)) throw new Error('Cannot get the lessons');

    return responce;
}

