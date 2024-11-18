<?php
include '../inc/config.php'; // Database connection

// Set the content type to JSON
header('Content-Type: application/json');

// Check database connection
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

try {
    // Query to retrieve data from the user_products table along with brand name
    $query = "
        SELECT 
            up.user_id, 
            u.name AS user_name, 
            u.ic_number, 
            u.age, 
            u.email, 
            up.product_id, 
            p.name AS product_name, 
            p.price, 
            p.description,
            b.name AS brand_name
        FROM 
            user_products up
        JOIN 
            users u ON up.user_id = u.id
        JOIN 
            product p ON up.product_id = p.id
        JOIN
            brand b ON p.brand_id = b.id
    ";

    $result = $conn->query($query);

    // Check if the query was successful
    if ($result->num_rows > 0) {
        // Initialize an empty array to hold the results
        $userProducts = [];

        // Fetch each row and add it to the array
        while ($row = $result->fetch_assoc()) {
            $userProducts[] = $row;
        }

        // Return the results as a JSON response
        echo json_encode($userProducts, JSON_PRETTY_PRINT);
    } else {
        // If no data is found, return an empty array
        echo json_encode([]);
    }
} catch (Exception $e) {
    // Return error message in case of failure
    echo json_encode(['error' => 'Something went wrong: ' . $e->getMessage()]);
} finally {
    // Close the database connection
    $conn->close();
}
?>
