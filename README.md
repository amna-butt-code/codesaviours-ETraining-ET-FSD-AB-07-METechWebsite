# ME Technologies Website

Website and admin panel for ME Technologies, an engineering consultancy and training company. Built for the Codesaviours E-Training internship project (12 to 17 October 2026).

The site has two business goals: bring in consulting clients and enroll students in training programs.

## Tech stack

- Frontend: React (Vite), React Router, Tailwind CSS, Axios
- Backend: Node.js, Express
- Database: MongoDB (Atlas) with Mongoose
- Auth: JWT, passwords hashed with bcrypt
- Validation: Zod (server), form checks (client)
- Image upload: Multer (local `uploads` folder)

## Features

- Public pages: Home, About, Services (list and detail), EV Charging, Training (list, detail and enrollment), Projects (list with sector filter and detail), Blog (search, categories, pagination), Contact, Get a Quote, Privacy, Terms, custom 404
- Floating WhatsApp button and sticky responsive header with mobile menu
- All public content comes from the database
- Admin panel: login, dashboard counts, CRUD for services, courses, batches, projects and blog posts, leads and enrollments tables with search, filter and status, image upload
- Advanced module 1: smart quote form with solar estimate (see below)

## Advanced module: Smart quote form (Module 1)

Code is in `client/src/modules/smartQuote/`.

- Three-step form: city, customer type, property type and size, bill or monthly units, inverter ACs, system type, contact details
- Result screen: system size (kW), number of panels, roof area and rough monthly savings
- All formula values are in `solarConfig.js` so they can be adjusted
- Every submission is saved as a lead and appears in the admin panel
- Note: the tariff in `solarConfig.js` is a placeholder. Results are rough estimates only.

## Brand

Colors are defined as CSS variables in `client/src/index.css`.

| Variable | HEX |
|---|---|
| --color-primary | #15803d |
| --color-secondary | #f5b921 |
| --color-dark | #0f2a1a |
| --color-light | #f1f8f3 |
| --color-text | #334155 |

Fonts: Poppins (headings) and Inter (body).

## Setup

You need Node.js and a MongoDB database (a free MongoDB Atlas cluster works).

```bash
git clone https://github.com/amna-butt-code/codesaviours-ETraining-ET-FSD-AB-07-METechWebsite.git
cd codesaviours-ETraining-ET-FSD-AB-07-METechWebsite
```

Backend:

```bash
cd server
npm install
cp .env.example .env      # on Windows PowerShell: copy .env.example .env
# fill in the values in .env
npm run seed              # creates admin user, 6 services, Solar Design course and a batch
node seed-content.js      # adds 3 sample projects and 3 sample blog posts
npm run dev               # runs on http://localhost:5000
```

Frontend (in a second terminal):

```bash
cd client
npm install
npm run dev               # runs on http://localhost:5173
```

## Environment variables (server/.env)

| Name | Description |
|---|---|
| MONGO_URI | MongoDB connection string, with the database name `metech` |
| JWT_SECRET | Any long random string used to sign login tokens |
| PORT | Server port, default 5000 |

## Admin login (seed user)

- URL: http://localhost:5173/admin
- Email: admin@metech.com
- Password: Admin@12345

## API list

Base URL: `http://localhost:5000/api`. Routes marked (auth) need the header `Authorization: Bearer <token>`.

| Method | Route | Description |
|---|---|---|
| POST | /auth/login | Admin login, returns a JWT |
| GET | /services, /courses, /batches, /projects, /posts | List (public) |
| GET | /services/:slug, /courses/:slug, /projects/:slug, /posts/:slug | One item by slug (public) |
| POST, PUT, DELETE | /services, /courses, /batches, /projects, /posts | Create, update, delete (auth) |
| POST | /leads | Submit contact or quote form (public, validated) |
| GET, PUT, DELETE | /leads | List with search and status filter, change status, delete (auth) |
| POST | /enrollments | Enroll in a batch, seats counted automatically (public, validated) |
| GET, PUT, DELETE | /enrollments | List with search and status filter, change status, delete (auth) |
| POST | /upload | Upload an image (auth) |
| GET | /stats | Dashboard counts (auth) |

## Screenshots

Screenshots are in the `docs/` folder.

## Demo video

Demo video: see the `demo/` folder, or the link here: (add link)

## Notes

- Project and blog content is sample content, clearly labelled. No real client names, logos or reviews are used.
- Team members, office hours, map location and legal text are placeholders to be replaced with real information.