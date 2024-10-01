

let page = 1; 
let pageSize = 10; 

async function GetAllPaths() {
    let url = `https://localhost:44360/api/Paths/GetAllPaths?page=${page}&pageSize=${pageSize}`;
    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let pathOrder = data.items;

    totalPages = Math.ceil(totalItems / pageSize);
    
   
    pathOrder.forEach(element => {
         // Convert element.endDate to a Date object
         let endDate = new Date(element.endDate);
         let today = new Date();

         let status = endDate < today ? 'Expired' : 'Active';

         



        table.innerHTML += `
        <tr>
            <td><img src="../../../../../../../../Uploads/${element.pathImage}" alt="table-img" class="img-fluid rounded-circle" width="40px"></td>
            <td>${element.pathId}</td>
            <td>${element.pathName}</td>
            <td>${element.city}</td>
            <td class="desc" style="">${element.description}</td>
            <td>${element.startDate.split('T')[0]}</td>
            <td>${element.endDate.split('T')[0]}</td>
            <td>${element.pricePerPerson}</td>
            <td>${element.difficulty}</td>
            <td>${element.capacity}</td>
            <td>${status}</td>
           <td>
    <a href="#" onclick="EditPath(${element.pathId})"><i class="fas fa-edit"></i></a>
    <a href="#" onclick="DeletePath(${element.pathId})"><i class="fas fa-trash-alt"></i></a>
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
    GetAllPaths();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllPaths();
    }
}


GetAllPaths();


async function DeletePath(id) {
    // SweetAlert confirmation
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete this path? All its related data will be deleted too.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Proceed with the delete request if confirmed
            let url = `https://localhost:44360/api/Paths/DeletePath/${id}`;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire(
                    'Deleted!',
                    'The path has been deleted.',
                    'success'
                );
                // Optionally, reload or update the table to remove the deleted path
                GetAllPaths();
            } else {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the path. Please try again later.',
                    'error'
                );
            }
        } else {
            // If they choose not to delete, do nothing
            Swal.fire(
                'Cancelled',
                'No change made.',
                'info'
            );
        }
    });
}

function EditPath(id) {
    localStorage.setItem("pathId", id);
    window.location.href = "editPath.html";
}