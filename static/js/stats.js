const retrieve_userproduct_route = '/alpro/backend/retrieveuserproduct.php';

fetch(retrieve_userproduct_route)
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);

        if (!data || data.length === 0) {
            console.log('No data received');
            return;
        }

        // Step 1: Count the number of unique users for each product_id
        const productUserCount = {};

        data.forEach(item => {
            const productId = item.product_id;
            const userId = item.user_id;

            // If the product is already in the map, add the user (avoiding duplicates)
            if (!productUserCount[productId]) {
                productUserCount[productId] = new Set();  // Using Set to store unique users
            }

            productUserCount[productId].add(userId);  // Add the user_id to the set
        });

        // Step 2: Extract product names and user counts
        const productNames = [];
        const userCounts = [];

        Object.keys(productUserCount).forEach(productId => {
            const product = data.find(item => item.product_id == productId); // Find the product details
            productNames.push(product.product_name);  // Get the product name
            userCounts.push(productUserCount[productId].size); // Get the count of unique users
        });

        console.log('Product Names:', productNames);
        console.log('User Counts:', userCounts);

        // Step 3: Create the bar chart using Chart.js
        const ctx = document.getElementById('brandChart').getContext('2d');
        const brandChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: productNames,  // X-axis labels (Product names)
                datasets: [{
                    label: 'Number of Users',
                    data: userCounts,  // Y-axis values (user count)
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
                    borderColor: 'rgba(75, 192, 192, 1)',  // Border color
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true  // Ensure the y-axis starts at 0
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false  // Hide legend
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
