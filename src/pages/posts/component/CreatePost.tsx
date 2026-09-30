import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import DsButton from "../../../components/desine.system/DsButton";
import { creatPostApi } from "../../../services/post-service";
import { useAuthStore } from "../../../store/auth.store";
import type { CreatePostForm } from "../../../types/post";
import { Box, TextField } from "@mui/material";


const CreatePost = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore()
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm<CreatePostForm>({
        defaultValues: {
            title: "",
            body: "",
            userId: undefined
        }
    })
    const { mutate } = useMutation({
        mutationFn: creatPostApi,
        onSuccess: () => {
            toast.success('post has been succsesfully')
            queryClient.invalidateQueries({
                queryKey: ['post-list']
            })
            navigate('/app/posts')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const onSubmit = (formData: CreatePostForm) => {

        mutate({
            title: formData.title,
            body: formData.body,
            userId: user?.id
        })

    }


   return (
  <Box
    component="form"
    onSubmit={handleSubmit(onSubmit)}
    sx={{
      width: {
        xs: "100%",
        sm: "80%",
        md: "60%",
        lg: "45%",
      },
      maxWidth: 600,
      mx: "auto",
      mt: 4,
      p: 4,
      backgroundColor: "background.paper",
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 3,
      boxShadow: 2,
    }}
  >
    <TextField
      fullWidth
      label="Title"
      placeholder="Enter Post Title"
      margin="normal"
      {...register("title", {
        required: "Title is required",
      })}
      error={!!errors.title}
      helperText={
        errors.title?.message
      }
    />

    <TextField
      fullWidth
      label="Body"
      placeholder="Enter Post Body"
      margin="normal"
      multiline
      rows={5}
      {...register("body", {
        required: "Body is required",
      })}
      error={!!errors.body}
      helperText={
        errors.body?.message
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
        variant="contained"
        size="large"
      >
        Create
      </DsButton>
      <Link
        to="/app/posts"
        style={{
          textDecoration: "none",
        }}
      >
        <DsButton
          color="inherit"
          variant="outlined"
          size="large"
        >
          Cancel
        </DsButton>
      </Link>
    </Box>
  </Box>
);
}
export default CreatePost;