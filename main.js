function add() {
    let x = localStorage.length;
    let text = document.getElementById('text').value;
    localStorage.setItem((x + 1), text);
    document.querySelector('.comments').insertAdjacentHTML('afterbegin',
        `
            <div class=com>
                ${localStorage.getItem(x + 1)}
            </div>
        `)
}

function comments() {
    // localStorage.clear()
    let x = localStorage.length;
    for (i = 1; i <= x; i++) {
        document.querySelector('.comments').insertAdjacentHTML('afterbegin',
            `
            <div class=com>
                ${localStorage.getItem(i)}
            </div>
        `)
    }
}



