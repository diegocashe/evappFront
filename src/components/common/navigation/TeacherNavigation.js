// icons

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';

export const TeacherNavigationData = [
  {
    name:'Dashboard',
    icon: <DashboardIcon/>,
    to:'dashboard',
  },
  {
    name:'Clases',
    icon: <ClassIcon/>,
    to:'lessons',
  },
  {
    name:'Perfil',
    icon: <AccountBoxIcon/>,
    to:'profile',
  },
  
]