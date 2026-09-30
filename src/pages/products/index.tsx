
import PageHeader from "../../components/global/PageHeader";
import DsButton from "../../components/desine.system/DsButton";
import { useCartStore } from "../../store/cart.store";
import DsButtonGroup from "../../components/desine.system/DsButtonGroup";
import { useQuery } from "@tanstack/react-query";
import { getProductApi } from "../../services/product-service";
import Loading from "../../components/global/Loading";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Products = () => {
  const { cart, addToCart, removeCart,  increase, decrease, } = useCartStore();
  const {  data,  isLoading,} = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProductApi(),
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
    <PageHeader title="Products"/>
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          p: 3,
        }}
      >
        {data?.products.map(
          (product) => {
            const item = cart.find((item) =>  item.product.id === product.id );
            return (
              <Card
                key={product.id}
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition:
                  "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform:
                      "translateY(-3px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    product.thumbnail
                  }
                  alt={
                    product.title
                  }
                  sx={{
                    height: 220,
                    objectFit: "contain",
                    p: 2,
                    backgroundColor:
                      "background.default",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    p: 2,
                  }}
                >

                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeith:700,
                      overflow: "hidden",
                      textOverflow:
                        "ellipsis",
                      display:
                        "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient:
                        "vertical",
                    }}
                  >
                    {product.title}
                  </Typography>
    
                  <Typography
                    variant="body1"
                    color="warning.main"
                  
                    sx={{
                      mb: 2, 
                       fontWeight:700
                    }}
                  >
                    ${product.price}
                  </Typography>

                  <Box
                    sx={{
                      mt: "auto",
                    }}
                  >

                    {item ? (
                      <DsButtonGroup
                        id={product.id}
                        count={item.count}
                        increase={increase}
                        decrease={decrease}
                        removeCart={
                          removeCart
                        }
                      />

                    ) : (

                      <DsButton
                        type="button"
                        size="medium"
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          addToCart(product)
                        }
                        sx={{
                          mt: 1,
                          width: "100%",
                        }}
                      >
                        Add
                      </DsButton>

                    )}
                  </Box>

                </CardContent>
              </Card>

            );
          }
        )}

      </Box>

    </Box>
  );
};


export default Products;