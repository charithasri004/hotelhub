import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';

function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false); // Define the loading state here
  const [error, setError] = useState('');

  async function Login() {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const result = (await axios.post('/api/users/login', user)).data;
      setLoading(false);

      localStorage.setItem('currentuser', JSON.stringify(result));
      window.location.href = '/home';
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
    console.log(user);
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <ErrorMessage message='Invalid credentials' />}
          <div className='bs'>
            <h2>Login</h2>
            <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type="text" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;