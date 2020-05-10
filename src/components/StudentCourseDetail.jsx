import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';

import Header from './Header';
import OpacityLayout from './OpacityLayout';
import '../assets/styles/Global.scss';
import '../assets/styles/StudentCourseDetail.scss';

const StudentCourseDetail = (props) => {

  const [all, setAll] = useState({
    isLogged: true,
    isLoading: false,
    infoCourses: [],
    modules: [],
    scoreCount: 0,
  });

  const handleGetModules = () => {
    setAll({
      ...all,
      isLoading: true,
    });

    fetch(`http://localhost:8000/modules/student/${cookie.get('courseId')}/${cookie.get('id')}`,
      {
        method: 'get',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const modules = data.data;
        let count = 0;
        for (const i in modules) {
          count += modules[i].score
        }
        setAll({
          ...all,
          isLoading: false,
          modules: data.data,
          scoreCount: Math.floor((count / modules.length) * 10) / 10,
        });
      })
      .catch((error) => {
        setAll({
          ...all,
          isLoading: false,
        });
        console.log(error);
      });
  };

  useEffect(() => {
    setAll({
      ...all,
      isLoading: true,
    });

    fetch(`http://localhost:8000/courses/get-info/${cookie.get('courseId')}`,
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
          infoCourses: data.data,
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

  const handlerBack = () => {
    cookie.remove('courseId');
    cookie.remove('courseName');
    window.location.href = '/home';
  };

  const handlerSignout = () => {
    setAll({
      ...all,
      isLoading: true,
      isLogged: false,
    });
    cookie.remove('id');
    cookie.remove('fullname');
    cookie.remove('profile');
    cookie.remove('courseId');
    cookie.remove('courseName');
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
        <Header backButton={handlerBack} signoutButton={handlerSignout} />
        <div className='StudentCourseDetail__container'>
          <div className='StudentCourseDetail__course-name'>
            <h3>Curso de {cookie.get('courseName')}</h3>
          </div>
          <div className='StudentCourseDetail__score'>
            {
              all.modules.length !== 0 ?
                <h3>Nota del curso {all.scoreCount === 0 ? 'Pendiente' : all.scoreCount}</h3> :
                <></>
              // all.infoCourses.map((info) => {
              //   if (Number(info.id_student) === Number(cookie.get('id'))) {
              //     return <h3>Nota del curso {all.scoreCount === 0 ? 'Pendiente' : all.scoreCount }</h3>;
              //   }
              // })
            }
          </div>
          <div className='StudentCourseDetail__classmates'>
            <h3>Mis compañeros</h3>
            <div>
              {
                all.infoCourses.map((info, i) => {
                  if (Number(info.id_student) !== Number(cookie.get('id'))) {
                    return <p className='StudentCourseDetail__item-classmates' key={info.id_student}>{info.fullname}</p>;
                  }
                })
              }
            </div>
          </div>
          <div className='StudentCourseDetail__module'>
            <button type='button' className='StudentCourseDetail__button-calculate' onClick={handleGetModules}>Ver Materias y nota de curso</button>
            {
              all.modules.length ? all.modules.map((module) => {
                return (
                  <div className='StudentCourseDetail__module-list' key={module.name}>
                    {module.name}
                    <div>
                      {!module.score ? 'Nota pendiente' : module.score}
                    </div>
                  </div>
                );
              }) : <></>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCourseDetail;
