document.querySelector('.bank-logo').addEventListener('click', () => {
  location.reload();
})
document.querySelector('.header__item:first-child').addEventListener('click', () => {
  location.reload();
})

document.querySelector('.button__change').addEventListener('click', () => {
  document.querySelector('.button__change').classList.add('active')
  setTimeout(() => {
    document.querySelector('.button__change').classList.remove('active')
  }, 400)
})

const url = 'https://api.exchangerate.host/latest';

document.querySelector('.button__change').ondragstart = function () {
  return false;
};

let array = [];
fetch(`https://api.exchangerate.host/symbols`)
  .then(res => res.json())
  .then(data => {
    array = [...Object.keys(data.symbols)];
    array.forEach(element => {
      let option = document.createElement('option');
      option.textContent = element;
      option.classList.add('option__currency');
      option.value = `${element}`;
      document.querySelector('select.currency__from').append(option);
      option = document.createElement('option');
      option.textContent = element;
      option.classList.add('option__currency');
      option.value = `${element}`;
      document.querySelector('select.currency__to').append(option);
    })
  })
  .catch(error => {
    alert(`Что-то произошло не так! Ошибка: ${error.message}`);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
  })



async function convert(from, to, amount) {
  const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=4`).catch(error => {
    alert(`Что-то произошло не так! Ошибка: ${error.message}`);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
  });
  const json = await res.json();
  return json.result;
}

let from = 'RUB';
let to = 'USD'

let loadingTimer;

const fromInput = document.querySelector('.input-from')
const toInput = document.querySelector('.input-to')
const blockFrom = document.querySelector('#block1')
const blockTo = document.querySelector('#block2')

fetch(`${url}?base=${from}&symbols=${to}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
    document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
    fromInput.value = '1';
    toInput.value = data.rates[`${to}`].toFixed(4);
  })
  .catch(error => {
    alert(`Что-то произошло не так! Ошибка: ${error.message}`);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
  })

fromInput.addEventListener('input', async () => {

  let loadingTimer = setTimeout(() => {
    document.querySelector('.backgroundColor').classList.add('gray');
    document.querySelector('.background').classList.add('loading');
  }, 500);
  toInput.value = await convert(from, to, fromInput.value);
  clearTimeout(loadingTimer);
  document.querySelector('.backgroundColor').classList.remove('gray');
  document.querySelector('.background').classList.remove('loading');

  fetch(`${url}?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
      // clearTimeout(loadingTimer);
      // document.querySelector('.backgroundColor').classList.remove('gray');
      // document.querySelector('.background').classList.remove('loading');
      document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
      document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
    })
    .catch(error => {
      alert(`Что-то произошло не так! Ошибка: ${error.message}`);
      clearTimeout(loadingTimer);
      document.querySelector('.backgroundColor').classList.remove('gray');
      document.querySelector('.background').classList.remove('loading');
    })
})

toInput.addEventListener('input', async () => {
  let loadingTimer = setTimeout(() => {
    document.querySelector('.backgroundColor').classList.add('gray');
    document.querySelector('.background').classList.add('loading');
  }, 500);
  fromInput.value = await convert(to, from, toInput.value)
  clearTimeout(loadingTimer);
  document.querySelector('.backgroundColor').classList.remove('gray');
  document.querySelector('.background').classList.remove('loading');
  fetch(`${url}?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
      document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
    })
    .catch(error => {
      alert(`Что-то произошло не так! Ошибка: ${error.message}`);
      clearTimeout(loadingTimer);
      document.querySelector('.backgroundColor').classList.remove('gray');
      document.querySelector('.background').classList.remove('loading');
    })
})


