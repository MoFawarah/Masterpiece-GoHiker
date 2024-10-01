
   async function GetAllTestimonials() {
    debugger
    let url = "https://localhost:44360/api/PathReview/Testmonail";
    let response = await fetch(url)
    let data = await response.json();

    let testimonialContainer = document.getElementById("testimonialContainer");
    

   

   for (const element of data) {

   if (element.userId == null) {
    continue;
   }

   if (element.userResponseDTO.city == null || element.userResponseDTO.city == "Not specified yet") {
   element.userResponseDTO.city = "";
   }
        const getStatsHtml = (r) => {
          
        
            let starsHtml = '';
            switch(r)
            {
                case 1 : starsHtml = '<i class="fa fa-star text-warning"></i>';
                break;  
                case 2 : starsHtml = '<i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i>';
                break;
                case 3 : starsHtml = '<i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i>';
                break;
                case 4 : starsHtml = '<i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i>';
                break;
                default : starsHtml = '<i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i>';
                break;
                
            }
            return starsHtml;
        
            }

       


        testimonialContainer.innerHTML += `
      <div class="col">
                            <div class="card h-100">
                                <img style="width: 100px; height: 100px; object-fit: cover;" src="../FrontEnd/Uploads/${element.userResponseDTO.imageFileName}" class="card-img-top rounded-circle mx-auto mt-3" alt="Client Name">
                                <div class="card-body text-center">
                                    <h5 class="card-title ssss mb-0">${element.userResponseDTO.name}</h5>
                                    <small class="text-muted">${element.userResponseDTO.city}</small>
                                    <div class="my-2">
                                    ${getStatsHtml(element.rating)}
                                      
                                    </div>
                                    <p class="card-text">${element.comment}</p>
                                </div>
                                
                            </div>
                        </div>`
        
    };

    
}

GetAllTestimonials()
