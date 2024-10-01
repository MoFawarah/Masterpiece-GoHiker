




let page = 1; 
let pageSize = 10; 

async function GetAllPathOrders() {
    let url = `https://localhost:44360/api/PathOrder/GetAllPAthOrders?page=${page}&pageSize=${pageSize}`;
    

    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let pathOrder = data.items;

    totalPages = Math.ceil(totalItems / pageSize);

    
   
    pathOrder.forEach(element => {

        table.innerHTML += `
        <tr>
            
            <td>${element.orderId}</td>
            <td>${element.userId}</td>
            <td>${element.bookingId}</td>
            <td>${element.totalAmount}</td>
            <td>${element.paymentMethod}</td>
            <td>${element.paymentStatus}</td>
            <td>${element.paymentDate.split('T')[0]}</td>       
            <td>${element.altPhone}</td>
           
  

        
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
    if (page < totalPages) {
        page++;
        GetAllPathOrders();
    }
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllPathOrders();
    }
}


GetAllPathOrders()