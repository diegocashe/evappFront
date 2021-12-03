import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from "react-router-dom";

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
import { getLessonsByStudent, signLesson } from '../../../request/lessons';
import { useUser } from '../../../Hooks/useUser'

export const Lessons = ({ setAlert }) => {
    const user = useUser()

    const params = useParams();

    const [lessons, setLessons] = useState({
        "lessons": [
            {
                "id": "f04c2b28-da12-4fe0-83c5-df8f51633af9",
                "teacherId": "e0e38270-2757-409b-b6c0-3cad6213b0b1",
                "name": "ASP Learning",
                "duration": "2 meses",
                "description": "aprender asp. net de la manera mas sencilla e interactiva posible",
                "code": "00000",
                "createdAt": "2021-12-03T03:06:22.000Z",
                "updatedAt": "2021-12-03T03:06:22.000Z"
            }
        ]
    })
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState('')

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    const handleOnSubmit = async () => {
        try {
            const responce = await signLesson(user.user.id, code)
            const body = await responce.json()
            setAlert(body.message, 'success')
        } catch (e) {
            setAlert('Ups error: ' + e.message, 'error')
        }
        setOpen(false)
    }

    useEffect(() => {
        const body = getLessonsByStudent(user.user.id)
        body
            .then(e => e.json())
            .then(e => setLessons({...lessons, lessons: [...e.lessons] }))
            .catch(e => setAlert('Ups error: ' + e.message, 'error'));
    }, [])
    

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Evaluación</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        onChange={(e) => { setCode(e.target.value) }}
                        id="code"
                        label="Código de la clase"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleOnSubmit} >Inscribirse</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction='row'>
                        <Typography variant='h4' color='#dbd8e3' mb={1} sx={{ flexGrow: 1 }}>Clases</Typography>
                        <Button variant='contained' onClick={handleClickOpen}>Unirse a una clase</Button>
                    </Stack>
                </Grid>

                {lessons.lessons.map(e => <Grid item xs={12} sm={6} key={e.id}>
                        <Card sx={{ background: '#dbd8e3' }}>
                            <CardContent>
                                <Typography variant="h5">{e.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </>

    )
}