document.querySelector('.button__change').addEventListener('click', () => {
  let a;
  a = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = a;
  // console.log(document.querySelector('.primary'))

  let oldToText;
  let oldFromText;

  let isOldToButton;
  let osOldFromButton;

  if (blockTo.querySelector('button.primary')) {
    oldToText = blockTo.querySelector('.primary').textContent;
    isOldToButton = true;
  }
  else if (blockTo.querySelector('select.primary')) {
    oldToText = blockTo.querySelector('.primary').value;
    isOldToButton = false
  }

  if (blockFrom.querySelector('button.primary')) {
    oldFromText = blockFrom.querySelector('.primary').textContent;
    osOldFromButton = true;
  }
  else if (blockFrom.querySelector('select.primary')) {
    oldFromText = blockFrom.querySelector('.primary').value;
    osOldFromButton = false;
  }

  if (isOldToButton) {
    document.querySelectorAll('.currency__from').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary')
      if (element.textContent === oldToText) {
        element.value = '1';
        element.classList.add('primary');
        element.style.backgroundColor = "#833AE0";
        element.style.borderColor = "#833AE0";
        element.style.color = "white";
      }
    })
  }
  else {
    blockFrom.querySelector('.select-currency__from').value = oldToText;
    blockFrom.querySelectorAll('.button-currency__from').forEach(element => {
      element.classList.remove('primary')
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.value = '0'
    })
    blockFrom.querySelector('.select-currency__from').style.backgroundColor = "#833AE0";
    blockFrom.querySelector('.select-currency__from').style.borderColor = "#833AE0";
    blockFrom.querySelector('.select-currency__from').style.color = "white";
    blockFrom.querySelector('.select-currency__from').classList.add('primary')
  }


  if (osOldFromButton) {
    document.querySelectorAll('.currency__to').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary');
      if (element.textContent === oldFromText) {
        element.value = '1';
        element.classList.add('primary');
        element.style.backgroundColor = "#833AE0";
        element.style.borderColor = "#833AE0";
        element.style.color = "white";
      }
    })
  }
  else {
    blockTo.querySelector('.select-currency__to').value = oldFromText;
    blockTo.querySelectorAll('.button-currency__to').forEach(element => {
      element.classList.remove('primary')
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.value = '0'
    })
    blockTo.querySelector('.select-currency__to').style.backgroundColor = "#833AE0";
    blockTo.querySelector('.select-currency__to').style.borderColor = "#833AE0";
    blockTo.querySelector('.select-currency__to').style.color = "white";
    blockTo.querySelector('.select-currency__to').classList.add('primary')
  }



  // console.log(oldFromText);
  // console.log(oldToText);
  let x = from;
  from = to;
  to = x;
  fetch(`${url}?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
      document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
    })
    .catch(error => {
      alert(`Что-то произошло не так! Ошибка: ${error.message}`);
      clearTimeout(loadingTimer);
      document.querySelector('.backgroundColor').classList.remove('gray');
      document.querySelector('.background').classList.remove('loading');
    })

})




document.querySelectorAll('.button-currency__from').forEach(element => {
  element.addEventListener('click', async () => {
    document.querySelectorAll('.currency__from').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary')
    })
    document.querySelectorAll('.button-currency__from').forEach(element => {
      element.value = '0'
    })
    from = element.textContent;
    // console.log(from);
    element.value = '1';
    element.classList.add('primary');
    element.style.backgroundColor = "#833AE0";
    element.style.borderColor = "#833AE0";
    element.style.color = "white";
    document.querySelectorAll('.option__currency').forEach(option => {
      option.style.backgroundColor = "white";
    })

    fetch(`${url}?base=${from}&symbols=${to}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
        document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
      })
      .catch(error => {
        alert(`Что-то произошло не так! Ошибка: ${error.message}`);
        clearTimeout(loadingTimer);
        document.querySelector('.backgroundColor').classList.remove('gray');
        document.querySelector('.background').classList.remove('loading');
      })
    loadingTimer = setTimeout(() => {
      document.querySelector('.backgroundColor').classList.add('gray');
      document.querySelector('.background').classList.add('loading');
    }, 500);
    toInput.value = await convert(from, to, fromInput.value);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
    if (fromInput.value === '') { fromInput.value = 1 }
  })
})


