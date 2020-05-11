import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';

import Header from './Header';
import OpacityLayout from './OpacityLayout';
import GiveRate from './GiveRate';
import NextIcon from '../assets/images/next.png';
import '../assets/styles/Global.scss';
import '../assets/styles/TeacherCourseDetail.scss';

const TeacherCourseDetail = (props) => {

  const [all, setAll] = useState({
    isLoading: false,
    isLogged: true,
    infoCourses: [],
    modules: [],
    selectedModuleId: '',
    giveRateModal: false,
    score: 0,
  });

  const handlerChangeGiveRate = (event) => {
    setAll({
      ...all,
      score: event.target.value,
    });
  };

  const handleGetModules = (courseLogId, studentName) => {
    cookie.set('studentName', studentName);
    setAll({
      ...all,
      isLoading: true,
    });

    fetch(`http://localhost:8000/modules/student/${courseLogId}`,
      {
        method: 'get',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('recibiendo respuesta de nuevo')
        setAll({
          ...all,
          isLoading: false,
          modules: data.data,
          giveRateModal: false,
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

  const llamar = () => {
    handleGetModules(cookie.get('courseId'), cookie.get('studentName'));
  };

  const handleSubmitRate = (event) => {
    event.preventDefault();
    setAll({
      ...all,
      isLoading: true,
    });

    fetch(`http://localhost:8000/modules/student/update/${all.score}/${all.selectedModuleId}`,
      {
        method: 'get',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cookie.remove('moduleName');
        setAll({
          ...all,
          isLoading: false,
          selectedModuleId: '',
          giveRateModal: false,
          score: 0,
        });
        window.location.reload();
        // llamar();
      })
      .catch((error) => {
        setAll({
          ...all,
          isLoading: false,
        });
        console.log(error);
      });

  };

  const handleClick = () => {
    cookie.remove('moduleName');
    setAll({
      ...all,
      giveRateModal: false,
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

  const handlerOpenGiveRate = (moduleId, moduleName) => {
    cookie.set('moduleName', moduleName);
    setAll({
      ...all,
      selectedModuleId: moduleId,
      giveRateModal: true,
    });
  };

  const handlerBack = () => {
    cookie.remove('courseId');
    cookie.remove('courseName');
    cookie.remove('studentName');
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
        all.giveRateModal ?
          <GiveRate onChange={handlerChangeGiveRate} onClick={handleClick} onSubmit={handleSubmitRate} /> :
          <></>
      }
      {
        all.isLoading ?
          <OpacityLayout /> :
          <></>
      }
      <div className='Main-container'>
        <Header backButton={handlerBack} signoutButton={handlerSignout} />
        <div className='TeacherCourseDetail__container'>
          <div className='TeacherCourseDetail__title'>
            <h3>Estudiantes de {cookie.get('courseName')}</h3>
          </div>
          <div className='TeacherCourseDetail__student-list'>
            <div>
              {
                all.infoCourses.map((info) => {
                  return (
                    <div className='TeacherCourseDetail__student-item' onClick={() => handleGetModules(info.courseLogId, info.fullname)} key={info.fullname}>
                      {info.fullname}
                      <img src={NextIcon} alt='Ver materias' />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className='TeacherCourseDetail__module-list'>
            {
              all.modules.length !== 0 ?
                (
                  <>
                    <h3>Materias de {all.modules[0].student_name}</h3>
                    <p>Click en la materia para asignar nota</p>
                  </>
                ) :
                <></>
            }
            {
              all.modules.length ? all.modules.map((module) => {
                return (
                  <div className='TeacherCourseDetail__module-item' onClick={() => handlerOpenGiveRate(module.id, module.name)} key={module.id}>
                    {module.name}
                    <div>
                      {!module.score ? 'Nota pendiente' : module.score }
                    </div>
                  </div>
                );
              }) : <h2>Click en el estudiante para ver materias</h2>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherCourseDetail;
