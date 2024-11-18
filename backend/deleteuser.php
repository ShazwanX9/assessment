<?php include '../inc/config.php'; ?>
<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Check if the 'id' is provided in the POST data
if (isset($_POST['id']) && is_numeric($_POST['id'])) {
    $user_id = $_POST['id'];

    try {
        // Prepare the SQL query to delete the user by ID
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        
        // Bind the parameter to the query
        $stmt->bind_param("i", $user_id);
        
        // Execute the statement
        if ($stmt->execute()) {
            // Check if any rows were affected
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => 'User deleted successfully']);
            } else {
                echo json_encode(['error' => 'User not found or already deleted']);
            }
        } else {
            // Handle error during execution
            echo json_encode(['error' => 'Error executing delete query']);
        }

        // Close the statement
        $stmt->close();
    } catch (Exception $e) {
        // Handle exception and return an error message in JSON format
        echo json_encode(['error' => 'Error deleting user: ' . $e->getMessage()]);
    }
} else {
    // If ID is not provided or invalid
    echo json_encode(['error' => 'Invalid or missing user ID']);
}

// Close the connection
$conn->close();
?>
