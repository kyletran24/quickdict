import "./popup.css"

const deleteVocab = (event) => {
    const id = event.target.id;
    const lineNum = id[4];

    const targetTerm = document.getElementById('term' + lineNum).innerHTML;
    let vocabArr = JSON.parse(localStorage.getItem("vocabList"));
    vocabArr.splice(vocabArr.indexOf(targetTerm), 1);
    localStorage.setItem("vocabList", JSON.stringify(vocabArr));

    const targetLine = document.getElementById('line' + lineNum);
    targetLine.remove();
};

if (localStorage.getItem("vocabList") !== null) {
    let vocab = document.getElementById('saved-vocab');

    let vocabArr = JSON.parse(localStorage.getItem("vocabList")).reverse();
    // let vocabArr = JSON.parse(localStorage.getItem("vocabList"));
    vocabArr.forEach(function (item, i) {
        // div element for each line
        let line = document.createElement('div');
        line.setAttribute("class", "line");
        line.setAttribute("id", "line" + (i + 1));

        // p for vocab term
        let pElement = document.createElement('p');
        pElement.setAttribute("id", "term" + (i + 1));
        pElement.innerHTML = item;

        // img for delete icon
        let icon = document.createElement('img');
        icon.setAttribute("id", "icon" + (i + 1));
        icon.setAttribute("src", "icons/delete.png");
        icon.setAttribute("width", "30px");
        icon.setAttribute("height", "30px");
        icon.addEventListener('click', deleteVocab, false);

        line.appendChild(pElement);
        line.appendChild(icon);

        vocab.appendChild(line);

    });
}




