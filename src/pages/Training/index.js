import React, { useState, useEffect } from 'react';
import PlayTraining from './PlayTraining';
import Rules from './Rules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo';
import Cookies from 'js-cookie';

export default function Training() {
    const [status, setStatus] = useState('main');
    const [rules, setRules] = useState({ time: 30, words: 5, voyelles: 3 });
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('rules')) {
            let tempRules = JSON.parse(Cookies.get('rules'));
            setRules(tempRules);
        }
    }, []);

    return (
        <>
            <div className='app'>
                <Logo />
                {status === 'started' ?
                    <PlayTraining rules={rules} />
                    : status === 'menu' ?
                        <Rules setStatus={setStatus} rules={rules} setRules={setRules} />
                        :
                        <div className='container slide-right'>
                            <div className='box'>
                                <div className='title-box'>Mode entrainement</div>
                                <span className='rules'>Entrainez-vous avec des parties entièrement personnalisables.<br></br>Ici, vous devez construire <span className='bold'>LE</span> meilleur possible possible.</span>
                                <button className='button w-100 bg-normal' onClick={() => setStatus('started')}><FontAwesomeIcon icon={faPlay} style={{ color: 'white', marginRight: '8px' }} />Jouer</button>
                                <button className='button w-100 bg-dark' onClick={() => setStatus('menu')}><FontAwesomeIcon icon={faGear} style={{ color: 'white', marginRight: '8px' }} />Paramètres</button>
                                <button className='button w-100 bg-dark' onClick={() => navigate('/')}><FontAwesomeIcon icon={faHouse} style={{ color: 'white', marginRight: '8px' }} />Menu principal</button>
                            </div>
                        </div>
                }
            </div>
            <div className="css-gbfwo9"><span className="css-157xav3"></span><span className="css-twyun3"></span><span className="css-17ntouw"></span></div>
            <div className="footer">Développé avec <FontAwesomeIcon style={{ color: '#ED213A', marginLeft: '5px', marginRight: '5px' }} icon={faHeart} size="lg" /> par Eddie.&nbsp;<a href="https://www.linkedin.com/in/eddie-ratignier/" target="_blank" style={{ textDecoration: 'none', color: '#ababab' }}>Retrouvez-moi sur<FontAwesomeIcon icon={faLinkedin} size="lg" style={{ color: '#0077B5', marginLeft: '5px' }} /></a></div>
        </>
    );
};