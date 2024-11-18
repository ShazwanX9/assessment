<?php include '../inc/config.php'; ?>
<?php
// Set the content type to JSON
header('Content-Type: application/json');

try {
    // Prepare the SQL query
    $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, b.name AS brand, t.name AS type
                            FROM product p
                            JOIN brand b ON p.brand_id = b.id
                            JOIN type t ON p.type_id = t.id");

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows into an array
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Output the products as a JSON array
    echo json_encode($products);
} catch (Exception $e) {
    // Handle error and return JSON with error message
    echo json_encode(['error' => 'Error fetching products: ' . $e->getMessage()]);
}

// Close the statement (mysqli doesn't require explicitly closing the connection if it's done at the end of the script)
$stmt->close();
$conn->close();
?>
