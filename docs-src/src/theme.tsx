import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: "2rem",
                    marginBottom: "1em",
                },
                h2: {
                    fontSize: "1.5rem",
                    marginTop: "1.5em",
                    borderBottom: "1px solid #aaa",
                    marginBottom: "1em",
                },
                h3: {
                    fontSize: "1.2rem",
                    marginTop: "0.5em",
                    marginBottom: "0.5em",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "1em"
                },
            },
        },
    },
});