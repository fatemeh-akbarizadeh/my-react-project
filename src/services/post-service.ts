import type { CreatePostForm, Post, PostsResponse } from "../types/post";
import { api } from "./api";

export const getPostsApi=async({ page, pageSize }: { page: number, pageSize: number }):Promise<PostsResponse>=>{
  
    return api(`/posts?limit=${pageSize}&skip=${page * pageSize}`);


}
//گرفتن یک پست 

export const getPostApi=async(id:number):Promise<Post>=>{
   return api(`/posts/${id}`)

}
//creat post 
export const creatPostApi=async(post: CreatePostForm):Promise<Post>=>{
  return api('/posts/add','POST',post)
}
// update post
export const updatePostApi = async (
    id: number, post: Partial<Post>): Promise<Post> => {

   return api(`/posts/${id}`,'PUT',post)
};


// delete post
export const deletePostApi = async (id: number): Promise<Post> => {

    return api(`/posts/${id}`,'DELETE')
};