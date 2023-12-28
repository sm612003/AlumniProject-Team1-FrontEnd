import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthContext';
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
          Account
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