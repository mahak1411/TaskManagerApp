import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AllTask from './pages/AllTask';
import ImpTask from './pages/ImpTask';
import CompleteTask from './pages/CompleteTask';
import IncompleteTask from './pages/IncompleteTask';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signup');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path='/impTasks' element={<ImpTask />} />
          <Route path='/completeTasks' element={<CompleteTask />} />
          <Route path='/IncompleteTasks' element={<IncompleteTask />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
