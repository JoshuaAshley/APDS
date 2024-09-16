import React, { useState } from 'react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: name,
      password: password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    try {
      // Declare the response correctly
      const response = await fetch('http://localhost:3001/user/signup', requestOptions);
      
      const result = await response.json();
      if (response.ok) {  // Check if the response is 200-299
        alert('Signup successful');
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      // Catch any error during the fetch request
      console.error('Error:', error);
      alert('There was an error with the signup process');
    }
  }; 

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;