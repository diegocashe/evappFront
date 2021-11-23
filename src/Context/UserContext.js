import  {createContext} from 'react'

export const defaultContext = {
    user:{
       
        id: null,
        firstName: null,
        lastName:null,
        email: null,
        password: null,
        state: null,
        lastAccess: null,
        userType:null,
        //optional values
        phone:null,
        mobile:null,
        address:null,
        city:null,
        country:null,
        zip:null,
        code:null,
        birthday:null,
        passport:null,
        photo:null,
        ci:null,
        rate:null,
    },
    setUser:()=>{}
}

export const UserContext = createContext(defaultContext)

