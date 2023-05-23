import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

export default function EndManche({ resultsPossible, mot, index, resultValid, earnPoints, newWord }) {

    function fewResults() {
        function comparerLongueur(a, b) {
            return b.length - a.length;
        }
        let tempResultsPossibles = resultsPossible;
        let tempFewResults = [];
        let tempNumber = 0;
        tempResultsPossibles.sort(comparerLongueur);
        for (let i = 0; i < tempResultsPossibles.length; i++) {
            if (i === 0) {
                tempFewResults = tempResultsPossibles[0].toString().toUpperCase();
            } else if (i < 4) {
                tempFewResults = tempFewResults + ', ' + resultsPossible[i].toString().toUpperCase();
                tempNumber = tempNumber + 1;
            } else if (i === tempResultsPossibles.length || i === 4) {
                tempFewResults = tempFewResults + ' ou encore ' + resultsPossible[i].toString().toUpperCase() + '.';
            }
        }

        return tempFewResults;
    }

    return (
        <div className='container slide-left' style={{ color: 'white' }}>
            <div className='box'>
                <div className='title-box'>Fin de la manche  {index + 1}</div>
                {resultValid ?
                    <div>
                        <p className='italic center-text'>Le mot {mot.toUpperCase()} est valide. Vous gagnez</p>
                        <p className='center-text big-text'>{earnPoints} point{earnPoints > 1 ? 's' : ''}</p>
                    </div>
                    :
                    <div>
                        <p className='italic center-text'>Le mot {mot.toUpperCase()} n'est pas valide. Vous gagnez</p>
                        <p className='center-text big-text'>0 point</p>

                    </div>}
                <span>Voici quelques possibilités : {fewResults()}</span>
                <button className='button w-100 bg-normal' onClick={newWord}><FontAwesomeIcon icon={faForward} style={{ color: 'white', marginRight: '8px' }} />Manche suivante</button>

            </div>
        </div>
    );
};