import "./App.css";
import React from "react";
import { AuthProvider } from './context/auth';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
