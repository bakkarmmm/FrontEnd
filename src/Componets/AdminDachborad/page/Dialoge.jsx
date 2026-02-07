import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Dialoge({
  handleClose,
  open,
  filed,
  lable,
  selectSource,
  onSubmit,
  onChange,
  values,
  mode,
}) {
  return (
    <React.Fragment>
      <BootstrapDialog
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",

          "& .MuiDialog-paper": {
            width: { xs: "100%", md: "70%" },
            margin: { xs: 3, md: "auto" },
            maxWidth: { xs: "100%", md: "none" },
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {lable}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {filed.map((Textfiled) => {
            if (Textfiled.type === "select") {
              const options =
                Textfiled.options || selectSource[Textfiled.source] || [];
              return (
                <FormControl key={Textfiled.name} fullWidth margin="normal">
                  <InputLabel id={`${Textfiled.name}-label`}>
                    {Textfiled.label}
                  </InputLabel>
                  <Select
                    label={Textfiled.name}
                    labelId={`${Textfiled.name}-label`}
                    name={Textfiled.name}
                    value={values[Textfiled.name] || ""}
                    onChange={onChange}
                  >
                    {options.map((option) => {
                      return (
                        <MenuItem
                          key={option.value || option._id}
                          value={option.value || option._id}
                        >
                          {option.label || option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            } else {
              return (
                <TextField
                 key={Textfiled.name}
                  fullWidth
                  multiline
                  rows={Textfiled.type === "multiline" ? 4 : 1}
                  label={Textfiled.label}
                  name={Textfiled.name}
                  type={Textfiled.type || "text"}
                  margin="normal"
                  value={values[Textfiled.name] || ""}
                  onChange={onChange}
                  required={Textfiled.name === "Password" ? mode === "add" : true}
                />
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ m: 1 }} autoFocus type="submit">
            {lable}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
