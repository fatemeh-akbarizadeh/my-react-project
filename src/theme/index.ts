import { createTheme } from "@mui/material/styles";
import type { Theme } from "../types/general";


export const createAppTheme = (mode: Theme) => {
    return createTheme({
        direction: "rtl",
        palette: {
            mode,
            primary: {
                main: "#6D28D9",
                light: "#8B5CF6",
                dark: "#4C1D95",
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: "#EC4899",
                light: "#F472B6",
                dark: "#BE185D",
                contrastText: "#FFFFFF",
            },
            background:
                mode === "light"
                    ? {
                        default: "#F8F7FC",
                        paper: "#FFFFFF",
                    }
                    : {
                        default: "#15121C",
                        paper: "#211B2B",
                    },

            text:
                mode === "light"
                    ? {
                        primary: "#241638",
                        secondary: "#6B6475",
                    }
                    : {
                        primary: "#F5F3F7",
                        secondary: "#B8B0C4",
                    },

            divider:
                mode === "light"
                    ? "rgba(36, 22, 56, 0.12)"
                    : "rgba(255, 255, 255, 0.12)",

            success: {
                main: "#16A34A",
            },

            error: {
                main: "#E11D48",
            },
        },
        shape: {
            borderRadius: 14,
        },
        typography: {
            fontFamily: "Vazirmatn, Arial, sans-serif",
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        textTransform: "none",
                        fontWeight: 700,
                        boxShadow: "none",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 18,

                        boxShadow:
                            mode === "light"
                                ? "0 8px 30px rgba(109, 40, 217, 0.08)"
                                : "0 8px 30px rgba(0, 0, 0, 0.25)",
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 18,
                    },
                },
            },
        },
    });
};