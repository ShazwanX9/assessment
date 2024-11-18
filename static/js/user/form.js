const retrieve_user_route = '/alpro/backend/retrieveuser.php'
const retrieve_phone_route = '/alpro/backend/retrievephone.php'

// Function to calculate age from IC number
function calculateAge() {
    const icNumber = document.getElementById('ic-number').value.trim();
    
    if (icNumber.length !== 12 || isNaN(icNumber)) {
        document.getElementById('age').value = '';
        return;
    }

    const birthDate = icNumber.slice(0, 6);
    const year = (parseInt(birthDate.substring(0, 2)) < 30 ? '20' : '19') + birthDate.substring(0, 2);
    const month = birthDate.substring(2, 4);
    const day = birthDate.substring(4, 6);

    const birthDateObject = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    let age = currentDate.getFullYear() - birthDateObject.getFullYear();
    
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (currentMonth < (month - 1) || (currentMonth === (month - 1) && currentDay < day)) {
        age--;
    }

    document.getElementById('age').value = age;
}

// Function to add another phone number input field
function addPhoneNumber() {
    const phoneContainer = document.getElementById('phone-numbers');

    // Create a new div to wrap the phone input and remove button
    const newPhoneEntry = document.createElement('div');
    newPhoneEntry.classList.add('phone-entry');

    // Create the new input element
    const newPhoneInput = document.createElement('input');
    newPhoneInput.type = 'text';
    newPhoneInput.classList.add('phone-number');
    newPhoneInput.name = 'phone[]';
    newPhoneInput.required = true;
    newPhoneInput.minLength = 8;
    newPhoneInput.maxLength = 15;
    newPhoneInput.pattern = '^[0-9]+$';
    newPhoneInput.placeholder = 'Enter phone number';

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('remove-phone');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        removePhoneNumber(removeButton);
    };

    newPhoneEntry.appendChild(newPhoneInput);
    newPhoneEntry.appendChild(removeButton);
    phoneContainer.appendChild(newPhoneEntry);
}

// Function to remove a phone number input field and its remove button
function removePhoneNumber(button) {
    button.parentElement.remove();
}

// Function to handle form submission
document.getElementById('memberForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Collecting the form data
    const memberData = {
        name: formData.get('name'),
        icNumber: formData.get('ic-number'),
        age: formData.get('age'),
        email: formData.get('email'),
        phoneNumbers: formData.getAll('phone[]'),  // Collect all phone numbers
        id: parseInt(formData.get('member-id').replace(/[^\d]/g, ''), 10)
    };
    console.log(memberData)

    // Send the data as a JSON object using Fetch API
    fetch(event.target.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('User added successfully!');
            window.location.href = '/alpro/';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
});

// Function to go back to the previous page (list page)
function goBack() {
    window.history.back();
}

function formatICNumber() {
    var input = document.getElementById('ic-number');
    input.value = input.value.replace(/\D/g, '');

    // Regular expression to validate the full input against the expected format
    var regex = /^((\d{2}(?!0229))|([02468][048]|[13579][26])(?=0229))(0[1-9]|1[0-2])(0[1-9]|[12]\d|(?<!02)30|(?<!02|4|6|9|11)31)\d{6}$/;

    // Check if the current value matches the regex
    if (regex.test(input.value)) {
        calculateAge();
        input.setCustomValidity("");
    } else {
        input.setCustomValidity("Invalid date format or invalid date!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const icInput = document.getElementById('ic-number');
    const memberIdInput = document.getElementById('member-id');

    // Function to fetch user based on IC number
    function fetchUserId(icNumber) {
        fetch(retrieve_user_route)
            .then(response => response.json())
            .then(data => {
                let foundUser = false;  // Flag to check if user was found

                data.forEach(user => {
                    if (user.ic_number == icNumber) {
                        // Format user ID to 5 digits (e.g., 'ID-00001')
                        let formattedId = 'ID-' + user.id.toString().padStart(5, '0');
                        memberIdInput.value = formattedId;
                        foundUser = true;  // User was found
                    }
                });

                // If no user found, set the input value to a default value
                if (!foundUser) {
                    let maxId = Math.max(...data.map(user => user.id), 0);
                    let nextId = maxId + 1;
                    let formattedId = 'ID-' + nextId.toString().padStart(5, '0');
                    memberIdInput.value = formattedId;
                }
            })
            .catch(error => {
                console.error('Error fetching user ID:', error);
                memberIdInput.value = 'ID-XXXXX';
            });
    }

    icInput.addEventListener('input', function () {
        const icNumber = icInput.value.trim();
        const sanitizedIcNumber = icNumber.replace(/\D/g, '');  // Removes non-numeric characters
        if (sanitizedIcNumber.length === 12) {
            fetchUserId(sanitizedIcNumber);
        } else {
            memberIdInput.value = 'ID-XXXXX';
        }
    });


    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');  // Retrieve user ID from query parameters

    if (userId) {
        // Fetch user data from backend
        let phones = []
        fetch(retrieve_phone_route)
        .then(response => response.json())
        .then(data => {
            phones=data;
        })

        fetch(retrieve_user_route)
            .then(response => response.json())
            .then(data => {
                let foundUser = false;
                data.forEach(user => {
                    if (user && user.id === parseInt(userId)) {  // Match the user ID
                        foundUser = true;

                        // Fill in the form fields with the retrieved user data
                        // document.getElementById("member-id").value = user.id;
                        document.getElementById("name").value = user.name;
                        document.getElementById("ic-number").value = user.ic_number;
                        document.getElementById("age").value = user.age;
                        document.getElementById("email").value = user.email;

                        // Fill phone numbers dynamically
                        const phoneContainer = document.getElementById("phone-numbers");

                        phoneContainer.innerHTML = "";  
                        phones.forEach(phone => {
                            console.log(phone)
                            console.log(userId)
                            if (phone.user_id == userId) {
                                const phoneInput = document.createElement("input");
                                phoneInput.type = "text";
                                phoneInput.classList.add("phone-number");
                                phoneInput.name = "phone[]";
                                phoneInput.value = phone.phone_number;
                                phoneInput.required = true;
                                phoneInput.minLength = 8;
                                phoneInput.maxLength = 15;
                                phoneInput.pattern = "^[0-9]+$";
                                phoneInput.placeholder = "Enter phone number";
                                phoneContainer.appendChild(phoneInput);
                            }
                        });

                        // Format and set the member ID field
                        const formattedMemberId = `ID-${user.id.toString().padStart(5, '0')}`;
                        document.getElementById("member-id").value = formattedMemberId;
                    }
                });

                // If no user was found, alert the user
                if (!foundUser) {
                    alert("User not found.");
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert("An error occurred while fetching user data.");
            });
    } 
});