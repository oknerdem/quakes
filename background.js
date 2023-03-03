const textArea = document.querySelector('#text');
const title = document.querySelector('#title');
const input = document.querySelector('#input');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const reset = document.querySelector('#reset');

const count = 150;
const numbers = [1, 2, 3, 4, 5, 6, 7];
const months = [
  {
    name: 'Ocak',
    number: '01',
  },
  {
    name: 'Şubat',
    number: '02',
  },
  {
    name: 'Mart',
    number: '03',
  },
  {
    name: 'Nisan',
    number: '04',
  },
  {
    name: 'Mayıs',
    number: '05',
  },
  {
    name: 'Haziran',
    number: '06',
  },
  {
    name: 'Temmuz',
    number: '07',
  },
  {
    name: 'Ağustos',
    number: '08',
  },
  {
    name: 'Eylül',
    number: '09',
  },
  {
    name: 'Ekim',
    number: '10',
  },
  {
    name: 'Kasım',
    number: '11',
  },
  {
    name: 'Aralık',
    number: '12',
  },
];

input.focus();

form.addEventListener('keydown', e => {
  if (e.key === 'r' && e.ctrlKey) {
    e.preventDefault();
    reset.click();
  }
});

async function getQuakes() {
  const response = await fetch(
    'https://api.orhanaydogdu.com.tr/deprem/kandilli/live'
  );

  const json = await response.json();
  const quakes = json.result;

  quakes.slice(0, count).forEach(quake => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const date = quake.date;
    span.textContent = quake.mag + ' ' + date.split(' ')[1];

    form.addEventListener('submit', e => {
      e.preventDefault();

      const inputVal = input.value;
      const inputValLower = inputVal.toLowerCase();

      const replaceTurkishWords = inputValLower
        .replace('ç', 'c')
        .replace('ğ', 'g')
        .replace('ı', 'i')
        .replace('ö', 'o')
        .replace('ş', 's')
        .replace('ü', 'u');

      const liText = li.textContent.toLowerCase();

      if (liText.includes(replaceTurkishWords)) {
        li.style.display = 'flex';
      } else {
        li.style.display = 'none';
      }
    });

    search.addEventListener('click', () => {
      input.focus();
    });

    reset.addEventListener('click', () => {
      li.style.display = 'flex';
      input.value = '';
      input.focus();
    });

    const realMonth = date.split('.')[1];
    const today = new Date();
    const todayDay = today.getDate();

    months.forEach(month => {
      if (month.number === realMonth) {
        title.textContent = todayDay + ' ' + month.name;
      }
    });

    if (quake.mag >= 5) {
      alert(
        `${quake.title} konumunda ${quake.mag} büyüklüğünde deprem oldu (${quake.date})`
      );
      li.classList.add('five');
      span.classList.add('fivespan');
    } else if (quake.mag >= 4) {
      li.classList.add('four');
      span.classList.add('fourspan');
    } else if (quake.mag >= 3) {
      li.classList.add('three');
      span.classList.add('threespan');
    } else {
      li.classList.add('two');
      span.classList.add('twospan');
    }

    if (numbers.includes(quake.mag)) {
      span.textContent = quake.mag + '.0 ' + date.split(' ')[1];
    }

    li.textContent = quake.title;
    li.appendChild(span);
    textArea.appendChild(li);

    const myFunc = () => {
      const name = li.textContent.split(' ')[0];
      navigator.clipboard.writeText(name);
    };

    li.onclick = () => myFunc();
  });
}

getQuakes();
