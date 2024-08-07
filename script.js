fetch("https://api.jikan.moe/v4/anime")
    .then(response => response.json())
    .then(data => {
        // console.log(data.data)
        const container = document.getElementsByClassName("container")[0]
        for (const animeData of data.data) {
            // console.log(animeData)
            container.innerHTML += ` <div class="card" >
                    <h2>${animeData.title}</h2>
                    <h4>${animeData.year}</h4>
                    <img src="${animeData.images.jpg.image_url}" alt="" loading="lazy" >
                    <button class="Info-btn" data-id=${animeData.mal_id}>More Info</button>
                </div>`
        }

        for (const btn of document.getElementsByClassName("Info-btn")) {
            btn.addEventListener("click", async function () {
                const id = this.getAttribute("data-id")
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
                const data = await response.json()
                try {
                    console.log(data.data);
                    const dataAnime = data.data
                    document.getElementById("layer-container").innerHTML = `
                 <div class="layer">
                 <div class="modal-container">
                     <div class="modal-header">
                         <h2>Title</h2>
                         <button class="exit" onclick="clearLayer()">X</button>
                     </div>
                     <div class="modal-body">
                         <img src="${dataAnime.images.jpg.image_url}" alt="" loading="lazy">
                         <table class="modal-info">
                             <ul>
                                 <li>Title:${dataAnime.title}(${dataAnime.year})</li>
                                 <li>Genre:</li>
                                 <li></li>
                             </ul>
                         </table>
                     </div>
                     <div class="modal-footer">
                     <button class="close" onclick="clearLayer()">Close</button>
                     </div>
                 </div>
                 </div>
                 `
                    document.querySelector("body").style = "overflow:hidden;"
                }
                catch (err) {
                    return console.log(err)
                }
            })
        }
    })


function clearLayer() {
    document.getElementById("layer-container").innerHTML = ''
    document.querySelector("body").style = ""
}
document.addEventListener("click", (e) => {
    console.log(e.target)
    if(e.target == document.getElementsByClassName("layer")[0]) {
        clearLayer()
    }
})