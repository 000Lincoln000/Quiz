const form = document.querySelector("form")
const questionDivs = document.querySelectorAll(".questionDiv")
const scoreDiv = document.querySelector("#scoreDiv")
const scoreText = document.querySelector("#score")
const popUp = document.querySelector("#exampleModal")
const submitButton = document.querySelector(".submitButton")
const reloadButton = document.querySelector(".reloadButton")

const modalClassCloseItens = ["simbol-modal-close", "btn-modal-close", "modal"]
const correctAnswers = [
  "Um milhão",
  "Austrália",
  "Quatro pares",
  "Tempo indeterminado",
  "Nilo, Amazonas, Mississipi",
  "Entre 4,8 e 5,5 metros",
  "Meteorologia",
  "Oito",
  "Caracóis, caranguejos e lagostas",
  "Baleia azul e golfinhos",
]
const userAnswers = []
const optionsArray = []

let score = 0
let counter = 2

//Adiciona todas opções no array optionsArray
const allInputs = (_, index) => {
  form[`question${index + 1}`].forEach(item => {
    optionsArray.push(item)
  })
}
const pushElementsIntoArray = correctAnswers.forEach(allInputs)

const setCheckedAndRemove = event => {
  event.target.setAttribute("checked", "s")
  userAnswers.push(event.target.value)
  optionsArray.forEach(itHasChecked)
  questionDivs.forEach(element => {
    if (element.classList.contains(`questionText${counter}`)) {
      element.classList.remove("d-none")
    }
  })
  if (counter === 11) {
    submitButton.classList.remove("d-none")
  }
  counter++
}

const itHasChecked = item => {
  if (
    !item.hasAttribute("checked") &&
    item.getAttribute("name") === event.target.name
  ) {
    item.setAttribute("disabled", "")
  }
}

const verifyAnswers = event => {
  const animateScore = () => {
    if (counter === score) {
      clearInterval(timer)
    }
    scoreText.textContent = `${counter}%`
    counter++
  }
  const disableSubmitButton = () => {
    submitButton.setAttribute("disabled", "")
  }
  event.preventDefault()
  correctAnswers.forEach(addingScore)
  questionDivs.forEach(colorAwnsers)
  const timer = setInterval(animateScore, 20)

  scoreDiv.classList.remove("d-none")
  popUp.classList.add("show")
  popUp.setAttribute("style", "display:block")
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })

  setTimeout(disableSubmitButton, 1000)
  reloadButton.classList.remove("d-none")
}

const addingScore = (_, index) => {
  if (correctAnswers[index] === userAnswers[index]) {
    score += 10
  }
}

const colorAwnsers = (div, index) => {
  Array.from(div.children).forEach(element => {
    const correctAnswer =
      element.value === correctAnswers[index] &&
      element.getAttribute("name") === `question${index + 1}`

    const wrongAnswer = element.tagName === "INPUT"

    if (correctAnswer) {
      element.classList.remove("btn-primary")
      element.classList.add("btn-success")
    } else if (wrongAnswer) {
      element.classList.remove("btn-primary")
      element.classList.add("btn-danger")
    }
  })
}

const showHidePopUp = event => {
  const classOfClickedElements = event.target.classList[0]
  const isACloseElement = element => {
    return element === classOfClickedElements
  }
  const souldItModalClose = modalClassCloseItens.some(isACloseElement)

  if (souldItModalClose) {
    popUp.classList.remove("show")
    popUp.removeAttribute("style", "display:block")
  }
}

const reset = () => {
  location.reload()
}

optionsArray.forEach(item => {
  item.addEventListener("click", setCheckedAndRemove)
})

popUp.addEventListener("click", showHidePopUp)
submitButton.addEventListener("click", verifyAnswers)
reloadButton.addEventListener("click", reset)
