
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import DsButton from "../../components/desine.system/DsButton";
import PageHeader from "../../components/global/PageHeader";
import { LoginApi } from "../../services/login-service";
import type { LoginFormData } from "../../types/login";
import { Box, TextField } from "@mui/material";

const Login = () => {
    const{register,handleSubmit,formState:{errors}}=useForm<LoginFormData>()
    const navigate = useNavigate();
    const{mutate:login,isPending}=useMutation({
        mutationFn:LoginApi,
        onSuccess:(data)=>{
            sessionStorage.setItem("token", data.accessToken);
            toast.success("You Logged In Successfully :)");
            navigate("/app/home");
        },
        onError:(error)=>{
            toast(error.message)
     }
    })
    const onSubmit =  (formData:LoginFormData) => {
      login({
            username: formData.username,
            password: formData.password
        });
    };
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/app/home')
        }
    }, [])

   return (
  <Box
    component="main"
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      p: 4,
      pt: 10,
      backgroundColor: "background.default",
      color: "text.primary",
    }}
  >
    <PageHeader
      title="Login Page"
    />
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: {
          xs: "100%",
          sm: "80%",
          md: "50%",
          lg: "400px",
        },
        mt: 3,
        p: 4,
        borderRadius: 3,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 3,
      }}
    >
      <TextField
        fullWidth
        label="Username"
        placeholder="Enter Username"
        margin="normal"
        {...register("username", {
          required: "Username is required",
        })}
        error={!!errors.username}
        helperText={
          errors.username?.message
        }
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        placeholder="Enter Password"
        margin="normal"
        {...register("password", {
          required: "Password is required",
        })}
        error={!!errors.password}
        helperText={
          errors.password?.message
        }
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
        }}
      >
        <DsButton
          type="submit"
          color="primary"
          size="large"
          loading={isPending}
          fullWidth
        >
          Login To App
        </DsButton>
      </Box>
    </Box>
  </Box>
);

}
export default Login;