<?php include '../inc/config.php'; ?>
<?php
// Set the content type to JSON
header('Content-Type: application/json');

try {
    // Prepare the SQL query to fetch only phone numbers
    $stmt = $conn->prepare("SELECT user_id, phone_number FROM user_phones");

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows into an array
    $phones = [];
    while ($row = $result->fetch_assoc()) {
        // Add each phone number to the phones array
        $phones[] = [
            'user_id' => $row['user_id'],
            'phone_number' => $row['phone_number']
        ];
    }

    // Output the phone numbers as a JSON array
    echo json_encode($phones);

} catch (Exception $e) {
    // Handle error and return JSON with error message
    echo json_encode(['error' => 'Error fetching phone numbers: ' . $e->getMessage()]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
