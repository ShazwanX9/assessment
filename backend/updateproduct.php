<?php include '../inc/config.php'; ?>

<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'Invalid data format. No data received or could not decode JSON.']);
    exit;
}

$productname = "title";
$description = "description";
$price = "price";
$brand = "brand";
$type = "type";
$product_id = isset($data['id']) ? $data['id'] : null;

$product_name = isset($data[$productname]) ? $data[$productname] : null;
$product_description = isset($data[$description]) ? $data[$description] : null;
$product_price = isset($data[$price]) ? $data[$price] : null;
$brand_name = isset($data[$brand]) ? $data[$brand] : null;
$type_name = isset($data[$type]) ? $data[$type] : null;

if (!$product_name || !$product_description || !$product_price || !$brand_name || !$type_name) {
    echo json_encode([
        'error' => 'Missing required fields.',
        'product_name' => $product_name,
        'product_description' => $product_description,
        'product_price' => $product_price,
        'brand_name' => $brand_name,
        'type_name' => $type_name
    ]);
    exit;
}

if (!is_numeric($product_price) || $product_price <= 0) {
    echo json_encode(['error' => 'Invalid price value. Price must be a positive number.']);
    exit;
}

$product_name = htmlspecialchars($product_name);
$product_description = htmlspecialchars($product_description);
$brand_name = htmlspecialchars($brand_name);
$type_name = htmlspecialchars($type_name);

$conn->begin_transaction();

try {
    // Check and insert brand if not exists
    $brand_id = getIdByName($conn, 'brand', $brand_name);
    if (!$brand_id) {
        $stmt = $conn->prepare("INSERT INTO brand (name) VALUES (?)");
        $stmt->bind_param('s', $brand_name);
        if (!$stmt->execute()) {
            throw new Exception('Error inserting new brand.');
        }
        $brand_id = $conn->insert_id; // Get the ID of the newly inserted brand
        $stmt->close();
    }

    // Check and insert type if not exists
    $type_id = getIdByName($conn, 'type', $type_name);
    if (!$type_id) {
        $stmt = $conn->prepare("INSERT INTO type (name, brand_id) VALUES (?, ?)");
        $stmt->bind_param('si', $type_name, $brand_id);
        if (!$stmt->execute()) {
            throw new Exception('Error inserting new type.');
        }
        $type_id = $conn->insert_id; // Get the ID of the newly inserted type
        $stmt->close();
    }

    if ($product_id) {
        // Update existing product
        $stmt = $conn->prepare("SELECT id FROM product WHERE id = ?");
        $stmt->bind_param('i', $product_id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows === 0) {
            throw new Exception('Product not found.');
        }
        $stmt->close();

        $stmt = $conn->prepare("UPDATE product 
                                SET name = ?, description = ?, price = ?, brand_id = ?, type_id = ? 
                                WHERE id = ?");
        $stmt->bind_param('ssdiis', $product_name, $product_description, $product_price, $brand_id, $type_id, $product_id);
        if ($stmt->execute()) {
            $response = ['success' => 'Product updated successfully.'];
        } else {
            throw new Exception('Error executing update statement.');
        }
        $stmt->close();
    } else {
        // Insert new product
        $stmt = $conn->prepare("INSERT INTO product (name, description, price, brand_id, type_id) 
                                VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('ssdis', $product_name, $product_description, $product_price, $brand_id, $type_id);
        if ($stmt->execute()) {
            $response = ['success' => 'New product inserted successfully.'];
        } else {
            throw new Exception('Error executing insert statement.');
        }
        $stmt->close();
    }

    $conn->commit();
    echo json_encode($response);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['error' => 'Error processing request: ' . $e->getMessage()]);
}

function getIdByName($conn, $table, $name) {
    $stmt = $conn->prepare("SELECT id FROM $table WHERE name = ?");
    $stmt->bind_param('s', $name);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();

    return $id;
}
?>
