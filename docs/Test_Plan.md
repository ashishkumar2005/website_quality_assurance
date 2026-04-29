# Test Plan - E-commerce Website

## Objective
To validate that the e-commerce website works as expected across critical user journeys, including login, product browsing, cart management, checkout, order placement, and API responses.

## Scope
### In Scope
- User registration and login
- Product search, sort, and filter
- Product details page
- Add to cart and remove from cart
- Apply coupon
- Checkout and payment validation
- Order confirmation
- Order history
- API validation for products, cart, login, and orders
- Cross-browser testing on Chrome and Edge

### Out of Scope
- Performance testing
- Security penetration testing
- Payment gateway settlement testing with real banking systems
- Native mobile app testing

## Test Types
- Smoke testing
- Functional testing
- Regression testing
- API testing
- Cross-browser testing
- Negative testing

## Test Environment
- OS: Windows 11
- Browsers: Chrome, Microsoft Edge
- API Tool: Postman
- Defect Tool: JIRA
- Test Management: Excel
- Test Data: CSV and Excel

## Entry Criteria
- Test environment is available.
- Test data is prepared.
- Requirements are understood and mapped to test scenarios.
- API endpoints are accessible.
- Latest build is deployed.

## Exit Criteria
- All critical and high-priority test cases are executed.
- No open blocker or critical defects remain.
- Failed test cases are retested after fixes.
- Regression testing is completed.
- Test execution summary is shared.

## Risks
- Requirement changes during testing.
- Test environment downtime.
- Incomplete API documentation.
- Third-party payment gateway limitations.

## Defect Severity
- Critical: Blocks major business flow or prevents checkout/order placement.
- High: Affects important functionality but workaround may exist.
- Medium: Functional issue with limited impact.
- Low: UI, content, or minor usability issue.

## Defect Priority
- P1: Must fix immediately.
- P2: Should fix before release.
- P3: Fix if time allows in current sprint.
- P4: Can be fixed later.

