const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newForm = document.querySelector(".add-toy-form");
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


function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        toyList(toy);
      });
    });
}

function toyList(toy){
  const toyContainer = document.querySelector("#toy-collection")
  const divToy = document.createElement('div')
  divToy.className = "card"
  // divToy.id = toy.id

  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  // const delButton = document.createElement("delete-button")
  // delButton.className = "delete-toy-button"
  // delButton.innerText = "DELETE"

  const button = document.createElement("button");
  button.innerText = "Like <3"
  button.className = "like-btn"

  divToy.append(h2)
  divToy.append(img)
  divToy.append(p)
  divToy.append(button)
  // divToy.append(delButton)

  toyContainer.append(divToy);

  button.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
      .then(res => res.json())
      .then(toy => {
        p.innerText = `${toy.likes} likes`
      })
  
  })

}

toyForm.addEventListener("submit", (event) => {
  event.preventDefault()
  // debugger

  const name = event.target[0].value
  const image = event.target[1].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
    .then(res => res.json())
    .then(json => {
      newForm.reset();
      toyList(json);

    })

})

// toyList.addEventListener("click" (event) => {
//   event.preventDefault()

//   fetch(`http://localhost:3000/toys/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       name: name,
//       image: image,
//       likes: 0
//     })
//   })
//     .then(res => res.json())
//     .then(json => {
//       newForm.reset();
//       toyList(json);

//     })
// })

  // debugger

// button.addEventListener("click", (event) => {
//   event.preventDefault()
//   fetch(`http://localhost:3000/toys/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       likes: 0
//     })
//   })
//     .then(res => res.json())
//     .then(json => {
//       newForm.reset();
//       toyList(json);

//     })

// })





document.addEventListener('DOMContentLoaded', getToys)
