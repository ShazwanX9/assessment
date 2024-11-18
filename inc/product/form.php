<div class="form-container">
    <form id="productForm" method="POST" action="backend/updateproduct.php">
        <input type="hidden" id="product_id" name="product_id" value="">

        <div class="row">
            <div class="col2">
                <input type="text" id="title" name="title" required>
                <label for="title">Product Title</label>
            </div>
            <div class="col2">
                <input type="number" id="price" name="price" required step="0.01" oninput="validatePrice(this)" value="0.00">
                <label for="price">Price</label>
            </div>
        </div>

        <div class="row">
            <textarea id="description" name="description" rows="4" required></textarea>
            <label for="description">Description</label>
        </div>

        <div class="row">
            <div class="col2">
                <input type="text" id="brand" name="brand" required>
                <label for="brand">Brand</label>
            </div>
            
            <div class="col2">
                <input type="text" id="type" name="type" required>
                <label for="type">Type</label>
            </div>
        </div>

        <div class="row" style="display: flex; justify-content: right;">
            <button type="submit">Add Product</button>
        </div>
    </form>
</div>

<script src="./static/js/product/form.js"></script>
