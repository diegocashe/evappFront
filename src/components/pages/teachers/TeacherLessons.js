import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from "react-router-dom";

import { Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { letterSpacing } from '@mui/system';

const mockdata = [
    {
        title: 'titulo 1 mock',
        description: 'descriptiondescriptiond escriptiondescriptiond escriptiondescriptiondescr iptiondescriptiondescription',
        id: '0',
        teacher: 0,
        duration: '1 mes'
    },
    {
        title: 'titulo 2 mock',
        description: 'descriptiondescripti ondescriptiondescriptiond escriptiondescriptiondescriptionde scriptiondescription',
        id: '1',
        teacher: 0,
        duration: '2 mes'
    },
    {
        title: 'titulo 3 mock',
        description: 'descriptiondescriptiondescriptiondescription descriptiondescriptiondescript iondescriptiondescription',
        id: '2',
        teacher: 0,
        duration: '3 mes'
    }
]


const LessonCard = ({ title, description, id = '', teacher, duration }) => {
    return (<>
        <Card sx={{ background: '#dbd8e3' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {duration}
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
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={id} size="small">Ingresar a la clase</Button>
            </CardActions>
        </Card>
    </>
    )
}

export const TeacherLessons = () => {

    const params = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        console.log(params)
    }, [params])

    if (params.lessonId === undefined) {
        return (
            <Stack>
                <Typography variant='h4' color='#dbd8e3' mb={1}>Clases en curso</Typography>
                <Grid container spacing={2}>
                    {
                        mockdata.map((e, i) =>
                            <Grid item xs={12} md={6}>
                                <LessonCard
                                    title={e.title}
                                    description={e.description}
                                    id={e.id}
                                    teacher={e.teacher}
                                    duration={e.duration}
                                />
                            </Grid>)
                    }
                </Grid>
            </Stack>
        )
    }
    if (params.lessonId !== undefined) {
        return (
            <>

            </>
        )
    }

}
