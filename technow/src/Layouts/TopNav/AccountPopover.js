import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props; 
   // const {user, setUser} = useContext(AuthContext)
  // const navigate = useNavigate();
// const handlelogOut = async () =>{
//   try {
//      await apiCall({
//      url: "/api/users/logout",
//      method: "post",
//    });
//    setUser(null)
//    toast.success("Logged out Successfully!")
//    navigate('/')

//  } catch (error) {
//    console.log(error);


//  }
// }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          UserName
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {/* {user?.userName} */}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
         <MenuItem >
         <Link  style={{
          textDecoration:'none',
          color:"black",
        }}to='/profile'>Profile</Link>
        </MenuItem>

        <MenuItem >
         <Link  style={{
          textDecoration:'none',
          color:"#119c59",
        }}to='/login'>Log in</Link>
        </MenuItem>

        {/* onClick={handlelogOut} */}
        <MenuItem sx={{
          color:"red",
        }} >
          Sign out
        </MenuItem>
        
      </MenuList>
    </Popover>
  );
};