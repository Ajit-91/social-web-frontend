import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectUser } from './Redux/Slices/userSlice';
import { useSelector } from "react-redux"
import Auth from './Layouts/Auth';
import Admin from './Layouts/Admin';
import { useEffect } from 'react';
import { SET_USER } from './Redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { fetchUser } from "./API/Auththentication"
import { useState } from 'react';
import Loading from './Components/Loading';
import "./pageStyles/app.css"
const App = () => {
  // state => state.user.user
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const storeUser = async () => {
      try {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          const userData = await fetchUser(JSON.parse(localUser))
          console.log("app",userData)
          if(userData){
            dispatch(SET_USER(userData));
            setLoading(false);
          }
        }
        else{
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
  
    }
  
    storeUser();
  }, [dispatch])

  return loading ? <Loading />  :  (
    <>
      {user ? <Admin /> : <Auth />}
    </>
  )
}

export default App
