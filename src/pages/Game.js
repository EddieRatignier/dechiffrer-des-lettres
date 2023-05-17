import React from 'react';
import '../assets/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay, faGaugeSimple } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';

export default function Game() {
    const navigate = useNavigate();

    return (
        <>
            <div className='app'>
                <Logo />
                <div className='container slide-right'>
                    <div className='box'>
                        <div className='title-box'>Bienvenue</div>
                        <span className='rules'>Basé sur la manche <span className='italic'>Le mot le plus long</span> de la célèbre émission <span className='italic'>Des chiffres et des lettres</span>, vous devez construire les 5 meilleurs mots avec un tirage aléatoire de 10 lettres.<br></br>Le score de chaque mot est calculé en fonction de sa longueur et des lettres qui le composent. La valeur de chaque lettre est identique au jeu <span className='italic'>Le Scrabble</span>.</span>
                        <button className='button w-100 bg-normal' onClick={() => navigate('/daily')}><FontAwesomeIcon icon={faPlay} style={{ color: 'white', marginRight: '8px' }} />Jouer le tirage du jour</button>
                        <button className='button w-100 bg-dark' onClick={() => navigate('/training')}><FontAwesomeIcon icon={faGaugeSimple} style={{ color: 'white', marginRight: '8px' }} />Mode entrainement</button>
                    </div>
                </div>
            </div>
            <div className="css-gbfwo9"><span className="css-157xav3"></span><span className="css-twyun3"></span><span className="css-17ntouw"></span></div>
            <div className="footer">Développé avec <FontAwesomeIcon style={{ color: '#ED213A', marginLeft: '5px', marginRight: '5px' }} icon={faHeart} size="lg" /> par Eddie.&nbsp;<a href="https://www.linkedin.com/in/eddie-ratignier/" target="_blank" style={{ textDecoration: 'none', color: '#ababab' }}>Retrouvez-moi sur<FontAwesomeIcon icon={faLinkedin} size="lg" style={{ color: '#0077B5', marginLeft: '5px' }} /></a></div>
        </>
    );
};