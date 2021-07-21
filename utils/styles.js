import { makeStyles } from "@material-ui/core";

const UseStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vH",
  },
  footer: {
    marginTop: 15,
    textAlign: "center",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 700,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial",
  },
});

export default UseStyles;
