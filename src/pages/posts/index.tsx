import Box from "@mui/material/Box";
import {
    DataGrid, type GridColDef, type GridPaginationModel,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    LucideEye, LucidePencil, LucideRefreshCcw, LucideTrash,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import DsButton from "../../components/desine.system/DsButton";
import PageHeader from "../../components/global/PageHeader";
import { deletePostApi, getPostsApi, } from "../../services/post-service";
import type { Post } from "../../types/post";
import EditPostModal from "./component/EditPostModal";

const Posts = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });


  
  const { data,  isLoading, refetch, isFetching,} = useQuery({
      queryKey: ["post-list", paginationModel.page,  paginationModel.pageSize,],  
      queryFn: () =>
        getPostsApi({ page: paginationModel.page, pageSize: paginationModel.pageSize, }),
  });

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    mutate:deletepost,isPending: delLoading,} = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-list"],
      });

      toast.success(
        "Post deleted successfully"
      );

      setDeletingId(null);
    },

    onError: (error) => {

      console.log(error);

      toast.error(
        "Failed to delete post"
      );

      setDeletingId(null);
    },
  });

  const [editPost, setEditPost] =
    useState<Post | null>(null);

  const columns: GridColDef[] = [

    { field: "id",  headerName: "Row", width: 50, },
    {field: "title", headerName: "Title",width: 170,},
    {field: "userId", headerName: "User",  width: 50 },
    { field: "body", headerName: "Post Text",minWidth: 250, flex: 1, },
    {field: "views",headerName: "Views", width: 70,},
    {field: "tags",  headerName: "Tags",width: 230},
    {field: "action",headerName: "Action", width: 170,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
              height: "100%",
            }}
          >
            <DsButton
              color="error"
              variant="outlined"
              size="small"
              tooltip="Delete post"
              loading={delLoading && deletingId === params.row.id }
              onClick={() => { setDeletingId( params.row.id );  
                deletepost(params.row.id);
              }}

              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
              }}
            >
              <LucideTrash size={16} />
            </DsButton>

            <DsButton
              color="primary"

              variant="outlined"

              size="small"

              tooltip="Edit post"

              onClick={() => {

                setEditPost(
                  params.row
                );

              }}

              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
              }}
            >
              <LucidePencil size={16} />
            </DsButton>
            <DsButton
              color="inherit"
              variant="outlined"
              size="small"
              tooltip="View post"
              onClick={() => {navigate( `/app/posts/${params.row.id}` ); }}
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
              }}
            >
              <LucideEye size={16} />
            </DsButton>
          </Box>
        );
      },
    },
  ];


  return (

    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent:"center",
          

            gap: 1,
          }}
        >
            <PageHeader  title="Posts Page"  />

          <DsButton
            variant="outlined"size="small" tooltip="Refresh posts" loading={isFetching} onClick={() => refetch()}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              p: 0,
            }}
          >
            <LucideRefreshCcw
              size={18}
            />
          </DsButton>
        </Box>

        <Link
          to="CreatPost"style={{ textDecoration: "none"  }} >
          <DsButton color="primary"size="medium" >Create Post</DsButton>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor:
            "background.paper",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={data?.posts ?? []  }
          columns={columns}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel }
          rowCount={ data?.total ?? 0}
          pageSizeOptions={[ 5,10, 20, 50,100 ]}
          loading={ isLoading ||  isFetching}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor:
                "action.hover",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor:
                "action.hover",
            },
          }}
        />
      </Box>
      {editPost && (
        <EditPostModal
        post={editPost}
         onClose={() =>
         setEditPost(null)
          }
        />
      )}
    </Box>
  );
};


export default Posts;