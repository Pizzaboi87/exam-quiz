import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          paddingBottom: "2rem",
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "questionBox" },
          style: {
            textTransform: "none",
            background:
              "linear-gradient(17deg, rgba(235,232,151,1) 0%, rgba(255,255,255,1) 100%)",
            padding: "1rem",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        title: {
          fontWeight: 700,
          color: "#39393A",
          marginLeft: "2rem",
        },
        question: {
          fontSize: "2rem",
          fontWeight: 600,
          color: "#39393A",
        },
        answer: {
          fontSize: "1rem",
          fontWeight: 500,
          color: "#39393A",
        },
        loading: {
          fontSize: "2rem",
          fontWeight: 800,
          color: "#EBEBEB",
        },
        link: {
          fontSize: "0.9rem",
          fontWeight: 500,
          color: "#5af",
          cursor: "pointer",
        },
        signOut: {
          fontSize: "1rem",
          fontWeight: 700,
          color: "#39393A",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          border: "1px solid #39393A",
          cursor: "pointer",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "quiz" },
          style: {
            textTransform: "none",
            background: "#E5F9E0",
            paddingVertical: "1rem",
            marginTop: "1rem",
            "&:hover": {
              background: "#FADF7F",
            },
          },
        },
        {
          props: { variant: "start" },
          style: {
            textTransform: "none",
            background: "#2284d8",
            fontSize: "1.2rem",
            color: "#FEFEFE",
            paddingVertical: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            "&:hover": {
              background: "#6D72C3",
            },
          },
        },
      ],
    },
  },
});
