let page = 1; 
let pageSize = 50; 
let totalPages = 0; 

async function GetGuides() {
    const guidesContainer = document.getElementById("guidesContainer");

    guidesContainer.innerHTML = "";  // Clear previous data

    // Update the URL dynamically based on the current page
    let url = `https://localhost:44360/api/Guide/GetGuides?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
        alert('Error');
        return;
    }

    const data = await response.json();

    // Calculate total pages based on the total number of items
    let totalItems = data.totalItems;
    totalPages = Math.ceil(totalItems / pageSize);

    const guides = data.items;
    console.log("Data", guides);

    guides.forEach(guide => {
        guidesContainer.innerHTML += `
            <div class="col-md-6 col-lg-3">
                <div class="guide-item">
                    <div class="guide-img">
                        <div class="guide-img-efects">
                            <img id="guideImg" src="../../FrontEnd/Uploads/${guide.guideImage}" class="img-fluid w-100 rounded-top" alt="Image">
                        </div>
                  
                    </div>
                    <div class="guide-title text-center rounded-bottom p-4">
                        <div class="guide-title-inner">
                            <h4 class="mt-3">${guide.name}</h4>
                            <p>${guide.description}</p>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    Pagination(); // Call Pagination after loading guides
}

function Pagination() {
    let paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center my-3">
            <button onclick="previousPage()" class="btn btn-primary me-2" ${page === 1 ? 'disabled' : ''}>
                Previous
            </button>
            <span class="mx-2"> Page ${page} of ${totalPages} </span>
            <button onclick="nextPage()" class="btn btn-primary ms-2" ${page === totalPages ? 'disabled' : ''}>
                Next
            </button>
        </div>
    `;
}

// Function to go to the next page
function nextPage() {
    if (page < totalPages) {
        page++;
        GetGuides(); // Fetch guides for the next page
    }
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetGuides(); // Fetch guides for the previous page
    }
}

// Initial call to load the guides
GetGuides();
