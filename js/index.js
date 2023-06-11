document.addEventListener("DOMContentLoaded", function() {
   showBookList()
});

let bookUrl = "http://localhost:3000/books"

function showBookList(){
   //fetch with GET --> http://localhost:3000/books
   //list each book title with li element
   // list will reside under <ul id="list">

   fetch(bookUrl)
   .then (resp => resp.json())
   .then (data => {
      console.log(data)
      let ul = document.getElementById("list")
      data.forEach(element =>{
         let li = document.createElement("li")
         li.innerText = element.title
         ul.append(li)
         li.addEventListener("click", ()=> {
            displayDetails(element.id)
         })
      })
   })
}

function displayDetails(id){
   //show details of book... in div#show-panel 
   //include thumbnail, description, list of users who liked
   let div = document.getElementById("show-panel")
   div.innerText = ""
   fetch(`${bookUrl}/${id}`)
   .then(resp => resp.json())
   .then(data => {
      console.log(data)
      let img = document.createElement("img")
      img.src = data.img_url
      let p = document.createElement("p")
      p.innerText = data.description
      let btn = document.createElement("button")
      btn.innerText= "LIKE"
      let ul = document.createElement("ul")
      data.users.forEach(element => {
         let li = document.createElement("li")
         li.innerText = element.username
         ul.append(li)
      })
      div.append(img, p, ul, btn)
      btn.addEventListener("click", ()=> console.log("button was clicked"))
   })

}