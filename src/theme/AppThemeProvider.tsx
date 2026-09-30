import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGlobalStore } from "../store/global.store";
import { createAppTheme } from "./index";

const AppThemeProvider = ({children}: {children: React.ReactNode;}) => {

    const mode = useGlobalStore((state) => state.theme );
    const theme = createAppTheme(mode);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
export default AppThemeProvider;