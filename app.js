const form = document.querySelector("form")
const questionDivs = document.querySelectorAll(".questionDiv")
const scoreDiv = document.querySelector("#scoreDiv")
const scoreText = document.querySelector("#score")
const popUp = document.querySelector("#exampleModal")
const submitButton = document.querySelector(".submitButton")
const reloadButton = document.querySelector(".reloadButton")

const modalClassCloseItens = ["simbol-modal-close", "btn-modal-close", "modal"]

const userAnswers = []
const optionsArray = []

let score = 0
let scoreCounter = 0
let divQuestionNumber = 2

const allInputs = div => {
  const verifyIfItsAQuestion = element => {
    const isItAnInput = element.tagName === "INPUT"
    if (isItAnInput) {
      optionsArray.push(element)
    }
  }
  Array.from(div.children).forEach(verifyIfItsAQuestion)
}
const pushElementsIntoArray2 = questionDivs.forEach(allInputs)

const setCheckedAndRemove = event => {
  event.target.setAttribute("checked", "s")
  userAnswers.push(event.target.dataset.answer)
  optionsArray.forEach(itHasChecked)
  questionDivs.forEach(element => {
    if (element.classList.contains(`questionText${divQuestionNumber}`)) {
      element.classList.remove("d-none")
    }
  })
  if (divQuestionNumber === 11) {
    submitButton.classList.remove("d-none")
  }
  divQuestionNumber++
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
    if (scoreCounter === score) {
      clearInterval(timer)
    }
    scoreText.textContent = `${scoreCounter}%`
    scoreCounter++
  }
  const disableSubmitButton = () => {
    submitButton.setAttribute("disabled", "")
  }
  event.preventDefault()
  userAnswers.forEach(addingScore)
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

const addingScore = userAnswer => {
  if (userAnswer === "right") {
    score += 10
  }
}

const colorAwnsers = (_, index) => {
  const colorRightAndWrong = element => {
    const correctAnswer =
      element.dataset.answer === "right" &&
      element.getAttribute("name") === `question${index + 1}`

    const wrongAnswer = element.dataset.answer === "wrong"

    if (correctAnswer) {
      element.classList.remove("btn-primary")
      element.classList.add("btn-success")
    } else if (wrongAnswer) {
      element.classList.remove("btn-primary")
      element.classList.add("btn-danger")
    }
  }
  optionsArray.forEach(colorRightAndWrong)
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
