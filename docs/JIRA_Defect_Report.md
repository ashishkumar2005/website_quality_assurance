# JIRA Defect Report - E-commerce Website

| Defect ID | Summary | Module | Severity | Priority | Status |
|---|---|---|---|---|---|
| BUG-001 | User can log in with invalid password after multiple attempts | Login | Critical | P1 | Open |
| BUG-002 | Product search returns unrelated products for exact keyword | Search | High | P2 | In Progress |
| BUG-003 | Price filter does not include products equal to maximum value | Filter | Medium | P3 | Open |
| BUG-004 | Add to cart button becomes unresponsive after quantity update | Cart | High | P2 | Fixed |
| BUG-005 | Cart total is not updated after removing an item | Cart | High | P1 | Retest |
| BUG-006 | Coupon discount is applied twice after page refresh | Checkout | Critical | P1 | Open |
| BUG-007 | Checkout allows order placement with empty address line | Checkout | High | P2 | Open |
| BUG-008 | Payment failure still creates order record | Payment | Critical | P1 | In Progress |
| BUG-009 | Order confirmation page shows incorrect delivery date | Orders | Medium | P3 | Open |
| BUG-010 | Order history does not show latest placed order | Orders | High | P2 | Fixed |
| BUG-011 | Product image is broken on product details page | Product Details | Medium | P3 | Open |
| BUG-012 | Logout button is hidden on Edge browser at 125% zoom | UI | Low | P4 | Open |
| BUG-013 | API returns 200 status code for invalid product ID | API | High | P2 | Open |
| BUG-014 | API response time increases after adding multiple cart items | API | Medium | P3 | Open |
| BUG-015 | Mandatory field validation message is unclear on registration page | Registration | Low | P4 | Open |

## Sample Detailed Defect
**Defect ID:** BUG-006  
**Title:** Coupon discount is applied twice after page refresh  
**Module:** Checkout  
**Severity:** Critical  
**Priority:** P1  
**Environment:** Windows 11, Chrome  

### Steps to Reproduce
1. Log in with a valid user account.
2. Add any product to the cart.
3. Navigate to checkout.
4. Apply coupon code `SAVE10`.
5. Refresh the checkout page.

### Expected Result
Coupon discount should be applied only once.

### Actual Result
Coupon discount is applied again after refresh, reducing the order total incorrectly.

### Status
Open

