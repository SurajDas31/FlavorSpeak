import { useEffect, useState } from "react";
import { REST_URL, getAccessToken } from "../../../util/AuthUtil";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircleIcon from '@mui/icons-material/Circle';
import { green, red } from '@mui/material/colors';

const UserList = (props) => {

    const [userDataList, setUserDataList] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'enabled',
            headerName: 'Status',
            sortable: true,
            width: 60,
            renderCell: (params) => {
                return (<>
                    {(params.value === true) ?
                        <CircleIcon sx={{ color: green[900] }} /> :
                        <CircleIcon sx={{ color: red[900] }} />}
                </>);
            },

        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
            minWidth: 150, maxWidth: 200
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
        },
    ];

    const loadData = async () => {

        try {
            var res = await fetch(REST_URL + "/api/v1/user/get", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    "Content-Type": "application/json"
                }
            })
            if (res.status === 200) {
                let data = await res.json();
                setUserDataList(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal
                open={props.show}
                onClose={props.onHide}
                closeAfterTransition
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.show}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            List of Users
                        </Typography>
                        <DataGrid
                            rows={userDataList}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 25, 50]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>

                </Fade>
            </Modal>
        </>
    );
}

export default UserList;