import React, { CSSProperties, useEffect, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Button,
  FormControl,
  InputBase,
  TextField,
  Dialog,
} from "@mui/material";
import axios from "axios";
import { BeatLoader } from "react-spinners";

/* CSS input */
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: `translate(-50%)`,
  top: `50%`,
};

const PaymentChildren: React.FC<any> = () => {
  let [loading, setLoading] = useState(false);
  interface typePost {
    contentEvent: String;
    money: String;
    usedDate: String;
    status: String;
  }
  const [dataForm, setDataForm] = useState<typePost>({
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
  const creatPayment = async (e: any) => {
    setTimeout(() => {
      window.location.reload();
    }, 1200);
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/payment/creatPayment", {
        ...dataForm,
      });
      console.log("success");
    } catch (error) {
      console.log(error, "LOI ");
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        position: `relative`,
        minHeight: "300px",
        padding: "20px",
      }}
    >
      <form onSubmit={creatPayment}>
        <TextField
          label="Content Event"
          name="contentEvent"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "20px" }}
          onChange={handleChange}
        />
        <TextField
          label="Money"
          name="money"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "20px" }}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};

export default PaymentChildren;
