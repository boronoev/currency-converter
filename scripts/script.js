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

document.querySelector('.button__change').ondragstart = function () {
  return false;
};



// if ((document.querySelector("input.input__amount").value)) {
//   document.querySelector("input.input__amount").addEventListener("input", () => {
//     document.querySelector("input.input__amount").value = new Intl.NumberFormat('ru-RU').format(document.querySelector("input.input__amount").value.replace(/\s/g, ''));
//   })
// }//форматирование чисел с добавлением пробелов

let from;
let to;
document.querySelectorAll('.currency__from').forEach(element => {if (element.value === '1'){from = element.textContent}})
document.querySelectorAll('.currency__to').forEach(element => {if (element.value === '1'){to = element.textContent}})
const url = 'https://api.exchangerate.host/latest';
fetch(`${url}?base=${from}&symbols=${to}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.rate-from').textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
    document.querySelector('.rate-to').textContent = `1 ${to} = ${(1/data.rates[`${to}`]).toFixed(4)} ${from}`;
    document.querySelector('.input-to').value = data.rates[`${to}`]
    document.querySelector("input.input__amount").addEventListener("input", () => {
      document.querySelector("input.input-to").value = data.rates[`${to}`] * document.querySelector('.input__amount').value;
    })
    console.log(data.rates[`${to}`] * 1)
  })

  document.querySelectorAll('.currency__to').forEach(element => {
    element.addEventListener('click', () => {
      document.querySelectorAll('.currency__to').forEach(element => {
        element.style.backgroundColor = "white";
        element.style.borderColor = "#E5E5E5";
        element.style.color = "#C6C6C6";
        element.value = '0'
      })
      element.value = '1'
      element.style.backgroundColor = "#833AE0";
      element.style.borderColor = "#833AE0";
      element.style.color = "white";
      document.querySelectorAll('.option__currency').forEach(option => {
        option.style.backgroundColor = "white";
      })
    })
  })
  
  document.querySelectorAll('.currency__from').forEach(element => {
    element.addEventListener('click', () => {
      document.querySelectorAll('.currency__from').forEach(element => {
        element.style.backgroundColor = "white";
        element.style.borderColor = "#E5E5E5";
        element.style.color = "#C6C6C6";
        element.value = '0'
  
      })
      element.value = '1'
      element.style.backgroundColor = "#833AE0";
      element.style.borderColor = "#833AE0";
      element.style.color = "white";
      document.querySelectorAll('.option__currency').forEach(option => {
        option.style.backgroundColor = "white";
      })
    })
  })
