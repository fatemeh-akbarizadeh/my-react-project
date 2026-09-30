import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DsButton from "../../../components/desine.system/DsButton";
import { getPostApi, updatePostApi } from "../../../services/post-service";
import type { Post } from "../../../types/post";


type EditPostForm = {
    title: string;
    body: string;
};
type EditPostModalProps = {
    post: Post;
    onClose: () => void;
};
const EditPostModal = ({ post, onClose }: EditPostModalProps) => {

    const { data, isLoading } = useQuery({
        queryKey: ['post', post.id],
        queryFn: () => getPostApi(post.id)
    })
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditPostForm>();

    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                body: data.body
            })
        }
    }, [data, reset]);

    const queryClient = useQueryClient();

    const { mutate: editPost, isPending } = useMutation({
        mutationFn: (formData: EditPostForm) => updatePostApi(post.id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post-list', post.id]

            })
            onClose();
            toast.success('edit post succesfully')
        },
        onError: (error) => {
            console.log(error)
            toast.error("edit post failed")
        }

    })
    const onSubmit=(formData:EditPostForm)=>{
        editPost(formData)

    }



    return (
        <>
            <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm" >
                <DialogTitle>
                    Edit Post
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>

                        <TextField
                            fullWidth
                            label="Title"
                            margin="normal"
                            {...register("title", {
                                required: "Title is required",
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            disabled={isLoading}
                        />

                        <TextField
                            fullWidth
                            label="Body"
                            margin="normal"
                            multiline
                            rows={5}
                            {...register("body", {
                                required: "Body is required",
                            })}
                            error={!!errors.body}
                            helperText={errors.body?.message}
                            disabled={isLoading}
                        />

                    </DialogContent>

                    <DialogActions>

                        <DsButton
                            onClick={onClose}
                            color="error"
                        >
                            Cancel
                        </DsButton>

                        <DsButton
                            type="submit"
                            variant="contained"
                            loading={isPending}
                            disabled={isLoading}
                        >
                            Edit
                        </DsButton>

                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
export default EditPostModal;