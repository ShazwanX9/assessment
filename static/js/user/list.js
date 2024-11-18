const retrieve_user_route = '/alpro/backend/retrieveuser.php'
const update_user_route = '/alpro/backend/updateuser.php'
const delete_user_route = '/alpro/backend/deleteuser.php'
let users = [];
let filteredUsers = [];
const itemsPerPage = 6;
let currentPage = 1;
let totalPages = 1;

function fetchUsers(path) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            users = data;
            filteredUsers = [...users];
            totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
            updatePagination();
            renderUsersForCurrentPage();
        })
        .catch(error => console.error('Error fetching users:', error));
}

function renderUsersForCurrentPage() {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = ''; // Clear current rows

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToRender = filteredUsers.slice(startIndex, endIndex);

    usersToRender.forEach(user => {
        let formattedId = 'ID-' + user.id.toString().padStart(5, '0');
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        row.innerHTML = `
            <td>${formattedId}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>
                <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    updatePagination();
}

function changePage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    currentPage = pageNumber;
    renderUsersForCurrentPage();
    updatePagination();
}

function filterUsers() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery)
    );

    totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    currentPage = 1;
    renderUsersForCurrentPage();
    updatePagination();
}

function editUser(id) {
    const user = filteredUsers.find(u => u.id === id);
    if (user) {
        // Construct the query string with user data
        const queryParams = new URLSearchParams({
            id: user.id,
        }).toString();

        // Redirect to the user-edit page with the query parameters
        window.location.href = `?page=user-edit&${queryParams}`;
    }
}

function deleteUser(id) {
    const confirmDelete = confirm(`Are you sure you want to delete user with ID ${id}?`);
    if (confirmDelete) {
        fetch(delete_user_route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${id}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const row = document.querySelector(`tr[data-id="${id}"]`);
                console.log(row)
                if (row) {
                    row.remove();
                }
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the user.');
        });
    }
}

window.onload = function() {
    fetchUsers(retrieve_user_route);
};


function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Disable prev button on first page
    prevButton.classList.toggle('disabled', currentPage === 1);

    // Disable next button on last page
    nextButton.classList.toggle('disabled', currentPage === totalPages);

    // Clear the pagination (except for prev and next buttons)
    const paginationItems = document.querySelectorAll('.pagination-item');
    paginationItems.forEach(item => {
        if (item !== prevButton && item !== nextButton) {
            item.remove();
        }
    });

    // Calculate the page range to display
    let startPage = Math.max(currentPage - 2, 1); // Start page should not be less than 1
    let endPage = Math.min(currentPage + 2, totalPages); // End page should not exceed totalPages

    // Create new pagination items for the current page range
    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('pagination-item');
        pageLink.href = '#';
        pageLink.textContent = i;

        // Add active class to the current page
        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        // Attach event listener to handle page changes
        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderUsersForCurrentPage();
        });

        // Insert the page link before the next button
        paginationContainer.insertBefore(pageLink, nextButton);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Event listeners for pagination buttons
    document.getElementById('prev').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderUsersForCurrentPage();
        }
    });

    document.getElementById('next').addEventListener('click', function (e) {
        e.preventDefault();
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderUsersForCurrentPage();
        }
    });

    // Initial fetch & render
    fetchUsers(retrieve_user_route);
});