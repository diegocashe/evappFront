import React, { useState, useEffect } from 'react'
import { Grid, Stack, Typography, Card, CardContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { server } from '../../../common';
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import { postHomeworks, putHomeworkValue } from '../../../request/homework';

const lessonStateModel = {
    lesson: { id: "", teacherId: "", name: "", duration: "", description: "", code: "", createdAt: "", updatedAt: "" },
    studentHomeworks: [
        {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                state: false,
                lastAccess: "",
                userType: 1,
                phone: "",
                mobile: "",
                address: "",
                city: "",
                country: "",
                zip: "",
                code: "",
                birthday: "",
                passport: "",
                photo: "",
                ci: "",
                rate: "",
                createdAt: "",
                updatedAt: ""
            },
            homeworks: [
                {
                    id: "",
                    lessonStudentId: "",
                    title: "",
                    description: "",
                    limitDate: "",
                    percent: 0,
                    base: 0,
                    value: 0,
                    file: "",
                    createdAt: "",
                    updatedAt: ""
                }
            ]
        }
    ]
}

const HomeworkCard = ({ title = '', description = '', to = '', btn = true }) => {
    return (
        <Card sx={{ background: '#2a2438' }}>
            <CardContent sx={{ color: '#dbd8e3' }}>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
                <CardActions>
                    {(btn) && <Button variant="contained" component={RouterLink} to={to}>Entrar</Button>}
                </CardActions>
            </CardContent>
        </Card>
    )
}

