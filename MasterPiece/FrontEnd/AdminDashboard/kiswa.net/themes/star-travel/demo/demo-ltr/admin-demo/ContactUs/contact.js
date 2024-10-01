

let page = 1; 
let pageSize = 10; 

async function GetAllContacts() {
    let url = `https://localhost:44360/api/ContactUs/GetAllContactUs?page=${page}&pageSize=${pageSize}`;
    let table = document.getElementById("table");
    table.innerHTML = ""; // Clear table before adding new data

    let response = await fetch(url);
    let data = await response.json();

    let totalItems = data.totalItems;
    let contacts = data.items;

    totalPages = Math.ceil(totalItems / pageSize);
    
   
    contacts.forEach(element => {
     
        //  let endDate = new Date(element.endDate);
        //  let today = new Date();

        //  let status = endDate < today ? 'Expired' : 'Active';

         

        //  let adminResDate = new Date(lement.adminResponseDate);



        table.innerHTML += `
        <tr>
            <td>${element.contactId}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phoneNumber}</td>
            <td>${element.subject}</td>
            <td>${element.message}</td>
            <td>${element.submissionDate.split('T')[0]}</td>
            <td>${element.status}</td>
            <td>${element.adminResponse}</td>
            <td>${element.adminResponseDate.split('T')[0]}</td>

           <td>
    <a href="#" onclick="EditContact(${element.contactId})"><i class="fas fa-edit"></i></a>
    
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
    GetAllContacts();
}

// Function to go to the previous page
function previousPage() {
    if (page > 1) {
        page--;
        GetAllContacts();
    }
}


GetAllContacts();



function EditContact(id) {
    localStorage.setItem("contactId", id);
    window.location.href = "editContactUs.html";
}