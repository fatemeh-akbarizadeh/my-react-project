export interface PostsResponse {
    posts:Post[]
    total: number,
    skip: number,
    limi:number 
}
export interface Post {

    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: Reaction
    views: number,
    userId: number

}
interface Reaction {
    likes: number,
    dislikes: number
}
export interface CreatePostForm{
    title:string,
    body:string
    userId:number|undefined
}