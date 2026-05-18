# Rescume 🐾

**A Modern Pet Adoption and Management Platform**

Rescume is a full-stack platform designed to bridge the gap between pet shelters/owners and animal lovers looking to adopt. The application streamlines the listing, discovery, and adoption process, making it easier for pets to find their forever homes.

### 🌐 Live URL

[https://rescume-mu.vercel.app/](https://rescume-mu.vercel.app/)

---

### ✨ Key Features

- **Secure Authentication & JWT Protection:** Integrated with **Better Auth** and custom JWT verification middleware to ensure user data and protected routes (like adding pets or viewing requests) are secure.
- **Dynamic Pet Listings:** Users can create, update, and delete pet listings. Each pet profile includes detailed information such as species, age, and name.
- **Real-time Adoption Pipeline:** A complete request management system where owners can approve or reject incoming requests. Approving a request automatically marks a pet as "Adopted" and notifies other applicants.
- **Advanced Filtering & Search:** A fast, responsive search bar and species filtering allow users to find their perfect companion quickly without page reloads.
- **Responsive Dashboard:** Dedicated views for users to manage their own listed pets and track the status of their adoption applications in a clean, mobile-friendly interface.

---

### 🛠️ Tech Stack & NPM Packages Used

#### **Frontend**

- `next`: React framework for production.
- `better-auth`: Comprehensive authentication library.
- `tailwind-merge` & `clsx`: For dynamic and stylish CSS management.
- `framer-motion`: For smooth UI animations and transitions.
- `lucide-react` / `@gravity-ui/icons`: Modern iconography.

#### **Backend**

- `express`: Minimalist web framework for Node.js.
- `mongodb`: Official driver for database connectivity.
- `jose`: For JWT signing and JWKS verification.
- `cors`: For managing cross-origin resource sharing between Vercel deployments.
- `dotenv`: For secure environment variable management.

---

### 🚀 Getting Started

1.  **Clone the repositories** (Frontend and Backend).
2.  **Install dependencies**: `npm install`.
3.  **Setup Environment Variables**:
    - Backend: `DB_USERNAME`, `DB_PASS`, `CLIENT_URI`, `MONGO_URI`.
    - Frontend: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CLIENT_URI`.
4.  **Run Locally**: `npm run dev` (Frontend) and `node index.js` (Backend).

---

### 📄 License

Distributed under the MIT License.
