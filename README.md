# Web Application Testing Project - E-commerce Website

![Project Type](https://img.shields.io/badge/Project-QA%20Testing-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)
![Testing](https://img.shields.io/badge/Testing-Manual%20%7C%20API%20%7C%20Regression-green)
![Tools](https://img.shields.io/badge/Tools-JIRA%20%7C%20Postman%20%7C%20Excel-purple)

## Overview
This repository contains a complete beginner-friendly **E-commerce Website Testing Project**. It includes a working frontend demo website and professional QA testing artifacts that can be used for internship, fresher QA, and entry-level software testing portfolios.

The project demonstrates how an e-commerce application can be tested using manual testing techniques, API validation, test case design, defect reporting, regression testing, smoke testing, and cross-browser testing.

## Live Demo
[View the deployed e-commerce QA demo](https://webqualityassurance.vercel.app/)

## Application Under Test
The application under test is a sample e-commerce website built using **HTML, CSS, and JavaScript**.

Core modules covered:

- User registration and login
- Product listing
- Product search and category filtering
- Product sorting by price
- Shopping cart
- Coupon application
- Checkout validation
- Payment success and failure flow
- Order confirmation
- Order history test coverage

## Tech Stack And Tools

| Category | Tools / Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Manual Testing | Test scenarios, test cases, test data, defect report |
| API Testing | Postman |
| Defect Tracking | JIRA-style defect reporting |
| Test Management | Excel |
| Browser Testing | Chrome, Microsoft Edge |

## Website Features

| Feature | Description |
|---|---|
| Login | Validates demo username and password |
| Product Catalog | Displays multiple e-commerce products |
| Search | Allows product search by keyword |
| Category Filter | Filters products by category |
| Sorting | Sorts products by price |
| Cart | Add, remove, and update product quantity |
| Coupon | Applies discount using a valid coupon code |
| Checkout | Validates customer and address details |
| Payment Flow | Handles successful and failed payment scenarios |
| Order Confirmation | Generates order confirmation after successful checkout |

## Demo Credentials

### Login
```text
Username: qa_user01
Password: Pass@123
```

### Coupon
```text
Coupon Code: SAVE10
```

## Testing Scope
The following testing types are covered in this project:

- Smoke testing
- Functional testing
- Regression testing
- API testing
- Cross-browser testing
- Positive testing
- Negative testing
- Defect retesting

## QA Deliverables

| Deliverable | Description |
|---|---|
| Test Plan | Defines scope, strategy, environment, entry criteria, and exit criteria |
| Test Scenarios | High-level scenarios for important e-commerce workflows |
| Test Cases | Step-by-step test cases with expected and actual results |
| Test Data | Reusable data for login, search, cart, coupon, and checkout |
| Defect Report | 15 sample defects with severity, priority, status, and steps |
| RTM | Requirement Traceability Matrix mapping requirements to test cases |
| Postman Collection | API requests with validation scripts |
| Test Summary | Execution summary with pass, fail, and blocked counts |

## Testing Summary

| Metric | Count |
|---|---:|
| Total Test Cases | 35 |
| Passed | 25 |
| Failed | 8 |
| Blocked | 2 |
| Defects Reported | 15 |
| Browsers Tested | Chrome, Edge |
| API Endpoints Validated | 8 |

## Defect Summary

| Severity | Count |
|---|---:|
| Critical | 3 |
| High | 6 |
| Medium | 4 |
| Low | 2 |

## Project Structure

```text
website_quality_assurance/
├── index.html
├── styles.css
├── script.js
├── README.md
├── docs/
│   ├── Test_Plan.md
│   └── JIRA_Defect_Report.md
├── postman/
│   └── Ecommerce_API_Testing.postman_collection.json
├── test-data/
│   └── ecommerce_test_data.csv
└── outputs/
    └── Ecommerce_Website_Testing_Project.xlsx
```

## Important Project Files

| File | Purpose |
|---|---|
| `index.html` | Main frontend page |
| `styles.css` | Website styling and responsive layout |
| `script.js` | Product, cart, login, coupon, and checkout logic |
| `docs/Test_Plan.md` | Complete test plan |
| `docs/JIRA_Defect_Report.md` | Sample JIRA-style defect report |
| `test-data/ecommerce_test_data.csv` | Test data used for manual testing |
| `postman/Ecommerce_API_Testing.postman_collection.json` | Postman API testing collection |
| `outputs/Ecommerce_Website_Testing_Project.xlsx` | Excel workbook containing test cases, defects, RTM, and summary |

## How To Run Locally

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in Chrome or Edge.
4. Use the demo credentials to test login and checkout flows.

No installation or backend setup is required because this is a static frontend demo project.

## Sample Test Scenarios

| Scenario ID | Module | Scenario |
|---|---|---|
| TS-001 | Login | Verify user login with valid credentials |
| TS-002 | Login | Verify error message for invalid password |
| TS-003 | Search | Verify product search using valid keyword |
| TS-004 | Cart | Verify product is added to cart successfully |
| TS-005 | Cart | Verify cart total updates after removing item |
| TS-006 | Checkout | Verify checkout with valid customer details |
| TS-007 | Checkout | Verify validation when address is empty |
| TS-008 | Payment | Verify failed payment does not create order |

## Sample Defects

| Defect ID | Module | Summary | Severity | Priority |
|---|---|---|---|---|
| BUG-001 | Login | User can log in with invalid password after multiple attempts | Critical | P1 |
| BUG-006 | Checkout | Coupon discount is applied twice after page refresh | Critical | P1 |
| BUG-008 | Payment | Payment failure still creates order record | Critical | P1 |
| BUG-013 | API | API returns 200 status code for invalid product ID | High | P2 |

## API Testing
The Postman collection validates sample e-commerce API flows such as:

- Login API
- Get all products
- Get product by ID
- Invalid product ID validation
- Create cart
- Get cart by ID

Validations include:

- Status code verification
- Response body verification
- Token validation
- Product data validation
- Cart data validation

## What I Learned
Through this project, I practiced:

- Writing structured test scenarios and test cases
- Designing positive and negative test data
- Reporting defects with severity and priority
- Performing smoke, functional, regression, and cross-browser testing
- Validating APIs using Postman
- Preparing QA documentation for a real-world testing workflow
- Understanding frontend behavior from a tester's perspective
