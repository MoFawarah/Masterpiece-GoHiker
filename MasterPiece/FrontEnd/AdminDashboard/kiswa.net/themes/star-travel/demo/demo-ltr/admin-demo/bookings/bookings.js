

let page = 1; 
let pageSize = 10; 

async function GetAllPathBookings() {
    let url = `https://localhost:44360/api/PathBooking/GetAllPathBooking?page=${page}&pageSize=${pageSize}`;
    

    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let bookings = data.items;
    totalPages = Math.ceil(totalItems / pageSize);
    
   
    bookings.forEach(element => {

        table.innerHTML += `
        <tr>
            
            <td>${element.bookingId}</td>
            <td>${element.userId}</td>
            <td>${element.pathId}</td>
            <td>${element.bookingDate.split('T')[0]}</td>
         
            <td>${element.numberOfHikers}</td>
            <td>${element.couponId}</td>
            <td>${element.totalPrice}</td>
            <td>${element.completed}</td>

        
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
    GetAllPathBookings();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllPathBookings();
    }
}


GetAllPathBookings()