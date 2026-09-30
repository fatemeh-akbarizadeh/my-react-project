//parent
import { Card, CardContent, Typography } from "@mui/material";
import Child from "./Child"

const Parent = () => {
   return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <CardContent
                sx={{
                    p: 3,
                }}
            >
                <Typography
                    component="h2"
                    variant="h5"
                 
                    sx={{
                          fontWeight:700
                    }}
                >
                    Parent Component
                </Typography>
                <Child />
            </CardContent>
        </Card>
    );
}

export default Parent