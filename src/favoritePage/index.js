import { favoriteVideo } from "../index.js";

document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = JSON.parse(localStorage.getItem("@videostubeFavoritesList")) || [];
    const containerFavorites = document.querySelector(".list-favorites")
    
    if (favoritesList.length === 0) {
        containerFavorites.innerHTML = '<li>Você não tem videos favoritados.</li>';
    } else {
        favoritesList.forEach(video => {
            const card = document.createElement("li")
            const thumbnail = document.createElement("img")
            const title = document.createElement("p")
            const favoriteBtt = document.createElement("input")
            
            thumbnail.src = video.snippet.thumbnails.high.url
            title.textContent = video.snippet.title
            title.className = "limited-text"
            favoriteBtt.type = "checkbox"
            favoriteBtt.checked = "true"
            favoriteBtt.onclick = () => favoriteVideo(video);
            
            card.append(thumbnail)
            card.append(title)
            card.append(favoriteBtt)   
            containerFavorites.append(card);
        });
    }
})