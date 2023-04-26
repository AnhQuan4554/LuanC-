import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Box,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Dialog,
  styled,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import PaymentChildren from "../pageChildren/PaymentChildren";
interface typeEdit {
  idItemEdit: String;
  contentEvent: String;
  money: String;
  usedDate: String;
  status: String;
}
const Payment: React.FC<any> = () => {
  // CSS ---------------------------
  const S_dataGrid = styled(DataGrid)({
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: `600`,
      fontSize: `18px`,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
      display: "none",
    },
  });
  const S_textColoum = styled(Typography)({
    width: `100%`,
    height: `72%`,
    borderRadius: `20px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#D5EEDB",
    color: `#30993B`,
    fontWeight: `500`,
  });
  // state ---------------------------------------------
  const [dataPost, setDataPost] = useState();
  const renderDataPay = async () => {
    try {
      const res = await axios.get("http://localhost:5000/payment");
      const { data } = res.data;
      setDataPost(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    renderDataPay();

    console.log("update");
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "LOG ID",
      width: 360,
      editable: true,
      renderCell: (params) => {
        return (
          <Typography variant="h6" sx={{ color: "green" }}>
            {params.id.toString()}
          </Typography>
        );
      },
    },
    {
      field: "even",
      headerName: "EVENT",
      // type: "number",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <>
          <Avatar
            sx={{ width: `28px`, height: `28px`, marginRight: `20px` }}
            src="/imgGift.svg"
          />
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {" "}
            {params.row.contentEvent}
          </Typography>
        </>
      ),
    },
    {
      field: "money",
      headerName: "MONEY USED",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6">{params.row.money}</Typography>
      ),
    },

    {
      field: "usedDate",
      headerName: "USED DATE",
      width: 250,
      editable: true,
      renderCell: (param) => (
        <Typography variant="h6"> {param.row.usedDate}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 120,
      editable: true,
      renderCell: (params) => <S_textColoum>{params.row.status}</S_textColoum>,
    },
    {
      field: "icon",
      headerName: " ",
      width: 50,
      renderCell: () => (
        <FiMoreHorizontal style={{ width: "30px", height: `30px` }} />
      ),
    },
  ];
  const rows = dataPost && dataPost;
  const [open, setOpen] = React.useState(false);
  const [idDelete, setIdDelete] = useState<any>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataForm, setDataForm] = useState<typeEdit>({
    idItemEdit: "",
    contentEvent: "",
    money: "",
    usedDate: "",
    status: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getIdDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setIdDelete(id);
  };
  const handleDeleteById = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 1200);
    try {
      await axios.post("http://localhost:5000/payment/deleteById", {
        idDelete,
      });
    } catch (error) {
      console.log("Loi ko xoa dc ");
    }
  };
  const handleDeleteAll = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 1200);
    try {
      await axios.delete("http://localhost:5000/payment/deleteAll");
    } catch (error) {
      console.log("Loi ko xoa dc ");
    }
  };
  const editPayment = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.reload();
    }, 1200);
    try {
      console.log("when clicck edit", dataForm);
      await axios.patch("http://localhost:5000/payment/editPayment", {
        ...dataForm,
      });
      console.log("success");
    } catch (error) {
      console.log(error, "LOI ");
    }
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "#F4F5F6",
        p: 3,
      }}
    >
      <Toolbar
        style={{
          padding: `0`,
          display: `flex`,
          justifyContent: `space-between`,
        }}
      >
        <Typography style={{ fontWeight: `600` }} variant="h4">
          Payment Record{" "}
        </Typography>
        <Box
          className="formDelete"
          sx={{
            display: "flex",
          }}
        >
          <TextField
            label="delete by id"
            name="deleteById"
            variant="outlined"
            onChange={getIdDelete}
          />
          <button style={{ background: "red" }} onClick={handleDeleteById}>
            Delete
          </button>
        </Box>
        <div>
          <Button
            onClick={handleClickOpen}
            sx={{ padding: `10px` }}
            variant="contained"
            color="success"
          >
            + New payment record
          </Button>

          <Dialog open={open} onClose={handleClose}>
            {<PaymentChildren />}
          </Dialog>
        </div>
      </Toolbar>

      {dataPost && (
        <Box sx={{ height: 650, bgcolor: "#fff" }}>
          <S_dataGrid
            rows={rows || []}
            columns={columns || null}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      )}
      {/* start delete alll */}
      <Box
        className="btnDeleteAll"
        sx={{
          display: "flex",
          position: "absolute",
          top: "34px",
          right: "20%",
        }}
      >
        <button style={{ background: "#ccc" }} onClick={handleDeleteAll}>
          Clear All
        </button>
      </Box>
      {/* start edit by Id */}
      <div>
        <Button variant="outlined" onClick={handleClickOpenEdit}>
          Edit Item
        </Button>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={editPayment} style={{ padding: "30px" }}>
            <TextField
              label="id need edit"
              name="idItemEdit"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={handleChange}
            />
            <TextField
              label="Content Event"
              name="contentEvent"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={handleChange}
            />
            <TextField
              label="Money"
              name="money"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
          </form>
        </Dialog>
      </div>
      {/* start edit by Id */}
    </Box>
  );
};

export default Payment;
