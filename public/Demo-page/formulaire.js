import { createToast, removeToast } from "./js/toastNotification.js";

const acceptCheckbox = document.getElementById('acceptCheckbox')
const submitBtn = document.getElementById('submitBtn')
var enable = true,
    checkEnable = true
const errorNotChecked = document.querySelector('.errorNotChecked')
// const btnText = document.querySelector('btn-text');
const notSelectedProduit = document.querySelector('.notSelectedProduit')

// ================== Formulaire active ==================

const section = document.querySelector('#form'),
    overlay = document.querySelector('.overlay'),
    showBtn = document.querySelectorAll('.show-modal'),
    closeBtn = document.querySelectorAll('.close-btn'),
    corps = document.querySelector('.corps'),
    loginForm = document.querySelector('.login-form'),
    headerLogo = document.querySelectorAll('.logo-header'),
    prevButton = document.querySelector('.btn-prec'),
    registerForm = document.querySelector('.register-form'),
    loginBtn = document.querySelector('.login'),
    registerBtn = document.querySelector('.register'),
    divCheck = document.querySelector('.check'),
    userLogout = document.querySelector('.login__logout'),
    logoutBtn = document.querySelector('.logout')

loginBtn.addEventListener('click', () => {
    loginForm.classList.add('visible'), registerForm.classList.add('invisible')
})
// console.log(userLogout);
registerBtn.addEventListener('click', () => {
    loginForm.classList.remove('visible'), registerForm.classList.remove('invisible')
})

const selectBtn = document.querySelector('.select-btn'),
    items = [...document.querySelectorAll('.item')]

selectBtn.addEventListener('click', () => {
    selectBtn.classList.toggle('open')
})

// -------------deconnexion-----------
logoutBtn.addEventListener('click',async () => {
    sessionFetch('auth/logout')
    window.location.href = '/'
},
false
)
// -------------deconnexion-----------

// ---------affichage icon user si connecter-------
window.addEventListener('load',async()=>{
    console.log('Load');
    var res = await sessionFetch('auth')
    if(res){
        userLogout.classList.add('connected')
    }
})
// ---------affichage icon user si connecter-------

// --------------add toast-----------
const notifications = document.createElement('ul')
    notifications.className = 'notifications'
    document.body.appendChild(notifications)

// --------------add toast-----------

// -------------show Modal---------------
let btnText = document.querySelector('.btn-text'),
    itemsText = document.querySelectorAll('.item-text')
var selectedProduct, cleanSelectedProduct, productName
items.map((item) => {
  console.log(`item:${item}`)
  item.addEventListener(
      'click',()=> handleClick(item)
  )
})
showBtn.forEach((btnShow) => {
    btnShow.addEventListener('click', async () => {
        var res = await sessionFetch('auth')

        if (res) {
            loginForm.classList.remove('visible')
            divCheck.style.display = 'none'
            nom.textContent = res.name
            mail.textContent = res.eMail
            phone.textContent = res.phone
            prevButton.style.display = 'none'
            currentStep = 3
            showCurrentStep()
        }
        productName = btnShow.parentElement.querySelector('h1').textContent
        selectedProduct = []
        // console.log(productName)
        itemsText.forEach((itemText) => {
            if (itemText.textContent == productName) {
                const select = itemText.parentElement
                // console.log(select)
                select.classList.add('checked')
                btnText.textContent = productName
                selectedProduct.push(productName)
            }
        })
        // console.log(items);
        
        section.classList.add('active')
        corps.classList.add('none')
    })
})
function handleClick(item){
  console.log('click')
  item.classList.toggle('checked')
  selectedProduct = []
  let checked = document.querySelectorAll('.checked')

  if (checked && checked.length == 1) {
      checked.forEach((check) => {
          btnText.textContent = `${check.textContent}`
          selectedProduct.push(check.textContent)
      })
      enable = true
  } else if (checked && checked.length > 1) {
      btnText.innerText = `${checked.length} Produits sélectionnés`
      checked.forEach((check) => {
          selectedProduct.push(check.textContent)
      })
      enable = true
  } else {
      btnText.textContent = 'Aucun Produit Sélectionné'
      enable = false
  }
  submitButtonEnabled(enable, checkEnable, notSelectedProduit, 'resolved')
  
}
// -------------show Modal---------------
// =========== NEW CHECKBOX ============

