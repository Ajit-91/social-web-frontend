import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/Slices/userSlice';
import { LOGOUT } from '../../Redux/Slices/userSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import "./navList.css"

export default function NavList({setShow}) {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser);

  const handleClickAway = ()=>{
    setShow(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
        <div className='navList shadow-lg'>
          <List >
            <ListItem disablePadding>
              <ListItemButton className='User_Info' >
                <div>
                  <h5>{user?.name}</h5>
                  <small>{user?.email}</small>
                </div>
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate(`/profile/${JSON.parse(localStorage.getItem("user"))}`)}>
                  <ListItemIcon>
                    <BsFillPersonFill />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>dispatch(LOGOUT())}>
                <ListItemIcon>
                  <FiLogOut />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
    </ClickAwayListener>
  );
}
