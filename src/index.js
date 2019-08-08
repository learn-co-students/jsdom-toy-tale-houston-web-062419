const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


//this happens in refresh eventlistener and in addtoy eventlistener
let createToyCard = (toy) =>{
  const name = toy.name
  const toy_image_url = toy.image
  let likes = toy.likes
  
  const mainDiv = document.createElement("div")
  mainDiv.className = "card"

  const h2 = document.createElement("h2")
  h2.innerText = name
  const image = document.createElement("img")
    image.src = toy_image_url
    image.className = "toy-avatar"
    // image.style.width = "100%"

  const p = document.createElement("p")
  p.innerText = `${likes} Likes`
  const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    let alreadyLiked = false
    button.addEventListener("click", (event) =>{
      event.preventDefault()
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, 
        body: JSON.stringify({
          "likes": alreadyLiked ? likes-1 : likes+1
        })
      })
      .then(res => res.json())
      .then(toy => {
        likes = toy.likes
        p.innerText = `${likes} Likes`
      }) 
      alreadyLiked = !alreadyLiked
    })
 

  const toyCollection = document.querySelector('#toy-collection')
  mainDiv.append(h2, image, p, button)
  toyCollection.append(mainDiv)
}

//put this inside DOMContentLoaded

//this code runs when refresh happens
document.addEventListener("DOMContentLoaded", ()=>{
  fetch("http://localhost:3000/toys")
  .then( res => res.json())
  .then( toys => {

    toys.forEach(toy => {
      createToyCard(toy)
    })
  })
})

const createtoybutton = document.querySelector(".add-toy-form")
createtoybutton.addEventListener("submit", (event) =>{
  event.preventDefault()
  
  let name = event.target[0].value
  let image = event.target[1].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(toy => {
    createToyCard(toy)
  })
})

// const likeButton = document.querySelector("button")
// likeButton.addEventListener("click", (event) =>{
//   event.preventDefault()
//   console.log(event)
// })

