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
import "./navList.css"

export default function NavList() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser);

  return (
    <div className='navList shadow-lg'>
      <List >
        <ListItem disablePadding>
          <ListItemButton style={{pointerEvents : "none"}}>
            <div >
              <h5 className='user'>{user?.name}</h5>
              <small>user@gmail.com</small>
            </div>
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={()=>navigate("/profile")}>
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
  );
}
