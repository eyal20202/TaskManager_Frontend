import React from 'react';
import { CssBaseline, Container, Typography, Paper } from '@mui/material';
import TaskList from './components/TaskList';
import StoreProvider from './StoreProvider';

function App() {
  return (
    <StoreProvider>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Manager
          </Typography>
          <TaskList />
        </Paper>
      </Container>
    </StoreProvider>
  );
}

export default App;
