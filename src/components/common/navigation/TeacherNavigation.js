// icons

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';

export const TeacherNavigationData = [
  {
    name:'Dashboard',
    icon: <DashboardIcon/>,
    to:'dashboard',
  },
  {
    name:'Perfil',
    icon: <AccountBoxIcon/>,
    to:'profile',
  },
  {
    name:'Clases',
    icon: <ClassIcon/>,
    to:'lessons',
  },
  {
    name:'Tareas',
    icon: <SchoolIcon/>,
    to:'homework',
  },
  
]