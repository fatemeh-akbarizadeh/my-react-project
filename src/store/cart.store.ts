import { create } from "zustand"
import type { Product } from "../types/product"

type CartItem = {
    product: Product
    count: number
}
type CartStore = {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeCart: (id: number) => void
    increase: (id: number) => void
    decrease: (id: number) => void
}
export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addToCart: (product) => {
        set((state) => {

            const item = state.cart.find(
                (item) => item.product.id === product.id
            );

            if (item) {
                return {
                    cart: state.cart.map((item) =>
                        item.product.id === product.id
                            ? {
                                ...item,
                                count: item.count + 1
                            }
                            : item
                    )
                };
            }

            return {
                cart: [
                    ...state.cart,
                    {
                        product,
                        count: 1
                    }
                ]
            };
        });
    },
    increase: (id) => {
        set((state) => {
            return {
                cart: state.cart.map((item) =>
                    item.product.id === id
                        ? {
                            ...item,
                            count: item.count + 1
                        }
                        : item
                )
            };
        });
    },
    decrease: (id) => {
        set((state) => {
            return {
                cart: state.cart.map((item) =>
                    item.product.id === id && item.count > 1
                        ? {
                            ...item,
                            count: item.count - 1
                        }
                        : item
                )
            };
        });
    },
        removeCart: (id) => {
        set((state) => {
            return {
                cart: state.cart.filter(
                    (item) => item.product.id !== id
                )
            };
        });
    }


}))