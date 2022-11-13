
let col = document.querySelectorAll('.col');


// Событие по клику для закрепления замочка и изменения data-set
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = 
        event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock');
        node.classList.toggle('fa-lock-open'); 
    } else if (type == 'copy') {
        copyToClickText(event.target.textContent)
        let p = document.createElement('p');
        document.body.append(p);
        // let time = setInterval(() => {
        //     p.textContent = 'HEX-код скопирован';
        // });
        // let timeT = setTimeout(()=> {
        //     p.textContent = 'HEX-код скопирован';
        // },)
        // clearTimeout(timeT);

    }

})

// Событие для переключения цветов на странице
document.addEventListener("keydown", event => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setColor();
    }
})
    // Генератор цветов HEX-code
function generateColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for(let i = 0; i < 6; i++) {
        color = color + hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

// Копирование текста в буфер обмена
function copyToClickText(text) {
    return navigator.clipboard.writeText(text);
}

// Добавление цвета и определние его в h2
function setColor(isInitial) {

    const colors = isInitial ? getColorsFromCash : [];
    col.forEach((col, index)=> {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = isInitial 
        ? colors[index]
         ? colors[index]
         : chroma.random() 
        : chroma.random();
        if (isLocked) {
            // console.log(color);
            // text.replaceChild()
            colors.push(text.textContent);
            return
        }
        if (!isInitial) {
            colors.push(color)
        }
        text.textContent = color;
        setColorText(text, color);
        setColorText(button, color);
        col.style.background = generateColor();
    })
    updateColor(colors);
}

// Проверка цвета через библиотеку chrome.js 0.5 - 1
function setColorText(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

// Обновление хэша цветов
function updateColor(colors = []) {
    document.location.hash = colors.map((element)=> {
        return element.toString().replace('#', '');
    }).join('-')


}

// Получение хэша
function getColorsFromCash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring('1').split('-');
    }
    return [];
}


document.addEventListener('DOMContentLoaded', () => {

    setColor(true);
})
