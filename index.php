<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assessment</title>
    <link rel="stylesheet" href="./static/css/section.css">
    <link rel="stylesheet" href="./static/css/general.css">
    <?php
        if (isset($_GET['page']) && $_GET['page'] == "user-master") {
            echo '<link rel="stylesheet" href="./static/css/user/table.css">';
            echo '<link rel="stylesheet" href="./static/css/pagination.css">';
        } elseif (isset($_GET['page']) && $_GET['page'] == "user-edit") {
            echo '<link rel="stylesheet" href="./static/css/form.css">';
        } elseif (isset($_GET['page']) && $_GET['page'] == "product-master") {
            echo '<link rel="stylesheet" href="./static/css/product/product.css">';
            echo '<link rel="stylesheet" href="./static/css/pagination.css">';
        } elseif (isset($_GET['page']) && $_GET['page'] == "product-edit") {
            echo '<link rel="stylesheet" href="./static/css/form.css">';
        } elseif (isset($_GET['stats'])) {
            echo '<link rel="stylesheet" href="./static/css/stats.css">';
        } else {
            echo '<link rel="stylesheet" href="./static/css/user/table.css">';
            echo '<link rel="stylesheet" href="./static/css/pagination.css">';
        }
    ?>
</head>

<body>
    <?php include 'inc/header.php';?>
    <h2 style="text-align: center; color: white;">
        <?php 
        if ($page == 'user-master') {
            echo "User Master List";
        } elseif ($page == 'user-edit') {
            echo "Add User";
        } elseif ($page == 'product-master') {
            echo "Product Master List";
        } elseif ($page == 'product-edit') {
            echo "Add Product";
        } elseif ($page == 'stats') {
            echo "Statistics";
        } else {
            echo "User Master List";
        }
        ?>
    </h2>

    <div class="container">
        <?php
            if (isset($_GET['page'])) {
                if ($_GET['page'] == "user-master") {
                    include 'inc/user/list.php';
                } elseif ($_GET['page'] == "user-edit") {
                    include 'inc/user/form.php';
                } elseif ($_GET['page'] == "product-master") {
                    include 'inc/product/list.php';
                } elseif ($_GET['page'] == "product-edit") {
                    include 'inc/product/form.php';
                } elseif ($_GET['page'] == "stats") {
                    include 'inc/stats.php';
                }
            }
            else {
                include 'inc/user/list.php';
            }
        ?>
    </div>
    <?php include 'inc/footer.php';?>
</body>

</html>