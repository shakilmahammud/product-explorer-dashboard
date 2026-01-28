# Product Explorer Dashboard

A modern, responsive React application built with TypeScript, Vite, React Query, Zustand, and Tailwind CSS. Explore products, search, filter, and customize your experience.

## Features
**Dynamic Product Browsing**: View products with infinite scrolling (20 items per load).
**Advanced Filtering**: Filter by category and search by title with deep-linking (URL persistent state).
**Responsive Design**: Fully optimized for Desktop and Mobile viewports.
**Custom Settings**: Global currency configuration (USD, Pound, Euro) using React Context API.
**Robust UI**: Custom-built reusable Table, Loading Skeletons, and Error Boundaries.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Performance & Scalability Summary

### 1. Conscious Trade-offs
- **Client-Side Sorting/Filtering**: Due to API limitations on combining nested searching/sorting/filtering efficiently, some sorting and category filtering is performed on the client-side data. This ensured a consistent UI experience within the timeframe.
**ager Loading**: For this smaller project, I skipped route lazy-loading to prioritize a seamless initial navigation experience, though this would be the first change for a production app .

# 2. Scalability Refactors
If this application were to scale significantly, I would prioritize:
**Component Granularity**: Refactoring large feature components into smaller, memoized sub-components to prevent unnecessary re-renders in massive data tables.
**Advanced State Selectors**: Implementing strict Zustand selectors and immutable state patterns to optimize the render path.

# 3. AI Usage & Verification
I used AI to explore ideas and sample implementations, then verified correctness by manually reviewing the logic, testing API behavior, and refining the solution before implementing my own approach.
