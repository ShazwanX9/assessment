// Attach a submit event to the form
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // If you need to check and manipulate the price before submitting
    const price = data.price;
    if (!validatePrice({ value: price })) {
        alert("Please enter a valid price.");
        return;
    }

    // Send the data as a JSON object using Fetch API
    fetch(event.target.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Product added successfully!');
        window.location.href = '/alpro?page=product-master';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
});

function validatePrice(input) {
    let value = input.value.trim();
    const priceRegex = /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/;
    if (priceRegex.test(value)) {
      return true;
    } else {
      value = value.replace(/[^0-9.]/g, '');
      let decimalIndex = value.indexOf('.');
      if (decimalIndex !== -1) {
        value = value.substring(0, decimalIndex + 3);
      }
      if (!value || parseFloat(value) <= 0) {
        value = '0.00';
      }
      input.value = value;
      return false;
    }
  }
  