import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from '../components/Signin';
import Home from '../components/Home';
import StudentCourseDetail from '../components/StudentCourseDetail';
import TeacherCourseDetail from '../components/TeacherCourseDetail';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Signin} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/my-course' component={StudentCourseDetail} />
      <Route exact path='/teacher-course' component={TeacherCourseDetail} />
    </Switch>
  </BrowserRouter>
);

export default App;
