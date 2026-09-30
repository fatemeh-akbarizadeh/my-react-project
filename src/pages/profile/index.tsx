import { Avatar, Box, Typography } from "@mui/material";
import PageHeader from "../../components/global/PageHeader";
import { useAuthStore } from "../../store/auth.store";

const Profile=()=>{
  const{user}=useAuthStore();
  

     return (
        <Box>
            <PageHeader title="Profile Page" />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    mt: 3,
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    backgroundColor: "background.paper",
                }}
            >
                <Avatar
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 3,
                        bgcolor: "action.hover",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight:700,
                        }}
                    >
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography variant="h6">
                        {user?.email}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                    >
                        {user?.gender}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
export default Profile;