async function GetActivePaths() {
  const url = "https://localhost:44360/api/Paths/GetAvtivePaths";
  let response = await fetch(url);
  let data = await response.json();

 

  let pathsContainer = document.getElementById("pathsContainer");

  // Clear container before adding new paths
  pathsContainer.innerHTML = "";

  // Loop through the data and build HTML for each active path
  for (const element of data) {

  
    
    // Add path review dynamically 
    let reviewUrl = `https://localhost:44360/api/PathReview/GetPathReviewByPathId/${element.pathId}`;

    let reviewResponse =  await fetch(reviewUrl)
    let rating = await reviewResponse.json()

    const getStarsHtml = (rating) => {
    let colorfulStars = Math.ceil(rating);
    let unColorfulStars = 5 - colorfulStars;
    
    let starsHtml = '';
    
    for (let i = 0 ; i<colorfulStars; i++)
    {
        starsHtml += '<i class="fa fa-star text-warning"></i>';
    }

    for (let i =0 ; i<unColorfulStars; i++ ) {
        starsHtml += '<i class="fa fa-star"></i>';
    }

    return starsHtml;
   }
    
    

    let pathCard = `
          <div class="col">
                            <div class="card h-100">
                                <img src="/FrontEnd/Uploads/${element.pathImage}" class="card-img-top" alt="${element.pathName}">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h5 class="card-title mb-0">${element.pathName}</h5>
                                        <span class="badge bg-primary">Group Path</span>
                                    </div>
                                    <div class="my-2">
                                        ${getStarsHtml(rating.ratingAvg)} (${rating.rating})
                                    </div>
                                    <p class="card-text">${element.description}</p>
                                </div>
                                <div class="card-footer d-flex justify-content-between">
                                <small class="text-muted">
                                    <i style="color: red;" class="fas fa-route me-1"></i>From ${element.city} to Ajloun
                                </small>
                                <strong class="text-muted">$${element.pricePerPerson}/Person</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                <div class="card-footer bg-white border-0 text-center">
                                    <a onclick="DisplayPathDetails(${element.pathId})" class="btn btn-primary m-1">Book Now</a>
                                </div>
                                <div class="card-footer bg-white border-0 text-center">
                                    <a onclick="ReviewPath(${element.pathId})" class="btn btn-warning m-1">Review</a>
                                </div>
                                </div>
                                
                                
                            </div>
                        </div>
            `;
    // Append the path card to the container
    pathsContainer.innerHTML += pathCard;
  };
}


GetActivePaths();

function DisplayPathDetails(id) {
  localStorage.setItem("pathId", id);
  window.location.href = "joinpath.html";
}

function ReviewPath(id) {
    localStorage.setItem("reviewPathId", id);
    window.location.href = "../../FrontEnd/pathReview.html";

};