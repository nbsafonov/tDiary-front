import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function MyDiary() {
    const navigate = useNavigate();
    const [diaryEntries, setDiaryEntries] = useState([]);

    const dellCookies = () => {
        Cookies.remove('username');
        Cookies.remove('password');
        navigate('/');
    };

    // Получение сегодняшней даты
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('ru-RU', options);

    // Получение записей из базы данных
    useEffect(() => {
        const fetchDiaryEntries = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/diary?username=${Cookies.get('username')}`);
                setDiaryEntries(response.data);
            } catch (error) {
                console.error('Error fetching diary entries:', error);
            }
        };

        if (Cookies.get('username') && Cookies.get('password')) {
            fetchDiaryEntries();
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='d-flex flex-column justify-content-start align-items-center vh-100 w-100' style={bgStyle}>
            <div className="navbar w-100 vh-15 d-flex bg-white m-3 ">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className='d-flex'>
                        <Link to='/' className="navbar-brand" onClick={dellCookies}>
                            <i className="fa-regular fa-circle-left p-2"></i>Выход
                        </Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column p-3 border'>
                            <div className=" ">Вы вошли как: <span className='fs-5'>{Cookies.get('username')}</span></div>
                            <div className=" ">Сегодня: {formattedDate} </div>
                        </div>
                        <Link to='/complgoal' className="navbar-brand ">
                            <i className="fa-regular fa-square-check p-2"></i>Отметить выполнение
                        </Link>
                        <Link to='/mydiary' className="navbar-brand">
                            <i className="fa-solid fa-book p-2"></i>Дневник
                        </Link>
                    </div>
                </div>
            </div>
            <div className="navbar w-100 vh-15 d-flex align-items-start p-5 flex-column bg-white m-3 gap-3">
                <h2 className=''>Дневник</h2>
                {diaryEntries.length === 0 ? (
                    <p className="">Дневник пуст</p>
                ) : (
                    <div className="diary-entries d-flex flex-column-reverse w-100 gap-4">
                        {diaryEntries.map((entry, index) => (
                            <div key={index} className='border p-3 w-100'>
                                <h4>{new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</h4>
                                <ul className='list-unstyled'>
                                    {JSON.parse(entry.exercises).map((exercise, i) => (
                                        <li key={i} >
                                            {exercise.exercise} - {exercise.reps} повторений
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyDiary;

const bgStyle = {
    backgroundColor: 'rgb(211, 181, 142)'
};