<div class="form-container">
    <form id="memberForm" method="POST" action="backend/updateuser.php">
        <input type="hidden" id="member_id" name="member_id" value="">

        <div class="row">
            <div class="col2">
                <input type="text" id="name" name="name" required>
                <label for="name">Name</label>
            </div>
            <div class="col2">
                <input type="text" id="ic-number" name="ic-number" required maxlength="12" oninput="formatICNumber()" placeholder="YYMMDDXXXXXX">
                <label for="ic-number">IC Number</label>
            </div>
        </div>

        <div class="row">
            <div class="col2">
                <input type="text" id="age" name="age" readonly>
                <label for="age">Age</label>
            </div>
            <div class="col2">
                <input type="text" id="member-id" name="member-id" value="ID-XXXXX" readonly>
                <label for="member-id">Member ID (Unique)</label>
            </div>
        </div>

        <div class="row">
            <input type="email" id="email" name="email" required>
            <label for="email">Email</label>
        </div>

        <div class="row">
            <label for="phone">Phone Number(s)</label>
            <div id="phone-numbers">
                <input type="text" class="phone-number" name="phone[]" required minlength="8" maxlength="15" pattern="^[0-9]+$" placeholder="Enter phone number">
            </div>
            <button type="button" onclick="addPhoneNumber()">Add Another Phone Number</button>
        </div>

        <div class="row" style="display: flex; justify-content: right; gap: 16px; space around">
            <button type="button" onclick="goBack()">Back</button>
            <button type="submit">Submit</button>
        </div>
    </form>
</div>

<script src="./static/js/user/form.js"></script>
