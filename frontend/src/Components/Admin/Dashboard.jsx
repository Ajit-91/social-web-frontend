import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../Redux/Slices/userSlice';
import { selectUser } from '../../Redux/Slices/userSlice';

const Dashboard = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <>
            <h1>Hello {user?.name} !!</h1>
            <Button 
                onClick={()=>dispatch(LOGOUT())}
            >
                Logout
            </Button>
        </>
    )
}

export default Dashboard;
