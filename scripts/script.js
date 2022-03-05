document.querySelector('.bank-logo').addEventListener('click', () => {
  location.reload();
})
document.querySelector('.header__item:first-child').addEventListener('click', () => {
  location.reload();
})


document.querySelectorAll('.currency__to').forEach(element => {
  element.addEventListener('click', () => {
    document.querySelectorAll('.currency__to').forEach(element => {
      element.style.backgroundColor = "white";
      element.style.borderColor = "#E5E5E5";
      element.style.color = "#C6C6C6";
    })
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

    })
    element.style.backgroundColor = "#833AE0";
    element.style.borderColor = "#833AE0";
    element.style.color = "white";
    document.querySelectorAll('.option__currency').forEach(option => {
      option.style.backgroundColor = "white";
    })
  })
})


document.querySelector('.button__change').addEventListener('click', () => {
  document.querySelector('.button__change').classList.add('active')
  setTimeout(() => {
    document.querySelector('.button__change').classList.remove('active')
  }, 400)
})

document.querySelector('.button__change').ondragstart = function() {
  return false;
};



// if ((document.querySelector("input.input__amount"))){
// document.querySelector("input.input__amount").addEventListener("input", () => {
//   console.log(document.querySelector("input.input__amount").value.replace(/^ +| +$|( ) +/g,"$1"))
//   document.querySelector("input.input__amount").value = new Intl.NumberFormat('ru-RU').format(document.querySelector("input.input__amount").value.replace(/\s/g, ''));
// })
// }



// function deleteSpace(str) {
//   const returnedArr = []
//   for(let i = 0; i < str.length; i++){
//     if(str[i]) {
//       console.log(str[i])
//       returnedArr.push(str[i])
//     } else {console.log(str[i-1], str[i], str[i+1])}
//   }
//   const realReturn = returnedArr.filter(symbol => symbol !== ' ')
//   console.log(realReturn)
//   return realReturn.join('')
// }
