import type { CreateTodo, EditTodo, Todo, TodosResponse } from "../types/todo"
import { api } from "./api"

// get todos
export const getTodosApi = async (): Promise<TodosResponse> => {
   return api('/todos')
}
//delete todo
export const deleteTodoApi = async (id: number): Promise<Todo> => {
   return api(`/todos/${id}`,'DELETE')
}
//update todo
export const updateTodoApi = async (id: number, completed: boolean): Promise<Todo> => {
   return api(`/todos/${id}`,'PUT',{
    completed
   })
}
//edite todo 
export const editTodoApi = async (todo: EditTodo): Promise<Todo> => {

  return api(`/todos/${todo.id}`,'PUT',{
    todo
  })
}
//creat todo
export const createTodoApi = async (todo: CreateTodo): Promise<Todo> => {
 return api(`/todos/add`,"POST",todo)
}
