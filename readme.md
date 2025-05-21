# CareerPulse

CareerPulse is an AI-powered job match platform that recommends jobs based on the user's profile — including skills, experience, and preferences.

**Live Project:** https://career-pulse-portal.vercel.app/  
**Backend API:** https://career-pulse-server.vercel.app/  
**GitHub Repository:** https://github.com/iamsainty/CareerPulse

---

## Tech Stack

**Frontend:** Next.js (App Router), Tailwind CSS, Sonner  
**Backend:** Node.js (Express.js)  
**Database:** MongoDB (Mongoose)  
**AI API:** OpenRouter (Deepseek R1)  
**Hosting:** Vercel (client and server)

---

## Project Structure

```
CareerPulse/
├── client/               # Next.js frontend
│   └── context/          # Auth, profile, and job state contexts
├── server/               # Express backend
│   └── routes/           # API route handlers
└── vercel.json           # Vercel routing config
```

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/iamsainty/CareerPulse
cd CareerPulse
```

2. **Install dependencies using pnpm**

```bash
pnpm install --filter client
pnpm install --filter server
```

3. **Create `.env` files**

Add the following environment variables:

```
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
OPENROUTER_API_KEY=your_openrouter_key
```

4. **Run the app locally**

```bash
pnpm dev --filter client     # Starts frontend (Next.js)
pnpm dev --filter server     # Starts backend (Express)
```

---

## AI Integration

CareerPulse uses OpenRouter’s Deepseek R1 model to generate smart job recommendations.

### How it works:

- First filters jobs by user's preferred `jobType`
- Selects up to 25 relevant jobs from the database
- Sends a prompt to the AI model along with the user’s profile and the filtered jobs
- AI returns 3 best-fit jobs based on skill, experience, and preference match

### Prompt Design (Example):

```
You are a job recommender AI.
You are given a user's profile and must recommend exactly 3 jobs that best suit them.

User Profile:
Name: John Doe
Email: john@example.com
Location: New York
Job Type: Remote
Experience: 2 years
Skills: React, Node.js, MongoDB

All Jobs: [{...}, {...}, {...}]

Return only a valid JSON array of jobs using the format below:
[
  {
    "jobTitle": "string",
    "companyName": "string",
    "salary": "number",
    "location": "string",
    "skills": ["string", "string"],
    "jobType": "string",
    "experienceInYears": "number",
    "description": "string",
    "postedAt": "date"
  }
]

Return only the JSON. Do not include explanations, markdown, or any extra text.
```

---

## API Documentation

### Authentication & User

- `POST /user-auth/signup`  
  Creates a new user. Returns `{ message, token }`.

- `POST /user-auth/signin`  
  Authenticates user. Returns `{ message, token }`.

- `GET /user-auth/fetch-user`  
  Fetches authenticated user profile. Requires `token` in headers.

- `POST /user-auth/signout`  
  Logs user out. (Handled on client side via token removal.)

### Profile

- `PUT /user-profile/update-profile`  
  Updates user profile. Requires `token` in headers. Returns updated user and a message.

### Jobs

- `GET /jobs/getJobs`  
  Returns top 5 recommended jobs using rule-based scoring logic (skills, location, job type, experience).

- `POST /jobs/get-ai-jobs`  
  Uses AI to return top 3 jobs from filtered database. Requires user token.

---

## Code Overview

- `client/context/userAuth.js`  
  Handles sign up, login, logout, and fetchUser logic.

- `client/context/userProfile.js`  
  Handles profile update functionality.

- `client/context/job.js`  
  Handles fetching of job listings (basic + AI-based).

- `server/routes/jobs.js`  
  Includes both rule-based and AI-powered job recommendation endpoints.

- `server/routes/user-auth.js` and `user-profile.js`  
  Manage user registration, authentication, and profile data.

---

## Trade-offs & Assumptions

- Limited job entries to 25 per AI call to stay within token limits
- AI matches are only fetched when profile is sufficiently complete
- Some features like loading skeletons, filters, pagination, and admin dashboard were skipped due to time constraints (semester exams)

---

## License

This project was developed as part of a technical assignment under time constraints. Feedback is welcome!

---