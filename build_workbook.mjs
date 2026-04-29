import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs";
const outputFile = `${outputDir}/Ecommerce_Website_Testing_Project.xlsx`;

const workbook = Workbook.create();

const summary = workbook.worksheets.add("Summary");
const scenarios = workbook.worksheets.add("Test Scenarios");
const cases = workbook.worksheets.add("Test Cases");
const defects = workbook.worksheets.add("Defect Log");
const rtm = workbook.worksheets.add("RTM");
const api = workbook.worksheets.add("API Test Cases");

const headerStyle = {
  fill: "#1F4E79",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};

const titleStyle = {
  fill: "#0F172A",
  font: { bold: true, color: "#FFFFFF", size: 14 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};

function styleTable(sheet, range, headerRange) {
  sheet.getRange(headerRange).format = headerStyle;
  sheet.getRange(range).format.wrapText = true;
  sheet.getRange(range).format.verticalAlignment = "top";
}

summary.showGridLines = false;
summary.getRange("A1:H1").merge();
summary.getRange("A1").values = [["E-commerce Website Testing Project"]];
summary.getRange("A1").format = titleStyle;
summary.getRange("A3:B10").values = [
  ["Project Type", "Manual and API Testing"],
  ["Application", "E-commerce Website"],
  ["Tools", "Manual Testing, JIRA, Postman, Excel"],
  ["Browsers", "Chrome, Edge"],
  ["Total Test Cases", 35],
  ["Passed", 25],
  ["Failed", 8],
  ["Blocked", 2],
];
summary.getRange("A3:A10").format = { fill: "#E2E8F0", font: { bold: true } };
summary.getRange("D3:E8").values = [
  ["Metric", "Count"],
  ["Critical Defects", 3],
  ["High Defects", 6],
  ["Medium Defects", 4],
  ["Low Defects", 2],
  ["Total Defects", 15],
];
summary.getRange("D3:E3").format = headerStyle;
summary.getRange("A12:H12").merge();
summary.getRange("A12").values = [["Project Highlights"]];
summary.getRange("A12").format = headerStyle;
summary.getRange("A13:H18").values = [
  ["Performed smoke, functional, regression, API, and cross-browser testing."],
  ["Created positive and negative test scenarios for user login, search, cart, checkout, and order flows."],
  ["Reported 15 defects with severity, priority, status, reproducible steps, expected result, and actual result."],
  ["Validated API status codes, response schema, token generation, cart creation, and product data accuracy."],
  ["Mapped requirements to test cases using a requirement traceability matrix."],
  ["Prepared reusable test data for login, search, coupon, cart, and checkout validations."],
];
summary.getRange("A13:H18").merge(true);
summary.getRange("A13:H18").format.wrapText = true;
summary.getRange("A:A").format.columnWidth = 28;
summary.getRange("B:B").format.columnWidth = 42;
summary.getRange("D:D").format.columnWidth = 24;
summary.getRange("E:E").format.columnWidth = 16;

const scenarioRows = [
  ["Scenario ID", "Module", "Scenario", "Test Type", "Priority"],
  ["TS-001", "Registration", "Verify new user registration with valid data", "Functional", "High"],
  ["TS-002", "Registration", "Verify mandatory field validations", "Negative", "High"],
  ["TS-003", "Login", "Verify login with valid credentials", "Smoke", "Critical"],
  ["TS-004", "Login", "Verify login with invalid credentials", "Negative", "High"],
  ["TS-005", "Search", "Verify product search with exact keyword", "Functional", "High"],
  ["TS-006", "Search", "Verify no results message for invalid keyword", "Negative", "Medium"],
  ["TS-007", "Filter", "Verify price and category filters", "Functional", "Medium"],
  ["TS-008", "Product Details", "Verify product image, price, rating, and description", "Functional", "Medium"],
  ["TS-009", "Cart", "Verify add to cart and quantity update", "Functional", "Critical"],
  ["TS-010", "Cart", "Verify remove item and cart total update", "Regression", "Critical"],
  ["TS-011", "Checkout", "Verify checkout with valid address and coupon", "Smoke", "Critical"],
  ["TS-012", "Checkout", "Verify checkout validations for invalid address", "Negative", "High"],
  ["TS-013", "Payment", "Verify failed payment does not create order", "Negative", "Critical"],
  ["TS-014", "Orders", "Verify order confirmation and order history", "Functional", "High"],
  ["TS-015", "Compatibility", "Verify core flows on Chrome and Edge", "Cross-browser", "Medium"],
];
scenarios.getRange(`A1:E${scenarioRows.length}`).values = scenarioRows;
styleTable(scenarios, `A1:E${scenarioRows.length}`, "A1:E1");
scenarios.tables.add(`A1:E${scenarioRows.length}`, true, "TestScenarioTable");
scenarios.freezePanes.freezeRows(1);
scenarios.getRange("A:A").format.columnWidth = 14;
scenarios.getRange("B:B").format.columnWidth = 20;
scenarios.getRange("C:C").format.columnWidth = 58;
scenarios.getRange("D:E").format.columnWidth = 18;

const testCases = [
  ["TC ID", "Scenario ID", "Module", "Test Case", "Precondition", "Steps", "Test Data", "Expected Result", "Actual Result", "Status", "Browser"],
  ["TC-001", "TS-001", "Registration", "Register using valid user details", "Registration page is open", "Enter name, email, password, confirm password and submit", "new_user@example.com / Pass@123", "Account is created successfully", "Account created", "Pass", "Chrome"],
  ["TC-002", "TS-002", "Registration", "Submit registration form with blank email", "Registration page is open", "Leave email blank and submit", "Blank email", "Email mandatory validation is displayed", "Validation shown", "Pass", "Edge"],
  ["TC-003", "TS-002", "Registration", "Register using existing email", "Registration page is open", "Enter already registered email and submit", "qa_user01@example.com", "Duplicate email error is displayed", "Duplicate email error shown", "Pass", "Chrome"],
  ["TC-004", "TS-003", "Login", "Login with valid credentials", "User account exists", "Enter valid username and password, click login", "qa_user01 / Pass@123", "User lands on home page", "User logged in", "Pass", "Chrome"],
  ["TC-005", "TS-004", "Login", "Login with invalid password", "User account exists", "Enter valid username and invalid password", "qa_user01 / Wrong@123", "Invalid credential error is displayed", "User logged in unexpectedly", "Fail", "Chrome"],
  ["TC-006", "TS-004", "Login", "Verify password field masking", "Login page is open", "Type password into password field", "Pass@123", "Password is masked", "Password masked", "Pass", "Edge"],
  ["TC-007", "TS-005", "Search", "Search product using exact keyword", "User is on home page", "Search for Wireless Mouse", "mouse", "Matching products are displayed", "Unrelated products also shown", "Fail", "Chrome"],
  ["TC-008", "TS-006", "Search", "Search product using invalid keyword", "User is on home page", "Search using invalid text", "xyzinvalid", "No results message is displayed", "No results shown", "Pass", "Edge"],
  ["TC-009", "TS-007", "Filter", "Apply price filter from 500 to 1000", "Product listing is open", "Apply min and max price filter", "500-1000", "Only products in range are displayed", "Max value product missing", "Fail", "Chrome"],
  ["TC-010", "TS-007", "Filter", "Apply category filter", "Product listing is open", "Select Electronics category", "Electronics", "Only electronics products are shown", "Filtered correctly", "Pass", "Edge"],
  ["TC-011", "TS-008", "Product Details", "Open product details page", "Product listing is open", "Click any product", "Bluetooth Speaker", "Product image, price, rating, and description are visible", "Image broken", "Fail", "Chrome"],
  ["TC-012", "TS-009", "Cart", "Add product to cart", "User is logged in", "Click Add to Cart", "USB Keyboard", "Product is added to cart", "Product added", "Pass", "Chrome"],
  ["TC-013", "TS-009", "Cart", "Increase product quantity", "Product exists in cart", "Increase quantity from 1 to 2", "Quantity 2", "Cart quantity and total update", "Button unresponsive", "Fail", "Chrome"],
  ["TC-014", "TS-010", "Cart", "Remove product from cart", "Product exists in cart", "Click remove item", "Bluetooth Speaker", "Product removed and total updates", "Total did not update", "Fail", "Edge"],
  ["TC-015", "TS-011", "Checkout", "Apply valid coupon", "Product is in cart", "Enter SAVE10 and apply", "SAVE10", "Discount applies once", "Discount applied", "Pass", "Chrome"],
  ["TC-016", "TS-011", "Checkout", "Refresh after valid coupon", "Coupon already applied", "Refresh checkout page", "SAVE10", "Discount remains applied once", "Discount applied twice", "Fail", "Chrome"],
  ["TC-017", "TS-012", "Checkout", "Checkout with empty address", "User is on checkout page", "Leave address blank and place order", "Blank address", "Address validation appears", "Order submitted", "Fail", "Edge"],
  ["TC-018", "TS-013", "Payment", "Verify failed payment handling", "Checkout page is open", "Use failed payment data", "Card declined", "Order should not be created", "Order created", "Fail", "Chrome"],
  ["TC-019", "TS-014", "Orders", "Verify order confirmation page", "Order placed successfully", "Open confirmation page", "Order ID", "Correct order details are shown", "Wrong delivery date", "Fail", "Chrome"],
  ["TC-020", "TS-014", "Orders", "Verify latest order in order history", "Order placed successfully", "Open order history", "Latest order", "Latest order is visible", "Latest order visible", "Pass", "Edge"],
  ["TC-021", "TS-015", "Compatibility", "Verify login flow on Edge", "Edge browser is open", "Login with valid user", "qa_user01 / Pass@123", "Login works on Edge", "Login works", "Pass", "Edge"],
  ["TC-022", "TS-015", "Compatibility", "Verify checkout flow on Chrome", "Chrome browser is open", "Complete checkout journey", "SAVE10", "Checkout works on Chrome", "Checkout works", "Pass", "Chrome"],
  ["TC-023", "TS-015", "Compatibility", "Verify logout visibility on Edge zoom", "User is logged in", "Set Edge zoom 125%", "125% zoom", "Logout button remains visible", "Logout button hidden", "Fail", "Edge"],
  ["TC-024", "TS-005", "Search", "Verify search result sorting by price low to high", "Search results visible", "Select low to high sort", "Price sort", "Products sort in ascending price", "Sorted correctly", "Pass", "Chrome"],
  ["TC-025", "TS-008", "Product Details", "Verify product rating display", "Product details page open", "Check rating value and review count", "Laptop Stand", "Rating and reviews visible", "Visible", "Pass", "Edge"],
  ["TC-026", "TS-009", "Cart", "Verify cart persists after logout and login", "Product in cart", "Logout and login again", "USB Keyboard", "Cart item remains available", "Cart retained", "Pass", "Chrome"],
  ["TC-027", "TS-011", "Checkout", "Apply invalid coupon", "Product is in cart", "Enter invalid coupon", "FAKE50", "Invalid coupon message appears", "Message shown", "Pass", "Edge"],
  ["TC-028", "TS-012", "Checkout", "Validate phone number field", "Checkout page open", "Enter alphabetic phone number", "abcphone", "Phone validation appears", "Validation shown", "Pass", "Chrome"],
  ["TC-029", "TS-014", "Orders", "Download invoice", "Order exists", "Click download invoice", "Order ID", "Invoice downloads successfully", "Blocked by invoice service", "Blocked", "Chrome"],
  ["TC-030", "TS-014", "Orders", "Cancel order before shipping", "Order exists in placed status", "Click cancel order", "Order ID", "Order status changes to cancelled", "Cancelled", "Pass", "Edge"],
  ["TC-031", "TS-003", "Login", "Forgot password link", "Login page open", "Click forgot password", "qa_user01@example.com", "Reset link workflow starts", "Reset link sent", "Pass", "Chrome"],
  ["TC-032", "TS-001", "Registration", "Validate weak password", "Registration page open", "Enter weak password", "abc", "Weak password validation appears", "Validation shown", "Pass", "Edge"],
  ["TC-033", "TS-007", "Filter", "Clear applied filters", "Filters applied", "Click clear filters", "Electronics filter", "All products are visible", "All products visible", "Pass", "Chrome"],
  ["TC-034", "TS-010", "Cart", "Move item to wishlist", "Product exists in cart", "Click move to wishlist", "Laptop Stand", "Product moves to wishlist", "Feature unavailable", "Blocked", "Edge"],
  ["TC-035", "TS-011", "Checkout", "Verify tax calculation", "Checkout page open", "Review order total", "State tax", "Tax calculated accurately", "Tax accurate", "Pass", "Chrome"],
];
cases.getRange(`A1:K${testCases.length}`).values = testCases;
styleTable(cases, `A1:K${testCases.length}`, "A1:K1");
cases.tables.add(`A1:K${testCases.length}`, true, "TestCaseTable");
cases.freezePanes.freezeRows(1);
cases.getRange("A:B").format.columnWidth = 14;
cases.getRange("C:C").format.columnWidth = 18;
cases.getRange("D:F").format.columnWidth = 34;
cases.getRange("G:I").format.columnWidth = 28;
cases.getRange("J:K").format.columnWidth = 14;

const defectRows = [
  ["Defect ID", "Linked TC", "Module", "Summary", "Severity", "Priority", "Status", "Steps to Reproduce", "Expected Result", "Actual Result"],
  ["BUG-001", "TC-005", "Login", "User can log in with invalid password after multiple attempts", "Critical", "P1", "Open", "Attempt invalid login multiple times", "Invalid credential error", "User logs in"],
  ["BUG-002", "TC-007", "Search", "Product search returns unrelated products for exact keyword", "High", "P2", "In Progress", "Search for mouse", "Only relevant products", "Unrelated products shown"],
  ["BUG-003", "TC-009", "Filter", "Price filter excludes max value products", "Medium", "P3", "Open", "Apply 500-1000 filter", "Products priced 1000 included", "Products priced 1000 missing"],
  ["BUG-004", "TC-013", "Cart", "Add to cart button becomes unresponsive after quantity update", "High", "P2", "Fixed", "Increase quantity then add another item", "Button works", "Button freezes"],
  ["BUG-005", "TC-014", "Cart", "Cart total is not updated after removing item", "High", "P1", "Retest", "Remove item from cart", "Total recalculates", "Old total remains"],
  ["BUG-006", "TC-016", "Checkout", "Coupon discount applied twice after page refresh", "Critical", "P1", "Open", "Apply coupon and refresh page", "Discount applied once", "Discount applied twice"],
  ["BUG-007", "TC-017", "Checkout", "Checkout allows order with empty address", "High", "P2", "Open", "Submit checkout without address", "Validation appears", "Order submitted"],
  ["BUG-008", "TC-018", "Payment", "Payment failure still creates order record", "Critical", "P1", "In Progress", "Use failed payment data", "No order created", "Order created"],
  ["BUG-009", "TC-019", "Orders", "Order confirmation shows incorrect delivery date", "Medium", "P3", "Open", "Place order and review confirmation", "Correct delivery date", "Wrong delivery date"],
  ["BUG-010", "TC-020", "Orders", "Order history does not show latest placed order", "High", "P2", "Fixed", "Place order and open history", "Latest order visible", "Order missing"],
  ["BUG-011", "TC-011", "Product Details", "Product image is broken on details page", "Medium", "P3", "Open", "Open product details", "Product image visible", "Broken image icon"],
  ["BUG-012", "TC-023", "UI", "Logout button hidden on Edge browser at 125% zoom", "Low", "P4", "Open", "Set Edge zoom to 125%", "Logout visible", "Logout hidden"],
  ["BUG-013", "API-004", "API", "API returns 200 for invalid product ID", "High", "P2", "Open", "GET /products/999999", "404 or empty response", "200 status returned"],
  ["BUG-014", "API-006", "API", "API response time increases after adding multiple cart items", "Medium", "P3", "Open", "Create cart with multiple items", "Response under threshold", "Response delayed"],
  ["BUG-015", "TC-002", "Registration", "Mandatory field validation message is unclear", "Low", "P4", "Open", "Submit blank registration fields", "Clear validation messages", "Generic message shown"],
];
defects.getRange(`A1:J${defectRows.length}`).values = defectRows;
styleTable(defects, `A1:J${defectRows.length}`, "A1:J1");
defects.tables.add(`A1:J${defectRows.length}`, true, "DefectLogTable");
defects.freezePanes.freezeRows(1);
defects.getRange("A:C").format.columnWidth = 14;
defects.getRange("D:D").format.columnWidth = 42;
defects.getRange("E:G").format.columnWidth = 14;
defects.getRange("H:J").format.columnWidth = 34;

const rtmRows = [
  ["Requirement ID", "Requirement", "Scenario ID", "Test Case IDs", "Defect IDs", "Status"],
  ["REQ-001", "User should register with valid details", "TS-001", "TC-001, TC-032", "BUG-015", "Covered"],
  ["REQ-002", "User should log in using valid credentials", "TS-003", "TC-004, TC-021, TC-031", "BUG-001", "Covered"],
  ["REQ-003", "User should search products by keyword", "TS-005", "TC-007, TC-024", "BUG-002", "Covered"],
  ["REQ-004", "User should filter products by category and price", "TS-007", "TC-009, TC-010, TC-033", "BUG-003", "Covered"],
  ["REQ-005", "User should view product details", "TS-008", "TC-011, TC-025", "BUG-011", "Covered"],
  ["REQ-006", "User should add, update, and remove cart items", "TS-009, TS-010", "TC-012, TC-013, TC-014, TC-026, TC-034", "BUG-004, BUG-005", "Covered"],
  ["REQ-007", "User should apply coupons during checkout", "TS-011", "TC-015, TC-016, TC-027", "BUG-006", "Covered"],
  ["REQ-008", "User should complete checkout with valid details", "TS-011, TS-012", "TC-017, TC-028, TC-035", "BUG-007", "Covered"],
  ["REQ-009", "Failed payment should not create an order", "TS-013", "TC-018", "BUG-008", "Covered"],
  ["REQ-010", "User should see order confirmation and history", "TS-014", "TC-019, TC-020, TC-029, TC-030", "BUG-009, BUG-010", "Covered"],
  ["REQ-011", "Core journeys should work on Chrome and Edge", "TS-015", "TC-021, TC-022, TC-023", "BUG-012", "Covered"],
];
rtm.getRange(`A1:F${rtmRows.length}`).values = rtmRows;
styleTable(rtm, `A1:F${rtmRows.length}`, "A1:F1");
rtm.tables.add(`A1:F${rtmRows.length}`, true, "RTMTable");
rtm.freezePanes.freezeRows(1);
rtm.getRange("A:A").format.columnWidth = 16;
rtm.getRange("B:B").format.columnWidth = 48;
rtm.getRange("C:F").format.columnWidth = 26;

const apiRows = [
  ["API TC ID", "Endpoint", "Method", "Scenario", "Request Data", "Expected Status", "Validation", "Status"],
  ["API-001", "/auth/login", "POST", "Login with valid user", "username, password", 200, "Response contains token", "Pass"],
  ["API-002", "/auth/login", "POST", "Login with invalid password", "invalid password", 401, "Error response is returned", "Pass"],
  ["API-003", "/products", "GET", "Get all products", "NA", 200, "Product list is not empty", "Pass"],
  ["API-004", "/products/{id}", "GET", "Get invalid product ID", "999999", 404, "No product object should return", "Fail"],
  ["API-005", "/products/{id}", "GET", "Get valid product ID", "1", 200, "Title, price, category exist", "Pass"],
  ["API-006", "/carts", "POST", "Create cart with multiple products", "userId, products", 201, "Cart contains product array", "Fail"],
  ["API-007", "/carts/{id}", "GET", "Get cart by ID", "1", 200, "Cart has userId and products", "Pass"],
  ["API-008", "/users/{id}", "GET", "Get user details", "1", 200, "User details match schema", "Pass"],
];
api.getRange(`A1:H${apiRows.length}`).values = apiRows;
styleTable(api, `A1:H${apiRows.length}`, "A1:H1");
api.tables.add(`A1:H${apiRows.length}`, true, "APITestTable");
api.freezePanes.freezeRows(1);
api.getRange("A:A").format.columnWidth = 14;
api.getRange("B:B").format.columnWidth = 20;
api.getRange("C:C").format.columnWidth = 12;
api.getRange("D:E").format.columnWidth = 34;
api.getRange("F:F").format.columnWidth = 16;
api.getRange("G:H").format.columnWidth = 26;

for (const sheet of [scenarios, cases, defects, rtm, api]) {
  sheet.showGridLines = false;
}

await fs.mkdir(outputDir, { recursive: true });

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "final formula error scan",
});
console.log(errorScan.ndjson);

for (const sheetName of ["Summary", "Test Scenarios", "Test Cases", "Defect Log", "RTM", "API Test Cases"]) {
  await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputFile);
console.log(`Saved ${outputFile}`);

