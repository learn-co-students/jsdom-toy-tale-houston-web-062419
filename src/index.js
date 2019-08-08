
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
//debugger
		if (event.target[2].value == "Create New Toy") {
			const newtoy = fetch("http://localhost:3000/toys", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					  Accept: "application/json"
				},
				body: JSON.stringify({
					name:document.querySelector(".input-text").value,
					image:document.querySelectorAll(".input-text")[1].value,
					likes: 0
				})
			})
			.then(res => res.json())
			.then(json => {
				document.querySelector("#toy-collection").appendChild(addToyDiv(json))
				toyForm.style.display = 'none'
				document.querySelector(".input-text").value = ""
				document.querySelectorAll(".input-text")[1].value = ""
				console.log(json)			
			})
			console.log(document.querySelector(".input-text").value)
			console.log(document.querySelectorAll(".input-text")[1].value)
		}

		//EDIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (event.target[2].value == "Save Changes") {
			console.log(event.target[2].getAttribute("data-id"))

			fetch(`http://localhost:3000/toys/${event.target[2].getAttribute("data-id")}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					  Accept: "application/json"
				},
				body: JSON.stringify({
					name:document.querySelector(".input-text").value,
					image:document.querySelectorAll(".input-text")[1].value,
					
				})
			})
			.then(res => res.json())
			.then(json => {
				//document.querySelector("#toy-collection").appendChild(addToyDiv(json))
				//toyForm.style.display = 'none'
				
				const id_div = document.getElementsByName(event.target[2].getAttribute("data-id"))[0]
				id_div.children[0].innerText = json.name
				id_div.children[1].src = json.image

				document.querySelector(".input-text").value = ""
				document.querySelectorAll(".input-text")[1].value = ""
				id_div.children[2].focus()
				console.log(json)			
			})
			
			toyForm.style.display = 'none'			
			event.target[2].value = "Create New Toy"
			
		}

	})

})

//TOY DIV *********************************************************************************************
function addToyDiv(toy){
	const div = document.createElement("div")
	div.className = "card"
	div.setAttribute("name", toy.id)

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

	const btn_group1 = document.createElement("div")
	btn_group1.className = "btn-group"
	const btn_group2 = document.createElement("div")
	btn_group2.className = "btn-group"

	const btn = document.createElement("button")
	btn.className = "like-btn"
	btn.innerText = "Like <3"
	btn_group1.appendChild(btn)

	const dis_btn = document.createElement("button")
	dis_btn.className = "dislike-btn"
	dis_btn.innerText = "Dislike :("
	btn_group1.appendChild(dis_btn)

	const del_btn = document.createElement("button")
	del_btn.className = "delete-btn"
	del_btn.innerText = "Delete"
	btn_group2.appendChild(del_btn)

	const edit_btn = document.createElement("button")
	edit_btn.className = "delete-btn"
	edit_btn.innerText = "Edit"
	btn_group2.appendChild(edit_btn)

	div.appendChild(btn_group1)
	div.appendChild(btn_group2)


	edit_btn.addEventListener("click", function() {
		toyForm.style.display = 'block'
		//debugger
		document.querySelector(".submit").value = "Save Changes"
		document.querySelector(".input-text").value = document.getElementsByName(toy.id)[0].children[0].innerText
		//toy.name
		document.querySelectorAll(".input-text")[1].value = document.getElementsByName(toy.id)[0].children[1].src
		//toy.image
		document.querySelector(".submit").setAttribute("data-id", toy.id)
		document.querySelector(".input-text").focus()
	})

	btn.addEventListener('click', function(){
		toy.likes += 1
		patchToyLikes(toy, p)	
	})

	dis_btn.addEventListener('click', function(){
		toy.likes -= 1		
		patchToyLikes(toy, p)
	})

	del_btn.addEventListener("click", function(){
		fetch(`http://localhost:3000/toys/${toy.id}`, {
			method: "DELETE"})
		.then(res => res.json())
		.then(json => {
			//console.log(json)
			div.remove()
		})
	})

	return div
}

function patchToyLikes(toy, p){
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
		})
}




