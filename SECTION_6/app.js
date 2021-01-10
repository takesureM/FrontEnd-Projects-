const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser()
getRandomUser()
getRandomUser()
//fetch random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();


    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

function addData(obj) {
    data.push(obj);

    updateDom();
}

function updateDom(providedData = data) {
    //Clear the main div

    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = ` <strong>${item.name}</strong> 
        ${formatMoney(
            item.money
        )}`;

        main.appendChild(element);
    });
}

//Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double Money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });

    updateDom()
}

//Sort
function Sort() {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDom();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc +=
        user.money), 0);
    const wealthEle = document.createElement('div');
    wealthEle.innerHTML = `<h3>Total Wealth: <strong>
    ${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEle);
}
//Event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', Sort);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
