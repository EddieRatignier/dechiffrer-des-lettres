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
                    <span>Le mot <span className='italic'>{mot.toUpperCase()}</span> est valide.<br />Vous gagnez <span className='bold'>{earnPoints} points</span> sur cette manche.</span>
                    :
                    <span>Le mot <span className='italic'>{mot.toUpperCase()}</span> n'est pas valide.<br />Vous ne gagnez pas de point sur cette manche.</span>
                }
                <span>Voici quelques mots qui étaient valides : {fewResults()}</span>
                <button className='button w-100 bg-normal' onClick={newWord}><FontAwesomeIcon icon={faForward} style={{ color: 'white', marginRight: '8px' }} />Manche suivante</button>

            </div>
        </div>
    );
};