// const selectBtn = document.querySelector(".select-btn"),
//       items = document.querySelectorAll(".item");

// selectBtn.addEventListener("click", () => {
//     selectBtn.classList.toggle("open");
// });

// items.forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("checked");

//         let checked = document.querySelectorAll(".checked"),
//             btnText = document.querySelector(".btn-text");

//             if(checked && checked.length > 0){
//                 btnText.innerText = `${checked.length}`;
//             }else{
//                 btnText.innerText = productName;
//             }
//     });
// })

// =========== NEW CHECKBOX ============

// ---------- form mutlicheckbox ------------

// ---------- form mutlicheckbox ------------
// showBtn.addEventListener('click', () => {
//     section.classList.add("active")
// 	corps.classList.add("none")
// })

closeBtn.forEach((btnClose) => {
    btnClose.addEventListener('click', () => {
        modalClose()
    })
})

overlay.addEventListener('click', () => section.classList.remove('active'))

// ------------------ Formulaire Slide -------------------

const multiStepForm = document.querySelector('[data-multi-step]')
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')]
let currentStep = formSteps.findIndex((step) => {
    return step.classList.contains('active')
})

if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}
var isError
multiStepForm.addEventListener('click', async (e) => {
    let incrementor
    if (e.target.matches('[data-next]')) {
        incrementor = 1
    } else if (e.target.matches('[data-previous]')) {
        incrementor = -1
    }

    if (incrementor == null) return
    isError = true
    const inputs = [...formSteps[currentStep].querySelectorAll('input')]
    const allValid = inputs.every((input) => input.reportValidity())
    if (inputName.value) {
        nom.textContent = inputName.value
        isError = true
    } else if (currentStep == 0 && !inputName.value) {
        errorShake(0)
        isError = false
    }
    if (inputMail.value) {
        isError = await loginFetch(null, inputMail.value, null, '.email-error', null, 'auth')
        mail.textContent = inputMail.value
        if (!isError) {
            errorShake(1)
        }
    } else if (currentStep == 1 && !inputMail.value) {
        errorShake(1)
        isError = false
    }

    if (inputPhone.value) {
        isError = await loginFetch(null, null, inputPhone.value, '.phone-error', null, 'auth')
        phone.textContent = inputPhone.value
        if (!isError) {
            errorShake(2)
        }
    } else if (currentStep == 2 && !inputPhone.value) {
        errorShake(2)
        isError = false
    }

    if (allValid && isError) {
        currentStep += incrementor
        showCurrentStep()
    }
})

formSteps.forEach((step) => {
    step.addEventListener('animationend', (e) => {
        formSteps[currentStep].classList.remove('hide')
        e.target.classList.toggle('hide', !e.target.classList.contains('active'))
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep)
    })
}

// ----------------Enregistrer dans page dernier--------------

// const btnName = document.querySelector('#btnName')
var nom = document.querySelector('#nom'),
    inputName = document.querySelector('#inputName'),
    phone = document.querySelector('#phone'),
    inputPhone = document.querySelector('#inputPhone'),
    mail = document.querySelector('#email'),
    inputMail = document.querySelector('#inputEmail'),
    loginName = document.querySelector('#login-name'),
    loginMail = document.querySelector('#login-mail')
// loginNameError = document.querySelector('.login-name-error'),
// loginMailError = document.querySelector('.login-email-error')
const loginSubmit = document.querySelector('#login-btn')

// btnName.addEventListener('click', () => {
//   nom.textContent = inputName.value
// },false)

