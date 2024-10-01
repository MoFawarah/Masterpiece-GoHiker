let page = 1;
let pageSize = 10;
let totalPages = 0; // This will be calculated later

async function GetAllPaths() {
    let url = `https://localhost:44360/api/PathInfo/GetAllPathInfo?page=${page}&pageSize=${pageSize}`;
    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    // Assuming response contains `totalItems` and `items`
    let totalItems = data.totalItems;
    let pathInfo = data.items;

    // Calculate total pages
    totalPages = Math.ceil(totalItems / pageSize);

    pathInfo.forEach(element => {
        let departureTimeFormatted = element.departureTime.replace('T', ' ');

        table.innerHTML += `
        <tr>
            <td><img src="../../../../../../../../Uploads/${element.roadmapImage}" alt="table-img" class="img-fluid rounded-circle" width="40px"></td>
            <td>${element.pathInfoId}</td>
            <td>${element.gatheringPlace}</td>
            <td>${departureTimeFormatted}</td>
            <td class="desc" style="">${element.duration}</td>
            <td>${element.distance}</td>
            <td>${element.pathResponseDTO.pathId}</td>
            <td>
                <a href="#" onclick="EditPath(${element.pathInfoId})"><i style="color: blue;" class="fas fa-edit"></i></a>
                <a href="#" onclick="DeletePath(${element.pathInfoId})"><i style="color: red;" class="fas fa-trash-alt"></i></a>
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
    if (page < totalPages) {
        page++;
        GetAllPaths();
    }
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
            let url = `https://localhost:44360/api/PathInfo/DeletePathInfoById/${id}`;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire(
                    'Deleted!',
                    'The path info has been deleted.',
                    'success'
                );
                GetAllPaths();
            } else {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the path. Please try again later.',
                    'error'
                );
            }
        } else {
            Swal.fire(
                'Cancelled',
                'No change made.',
                'info'
            );
        }
    });
}

function EditPath(id) {
    localStorage.setItem("pathInfoId", id);
    window.location.href = "editPathInfo.html";
}