document.querySelectorAll('.select-currency__from').forEach(element => {
  element.addEventListener('change', async () => {
    document.querySelectorAll('.currency__from').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary')
    })
    document.querySelectorAll('.button-currency__from').forEach(element => {
      element.value = '0'
    })
    element.classList.add('primary');
    from = element.value;
    // console.log(from);
    element.style.backgroundColor = "#833AE0";
    element.style.borderColor = "#833AE0";
    element.style.color = "white";
    document.querySelectorAll('.option__currency').forEach(option => {
      option.style.backgroundColor = "white";
    })
    fetch(`${url}?base=${from}&symbols=${to}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
        document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
      })
      .catch(error => {
        alert(`Что-то произошло не так! Ошибка: ${error.message}`);
        clearTimeout(loadingTimer);
        document.querySelector('.backgroundColor').classList.remove('gray');
        document.querySelector('.background').classList.remove('loading');
      })
    loadingTimer = setTimeout(() => {
      document.querySelector('.backgroundColor').classList.add('gray');
      document.querySelector('.background').classList.add('loading');
    }, 500);
    toInput.value = await convert(from, to, fromInput.value);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
    if (fromInput.value === '') { fromInput.value = 1 }
  })
})

document.querySelectorAll('.button-currency__to').forEach(element => {
  element.addEventListener('click', async () => {
    document.querySelectorAll('.currency__to').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary')
    })
    document.querySelectorAll('.button-currency__to').forEach(element => {
      element.value = '0'
    })
    element.classList.add('primary');
    to = element.textContent;
    // console.log(to);
    element.value = '1';
    element.style.backgroundColor = "#833AE0";
    element.style.borderColor = "#833AE0";
    element.style.color = "white";
    document.querySelectorAll('.option__currency').forEach(option => {
      option.style.backgroundColor = "white";
    })

    fetch(`${url}?base=${from}&symbols=${to}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
        document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
      })
      .catch(error => {
        alert(`Что-то произошло не так! Ошибка: ${error.message}`);
        clearTimeout(loadingTimer);
        document.querySelector('.backgroundColor').classList.remove('gray');
        document.querySelector('.background').classList.remove('loading');
      })
    loadingTimer = setTimeout(() => {
      document.querySelector('.backgroundColor').classList.add('gray');
      document.querySelector('.background').classList.add('loading');
    }, 500);

    toInput.value = await convert(from, to, fromInput.value);
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
    if (fromInput.value === '') { fromInput.value = 1 }
  })
})

document.querySelectorAll('.select-currency__to').forEach(element => {
  element.addEventListener('change', async () => {
    document.querySelectorAll('.currency__to').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
      element.classList.remove('primary')
    })
    document.querySelectorAll('.button-currency__to').forEach(element => {
      element.value = '0'
    })
    element.classList.add('primary');
    to = element.value;
    // console.log(to);
    element.style.backgroundColor = "#833AE0";
    element.style.borderColor = "#833AE0";
    element.style.color = "white";
    document.querySelectorAll('.option__currency').forEach(option => {
      option.style.backgroundColor = "white";
    })

    fetch(`${url}?base=${from}&symbols=${to}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
        document.querySelector('.rate-to').textContent = `1 ${to} = ${(1 / data.rates[`${to}`]).toFixed(4)} ${from}`;
      })
      .catch(error => {
        alert(`Что-то произошло не так! Ошибка: ${error.message}`);
        clearTimeout(loadingTimer);
        document.querySelector('.backgroundColor').classList.remove('gray');
        document.querySelector('.background').classList.remove('loading');
      })
    loadingTimer = setTimeout(() => {
      document.querySelector('.backgroundColor').classList.add('gray');
      document.querySelector('.background').classList.add('loading');
    }, 500);
    toInput.value = await convert(from, to, fromInput.value)
    clearTimeout(loadingTimer);
    document.querySelector('.backgroundColor').classList.remove('gray');
    document.querySelector('.background').classList.remove('loading');
    if (fromInput.value === '') { fromInput.value = 1 }
  })
})