// const btnMail = document.querySelector('#btnMail')

// btnMail.addEventListener('click', () => {
//   mail.textContent = inputMail.value
// }, false )

// const btnPhone = document.querySelector('#btnPhone')

// btnPhone.addEventListener('click', () => {
//   phone.textContent = inputPhone.value
// }, false)

// ----------------Fin Enregistrer dans page dernier--------------

// ----------------------Regex pour champ de texte--------------------

// inputName.addEventListener('input', (e)=> {
// const input = e.target.value
// const filter = input.replace(/[^a-zA-Z- ]/g, '')
// inputName.value = filter
// })
// inputPhone.addEventListener('input', (e)=> {
// const input = e.target.value
// const filter = input.replace(/\D/g, '')
// inputPhone.value = filter
// })
const deactivateInput = (input, regex) => {
    input.addEventListener('input', (e) => {
        var value = e.target.value
        var filter = value.replace(regex, '')
        input.value = filter
    })
}

deactivateInput(loginName, /[^a-zA-Z- ]/g)
deactivateInput(inputPhone, /\D/g)
deactivateInput(inputName, /[^a-zA-Z- ]/g)
// ----------------------Regex pour champ de texte--------------------

// ------------------ Formulaire Slide -------------------

// ---------- couleur input -----------

const inputs = document.querySelectorAll('input'),
    inputChamps = document.querySelectorAll('.username'),
    register = document.querySelector('#register_div')

inputs.forEach((input) => {
    input.setAttribute('required', 'true')
    input.setAttribute('autocomplete', 'off')
})

// ---------- couleur input -----------

// ------------ empecher d'envoyer quand pas checké ---------

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    var btnText = document.querySelector('.btn-text')
    if (btnText.textContent != 'Aucun Produit Sélectionné') {
        cleanSelectedProduct = selectedProduct.map((product) => product.trim())
        const data1 = await loginFetch(
            nom.textContent,
            mail.textContent,
            phone.textContent,
            '.email-error',
            null,
            'auth'
        )
        console.log(data1)
        const data3 = await loginFetch(
            nom.textContent,
            mail.textContent,
            phone.textContent,
            '.email-error',
            cleanSelectedProduct,
            'traker'
        )
        // console.log(data3)
        const data2 = await loginFetch(
            null,
            null,
            null,
            '.email-error',
            cleanSelectedProduct,
            'page'
        )
        // console.log(data2)
            
        if (data3 && data1) {
            createToast('success__create__account',notifications)
            userLogout.classList.add('connected')
            var suprrToast = document.querySelector('.supprToast')
            // var notifications = document.querySelector('.notifications')
        //     suprrToast.forEach(toast=>{
        //         toast.addEventListener('click',()=>{
        //         removeToast(notifications)
        //     })
        // })
            modalClose()
        }else if(data3 && !data1) {
            createToast('success__add__product',notifications)
            userLogout.classList.add('connected')
        //     var suprrToast = document.querySelector('.supprToast')
        //     // var notifications = document.querySelector('.notifications')
        //     suprrToast.forEach(toast=>{
        //         toast.addEventListener('click',()=>{
        //         removeToast(notifications)
        //     })
        // })
            modalClose()
        }
    }
})

loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault()
    if (!loginName.value) {
        errorShake(3)
    }
    if (!loginMail.value) {
        errorShake(4)
    }
    if (loginName.value && loginMail.value) {
        isError = await loginFetch(
            loginName.value,
            loginMail.value,
            null,
            '.login-email-error',
            null,
            'auth/login'
        )
        if (!isError) {
            errorShake(3)
            errorShake(4)
        }
        if (isError) {
            createToast('success__connect',notifications)
            userLogout.classList.toggle('connected')
        //     var suprrToast = document.querySelectorAll('.supprToast')
        //     // var notifications = document.querySelector('.notifications')
        //     suprrToast.forEach(toast=>{
        //         toast.addEventListener('click',()=>{
        //         removeToast(notifications)
        //     })
        // })
            modalClose()
        }
    }
})

acceptCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !acceptCheckbox.checked
    if (submitBtn.disabled) {
        checkEnable = false
    }
    if (!submitBtn.disabled) {
        checkEnable = true
    }
    submitButtonEnabled(checkEnable, enable, errorNotChecked, 'error')
})

// ------------ empecher d'envoyer quand pas checké ---------
// -----------------fonction utile-------------

const modalClose = () => {
    var itemsChecked = document.querySelectorAll('.checked')
    section.classList.remove('active')
    corps.classList.remove('none')
    itemsChecked.forEach((item) => {
        item.classList.remove('checked')
    })
}

const errorShake = (index) => {
    const indexUser = [...inputChamps]
    indexUser[index].classList.add('input--invalid')
    indexUser[index].classList.remove('hide')
    inputChamps.forEach((inputChamp) => {
        inputChamp.addEventListener('animationend', (e) => {
            if (e.animationName === 'shake') {
                inputChamp.classList.remove('input--invalid')
            }
        })
    })
    // inputChamp.addEventListener("animationend", (e) => {
    //   if(e.animationName === 'shake') {
    //     inputChamp.classList.remove("input--invalid");
    //   }
    // })
    // inputChamps.forEach(inputChamp => {

    // })
}

const submitButtonEnabled = (check, select, err, classerr) => {
    if (select && check) {
        submitBtn.classList.remove('desabledBtn')
        err.classList.remove(classerr)
    } else if (!check) {
        err.classList.add(classerr)
        submitBtn.classList.add('desabledBtn')
    } else if (check && !select) {
        submitBtn.classList.add('desabledBtn')
        err.classList.remove(classerr)
    } else {
        err.classList.add(classerr)
        submitBtn.classList.add('desabledBtn')
    }
}

// const getCookie = () => {
//   if(document.cookie){
//     const cookieString = document.cookie;
//     const cookies = cookieString.split('; ');
//     let userCookieValue;
//   for (const cookie of cookies) {
//       const [name, value] = cookie.split('=');
//       if (name === 'user') {
//         userCookieValue = decodeURIComponent(value); // Décodez la valeur du cookie si nécessaire
//           break
//           }else{
//             return false
//           }
//       }

//       if (userCookieValue) {
//         // Faites quelque chose avec la valeur du cookie
//         const userInfo = JSON.parse(userCookieValue);
//         return userInfo;
//         }else {
//           console.log('Le cookie "user" n\'existe pas ou est vide.');
//         }
//   }

// }

const sessionFetch = async (url) => {
    const response = await fetch(`/${url}`)
        .then((response) => {
            // Vérifiez si la requête s'est bien déroulée (statut 200)
            if (!response.ok) {
                alert('La requête a échoué !')
            }
            // Transformez la réponse en JSON et renvoyez-la
            return response.json()
        })
        .then((data) => {
            return data
        })
    if (response) {
        return response
    }
}
// http://127.0.0.1:4000
const loginFetch = async (name, eMail, phone, classNom, page, url) => {
    var data = {
        name,
        eMail,
        phone,
        page,
    }
    const errorLog = document.querySelector(classNom)
    const response = await fetch(`/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data
        })
    // if (!response.ok) {
    //   alert('Network response was not ok')
    // }
    errorLog.textContent = response
    switch (response) {
        case `L'utilisateur existe déjà`:
            return false
        case `L'adresse email n'est pas valide`:
            return false
        case response == `Le numéro de téléphone est invalide`:
            return false
        case ``:
            return true
        case 'Votre compte a bien été enregistrer':
            // document.cookie = `user=${JSON.stringify(data)}; path=/; secure; samesite=strict`
            return true
        case 'Pas le bon utilisateur':
            return false
        case 'Connexion réussie':
            return true
    }
}

// -----------------fonction utile-------------

// ================== Formulaire active ==================
