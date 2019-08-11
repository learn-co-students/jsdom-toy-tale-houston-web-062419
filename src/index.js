const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.getElementById('toy-collection')
const baseUrl = "http://localhost:3000/toys"
let addToy = false //has to be 'let' becasue it changes from true to false. 'const' can't change


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch(baseUrl)
.then(res => res.json() )
.then(toys => {
  toys.forEach(toy => renderToy(toy) )
})


function renderToy(toy){

  const div = document.createElement('div')
  div.className = 'card'
  
  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const pic = document.createElement('img')
  pic.src = toy.image
  pic.className = 'toy-avatar'

  const p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = 'Like <3'

  btn.addEventListener('click', () => {

    fetch(`${baseUrl}/${toy.id}`,{
      method: "PATCH",
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({
        "likes": ++toy.likes
      })
    })
    .then(res => res.json())
    .then(newLikes =>{
      p.innerText = `${newLikes.likes} likes`
    })
  })
  

  div.append(h2, pic, p, btn)
  toyDiv.append(div)
}

toyForm.addEventListener('submit', e => {
  e.preventDefault()
  fetch(baseUrl, {
    method: "POST",
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(
      {
        name: e.target[0].value,
        image: e.target[1].value,
        likes: 0
      })
  })
  .then(res => res.json())
  .then(toy => {
    renderToy(toy)
    e.target.reset()
  })


})


