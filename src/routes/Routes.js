import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { NotFound } from '../components/common/NotFound';
import About from '../components/pages/home/About';
import Home from '../components/pages/home/Home';
import Login from '../components/pages/home/Login';
import { UserContext } from '../Context/UserContext';
import { TeacherNavigationData } from '../components/common/navigation/TeacherNavigation';
import { AppMenu } from '../components/common/navigation/AppMenu';
import { Signin } from '../components/pages/home/Signin';
import { Profile } from '../components/common/Profile';
import { TeacherLessons } from '../components/pages/teachers/TeacherLessons';

const teachersPanel = ({setAlert}) => (
  <Route path="panel" element={<AppMenu title='Panel para profesores' menuData={TeacherNavigationData} />}>
    <Route path="dashboard" element={<h1>dash</h1>} />
    <Route path="lessons" element={<TeacherLessons />}>
      <Route path=":lessonId" element={<TeacherLessons />} />
    </Route>
    <Route path="profile" element={<Profile setAlert={setAlert}/>} />
  </Route>
)
const studentPanel = ({setAlert}) => (
  <Route path="panel" element={<AppMenu title='Panel para alumnos' menuData={TeacherNavigationData} />}>
    <Route path="dashboard" element={<h1>dash</h1>} />
    <Route path="profile" element={<Profile setAlert={setAlert}/>} />

  </Route>
)

export default function AppRoutes({ setAlert }) {
  const user = useContext(UserContext)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login setAlert={setAlert} />} />
      <Route path="signin" element={<Signin setAlert={setAlert} />} />
      {(user.user.userType === 0 || user.user.userType === '0') && teachersPanel({setAlert})}
      {(user.user.userType === 1 || user.user.userType === '1') && studentPanel({setAlert})}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
