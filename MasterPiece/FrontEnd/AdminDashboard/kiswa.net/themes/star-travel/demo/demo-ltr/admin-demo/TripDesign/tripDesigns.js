let page = 1; 
let pageSize = 10; 

async function GetAllTripDesigns() {
    let url = `https://localhost:44360/api/TripDesign/GetAllTripDesignBookings?page=${page}&pageSize=${pageSize}`;
 

    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let tripDesigns = data.items;

    totalPages = Math.ceil(totalItems / pageSize);
    
   
    tripDesigns.forEach(element => {
    
        table.innerHTML += `
        <tr>
            
            <td >${element.tripDesignId}</td>
            <td>${element.userId}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.city}</td>
            <td>${element.numberOfHikers}</td>
            <td>${element.budget}</td>
            <td>${element.message}</td>
            <td>${element.submissionDate.split('T')[0]}</td>
            <td>${element.status}</td>
            <td>${element.adminNote}</td>
            <td>${element.amountPaid}</td>
           
           <td>
    <a href="#" onclick="EditTripDesign(${element.tripDesignId})"><i class="fas fa-edit"></i></a>
</td>
        </tr>
        `;
    });

    // Handle pagination controls
    Pagination();
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
    page++;
    GetAllTripDesigns();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllTripDesigns();
    }
}


GetAllTripDesigns();



function EditTripDesign(id) {
    localStorage.setItem("tripDesingId", id);
    window.location.href = "../TripDesign/editTripDesgin.html";
}