export const Homework = ({ setAlert }) => {
    const { lessonId, studentId, homeworkId } = useParams();

    const [lesson, setLesson] = useState(lessonStateModel)
    const [selectedStudent, setSelectedStudent] = useState(lessonStateModel.studentHomeworks[0])
    const [selectedHomework, setSelectedHomework] = useState(lessonStateModel.studentHomeworks[0].homeworks[0])
    const [homeworkToCreate, setHomeworkToCreate] = useState({})
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState(0)

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    const handleOnSubmitNote = async () => {
        try {
            if (note < 0 || note > 20) throw new Error('La nota no es válida ingrese un valor entre 0-20')
            const res = await putHomeworkValue(lessonId, studentId, homeworkId, note)
            setAlert('Actualizado con éxito', 'success')
        } catch (e) {
            setAlert('Ups error: ' + e.message, 'error')
        }
        setOpen(false)
    }
    const handleOnSubmitHomework = async () => {
        try {
            const {
                title,
                description,
                base,
                limitDate,
                percent } = homeworkToCreate;

            const responce = await postHomeworks(lessonId, title, description, base, limitDate, percent);
            await responce.json()
            setAlert('Actualizado con éxito', 'success')
        } catch (e) {
            setAlert('Ups error: ' + e.message, 'error')
        }
        setOpen(false)
    }
    const handleOnChange = (e) => {
        setHomeworkToCreate({ ...homeworkToCreate, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        fetch(server + 'homework/' + lessonId)
            .then(data => data.json())
            .then(data => setLesson({ ...setLesson, ...data }))
            .catch(e => {
                if (e instanceof Error) {
                    setAlert('Ups error: ' + e.message, 'error')
                }
            })
    }, [lessonId])

    useEffect(() => {
        if (studentId !== undefined) {
            const student = lesson.studentHomeworks.reduce((acc, act) => {
                if (act.user.id === studentId) acc = act;
                return acc
            }, null)
            setSelectedStudent({ ...selectedStudent, ...student })
        }
    }, [studentId, lesson.studentHomeworks])

    useEffect(() => {
        if (homeworkId !== undefined) {
            const homework = selectedStudent.homeworks.reduce((acc, act) => {
                if (act.id === homeworkId) acc = act;
                return acc
            }, null)
            setSelectedHomework({ ...selectedHomework, ...homework })
        }
    }, [homeworkId, selectedStudent,])

    if (lessonId === undefined) return <Navigate to='/panel/lessons' />

    if (lessonId !== undefined && lesson.lesson.id !== undefined && studentId === undefined && homeworkId === undefined) {
        return (
            <Stack>
                <Dialog open={open} onClose={handleClose} fullWidth={true}>
                    <DialogTitle>Agredar tarea</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={(e) => { setHomeworkToCreate({ ...homeworkToCreate, [e.target.id]: e.target.value }) }}
                                    id="title"
                                    label="Titulo de tarea"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleOnChange}
                                    id="description"
                                    label="Descripción"
                                    variant="outlined"
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleOnChange}
                                    id="base"
                                    label="Nota en base a..."
                                    variant="outlined"
                                    type='number' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleOnChange}
                                    id="limitDate"
                                    label="Fecha límite"
                                    variant="outlined"
                                    type='date' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleOnChange}
                                    id="percent"
                                    label="Porcentage de nota final"
                                    variant="outlined"
                                    type='number'
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleOnSubmitHomework} >Actualizar</Button>
                    </DialogActions>
                </Dialog>
                <Stack direction='row' justifyContent='center' alignItems='center' my={1}>
                    <div style={{ flexGrow: 1 }}>
                        <Typography variant="h4" color='#dbd8e3'>{lesson.lesson.name}</Typography>
                        <Typography variant="overline" color='#dbd8e3'>tareas</Typography>
                    </div>
                    <div>
                        <Button variant='contained' onClick={handleClickOpen}>Agregar tarea</Button>
                    </div>
                </Stack>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent >
                                <Typography variant='h5'>Tareas asignadas</Typography>
                                <Stack spacing={1}>
                                    {
                                        lesson.studentHomeworks[0].homeworks.map((v, i) =>
                                            <HomeworkCard title={v.title} description={v.description} btn={false} key={i} />
                                        )
                                    }
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent>
                                <Typography variant='h5'>Alumnos</Typography>
                                <Stack spacing={1}>
                                    {
                                        lesson.studentHomeworks.map(v => {
                                            const t = v.user.firstName + ' ' + v.user.lastName;
                                            const d = `CI: ${v.user.ci}\nCorreo: ${v.user.email}`
                                            const to = `/panel/homework/${lessonId}/${v.user.id}`
                                            return <HomeworkCard title={t} description={d} to={to} key={v.user.id} />
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        )
    }

    if (lessonId !== undefined && lesson.lesson.id !== undefined && studentId !== undefined && homeworkId === undefined) {
        return (
            <Stack>
                <Typography variant="h4" color='#dbd8e3'>{`${selectedStudent.user.firstName || 'Alumno'} ${selectedStudent.user.lastName}`}</Typography>
                <Typography variant="overline" color='#dbd8e3'>TAREAS</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent >
                                <Typography variant='h5'>Pendientes</Typography>
                                <Stack spacing={1}>
                                    {
                                        selectedStudent.homeworks.map(v => {
                                            if (v.value === null) {
                                                return <HomeworkCard title={v.title} description={v.description} to={`${lessonId}/${studentId}/${v.id}`} key={v.id} />
                                            }
                                            return
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent>
                                <Typography variant='h5'>Completadas</Typography>
                                <Stack spacing={1}>
                                    {
                                        selectedStudent.homeworks.map(v => {
                                            if (v.value !== null) {
                                                return <HomeworkCard title={v.title} description={v.description} to={`${lessonId}/${studentId}/${v.id}`} key={v.id} />
                                            }
                                            return
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        )
    }

    if (lessonId !== undefined && lesson.lesson.id !== undefined && studentId !== undefined && homeworkId !== undefined) {
        return (
            <Stack>
                <Dialog open={open} onClose={handleClose} fullWidth={true}>
                    <DialogTitle>Evaluación</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            fullWidth
                            onChange={(e) => { setNote(e.target.value) }}
                            id="note"
                            label="Nota"
                            variant="outlined"
                            type='number' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleOnSubmitNote} >Actualizar</Button>
                    </DialogActions>
                </Dialog>

                <Typography variant="h4" color='#dbd8e3'>{`${selectedStudent.user.firstName || 'Alumno'} ${selectedStudent.user.lastName}`}</Typography>
                <Typography variant="overline" color='#dbd8e3'>TAREAS</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent >
                                <Typography variant='h5'>{selectedHomework.title}</Typography>
                                <Stack spacing={1}>
                                    <Typography variant='subtitle1'>{selectedHomework.description}</Typography>
                                    <Typography>{`Porcentaje: ${selectedHomework.percent}% de la nota final`}</Typography>
                                    <Typography>{`Corregido: ${(selectedHomework.value !== null) ? 'si' : 'no'}`}</Typography>
                                    <Typography>{`Nota: ${(selectedHomework.value !== null) ? selectedHomework.value : 'no'}`}</Typography>
                                    <Typography>Recurso de Evaluacion NO MANEJADO {selectedHomework.file}</Typography>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                {(selectedHomework.value === null) && <Button variant="contained" onClick={handleClickOpen} >Evaluar</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        )
    }
    return (
        <Stack sx={{ width: '100%', height: '70vh' }} alignItems='center' justifyContent='center'   >
            <CircularProgress sx={{ color: "#dbd8e3" }} />
        </Stack>
    )
}