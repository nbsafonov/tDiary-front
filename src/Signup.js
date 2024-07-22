import React, { useState } from 'react'
import backgroundImage from './bg.jpg';
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import Cookies from 'js-cookie'
import './mainpageStyle.css'

function Signup() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        password2: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [signupError, setSignupError] = useState('');
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (values.username !== '' && values.password !== ''){
            axios.post('http://localhost:8081/signup',values)
            .then(res => {
                Cookies.set('username', values.username);
                Cookies.set('password', values.password);
                navigate('/mydiary');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    // Если получен ответ с кодом 400, устанавливаем значение signupError
                    setSignupError(err.response.data.error);
                } else {
                    console.log(err);
                    setSignupError('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
        }})
        
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



                        <div className='bg-white p-3 rounded'>
                            <h2 style={formTitle}>Регистрация</h2>
                            <form action='' onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='username'><strong>Логин</strong></label>
                                    <input type='text' placeholder='Введите ваш логин' onChange={handleInput} name='username' className='form-control rounded-0' />
                                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                                    <span className='text-danger'>{signupError}</span>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password'><strong>Пароль</strong></label>
                                    <input type='password' placeholder='Введите ваш пароль' onChange={handleInput} name='password' className='form-control rounded-0' />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password2'><strong>Повторите пароль</strong></label>
                                    <input type='password' placeholder='Введите ваш пароль' onChange={handleInput} name='password2' className='form-control rounded-0' />
                                    {errors.password2 && <span className='text-danger'>{errors.password2}</span>}
                                </div>
                                <button type='submit' className='btn btn-success w-100'>Зарегистрироваться</button>
                                <p>Вы соглашаетесь с условиями использования приложения</p>
                                <Link to='/' className='btn btn-default border w-100 bg-light text-decoration-none'>Войти</Link>
                            </form>
                        </div>


                        
                    </div>
                    <div style={footer}>
                        <div className='copyright'>
                            <span>© 2024 NIKOLAY B. SAFONOV</span>
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

export default Signup

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