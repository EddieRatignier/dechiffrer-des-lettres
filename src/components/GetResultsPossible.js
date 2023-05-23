export default async function GetResultsPossible(tirage) {
    const response = await fetch(process.env.PUBLIC_URL + '/dic.txt')
    const data = await response.text();
    const dictionary = data.split('\n');

    const resultsPossible = dictionary.filter((word) => {
        let tempTirage = [...tirage];
        for (let i = 0; i < word.length; i++) {
            const letterIndex = tempTirage.indexOf(word[i]);
            if (letterIndex === -1) {
                return false;
            }
            tempTirage.splice(letterIndex, 1);
        }
        return true;
    });
    resultsPossible.sort((a, b) => a.length - b.length);

    return resultsPossible;
};