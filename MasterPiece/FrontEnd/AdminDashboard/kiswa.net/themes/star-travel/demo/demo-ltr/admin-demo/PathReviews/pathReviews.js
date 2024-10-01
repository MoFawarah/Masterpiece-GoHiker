let page = 1;
let pageSize = 10;

async function GetAllPathsReviews() {
    let url = `https://localhost:44360/api/PathReview/GetAllPathReviews?page=${page}&pageSize=${pageSize}`;
    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let pathOrder = data.items;

    totalPages = Math.ceil(totalItems / pageSize);

    pathOrder.forEach((element) => {
        let comment = element.comment;
        if (comment == null) {
            comment = "N/A";
        }

        table.innerHTML += `
        <tr>
            <td>${element.reviewId}</td>
            <td>${element.userId}</td>
            <td>${element.pathId}</td>
            <td>${element.rating}</td>
            <td>${comment}</td>
            <td>${element.reviewDate.split("T")[0]}</td>
           <td>
              <a href="#" onclick="DeletePathReview(${element.reviewId})"><i class="fas fa-trash-alt" style="color: red;"></i></a>
           </td>
        </tr>
        `;
    });

    // Handle pagination controls
    Pagination();
}

function Pagination() {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center my-3">
            <button onclick="previousPage()" class="btn btn-primary me-2" ${page === 1 ? "disabled" : ""
        }>
                Previous
            </button>
            <span class="mx-2"> Page ${page} of ${totalPages} </span>
            <button onclick="nextPage()" class="btn btn-primary ms-2" ${page === totalPages ? "disabled" : ""
        }>
                Next
            </button>
        </div>
    `;
}

// Function to go to the next page
function nextPage() {
    page++;
    GetAllPathsReviews();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllPathsReviews();
    }
}

GetAllPathsReviews();

async function DeletePathReview(id) {
    // SweetAlert confirmation
    Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Proceed with the delete request if confirmed
            let url = `https://localhost:44360/api/PathReview/DeletePathReviewById/${id}`;
            let response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                Swal.fire("Deleted!", "Review has been deleted.", "success");
   
                GetAllPathsReviews();
            } else {
                Swal.fire(
                    "Error!",
                    "There was an error deleting the review. Please try again later.",
                    "error"
                );
            }
        } else {
            // If they choose not to delete, do nothing
            Swal.fire("Cancelled", "No change made.", "info");
        }
    });
}
