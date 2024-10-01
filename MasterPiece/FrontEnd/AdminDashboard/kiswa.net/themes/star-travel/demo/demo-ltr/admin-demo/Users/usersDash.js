

let page = 1; 
let pageSize = 10; 


async function AllUsers() {
    let url = `https://localhost:44360/api/Users/GetAllUsers?page=${page}&pageSize=${pageSize}`;
    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let users = data.items;

    totalPages = Math.ceil(totalItems / pageSize);







    let table = document.getElementById("table")
    users.forEach(element => {
        
        table.innerHTML += `
        <tr>
        <td><img src="../../../../../../../../../FrontEnd/Uploads/${element.imageFileName}" alt="table-img" class="img-fluid rounded-circle" width="40px"></td>
											<td>${element.userId}</td>
											<td>${element.name}</a></td>
											<td>${element.email}</td>
											<td>${element.phoneNumber}</td>
											<td>${element.city}</td>
											<td class="active"><a href="#">Active</a></td>
											<td>${element.points}</td>
											
											
                                            </tr>`
    });


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






AllUsers() ;