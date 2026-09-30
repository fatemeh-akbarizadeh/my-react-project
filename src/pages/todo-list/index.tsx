import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LucideCheckCircle,  LucidePlusCircle,  LucideX,} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import DsButton from '../../components/desine.system/DsButton';
import DsTypography from '../../components/desine.system/DsTypography';
import Loading from '../../components/global/Loading';

import {
    createTodoApi,
    editTodoApi,
    getTodosApi,
} from '../../services/todo-service';

import { useAuthStore } from '../../store/auth.store';
import TodoItem from './TodoItem';


const Todos = () => {
  const queryClient = useQueryClient();
 const { user } = useAuthStore();

  

const {  data,  isLoading,  isError, } = useQuery({
        queryKey: ['todos'],
        queryFn: () => getTodosApi(),
    });

  
    const [formdata, setFormData] = useState({
        title: '',
        isCompleted: false,
    });

    const [showerror, setShowerror] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);

    
    const {  mutate: editTodo, isPending: editLoading, } = useMutation({
        mutationFn: editTodoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            });

            toast.success('edit todo successfully');

            cancelEdit();
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { mutate: createTodo, isPending: createLoading,
    } = useMutation({
        mutationFn: createTodoApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            });

            toast.success('Todo created successfully');

            setFormData({
                title: '',
                isCompleted: false,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    
    const cancelEdit = () => {
        setFormData({
            title: '',
          isCompleted: false,
        });

        setEditingId(null);
        setShowerror(false);
    };

    const preparToEdit = (id: number) => {
        const editingItem = data?.todos.find(
            (todo) => todo.id === id
        );

        if (!editingItem) {
            return;
        }

        setEditingId(id);

        setFormData({
            title: editingItem.todo,
            isCompleted: editingItem.completed,
        });

        setShowerror(false);
    };

    

    const handleUpdate = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setShowerror(false);

        if (!formdata.title.trim()) {
            setShowerror(true);
            return;
        }

        if (editingId === null) {
            return;
        }

        editTodo({
            id: editingId,
            todo: formdata.title,
            completed: formdata.isCompleted,
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setShowerror(false);

        if (!formdata.title.trim()) {
            setShowerror(true);
            return;
        }

        createTodo({
            todo: formdata.title,
            completed: formdata.isCompleted,
            userId: user?.id,
        });
    };


    return (
        <Box
            sx={{
                display: 'grid',

                gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 2fr',
                },

                gap: 6,

                maxWidth: 1100,

                mx: 'auto',

                width: '100%',
            }}
        >

            <Paper
                elevation={0}
                sx={{
                    p: 3,

                    height: 'fit-content',

                    border: '1px solid',

                    borderColor: 'divider',

                    borderRadius: 3,

                    position: {
                        md: 'sticky',
                    },

                    top: 16,
                }}
            >

                <DsTypography
                    variant="h5"
                    element="h1"
                    sx={{
                        fontWeight: 700,

                        mb: 3,
                    }}
                >
                    {editingId !== null
                        ? 'Edit Todo'
                        : 'Create Todo'}
                </DsTypography>
                <Box
                    component="form"

                    onSubmit={
                        editingId !== null
                            ? handleUpdate
                            : handleSubmit
                    }

                    sx={{
                        display: 'flex',

                        flexDirection: 'column',

                        gap: 2,
                    }}
                >
                    <TextField
                        fullWidth

                        label="Title"

                        placeholder="Enter todo title"

                        value={formdata.title}

                        onChange={(e) => {
                            setFormData({
                                ...formdata,

                                title: e.target.value,
                            });

                            if (e.target.value.trim()) {
                                setShowerror(false);
                            }
                        }}

                        error={showerror}

                        helperText={
                            showerror
                                ? 'Title is required'
                                : ''
                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    formdata.isCompleted
                                }

                                onChange={(e) =>
                                    setFormData({
                                        ...formdata,

                                        isCompleted:
                                            e.target.checked,
                                    })
                                }
                            />
                        }

                        label="Completed"
                    />

                    {editingId !== null ? (

                        <Box
                            sx={{
                                display: 'flex',

                                gap: 1.5,
                            }}
                        >

                            <DsButton
                                type="submit"

                                color="success"

                                size="large"

                                loading={editLoading}

                                startIcon={
                                    <LucideCheckCircle
                                        size={18}
                                    />
                                }
                            >
                                Save
                            </DsButton>

                            <DsButton
                                type="button"

                                color="inherit"

                                variant="outlined"

                                size="large"

                                startIcon={
                                    <LucideX
                                        size={18}
                                    />
                                }

                                onClick={cancelEdit}
                            >
                                Cancel
                            </DsButton>

                        </Box>

                    ) : (

                        <DsButton
                            type="submit"

                            color="primary"

                            size="large"

                            loading={createLoading}

                            startIcon={
                                <LucidePlusCircle
                                    size={20}
                                />
                            }
                        >
                            Add
                        </DsButton>

                    )}

                </Box>

            </Paper>


            <Box>
                <DsTypography
                    variant="h5"
                    element="h2"
                    sx={{
                        fontWeight: 700,

                        mb: 3,
                    }}
                >
                    Todo List
                </DsTypography>

                {isLoading ? (

                    <Loading />

                ) : isError ? (

                    <Paper
                        variant="outlined"

                        sx={{
                            p: 3,

                            borderRadius: 3,
                        }}
                    >
                        <DsTypography
                            color="error"
                        >
                            Error receiving todos
                        </DsTypography>
                    </Paper>

                ) : (

                    <Paper
                        variant="outlined"

                        sx={{
                            overflow: 'hidden',

                            borderRadius: 3,
                        }}
                    >

                        <List
                            disablePadding
                        >

                            {data?.todos.map((item) => (

                                <TodoItem
                                    key={item.id}

                                    todo={item}

                                    preparToEdit={
                                        preparToEdit
                                    }
                                />

                            ))}

                        </List>

                    </Paper>

                )}

            </Box>

        </Box>
    );
};

export default Todos;