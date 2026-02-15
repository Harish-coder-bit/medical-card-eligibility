# Architecture Overview

## Project Structure

```text
medical-card-eligibility/
├── app/
│   ├── api/                           # API endpoints
│   │   ├── auth/route.js              # Admin authentication endpoint
│   │   └── eligibility/route.js       # Submission creation and retrieval
│   ├── admin/
│   │   └── submissions/page.js        # Admin dashboard (login + submissions table)
│   ├── state/[slug]/
│   │   ├── page.js                    # State details page (age, fee, description)
│   │   ├── apply/page.js              # Application form for a state
│   │   └── success/page.js            # Success confirmation page
│   ├── layout.js                      # Root layout (navbar, footer)
│   └── page.js                        # Homepage (state selector)
├── components/
│   ├── FormInput.js                   # Reusable form field component
│   ├── StateSelector.js               # State dropdown selector
│   ├── Navbar.js                      # Navigation bar
│   ├── Footer.js                      # Footer
│   └── LoadingSpinner.js              # Loading spinner
├── schemas/
│   └── eligibility.js                 # Zod validation schemas
├── services/
│   └── eligibility.js                 # In-memory submission storage
└── data/
    └── states.json                    # State data (requirements, fees, descriptions)
```

## Data Flow

### User Application Flow

```
1. User visits homepage (/)
   ↓
2. Selects state from dropdown (StateSelector component)
   ↓
3. Navigates to state details page (/state/[slug])
   ↓
4. Views eligibility requirements (age, fee) and description
   ↓
5. Clicks "Start Evaluation" → navigates to /state/[slug]/apply
   ↓
6. Fills application form (name, email, age, condition, privacy agreement)
   ↓
7. Form validated client-side using Zod schema
   ↓
8. Form data sent to POST /api/eligibility
   ↓
9. Server-side validation (Zod schema)
   ↓
10. Submission stored in memory
    ↓
11. Redirect to success page (/state/[slug]/success)
```

### Admin Viewing Flow

```
1. Admin navigates to /admin/submissions
   ↓
2. Presented with login form
   ↓
3. Enters credentials (username/password from env variables)
   ↓
4. Sends POST request to /api/auth
   ↓
5. Server validates against ADMIN_USER and ADMIN_PASSWORD env vars
   ↓
6. On success, fetches submissions from GET /api/eligibility
   ↓
7. Displays all submissions in a responsive table
```

## Key Components

### Frontend Components

- **StateSelector**: Dropdown for selecting state with validation
- **FormInput**: Reusable component for text, email, number, textarea, and checkbox inputs
- **Navbar**: Simple navigation header
- **Footer**: Footer component
- **LoadingSpinner**: Animated spinner for async operations

### Backend Services

- **eligibility.js**: Simple in-memory service with two functions:
  - `createSubmission(data)`: Creates a submission with ID (timestamp), stores in memory array
  - `getAllSubmissions()`: Returns all stored submissions

### Validation

- **schemas/eligibility.js**: Zod schemas for validation
  - `eligibilitySchema`: Full schema (includes state fields)
  - `eligibilityFormSchema`: Form schema (excludes state fields, added before submission)
  - Validates: name, email, age (1-120), medical condition, privacy agreement

## Data Storage

**Current Implementation**: In-memory array in `services/eligibility.js`

- Submissions stored as JavaScript objects with:
  - `id`: Unique identifier (timestamp)
  - `fullName`: User's full name
  - `email`: Email address
  - `age`: Age as number
  - `medicalCondition`: Medical condition description
  - `state`: State name
  - `stateSlug`: State slug
  - `submittedAt`: ISO timestamp

**Limitation**: Data is lost on server restart (development only)

## Features

1. **State-based eligibility checking**: Different states have different requirements
2. **Form validation**: Client-side and server-side validation using Zod
3. **Admin dashboard**: Secure login and submission viewing
4. **Responsive design**: Mobile-friendly UI using Tailwind CSS
5. **Dynamic routing**: State pages generated via Next.js dynamic routes
6. **Static generation**: State pages pre-generated at build time using `generateStaticParams()`
7. **SEO**: Dynamic metadata generation for state pages

## What Would Improve for Production

1. Database Integration: Integrate a database to persist data so it is not lost when the server restarts.

2. Role-Based Access Control: Assign different roles to users and admins, and implement access checks to protect the dashboard.

3. Separate Dashboards: Create separate dashboards for users and admins with role-specific features and information.

4. Authentication Middleware: Use middleware for authentication to secure routes and API endpoints.

5. Password Encryption & Token Authentication: Encrypt passwords and use JWT tokens for secure authentication.

6. Secure Token Storage: Store authentication tokens in HTTP-only cookies to prevent XSS attacks.

7. Single Sign-On (SSO): Enable SSO integration with providers like Google and GitHub, storing credentials securely in the database.

8. State Management: Use Context API or Redux to manage application data flow efficiently across components.

9. API Rate Limiting: Implement rate limiting on API endpoints to prevent abuse and DDoS attacks.

10. Email Notifications: Send confirmation emails to users upon submission and alert emails to admins for new applications.

11. Pagination & Data Filtering: Implement pagination and advanced filtering on the admin submissions endpoint for large datasets.

12. CORS & Security Headers: Configure proper CORS policies and add security headers (CSP, X-Frame-Options, etc.) to protect against cross-origin attacks.

13. Add Payment Integration: Payment integration using stripe or Paypal etc.

## Build & Deployment

### Development

```bash
npm install
npm run dev
# Access at http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

- `ADMIN_USER`: Admin username (default: "admin")

- `ADMIN_PASSWORD`: Admin password (default: "admin123")

## SEO & Metadata

- Dynamic page titles for each state: `"{state.name} - Medical Card Eligibility"`

- Dynamic descriptions including state requirements
- Revalidation set to 60 seconds for state pages (ISR - Incremental Static Regeneration)
