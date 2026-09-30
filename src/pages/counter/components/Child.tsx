//child
import { Box, Typography } from "@mui/material";
import { useCounterStore } from "../../../store/counter.store";

const Child = () => {

    const{count}=useCounterStore();

       return (
        <Box
            sx={{
                mt: 2, p: 2,borderRadius: 3, backgroundColor:"action.hover", border: "1px solid",borderColor:"divider", }}>
            <Typography
                component="h3"
                variant="h6"
                sx={{
                     fontWeight:600
                }}
            >
                Child Component
            </Typography>
            <Box
                sx={{
                    mt: 2,
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor:
                        "primary.main",
                    color:
                        "primary.contrastText",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                }}
            >
                {count}
            </Box>
        </Box>
    );
}

export default Child