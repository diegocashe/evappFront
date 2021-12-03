import React, { useState, useEffect } from 'react'

//Material mui
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Rating
} from '@mui/material'
import { useUser } from '../../../Hooks/useUser'
import { getTeacherResume } from '../../../request/resume'

export const Dashboard = () => {
    const [resume, setResume] = useState({
        "dictedLessons": [
          {
            "id": "f04c2b28-da12-4fe0-83c5-df8f51633af9",
            "teacherId": "e0e38270-2757-409b-b6c0-3cad6213b0b1",
            "name": "ASP Learning",
            "duration": "2 meses",
            "description": "aprender asp. net de la manera mas sencilla e interactiva posible",
            "code": "00000",
            "createdAt": "2021-12-02T13:45:03.000Z",
            "updatedAt": "2021-12-02T13:45:03.000Z"
          }
        ],
        "homeworksByTeacher": [
          {
            "id": "037bd7c2-a7c5-4da2-8b86-aa9fdb7da1f2",
            "lessonStudentId": "a3186996-824e-4e59-88a2-b268eda5aaa3",
            "title": "Evaluacion II",
            "description": "Suba un ejercicio utilizando las estructuras condicionales",
            "limitDate": "2021-11-29T04:00:00.000Z",
            "percent": 10,
            "base": 20,
            "value": null,
            "file": null,
            "createdAt": "2021-12-02T13:45:03.000Z",
            "updatedAt": "2021-12-02T13:45:03.000Z"
          },
          {
            "id": "2739b04c-91ce-4262-abb0-5b08725bb76c",
            "lessonStudentId": "ed39682f-6492-465f-a87d-88bb2dc65b37",
            "title": "Evaluacion II",
            "description": "Suba un ejercicio utilizando las estructuras condicionales",
            "limitDate": "2021-11-29T04:00:00.000Z",
            "percent": 10,
            "base": 20,
            "value": null,
            "file": null,
            "createdAt": "2021-12-02T13:45:03.000Z",
            "updatedAt": "2021-12-02T13:45:03.000Z"
          },
          {
            "id": "6c9838fb-59bf-4903-88e6-9cd711043269",
            "lessonStudentId": "a3186996-824e-4e59-88a2-b268eda5aaa3",
            "title": "Evaluacion I",
            "description": "Suba un ejercicio utilizando los tipos de datos",
            "limitDate": "2021-11-25T04:00:00.000Z",
            "percent": 10,
            "base": 20,
            "value": null,
            "file": null,
            "createdAt": "2021-12-02T13:45:03.000Z",
            "updatedAt": "2021-12-02T13:45:03.000Z"
          },
          {
            "id": "e07af356-1413-477e-99f4-635bd0b56163",
            "lessonStudentId": "ed39682f-6492-465f-a87d-88bb2dc65b37",
            "title": "Evaluacion I",
            "description": "Suba un ejercicio utilizando los tipos de datos",
            "limitDate": "2021-11-25T04:00:00.000Z",
            "percent": 10,
            "base": 20,
            "value": null,
            "file": null,
            "createdAt": "2021-12-02T13:45:03.000Z",
            "updatedAt": "2021-12-02T13:45:03.000Z"
          }
        ],
        "homeworkState": {
          "aprobed": [],
          "reprobed": [],
          "pending": [
            {
              "id": "037bd7c2-a7c5-4da2-8b86-aa9fdb7da1f2",
              "lessonStudentId": "a3186996-824e-4e59-88a2-b268eda5aaa3",
              "title": "Evaluacion II",
              "description": "Suba un ejercicio utilizando las estructuras condicionales",
              "limitDate": "2021-11-29T04:00:00.000Z",
              "percent": 10,
              "base": 20,
              "value": null,
              "file": null,
              "createdAt": "2021-12-02T13:45:03.000Z",
              "updatedAt": "2021-12-02T13:45:03.000Z"
            },
            {
              "id": "2739b04c-91ce-4262-abb0-5b08725bb76c",
              "lessonStudentId": "ed39682f-6492-465f-a87d-88bb2dc65b37",
              "title": "Evaluacion II",
              "description": "Suba un ejercicio utilizando las estructuras condicionales",
              "limitDate": "2021-11-29T04:00:00.000Z",
              "percent": 10,
              "base": 20,
              "value": null,
              "file": null,
              "createdAt": "2021-12-02T13:45:03.000Z",
              "updatedAt": "2021-12-02T13:45:03.000Z"
            },
            {
              "id": "6c9838fb-59bf-4903-88e6-9cd711043269",
              "lessonStudentId": "a3186996-824e-4e59-88a2-b268eda5aaa3",
              "title": "Evaluacion I",
              "description": "Suba un ejercicio utilizando los tipos de datos",
              "limitDate": "2021-11-25T04:00:00.000Z",
              "percent": 10,
              "base": 20,
              "value": null,
              "file": null,
              "createdAt": "2021-12-02T13:45:03.000Z",
              "updatedAt": "2021-12-02T13:45:03.000Z"
            },
            {
              "id": "e07af356-1413-477e-99f4-635bd0b56163",
              "lessonStudentId": "ed39682f-6492-465f-a87d-88bb2dc65b37",
              "title": "Evaluacion I",
              "description": "Suba un ejercicio utilizando los tipos de datos",
              "limitDate": "2021-11-25T04:00:00.000Z",
              "percent": 10,
              "base": 20,
              "value": null,
              "file": null,
              "createdAt": "2021-12-02T13:45:03.000Z",
              "updatedAt": "2021-12-02T13:45:03.000Z"
            }
          ]
        }
      })
    const user = useUser()

    useEffect(() => {
        const rs = getTeacherResume(user.user.id)
            .then(responce => setResume(responce))
            // .then(res => console.log(resume))
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Typography variant='h4'>Materias dictadas:</Typography>
                        <Stack spacing={1}>
                            {resume.dictedLessons.map(e => 
                                <Typography variant='h6' key={e.id}>{e.name}</Typography>
                                )}
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Typography variant='h4'>Publicaciones hechas:</Typography>
                        <Stack spacing={1}>
                            NO MANEJADO
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Typography variant='h4'>Rendimiento en materias:</Typography>
                        <Stack spacing={1}>
                            <Typography variant='h6'>Aprobadas: {resume.homeworkState.aprobed.length}</Typography>
                            <Typography variant='h6'>Reprobadas: {resume.homeworkState.reprobed.length}</Typography>
                            <Typography variant='h6'>Pendientes: {resume.homeworkState.pending.length}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Stack spacing={1}>
                            <Typography variant='h5' textAlign='center'>Has evaluado un total de:</Typography>
                            <Typography variant='h4'textAlign='center'>{resume.homeworkState.aprobed.length + resume.homeworkState.reprobed.length}</Typography>
                            <Typography variant='h6'>Tareas en el tiempo que has utilizado la aplicación 😎😎</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Stack spacing={1}>
                            <Typography variant='h5' textAlign='center'>Tienes pendiente por evaluar un total de:</Typography>
                            <Typography variant='h4'textAlign='center'>{resume.homeworkState.pending.length}</Typography>
                            <Typography variant='h6'>Tareas, por favor evalualas lo mas pronto posible 😴🥱</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ background: '#dbd8e3' }}>
                    <CardContent >
                        <Typography variant='h4'>Valoracion:</Typography>
                        <Stack spacing={1}>
                            No manejada
                            <Rating name="read-only" readOnly />
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
