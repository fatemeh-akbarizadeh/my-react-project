import { Box, Card, Typography } from "@mui/material";
import DsButtonGroup from "../../components/desine.system/DsButtonGroup";
import PageHeader from "../../components/global/PageHeader";
import { useCartStore } from "../../store/cart.store";

const Cart = () => {
    const { cart, increase, decrease, removeCart } = useCartStore();

    const totalPrice = cart.reduce((total, item) =>
        total + item.product.price * item.count, 0);

   return (
  <Box
    sx={{
      width: "100%",
    }}
  >
    <PageHeader title="Shopping Cart" />
    <Box
      sx={{
        mt: 3,
      }}
    >
      {cart.map((cartItem) => {
        return (
          <Card
            key={cartItem.product.id}
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2,
              m: 1.5,
              transition: "0.2s",
              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,

                minWidth: 0,
              }}
            >
              <Box
                component="img"
                src={cartItem.product.thumbnail}
                alt={cartItem.product.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 1,
                  flexShrink: 0,
                  backgroundColor:
                    "background.default",
                }}
              />
              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{
                    mb: 0.5,
                    fontWeight:700,
                    overflow: "hidden",
                    textOverflow:
                      "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cartItem.product.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="warning.main"
                
                  sx={{
                    mb: 1,
                    fontWeight:600
                  }}
                >
                  ${cartItem.product.price}
                </Typography>
                <DsButtonGroup
                  id={cartItem.product.id}
                  count={cartItem.count}
                  increase={increase}
                  decrease={decrease}
                  removeCart={removeCart}
                />
              </Box>
            </Box>
          </Card>
        );
      })}
      <Card
        elevation={0}
        sx={{
          mt: 3,
          p: 2,
          width: {
            xs: "100%",
            sm: 280,
          },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight:700
          }}
          
        >
          Total Price:{" "}
          <Box
            component="span"
            sx={{
              color: "warning.main",
              ml: 1,
            }}
          >
            ${totalPrice.toFixed(2)}
          </Box>
        </Typography>
      </Card>
    </Box>
  </Box>
);
};

export default Cart;