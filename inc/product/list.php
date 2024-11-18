<div class="tools" >
    <div class="pagination">
        <a href="#" id="prev" class="pagination-item ">prev</a>
        <a href="#" id="next" class="pagination-item ">next</a>
    </div>
    <div class="search-bar" style="vertical align venter">
        <input type="text" id="search-input" placeholder="Search products..." onkeyup="filterProducts()" />
    </div>
    <button type="button" class="page-button" onclick="document.getElementById('product-file').click();">Upload Product</button>
    <input type="file" id="product-file" accept=".csv, .xlsx, .xls" style="display:none;" onchange="handleFileUpload(event)">
</div>

<div id="product-list" class="container page-container"></div>
<script src="./static/js/product/list.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
