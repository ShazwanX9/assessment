<?php
$page = isset($_GET['page']) ? $_GET['page'] : '';
$form = isset($_GET['form']) ? $_GET['form'] : '';
$stats = isset($_GET['stats']) ? $_GET['stats'] : '';
?>
<div style="padding-top:32px;">
    <h1 style="text-align: center; color: white;">Admin System</h1>
    <nav class="section">
        <ul>
            <li><a href="?page=user-master">User Master List</a></li>
            <li><a href="?page=user-edit">Add User</a></li>
            <li><a href="?page=product-master">Product Master List</a></li>
            <li><a href="?page=product-edit">Add Product</a></li>
            <li><a href="?page=stats">Statistics</a></li>
        </ul>
    </nav>    
</div>    
