import React, { useState, useEffect } from 'react'; 
import { useMutation, gql } from '@apollo/client'; 
import { Link, useLocation } from 'react-router-dom';  
import {LOGIN} from '../utils/mutations'; // Renamed the imported LOGIN to LOGIN_MUTATION
import Auth from '../utils/auth';


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const location = useLocation();
    const backgroundClass = location.pathname === '/' ? 'home-background' : 'login-background';
  
    useEffect(() => {
      document.body.className = backgroundClass;
      return () => {
        document.body.className = '';
      };  
    }, [backgroundClass]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link style={{ color:'white'}} to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
