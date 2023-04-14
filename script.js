const eachSide = document.querySelector(".eachSide");

const cardNumber = document.querySelector("#cardNumber");
const expiryMonth = document.querySelector("#expiryMonth");
const expiryYear = document.querySelector("#expiryYear");
const cardHolder = document.querySelector("#cardHolder");
const cvv = document.querySelector("#cvv");

const creditNum = document.querySelector(".creditNum");
const cardType = document.querySelector(".cardType");
const cardLogo = [...document.querySelectorAll(".cardLogo")];


let numsArray = ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]


window.addEventListener("DOMContentLoaded", () => {
    let currentYear = new Date().getFullYear();
    let recurr = 20;

    for(let i = 1; i < recurr; i++){
        const option = document.createElement("option");
        option.value = `${currentYear - i}`;
        option.textContent = `${currentYear - i}`
        expiryYear.prepend(option)
    }

    for(let i = 0; i < recurr; i++){
        const option = document.createElement("option");
        option.value = `${currentYear + i}`;
        option.textContent = `${currentYear + i}`
        expiryYear.append(option)
    }

    numsArray.forEach((hash, index) => {
        creditNum.textContent += hash;
        if((index + 1) % 4 == 0){
            creditNum.textContent += `  `
        }
    })
})

const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
const verveRegEx = /^3[47][0-9]{13}/;
const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/;


let numCount = 0;

cardNumber.addEventListener("keyup", () => {
    let lastDigit = cardNumber.value.slice((cardNumber.value.length - 1), (cardNumber.value.length));
    let convertedDigit = parseFloat(lastDigit);
    if(!isNaN(convertedDigit)){
        fillInNums(cardNumber)
    }else{
        return
    }
    checkCardBrand(cardNumber);

    // if(window.KeyboardEvent)
})

cardNumber.onkeyup = (e) => {
    let value = cardNumber.value.length;
    if(e.keyCode == 8 && value != 0){
        fillInBack(cardNumber);
    }else if(e.keyCode == 8 && value == 0){
        numsArray = ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
        creditNum.textContent = ``
        numsArray.forEach((hash, index) => {
            creditNum.textContent += hash;
            if((index + 1) % 4 == 0){
                creditNum.textContent += `  `
            }
        })
    }
}

expiryMonth.addEventListener("change", () => {
    const exMonth = document.querySelector(".ex-month");

    exMonth.textContent = expiryMonth.value;
    
})

expiryYear.addEventListener("change", () => {
    const exYear = document.querySelector(".ex-year");

    exYear.textContent = expiryYear.value;
})

cardHolder.addEventListener("keyup", () => {
    const userName = document.querySelector(".userName");

    userName.textContent = `${cardHolder.value}`
})

cvv.addEventListener("mouseover", () => {
    eachSide.classList.add("turnCard");

    cvv.addEventListener("mouseleave", () => {
        eachSide.classList.remove("turnCard")
    })
})

cvv.addEventListener("keyup", () => {
    const cvvEntry = document.querySelector(".cvvEntry");

    cvvEntry.textContent = `${cvv.value}`

})


function checkCardBrand(cardNumber){
    let myCardNum = cardNumber.value;

    if (visaRegEx.test(myCardNum) && cardNumber.value.length == 16) {
        cardType.innerHTML = ``;
        cardType.append(cardLogo[2])
        cardLogo[2].children[1].style.background = 'none';

      } else if (mastercardRegEx.test(myCardNum) && cardNumber.value.length == 16) {
        cardType.innerHTML = ``;
        cardType.append(cardLogo[0])
        cardLogo[0].children[1].style.background = 'none';

      } else if (verveRegEx.test(myCardNum) && cardNumber.value.length == 16) {
        cardType.innerHTML = ``;
        cardType.append(cardLogo[1]);
        cardLogo[1].children[1].style.background = 'none';

      } else{
        
    } 
}

// credit card number input logic

function fillInNums(cardNumber){

    let length = cardNumber.value.length;

    numsArray = [];
    
    for(let i = 0; i < length; i++){
        numsArray.push(cardNumber.value[i]);
    }

    let hashLen = 15 - length;

    for(let z = 0; z <= hashLen; z++){
        numsArray.push("#")
    }

    creditNum.textContent = ``
    numsArray.forEach((hash, index) => {
        creditNum.textContent += hash;
        if((index + 1) % 4 == 0){
            creditNum.textContent += `  `
        }
    })
}

function fillInBack(cardNumber){
    let length = cardNumber.value.length;
    
    numsArray = [];

    for(let i = 0; i < length; i++){
        numsArray.push(cardNumber.value[i])
    }

    let hashLen = 15 - length;

    for(let z = 0; z <= hashLen; z++){
        numsArray.push("#")
    }

    creditNum.textContent = ``
    numsArray.forEach((hash, index) => {
        creditNum.textContent += hash;
        if((index + 1) % 4 == 0){
            creditNum.textContent += `  `
        }
    })
}