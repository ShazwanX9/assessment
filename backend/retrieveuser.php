<?php include '../inc/config.php'; ?>
<?php
// Set the content type to JSON
header('Content-Type: application/json');

try {
    // Prepare the SQL query to fetch user data
    $stmt = $conn->prepare("SELECT u.id, u.name, u.ic_number, u.age, u.email
                            FROM users u");

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows into an array
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Output the users as a JSON array
    echo json_encode($users);
} catch (Exception $e) {
    // Handle error and return JSON with error message
    echo json_encode(['error' => 'Error fetching users: ' . $e->getMessage()]);
}

// Close the statement (mysqli doesn't require explicitly closing the connection if it's done at the end of the script)
$stmt->close();
$conn->close();
?>
