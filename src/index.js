function drawerFunc(video) {
    const drawerList = JSON.parse(localStorage.getItem("@videostubeDrawerList"))

    if(drawerList){
        const videoIndex = drawerList.findIndex(videoDrawerList => video.id.videoId === videoDrawerList.id.videoId);

        if (videoIndex > -1) {
            drawerList.splice(videoIndex, 1);
        } else {
            drawerList.push(video);
        }

        localStorage.setItem("@videostubeDrawerList", JSON.stringify(drawerList));
    }else{
        newList = []
        newList.push(video)
        localStorage.setItem("@videostubeDrawerList", JSON.stringify(newList))
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
            const drawerBtt = document.createElement("input")
            
            thumbnail.src = item.snippet.thumbnails.high.url
            title.textContent = item.snippet.title
            title.className = "limited-text"
            drawerBtt.type = "checkbox"
            drawerBtt.onclick = () => drawerFunc(item);
            
            card.append(thumbnail)
            card.append(title)
            card.append(drawerBtt)   
            div.append(card)
        })
    } catch (error) {
        console.error("Error:", error);
    }
}

searchVideos()