

let page = 1; 
let pageSize = 10; 

async function GetGuideApplications() {

    let url = `https://localhost:44360/api/Guide/GetAllGuideApplications?page=${page}&pageSize=${pageSize}`

    let table = document.getElementById("table");
    table.innerHTML = "";

    let response = await fetch(url);
    let data = await response.json();


    let totalItems = data.totalItems;
    let guideApplications = data.items;

    totalPages = Math.ceil(totalItems / pageSize);
    
   
    guideApplications.forEach(element => {

        if (element.adminNote == null)
        {
            element.adminNote = "No note provided";
        }

        table.innerHTML += `
        <tr>
            <td>${element.applicationId}</td> 
            <td><img src="../../../../../../../../Uploads/${element.guideImage}" alt="table-img" class="img-fluid rounded-circle" width="40px"></td>
            <td><a href="../../../../../../../../Uploads/${element.licenseProof}" class="download-btn" download="License.pdf">download License</a></td>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.phoneNumber}</td>
            <td>${element.email}</td>
            <td>${element.city}</td>
            <td class="desc" style="">${element.description}</td>
            <td>${element.ratePerHour}</td>
            <td>${element.applicationDate.split('T')[0]}</td>
            <td>${element.status}</td>
            <td>${element.adminNote}</td>
         
           <td>
        <a href="#" onclick="EditGuidApplication(${element.applicationId})"><i class="fas fa-edit"></i></a>
  
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
    GetGuideApplications();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetGuideApplications();
    }
}


GetGuideApplications();



function EditGuidApplication(id) {
    localStorage.setItem("guideAppId", id);
    window.location.href = "editguideapplication.html";
}