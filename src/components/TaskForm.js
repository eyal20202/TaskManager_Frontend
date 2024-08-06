import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/useStores';
import { Button, TextField, Grid, Paper, Typography, Switch, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { format } from 'date-fns';

const TaskForm = observer(({ selectedTask, onClearSelection }) => {
  const { taskStore } = useStores();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (selectedTask) {
      setId(selectedTask.id);
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(format(new Date(selectedTask.dueDate), 'yyyy-MM-dd'));
      setIsCompleted(selectedTask.isCompleted);
    } else {
      setId(null);
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsCompleted(false);
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      setError('Please fill in all required fields');
      return;
    }
    let task = { title, description, dueDate, isCompleted };
    try {
      if (selectedTask) {
        task = {...task,id};
        await taskStore.updateTask(selectedTask.id, task);
      } else {
        await taskStore.addTask(task);
      }
      setId(null);
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsCompleted(false);
      onClearSelection();
    } catch (err) {
      setError('Failed to save task');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6" gutterBottom>
          {selectedTask ? 'Edit Task' : 'Add Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    color="primary"
                  />
                }
                label="Completed"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                {selectedTask ? 'Update Task' : 'Add Task'}
              </Button>
              {selectedTask && (
                <Button variant="contained" color="secondary" onClick={onClearSelection} style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
});

export default TaskForm;
