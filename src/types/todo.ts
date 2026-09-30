export interface TodosResponse {
todos:Todo[]
total: number,
  skip: number,
  limit: number
}
 export interface Todo{
     id: number,
      todo: string,
      completed: boolean,
      userId: number
}
export interface EditTodo{
    id:number,
    todo:string,
    completed:boolean
}
export interface CreateTodo  {
    todo: string
    completed: boolean
    userId: number|undefined
}
