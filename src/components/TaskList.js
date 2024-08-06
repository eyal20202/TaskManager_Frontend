import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/useStores';
import TaskForm from './TaskForm';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Typography, Paper, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = observer(() => {
  const { taskStore } = useStores();
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    taskStore.fetchTasks();
  }, [taskStore]);

  const handleDelete = async (id) => {
    await taskStore.deleteTask(id);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const clearSelection = () => {
    setSelectedTask(null);
  };

  return (
    <Container>
      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Task List
        </Typography>
        <TaskForm selectedTask={selectedTask} onClearSelection={clearSelection} />
        <Divider />
        <List>
          {taskStore.tasks.map((task) => (
            <ListItem key={task.id} style={{ borderBottom: '1px solid #ccc' }}>
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {task.description}
                    </Typography>
                    <br />
                    Due Date: {task.dueDate}
                    <br />
                    Completed: {task.isCompleted ? 'Yes' : 'No'}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
});

export default TaskList;
