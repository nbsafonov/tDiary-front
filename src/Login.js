import React, { useState } from 'react'
import backgroundImage from './bg.jpg';
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios'
import Cookies from 'js-cookie'
import './mainpageStyle.css'

function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (values.username !== '' && values.password !== ''){
        axios.post('http://localhost:8081/login',values)
        .then(res => {
            if(res.data === "Success") {
                Cookies.set('username', values.username);
                Cookies.set('password', values.password);
                navigate('/mydiary')
            }
            else 
            setErrorMessage('Неверный логин или пароль');
        })
        .catch(err => console.log (err));
    }};

    return (
        <div className='d-flex justify-content-center align-items-center vh-100' style={backgroundStyle}>
            <div style={overlayStyle}>
                <div style={wrapper}>
                    <div style={header}>
                        <h2 style={Logo}>TrainingDiary</h2>
                    </div>
                    <div className='content'>
                        <div className='textStyle'>
                            Записывайте результаты тренировок и наблюдайте свой прогресс
                        </div>
                        <div className='bg-white p-3 rounded '>
                            <h2 style={formTitle}>Вход</h2>
                            <form action='' onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='login'><strong>Логин</strong></label>
                                    <input type='text' placeholder='Введите ваш логин' name='username' onChange={handleInput} className='form-control rounded-0' />
                                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password'><strong>Пароль</strong></label>
                                    <input type='password' placeholder='Введите ваш пароль' name='password' onChange={handleInput} className='form-control rounded-0' />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                                <button type='submit' className='btn btn-success w-100'>Войти</button>
                                <Link to='/signup' className='btn btn-default border w-100 bg-light text-decoration-none'>Зарегистрироваться</Link>
                            </form>
                        </div>
                    </div>
                    <div style={footer}>
                        <div>
                            <span className='copyright'>© 2024 NIKOLAY B. SAFONOV</span>
                        </div>
                        <div>
                            <div style={foterSoc}>
                                <i className="fab fa-facebook"></i>
                                <i className="fab fa-telegram"></i>
                                <i className="fab fa-github"></i>
                                <i className="fab fa-whatsapp"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

const Logo = {
    fontFamily: 'Playwrite PL, cursive',
    fontOpticalSizing: 'auto',
    fontStyle: 'normal',
    fontSize: '30px',
    fontWeight: '700',
    color: 'white',
    padding: '30px'
}

const wrapper = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

const header = {
    width: '100%',
    height: '10vh'
}


const footer = {
    width: '100%',
    height: '10vh',
    borderTop: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const formTitle = {
    color: 'black',
    fontFamily: 'Roboto, sans-serif',
    marginRight: '2rem',
    maxWidth: '500px',
    fontSize: '2.2rem',
    lineHeight: '1.5',
    alignItems: 'center'
}

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};

const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};





const foterSoc = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'aliceblue',
    paddingLeft: '30px',
    paddingRight: '30px',
    gap: '20px',
    fontSize: '20px',
    cursor: 'pointer'
};