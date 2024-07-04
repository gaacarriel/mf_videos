document.addEventListener("DOMContentLoaded", () => {
    const btt = document.getElementById("btt")
    btt.addEventListener("click", () => {
        searchVideos(document.querySelector(".filter-input").value)
    })
})

export function favoriteVideo(video) {
    const favoritesList = JSON.parse(localStorage.getItem("@videostubeFavoritesList"))

    if(favoritesList){
        const videoIndex = favoritesList.findIndex(videoFavoritesList => video.id.videoId === videoFavoritesList.id.videoId);

        if (videoIndex > -1) {
            favoritesList.splice(videoIndex, 1);
            location.reload()
        } else {
            favoritesList.push(video);
        }

        localStorage.setItem("@videostubeFavoritesList", JSON.stringify(favoritesList));
    }else{
        const newList = []
        newList.push(video)
        localStorage.setItem("@videostubeFavoritesList", JSON.stringify(newList))
    }
}

async function searchVideos(filter) {
    const url = `http://localhost:3002/api/search?q=${filter || ""}`
    try {
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        
        const div = document.querySelector(".list-videos")
        div.innerHTML = "";
        
        data.items.map(item => {
            const card = document.createElement("li")
            const thumbnail = document.createElement("img")
            const title = document.createElement("p")
            const favoriteBtt = document.createElement("input")
            
            thumbnail.src = item.snippet.thumbnails.high.url
            title.textContent = item.snippet.title
            title.className = "limited-text"
            favoriteBtt.type = "checkbox"
            favoriteBtt.onclick = () => favoriteVideo(item);
            
            card.append(thumbnail)
            card.append(title)
            card.append(favoriteBtt)   
            div.append(card)
        })
    } catch (error) {
        console.error("Error:", error);
    }
}

searchVideos()