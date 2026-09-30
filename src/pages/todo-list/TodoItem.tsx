import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LucideCheckCircle,
  LucidePencil,
  LucideTrash,
  LucideUndo,
} from "lucide-react";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

import DsButton from "../../components/desine.system/DsButton";
import DsTypography from "../../components/desine.system/DsTypography";

import { deleteTodoApi, updateTodoApi } from "../../services/todo-service";
import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
  preparToEdit: (id: number) => void;
};

const TodoItem = ({ todo, preparToEdit }: TodoItemProps) => {
  const queryClient = useQueryClient();

  // -----------------------------
  // Delete Todo
  // -----------------------------

  const {
    mutate: deleteTodo,
    isPending: deleteLoading,
  } = useMutation({
    mutationFn: deleteTodoApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      toast.success("delete successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    if (!window.confirm("Are you sure to delete this item?")) {
      return;
    }

    deleteTodo(todo.id);
  };

  // -----------------------------
  // Update Todo Status
  // -----------------------------

  const {
    mutate: updateTodo,
    isPending: updateLoading,
  } = useMutation({
    mutationFn: ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => updateTodoApi(id, completed),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      toast.success("Todo updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlechangeStatus = (newstatus: boolean) => {
    updateTodo({
      id: todo.id,
      completed: newstatus,
    });
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        borderBottom: "1px solid",
        borderColor: "divider",

        "&:last-child": {
          borderBottom: "none",
        },

        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {/* Todo Text */}
      <DsTypography
        sx={{
          flex: 1,
          fontSize: "1rem",
          textDecoration: todo.completed
            ? "line-through"
            : "none",
          opacity: todo.completed ? 0.5 : 1,
          transition: "all 0.2s ease",
        }}
      >
        {todo.todo}
      </DsTypography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        {/* Complete / Undo */}
        {todo.completed ? (
          <DsButton
            color="inherit"
            size="small"
            loading={updateLoading}
            tooltip="Undo"
            onClick={() => {
              handlechangeStatus(false);
            }}
          >
            <LucideUndo size={18} />
          </DsButton>
        ) : (
          <DsButton
            color="success"
            size="small"
            loading={updateLoading}
            tooltip="Complete"
            onClick={() => {
              handlechangeStatus(true);
            }}
          >
            <LucideCheckCircle size={18} />
          </DsButton>
        )}

        {/* Edit */}
        <DsButton
          color="primary"
          size="small"
          tooltip="Edit"
          onClick={() => preparToEdit(todo.id)}
        >
          <LucidePencil size={18} />
        </DsButton>

        {/* Delete */}
        <DsButton
          color="error"
          size="small"
          tooltip="Delete"
          onClick={handleDelete}
          loading={deleteLoading}
        >
          <LucideTrash size={18} />
        </DsButton>
      </Box>
    </ListItem>
  );
};

export default TodoItem;