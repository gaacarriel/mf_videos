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
            
            thumbnail.src = item.snippet.thumbnails.high.url
            title.textContent = item.snippet.title
            title.className = "limited-text"
            
            card.append(thumbnail)
            card.append(title)   
            div.append(card)
        })
    } catch (error) {
        console.error("Error:", error);
    }
}

searchVideos()