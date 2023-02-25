const textArea = document.querySelector('#text');
const title = document.querySelector('#title');
const input = document.querySelector('#input');
const form = document.querySelector('#form');
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

    reset.addEventListener('click', () => {
      li.style.display = 'flex';
      input.value = '';
      input.focus();
    });

    const realYear = date.split('.')[0];
    const realMonth = date.split('.')[1];
    const today = new Date();
    const todayDay = today.getDate();

    months.forEach(month => {
      if (month.number === realMonth) {
        title.textContent = todayDay + ' ' + month.name + ' ' + realYear;
      }
    });

    if (quake.mag >= 5) {
      span.style.color = 'red';
      span.style.backgroundColor = '#f2d3d3';
      li.style.backgroundColor = '#f2e6e6';
      alert(
        `${quake.title} konumunda ${quake.mag} büyüklüğünde deprem oldu (${quake.date})`
      );
    } else if (quake.mag >= 4) {
      span.style.color = 'orange';
      span.style.backgroundColor = '#f2e8d3';
      li.style.backgroundColor = '#f2eee6';
    } else if (quake.mag >= 3) {
      span.style.color = 'blue';
      span.style.backgroundColor = '#d3e8f2';
      li.style.backgroundColor = '#e6f2f2';
    } else {
      span.style.color = 'green';
      span.style.backgroundColor = '#d3f2d3';
      li.style.backgroundColor = '#e6f2e6';
    }

    if (numbers.includes(quake.mag)) {
      span.textContent = quake.mag + '.0 ' + date.split(' ')[1];
    }

    span.style.alignSelf = 'center';
    span.style.padding = '10px 0';
    span.style.userSelect = 'none';
    span.style.textAlign = 'center';
    span.style.maxWidth = '70px';
    span.style.borderRadius = '3px';

    li.style.alignSelf = 'center';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.cursor = 'pointer';

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

setInterval(getQuakes(), 60000);
