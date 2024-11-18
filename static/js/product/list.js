const retrieve_product_route = '/alpro/backend/retrieveproduct.php'
const update_product_route = '/alpro/backend/updateproduct.php'
const itemsPerPage = 6;
let currentPage = 1;
let products = [];
let filteredProducts = [...products];

function uploadToServer(product) {
    if (products.length === 0) {
        console.log("No products to upload.");
        return;  // Exit the function if there are no products
    }
    fetch(update_product_route, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Products uploaded successfully!");
        } else {
            console.log("Error uploading products: " + data.message);
        }
        fetchProducts(retrieve_product_route); // Refetch products after successful upload
    })
    .catch(error => {
        console.error("Error during file upload:", error);
        alert.log("An error occurred during the upload.");
    });
}

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (file) {
        if (file.name.endsWith('.csv')) {
            handleCSVUpload(file);
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            handleExcelUpload(file);
        } else {
            console.log("Please upload a valid file (.csv, .xlsx, .xls).");
        }
    }
}

// Function to handle CSV file upload
function handleCSVUpload(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        parseCSV(contents);
    };
    reader.readAsText(file);  // Read the file as text
}

// Parse CSV content and generate product cards
function parseCSV(csvContent) {
    Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            console.log("Parsed CSV data:", results.data);
            products = results.data.map(row => ({
                title: row['Product Name'] || '',
                description: row['Description'] || '',
                price: row['Price'] || '',
                brand: row['Product Brand'] || '',
                type: row['Product Type'] || ''
            }));
            // Call validateProducts AFTER parsing CSV data
            validateProducts(products);  // Validate product data after parsing
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
}

// Function to handle Excel file upload using SheetJS
function handleExcelUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract headers and data
        const headers = jsonData[0];
        products = jsonData.slice(1).map(row => ({
            title: row[headers.indexOf('Product Name')] || '',
            description: row[headers.indexOf('Description')] || '',
            price: row[headers.indexOf('Price')] || '',
            brand: row[headers.indexOf('Product Brand')] || '',
            type: row[headers.indexOf('Product Type')] || ''
        }));

        console.log("Parsed Excel data:", products);
        // Call validateProducts AFTER parsing Excel data
        validateProducts(products);  // Validate product data after parsing
    };
    reader.readAsArrayBuffer(file);
}

// Basic validation for products before uploading
function validateProducts(products) {
    const invalidProducts = products.filter(product => !product.title || !product.price || !product.brand);
    if (invalidProducts.length > 0) {
        console.log("Some products are missing required fields. Please check your data.");
    } else {
        products.forEach(product => {
            uploadToServer(product);
        });
        filteredProducts = [...products];
        renderProducts(products);
    }
}

// Function to fetch products from PHP backend
function fetchProducts(path) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            products = data;
            filteredProducts = [...products];
            renderProducts(products);
            updatePagination(products);
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to generate product card HTML
function generateProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-card__body">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__desc">${product.description}</div>
                <div class="product-card__labels">
                    <label for="type-${product.id}">Brand:</label>
                    <input 
                        id="brand-${product.id}" 
                        class="label label_hit" 
                        type="text" 
                        value="${product.brand}" 
                        onchange="showSaveButton(${product.id})" />
                    <label for="type-${product.id}">Type:</label>
                    <input 
                        id="type-${product.id}" 
                        class="label label_hit" 
                        type="text" 
                        value="${product.type}" 
                        onchange="showSaveButton(${product.id})" />
                </div>
                <div class="product-card__price price">
                    <span class="price__current">RM ${product.price}</span>
                </div>
            </div>
            <div class="product-card__btn">
                <button id="save-btn-${product.id}" class="btn btn_product" type="button" style="display: none;" onclick="saveChanges(${product.id})">Save Changes</button>
            </div>
        </div>
    `;
}

function showSaveButton(productId) {
    const saveButton = document.getElementById(`save-btn-${productId}`);
    if (saveButton) {
        saveButton.style.display = 'inline-block';
    }
}

function saveChanges(productId) {
    const typeInput = document.getElementById(`type-${productId}`);
    const brandInput = document.getElementById(`brand-${productId}`);

    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        console.error("Product not found.");
        return;
    }

    const originalProduct = products[productIndex];
    const updatedProduct = {
        id: productId,
        name: originalProduct.name,
        type: typeInput.value,
        brand: brandInput.value,
        title: originalProduct.name,
        description: originalProduct.description,
        price: originalProduct.price
    };

    if (updatedProduct.type !== originalProduct.type || updatedProduct.brand !== originalProduct.brand) {
        products[productIndex] = updatedProduct;
        uploadToServer(updatedProduct);

        const saveButton = document.getElementById(`save-btn-${productId}`);
        if (saveButton) {
            saveButton.style.display = 'none';
        }
    } else {
        const saveButton = document.getElementById(`save-btn-${productId}`);
        if (saveButton) {
            saveButton.style.display = 'none';
        }
    }
}

// Function to render products based on the current page
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Clear the previous products
    productList.innerHTML = '';

    // Get products for the current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Append the product cards
    currentProducts.forEach(product => {
        productList.innerHTML += generateProductCard(product);
    });

    // Update pagination
    updatePagination(products);
}

// Function to update pagination
function updatePagination(products) {
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = Math.ceil(products.length / itemsPerPage);
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
            renderProducts(products);
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
            renderProducts(filteredProducts);
        }
    });

    document.getElementById('next').addEventListener('click', function (e) {
        e.preventDefault();
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(filteredProducts);
        }
    });

    // Initial fetch & render
    fetchProducts(retrieve_product_route);
});

// Function to filter products based on search input
function filterProducts() {
    currentPage = 1;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    });
    renderProducts(filteredProducts);
    updatePagination(filteredProducts)
}
