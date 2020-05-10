import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';

import Header from './Header';
import OpacityLayout from './OpacityLayout';
import '../assets/styles/Global.scss';
import '../assets/styles/Home.scss';

const Home = (props) => {

  const [all, setAll] = useState({
    isLogged: true,
    isLoading: false,
    courses: [],
  });

  const handleGoToCourse = (selection, courseName) => {
    setAll({
      ...all,
      isLoading: true,
    });
    cookie.set('courseId', selection);
    cookie.set('courseName', courseName);
    if (cookie.get('profile') === 'student') {
      window.location.href = '/my-course';
    } else {
      window.location.href = '/teacher-course';
    }
  };

  useEffect(() => {
    cookie.remove('courseId');
    cookie.remove('courseName');
    setAll({
      ...all,
      isLoading: true,
    });

    let url = '';
    if (cookie.get('profile') === 'student') {
      url = `http://localhost:8000/courses/student/${cookie.get('id')}`;
    } else {
      url = `http://localhost:8000/courses/teacher/${cookie.get('id')}`;
    }
    fetch(url,
      {
        method: 'get',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAll({
          ...all,
          isLoading: false,
          courses: data.data,
        });
      })
      .catch((error) => {
        setAll({
          ...all,
          isLoading: false,
        });
        console.log(error);
      });
  }, []);

  const handlerSignout = () => {
    setAll({
      ...all,
      isLoading: true,
      isLogged: false,
    });
    cookie.remove('id');
    cookie.remove('fullname');
    cookie.remove('profile');
  };

  if (!all.isLogged) {
    window.location.href = '/';
  }

  return (
    <>
      {
        all.isLoading ?
          <OpacityLayout /> :
          <></>
      }
      <div className='Main-container'>
        <Header signoutButton={handlerSignout} />
        <div className='Home__container'>
          <div className='Home__container-list'>
            {
              cookie.get('profile') === 'student' ?
                (
                  <>
                    <div className='Home__title'>
                      <h2>Mis cursos</h2>
                    </div>
                    <div className='Home__list'>
                      {
                        all.courses.map((course) => {
                          return <div className='Home__list-options' key={course.name} onClick={() => handleGoToCourse(course.id, course.name)}><p>Curso de {course.name}</p></div>;
                        })
                      }
                    </div>
                  </>
                ) :
                (
                  <>
                    <div className='Home__title'>
                      <h2>Mis cursos</h2>
                    </div>
                    <div className='Home__list'>
                      {
                        all.courses.map((course) => {
                          return <div className='Home__list-options' id={course.id} key={course.name} onClick={() => handleGoToCourse(course.id, course.name)}><p>Curso de {course.name}</p></div>;
                        })
                      }
                    </div>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
