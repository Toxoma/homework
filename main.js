

const dataFromMars = [
    {
        date: '1 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    },
    {
        date: '2 июля 2020 г.',
        temperature: '-69,6 ° F',
        windspeed: '10 миль/ч',
        pressure: '765  ПА',
    },
]
let k = 0
async function postData(data) {
    try {
        const promice = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    dataFromMars.push(data)
                    resolve()
                } catch (error) {
                    console.log('=ERROR1=', error);
                    alert(error)
                }
            }, 1500);
        })
        load()
        await promice
    } catch (error) {
        console.log('=ERROR2=', error);
        alert(error)
    }
}

function getData() {
    try {
        setTimeout(() => {
            try {
                dataFromMars.forEach((data) => {
                    mas = data
                    document.querySelector('.block').insertAdjacentHTML("afterbegin",
                        `<div class="row">
                    ${data.date}, ${data.temperature}, ${data.windspeed}, ${data.pressure}
                    
                    <div class="btns">
                        <button class="btn"
                        onclick=show(${k})>
                            press me
                        </button>
                    </div>
                    </div>
                    `);
                    k++;
                })
                document.getElementById('load').style.display = 'none';
                document.getElementById('block').style.display = 'block'
            } catch (error) {
                alert(error)
                console.log('=ERROR3=', error);
            }
        }, 1000)
    } catch (error) {
        alert(error)
        console.log('=ERROR4=', error);
    }
}

function load() {
    document.querySelector('.wrapp').insertAdjacentHTML("afterbegin",
        `<div class="load" id='load'>
            идёт загрузка!!!
        </div>`)
}

function show(i) {
    const { date, ...otherData } = dataFromMars[i]
    console.log(date);
    console.log(otherData);
}

postData(
    {
        date: '3 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    }
).then(getData)
