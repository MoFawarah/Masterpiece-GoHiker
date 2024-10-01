let pathId = localStorage.getItem("pathId");

async function DisplayPathDetails() {
    debugger;
    let url = `https://localhost:44360/api/PathInfo/GetPathInfoByPathID/${pathId}`;
    let response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch path details:', response.status);
        return;
    }
    let data = await response.json();

    if (data.length === 0) {
        console.error('No path info found for the provided path ID.');
        return;
    }

    // i don't know why be take the first element ^^
    let pathInfo = data[0];

    document.getElementById("gatherPlace").textContent = pathInfo.gatheringPlace;
    document.getElementById("departureTime").textContent = pathInfo.departureTime.replace('T', ' ');
    document.getElementById("duration").textContent = pathInfo.duration + ' hours';
    document.getElementById("distance").textContent = pathInfo.distance + ' km';
    document.getElementById("description").textContent = pathInfo.pathResponseDTO.description;
    document.getElementById("difficulty").textContent = pathInfo.pathResponseDTO.difficulty;
    document.getElementById("fromTo").innerHTML = 'From <span style="color: red;">' + pathInfo.pathResponseDTO.city + '</span> to Ajloun';

    let pathMapImg = document.querySelector(".pathMap img");
    if (pathMapImg && pathInfo.roadmapImage) {
        pathMapImg.src = "../../FrontEnd/Uploads/" + pathInfo.roadmapImage;
    }
}

DisplayPathDetails();
