<div class="tools" >
    <div class="pagination">
        <a href="#" id="prev" class="pagination-item ">prev</a>
        <a href="#" id="next" class="pagination-item ">next</a>
    </div>
    <div class="search-bar">
        <input type="text" id="search-bar" placeholder="Search by name..." oninput="filterUsers()">
    </div>
    <button class="btn" onclick="window.location.href='/alpro?page=user-edit';">Create (Add User)</button>
</div>

<!-- Master List Table -->
<div style="display: flex; justify-content: center; align-items: center;">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="user-table-body"></tbody>
    </table>
</div>
<script src="./static/js/user/list.js"></script>
