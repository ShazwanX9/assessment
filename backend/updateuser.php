<?php
include '../inc/config.php';

header('Content-Type: application/json');

// Read the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if the data is valid
if (!$data) {
    echo json_encode(['error' => 'Invalid data format. No data received or could not decode JSON.']);
    exit;
}

// Extract data from JSON
$name = isset($data['name']) ? $data['name'] : null;
$ic_number = isset($data['icNumber']) ? $data['icNumber'] : null;
$age = isset($data['age']) ? (int)$data['age'] : null;
$email = isset($data['email']) ? $data['email'] : null;
$phone_numbers = isset($data['phoneNumbers']) ? $data['phoneNumbers'] : null;
$user_id = isset($data['id']) ? (int)$data['id'] : null;

// Check for missing required fields
if (!$name || !$ic_number || !$age || !$email || !$phone_numbers || !$user_id) {
    echo json_encode(['error' => 'Missing required fields.',
        'name'=> $name,
        'ic_number'=> $ic_number,
        'age'=> $age,
        'email'=> $email,
        'phone_numbers'=> $phone_numbers,
        'user_id'=> $user_id,
        "data" => $data
    ]);
    exit;
}

// Validate Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email format.']);
    exit;
}

// Validate Phone Numbers (ensure each phone number is 7-15 digits)
foreach ($phone_numbers as $phone) {
    if (!preg_match('/^\d{7,15}$/', $phone)) {
        echo json_encode(['error' => 'Invalid phone number format. Each phone number must be between 7 and 15 digits.']);
        exit;
    }
}

// Sanitize input to prevent XSS
$name = htmlspecialchars($name);
$ic_number = htmlspecialchars($ic_number);
$email = htmlspecialchars($email);

// Start a database transaction
$conn->begin_transaction();

try {
    // Check if the user with the given ID exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // User exists, perform an update
        $stmt = $conn->prepare("UPDATE users SET name = ?, ic_number = ?, age = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssisi", $name, $ic_number, $age, $email, $user_id);
        $stmt->execute();

        if ($stmt->affected_rows === 0) {
            throw new Exception('User update failed or no changes made.');
        }

        // Delete existing phone numbers to replace with new ones
        $stmt = $conn->prepare("DELETE FROM user_phones WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
    } else {
        // User doesn't exist, perform an insert
        $stmt = $conn->prepare("INSERT INTO users (name, ic_number, age, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $name, $ic_number, $age, $email);
        $stmt->execute();

        // Get the last inserted user ID
        $user_id = $stmt->insert_id;
    }

    // Insert phone numbers
    foreach ($phone_numbers as $phone) {
        $stmt = $conn->prepare("INSERT INTO user_phones (user_id, phone_number) VALUES (?, ?)");
        $stmt->bind_param("is", $user_id, $phone);
        $stmt->execute();
    }

    // Commit transaction
    $conn->commit();

    // Return success
    echo json_encode(['success' => true, 'user_id' => $user_id]);
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    
    // Return error message
    echo json_encode(['error' => $e->getMessage()]);
}

?>
