import { Alert } from "@mui/material";

export default function MessageBox(props) {
  return <Alert severity={props.severity || "info"}>{props.children}</Alert>;
}
