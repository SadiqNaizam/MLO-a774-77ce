import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/Login/LoginForm';

// This type represents the data structure expected by the onLoginSuccess callback.
// It should align with the form values defined within LoginForm.tsx (i.e., LoginFormValues).
// If LoginFormValues were exported from LoginForm.tsx, importing it directly would be preferable.
interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * IndexPage serves as the main login page for the application.
 * It utilizes AuthLayout for centering the content on the screen
 * and renders the LoginForm component to handle user authentication.
 */
const IndexPage: React.FC = () => {
  // Callback function triggered upon successful login from the LoginForm component.
  // This is where page-level actions like redirection or global state updates would occur.
  const handleLoginSuccess = (data: LoginCredentials) => {
    console.log('Login successful on IndexPage. Username:', data.username);
    // In a real-world application, you might navigate the user to a dashboard:
    // e.g., using useNavigate() from 'react-router-dom'
    // navigate('/dashboard');
    // Or, you might store user session information.
  };

  return (
    <AuthLayout>
      {/* 
        The LoginForm component is responsible for rendering the actual form fields,
        handling form state, validation, and submission.
        The onLoginSuccess prop allows the IndexPage to react to successful login events.
      */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </AuthLayout>
  );
};

export default IndexPage;
