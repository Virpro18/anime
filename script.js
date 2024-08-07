fetch("https://api.jikan.moe/v4/anime?q=black rock&sfw")
.then(response => response.json())
.then(data => {
    // console.log(data.data)
    const container = document.getElementsByClassName("container")[0]
    for (const animeData of data.data) {
        console.log(animeData)
        container.innerHTML += ` <div class="card">
                    <h2>${animeData.title}</h2>
                    <h5>year</h5>
                    <img src="${animeData.images.jpg.image_url}" alt="" loading="lazy">
                    <button class="Info-btn">More Info</button>
                </div>`
    }

})