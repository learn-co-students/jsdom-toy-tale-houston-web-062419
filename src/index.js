
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


document.addEventListener('DOMContentLoaded', () => {

	toys = fetch("http://localhost:3000/toys")
	.then(res => res.json())
	.then(json => {
		console.log(json)
		for (var i = 0; i < json.length; i++) {
			const maindiv = document.querySelector("#toy-collection")
			maindiv.appendChild(addToyDiv(json[i]))
		}

	})

	addBtn.addEventListener('click', () => {
	  // hide & seek with the form
	  addToy = !addToy
	  if (addToy) {
	    toyForm.style.display = 'block'
	  } else {
	    toyForm.style.display = 'none'
	  }
	})

	toyForm.addEventListener("submit", (event) => {
		event.preventDefault()
		const newtoy = fetch("http://localhost:3000/toys", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				  Accept: "application/json"
			},
			body: JSON.stringify({
				name:document.querySelector(".input-text").value,
				image:document.querySelectorAll(".input-text")[1].value,
				//"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
				likes: 0
			})
		})
		.then(res => res.json())
		.then(json => {
			document.querySelector("#toy-collection").appendChild(addToyDiv(json))
			toyForm.style.display = 'none'
			console.log(json)			
		})
		console.log(document.querySelector(".input-text").value)
		console.log(document.querySelectorAll(".input-text")[1].value)

	})

})


function addToyDiv(toy){
	const div = document.createElement("div")
	div.className = "card"

	const h2 = document.createElement("h2")
	h2.innerText = toy.name
	div.appendChild(h2)

	const img = document.createElement("img")
	img.src = toy.image
	img.className = "toy-avatar"
	div.appendChild(img)

	const p = document.createElement("p")
	p.innerText = toy.likes + " likes"
	div.appendChild(p)

	const btn = document.createElement("button")
	btn.className = "like-btn"
	btn.innerText = "Like <3"

	div.appendChild(btn)

	btn.addEventListener('click', function(){
		toy.likes += 1
		const newtoy = fetch(`http://localhost:3000/toys/${toy.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				  Accept: "application/json"
			},
			body: JSON.stringify({
				likes: toy.likes
			})
		})
		.then(res => res.json())
		.then(json => {
			p.innerText = toy.likes + " likes"
			console.log(json)
		})
		
	})

	return div
}




