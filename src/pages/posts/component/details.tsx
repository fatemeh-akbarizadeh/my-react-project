import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import DsButton from "../../../components/desine.system/DsButton";
import Loading from "../../../components/global/Loading";
import PageHeader from "../../../components/global/PageHeader";
import { getPostApi } from "../../../services/post-service";

const PostDetails = () => {
const navigate = useNavigate();
  const { postId } = useParams();
  const { data: details,  isLoading, } = useQuery({
    queryKey: [
      `post-details-${postId}`,
    ],
    queryFn: () =>
      getPostApi(
        Number(postId)
      ),
  });

  return (
    <Box sx={{ width: "100%", }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
     <PageHeader title={`Post Details - Post ID=${postId}`} />
        <DsButton color="primary" size="large"  onClick={()=>navigate('/app/posts') } >Back</DsButton>
      </Box>
      {isLoading ? (<Loading />  ) : (
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
              component="h1"
              variant="h5"
              sx={{
                mb: 2,
                fontWeight:700
              }}   >
              {details?.title || "-"}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor:
                  "divider",
                mb: 2,
              }}
            />
            <Typography
              component="p"
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.9,
              }}
            >
              {details?.body || "-"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
export default PostDetails;