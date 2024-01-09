import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import AddUserModal from "./addmodel";
import { Helmet } from "react-helmet";

const ManageUserTable = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/view-all");
      setUserList(response.data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);


  const handleAddUser = async (newUser) => {
    try {
      const formData = new FormData();
      Object.entries(newUser).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.post('http://localhost:5000/user/create', formData);

      if (response.status === 200) {
        fetchAllUsers();
        setShowUserForm(false);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete("http://localhost:5000/user/delete", {
        data: { id: userId },
      });

      if (response.status === 200) {
        fetchAllUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "dob",
      headerName: "Date of Birth",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.dob),
    },
    { field: "Link", headerName: "Link", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleDeleteUser(params.row.id)}
            style={{
              backgroundColor: "#e32751",
              color: "white",
            }}
          >
            Delete
          </button>
          <Link to={`/edituser/${params.row.id}`}>
            <button
              style={{
                backgroundColor: "#119C59",
                color: "white",
              }}
            >
              Edit User
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

const handleRowSelection = (selectionModel) => {
  if (selectionModel.length > 0) {
    // Assuming 'id' is the field that represents the user ID in your data
    const selectedId = selectionModel[0];
    setSelectedUserId(selectedId);
  } else {
    setSelectedUserId(null);
  }
};
  return (
    <>
      <Helmet>
        <title>User Management</title>
        <meta
          name="description"
          content="Manage users in your application with ease."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "User Management",
              "description": "Manage users in your application with ease.",
              "url": "http://localhost:3000/dashboard/users",
            }
          `}
        </script>
      </Helmet>
      <main>
        <section>
          <Box sx={{ height: 520, width: "80%",     margin:" 10% 12%"}}>
            <button
              onClick={handleOpenAddUserModal}
              style={{
                backgroundColor: "#119C59",
                color: "white",
              }}
            >
              Add User
            </button>
     
            <AddUserModal
              open={openAddUserModal}
              handleClose={handleCloseAddUserModal}
              handleAddUser={handleAddUser}
            />

            <DataGrid
              rows={userList}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              onSelectionModelChange={handleRowSelection}
            />
          </Box>
        </section>
      </main>
    </>
  );
};

export default ManageUserTable;
