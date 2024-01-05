import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
// import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
    const { logout, setUser,user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      // setUser(null);

      logout(); // Call the logout function from AuthContext
      navigate("/");
    } catch (error) {
      console.log("err from handle logout", error);
    }
  };
   useEffect(() => {
     const checkLoggedInUser = () => {
       const storedUser = localStorage.getItem("authUser");
       if (storedUser) {
         const parsedUser = JSON.parse(storedUser);
         setUser(parsedUser);
       }
     };

     checkLoggedInUser();
   }, [setUser]);

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
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">UserName</Typography>
        <Typography color="text.secondary" variant="body2">
          {/* {user?.userName} */}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/profile"
          >
            Profile
          </Link>
        </MenuItem>
        {!user && (
          <MenuItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#119c59",
              }}
              to="/login"
            >
              Log in
            </Link>
          </MenuItem>
        )}
        {/* onClick={handlelogOut} */}
        <MenuItem
          sx={{
            color: "red",
          }}
          type="submit"
          onClick={handleLogout}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
