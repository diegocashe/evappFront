import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from "react-router-dom";
import { createLesson, lessonsByTeacher, lessonsSelected } from '../../../request/lessons';
import { useUser } from '../../../Hooks/useUser';

// material ui
import { Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
  } from '@mui/x-data-grid';

const LessonCard = ({ title, description, id = '', teacher, duration, code, btn = true }) => {
    return (<>
        <Card sx={{ background: '#dbd8e3' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {'Profesor: ' + teacher + ', duración: ' + duration}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {teacher}
                </Typography>
                <Typography variant="body2" p={1}>
                    {description}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {'Código de la clase: ' + code || ''}
                </Typography>
            </CardContent>
            <CardActions>
                {(btn) && <Button component={RouterLink} to={id} size="small">Ingresar a la clase</Button>}
            </CardActions>
        </Card>
    </>
    )
}

const CustomToolbar = () => {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

export const TeacherLessons = ({ setAlert }) => {

    const user = useUser().user
    const params = useParams();
    const [lessonByTeacher, setLessonByTeacher] = useState({ teacher: {}, lessons: [] });
    const [selectedLesson, setSelectedLesson] = useState({ lesson: {}, students: [] })
    const { lessons, teacher } = lessonByTeacher
    const [lessonToSend, setLessonToSend] = useState({ name: '', duration: '', description: '', code: '', userId: user.id, sended: false, id:'' })
    const [open, setOpen] = useState(false);

    // Effects
    useEffect(() => {
        if (params.lessonId === undefined) {
            setSelectedLesson({})
            lessonsByTeacher({ userId: user.id })
                .then(data => data.json())
                .then(data => setLessonByTeacher(data))
                .catch(e => {
                    if (e instanceof Error) {
                        setAlert('Ups error: ' + e.message, 'error')
                    }
                })
        }
        if (params.lessonId !== undefined) {
            lessonsSelected(params.lessonId)
                .then(data => data.json())
                .then(data => {
                    setSelectedLesson({
                        lesson: lessons.find(e => e.id === params.lessonId),
                        students: (Array.isArray(data) && data.length !== 0) ? data : []
                    })
                })
                .catch(e => {
                    if (e instanceof Error) {
                        setAlert('Ups error: ' + e.message, 'error')
                    }
                })
        }
    }, [params.lessonId, lessonToSend.sended])


    // Handlers    
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const handleOnChange = async (e) => { setLessonToSend({ ...lessonToSend, [e.target.id]: e.target.value }) }

    const handleOnSubmit = async () => {
        try {
            if (lessonToSend.name === '') throw new Error("Title its empty");
            if (lessonToSend.duration === '') throw new Error("Duration it's empty")
            if (lessonToSend.description === '') throw new Error("Description it's empty")
            if (lessonToSend.code === '') throw new Error("Code it's empty")
            const responce = await (await createLesson({ ...lessonToSend })).json();
            setAlert('Clase creada con exito', 'success')
            setOpen(false)
            setLessonToSend({ ...lessonToSend, sended: true, id: responce.id })
        } catch (e) {
            if (e instanceof Error) {
                setAlert('Ups error: ' + e.message, 'error')
                console.log(e)  
            }
        }
    }

    if (params.lessonId === undefined) {
        return (
            <Stack>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
                    <DialogTitle>Agregar una clase</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Titulo de la clase"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="duration"
                                    label="Duración de la clase"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Descripción"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="code"
                                    label="Código"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleOnChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOnSubmit}>Crear</Button>
                    </DialogActions>
                </Dialog>
                <Stack direction='row'>
                    <Typography variant='h4' color='#dbd8e3' mb={1} sx={{ flexGrow: 1 }}>Clases en curso</Typography>
                    <IconButton
                        sx={{ color: "#dbd8e3" }}
                        aria-label="Logout"
                        edge="start"
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>
                <Grid container spacing={2}>
                    {lessons.map((e, i) =>
                        <Grid item xs={12} md={6} key={e.id}>
                            <LessonCard
                                code={e.code}
                                title={e.name}
                                description={e.description}
                                id={e.id}
                                teacher={teacher.firstName + ' ' + teacher.lastName}
                                duration={e.duration}
                            />
                        </Grid>)}
                </Grid>
            </Stack>
        )
    }

    if (params.lessonId !== undefined && selectedLesson.lesson !== undefined) {

        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            {
                field: 'firstName',
                headerName: 'First name',
                width: 150,
            },
            {
                field: 'lastName',
                headerName: 'Last name',
                width: 150,
            },
            {
                field: 'email',
                headerName: 'email',
                width: 150,
            },
            {
                field: 'fullName',
                headerName: 'Full name',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
                valueGetter: (params) =>
                    `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
                    }`,
            },
        ];

        const e = selectedLesson.lesson;
        let rows = [];
        if (selectedLesson.students && selectedLesson.students.length !== 0) {
            rows = selectedLesson.students.map((e, i) => ({
                id: ++i,
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email

            }))
        }

        return (
            <>
                <Stack spacing={2}>
                    <Stack direction='row'> 
                        <Typography variant='h4' color='#dbd8e3' mb={1} sx={{ flexGrow: 1 }}>{e.name}</Typography>
                        <Button variant='contained' component={RouterLink} to={'/panel/homework/'+ params.lessonId}>Ver tareas</Button>
                    
                    </Stack>
                    <LessonCard
                        code={e.code}
                        title={e.name}
                        description={e.description}
                        id={e.id}
                        teacher={teacher.firstName + ' ' + teacher.lastName}
                        duration={e.duration}
                        btn={false}
                    />

                    <Card sx={{ background: '#dbd8e3' }}>
                        <CardContent>
                            <Typography variant="h5">Alumnos</Typography>
                            <div style={{ height: 400, width: '100%', background: '#dbd8e3', padding: '1em' }} >
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    components={{
                                        Toolbar: CustomToolbar,
                                      }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Stack>
            </>
        )
    }

    return (
        <Stack sx={{ width: '100%', height: '70vh' }} alignItems='center' justifyContent='center'   >
            <CircularProgress sx={{color:"#dbd8e3"}} />
        </Stack>
    )
}
