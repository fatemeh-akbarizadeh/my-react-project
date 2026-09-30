
export interface productResponse {
    products: Product[]
    total: number,
    skip: number,
    limit: number

}

export interface Product {
    id: number
    title: string
    price: number
    thumbnail: string
}