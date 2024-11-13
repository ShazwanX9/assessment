For the Programmer candidate please follow this instructions:

### Create 1 Form page, 1 List page and 1 Statistic page that implement CRUD operations. ### 
**User List Page**
1) List page is the Master List that show all record of user.
2) Create (Add User) Button to redirect to the form page on top of Master List.
3) Create Action column in Master List with Edit and Delete buttons.
4) Display only necessary fields for each row.
5) The list need to have search bar.

**Form Page**
1) The form page should have fields for Name, IC Number, Age, Email, Phone Number, Member ID (unique).
2) Age will automatically calculate when IC Number is been key in.
3) User may have more than 1 Phone Number.
5) User can click "Submit" button to add data into the database or "Back" Button in the list page.

**Product List Page**
1) List page is the Master List that show all record of product.
2) Create (Upload Product) field to accept .csv /.xlsx/.xls to upload bulk product to Master List.
3) The excel file should have Product Name, Description, Price, Product Brand and Product Type.
4) Display only necessary fields for each row.
5) The list need to have search bar.

**Product Form Page**
1)Each product from master list can only edit their respective Product Brand and Product Type.

**Statistic Page**
1) The Statistic page should have Bar Chart that shows amount of users based on their Product Brand. (Chart js)

**Additional file**
1) Create header page that have Navbar that can navigate between each page listed above and need to be included in all page.
2) Create footer page that have footer information about the website such as copyright etc and need to be included in all page.
3) This Additional page must store in inc folder.

#### Code Example ####

*Use inc/config.php file to create Database connection.
*Only brand and type table are given in assessment.sql

Additional Marks:
1) Add Pagination on List Page
2) Form page should have common validation for each fields. 
3) Please consider to sanitize the data.
4) Send before due date is preferable.
