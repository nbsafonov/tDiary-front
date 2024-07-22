import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios';
import { format } from 'date-fns';
import './adaptiveNav.css'



function ComplGoal() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [reps, setReps] = useState('');
  const [exercises, setExercises] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);

  // Получение сегодняшней даты

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('ru-RU', options);
  const oDate = format(today, 'yyyy-MM-dd');


  // Получение данны из дневника за сегодня!

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/diary?username=${Cookies.get('username')}`);
        const todayEntries = response.data.filter(entry => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === today.getFullYear() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getDate() === today.getDate()
          );
        });
        setDiaryEntries(todayEntries);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const today = new Date();
    fetchDiaryEntries();
  }, [navigate]);



  const dellCookies = () => {
    Cookies.remove('username');
    Cookies.remove('password');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Проверка куков
  if (!Cookies.get('username') || !Cookies.get('password')) {
    navigate('/');
    return null;
  }

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleAddExercise = () => {
    if (selectedExercise && reps) {
      // Проверяем, есть ли упражнение уже в списке
      const existingExercise = exercises.find(ex => ex.exercise === selectedExercise);
      if (existingExercise) {
        // Если упражнение уже есть, обновляем количество повторений
        const updatedExercises = exercises.map(ex => {
          if (ex.exercise === selectedExercise) {
            return { exercise: ex.exercise, reps: parseInt(ex.reps) + parseInt(reps) };
          }
          return ex;
        });
        setExercises(updatedExercises);
      } else {
        // Если упражнения нет в списке, добавляем его
        setExercises([...exercises, { exercise: selectedExercise, reps: reps }]);
      }
      setSelectedExercise('');
      setReps('');
    }
  };



  const handleMarkInDiary = () => {
    // Сохранение упражнений в базу данных
    axios.post('http://localhost:8081/diary', {
      username: Cookies.get('username'),
      date: oDate,
      exercises: exercises
    })
      .then(res => {
        // Очистка списка упражнений
        setExercises([]);
        navigate('/mydiary')
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Получение данны из дневника 

  return (
    <div className='d-flex flex-column justify-content-start align-items-center vh-100' style={bgStyle}>
      <div className="navbar w-100 vh-15 d-flex bg-white m-3 ">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div className='d-flex'>
            <Link to='/' className="navbar-brand" onClick={dellCookies}><i className="fa-regular fa-circle-left p-2"></i>Выход</Link>
          </div>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column p-3 border'>
              <div className=" ">Вы вошли как: <span className='fs-5'>{Cookies.get('username')}</span></div>
              <div className=" ">Сегодня: {formattedDate} </div>
            </div>
            <Link to='/complgoal' className="navbar-brand "><i className="fa-regular fa-square-check p-2"></i>Отметить выполнение</Link>
            <Link to='/mydiary' className="navbar-brand"><i className="fa-solid fa-book p-2"></i>Дневник</Link>
          </div>
        </div>
      </div>

      <div className="navbar w-100 vh-15 d-flex align-items-start p-5 flex-column bg-white m-3">
        <h2>Отмечаем выполнение</h2>
        <div className="content">
          <div className="content__left">
            <form className='p-3 d-flex justify-content-start flex-column'>
              <h6 className='p-3'>Выберите упражнение:</h6>
              <select className="form-select form-select-sm m-3" aria-label="Small select" value={selectedExercise} onChange={handleExerciseChange}>
                <option value="" style={kOs}></option>
                <option value="Отжимания от пола">Отжимания от пола</option>
                <option value="Присядания">Присядания</option>
                <option value="Подтягивания на перекладине">Подтягивания на перекладине</option>
                <option value="Скручивания на пресс">Скручивания на пресс</option>
              </select>
              <h6 className='p-3'>Количество повторений:</h6>
              <div className="mb-3 p-3">
                <input className="form-control" value={reps} onChange={handleRepsChange} />
              </div>
              <button type="button" className="btn btn-primary " onClick={handleAddExercise}>Добавить в список</button>
            </form>
          </div>
          <div className="content__right ">
            <div className=' list p-3 d-flex flex-column '>
              <h6 className='p-3'>Список упражнений:</h6>
              {diaryEntries.length > 0 ? (
                <p className='p-3 text-success'>{Cookies.get('username')}, вы уже сегодня отметились в денвнике! Приходите завтра!</p>
              ) : (
                exercises.length > 0 ? (
                  <ul className='list-unstyled  p-3'>
                    {exercises.map((exercise, index) => (
                      <li key={index}>
                        {exercise.exercise} - {exercise.reps} повторений
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='p-3'>Список пуст. Начните отмечать упражнния!</p>
                )
              )}
              {diaryEntries.length === 0 && exercises.length > 0 && (
                <button type="submit" className="btn btn-success m-3" onClick={handleMarkInDiary}>Отметить в дневнике</button>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplGoal

const bgStyle = {
  backgroundColor: 'rgb(211, 181, 142)'
};

const kOs = {
  display: 'none'
}
