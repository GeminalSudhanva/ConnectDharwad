# Connect Dharwad — Corporate Website

Premium multi-page corporate website with a working admin panel.

## ✨ Tech Stack

- **Next.js 15** (App Router) + JavaScript
- **Tailwind CSS 3.4** + **shadcn/ui**
- **Framer Motion** for animations
- **MongoDB** (default) + **Prisma/Neon PostgreSQL** (scaffolded)
- **Resend** for transactional email
- **Cloudinary** for image uploads
- Custom HMAC-signed session cookies for admin auth

---

## 🚀 Quick Start

The app is running out of the box on MongoDB. To unlock the remaining integrations, drop credentials into `.env` and restart the server (`sudo supervisorctl restart nextjs`).

### 1. Admin login

Default credentials (change in `.env`):

```env
ADMIN_EMAIL=admin@connectdharwad.org
ADMIN_PASSWORD=admin123
SESSION_SECRET=change-me-to-a-random-32-char-string-abc123
```

Login at: **`/login`**  →  redirects to  →  **`/admin`**

### 2. Email delivery (Resend)

1. Get an API key at [resend.com](https://resend.com) (free tier)
2. Set in `.env`:

```env
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=Connect Dharwad <onboarding@resend.dev>
CONTACT_NOTIFY_EMAIL=you@yourdomain.com
```

Until configured, form submits still save to DB and log to console.

### 3. Cloudinary image uploads

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. From the dashboard, copy Cloud Name, API Key, API Secret
3. Set in `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Until configured, uploaded images are stored as base64 data URLs (still work, just heavier).

### 4. Neon PostgreSQL + Prisma (optional migration)

The app works on MongoDB by default. To migrate to Neon:

1. Create a database at [neon.tech](https://neon.tech)
2. Copy the connection string, set in `.env`:

```env
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
```

3. Generate client + push schema:

```bash
npx prisma generate
npx prisma db push
```

Schema lives in `/app/prisma/schema.prisma`. Migrating the API endpoints from MongoDB (`lib/mongo.js`) to Prisma (`lib/prisma.js`) is a small find/replace once the DB is live.

---

## 🗂 Project structure

```
app/
├── admin/                # Protected admin dashboard
│   ├── page.js           # Dashboard
│   ├── trainers/         # Trainer CRUD
│   ├── testimonials/     # Testimonial CRUD
│   ├── events/           # Event CRUD
│   ├── announcements/    # Announcement CRUD
│   ├── jobs/             # Job CRUD
│   ├── gallery/          # Gallery CRUD with upload
│   ├── clients/          # Client logo CRUD
│   ├── stats/            # Statistics editor
│   └── leads/            # Contact/enquiry/application viewer
├── services/{...}/       # Corporate Training, Recruitment, Consultancy
├── about, events, gallery, testimonials, contact/
├── login/                # Admin login
├── api/[[...path]]/      # Unified REST API
├── error.js              # 500 page
└── not-found.js          # 404 page

components/site/         # Shared Navbar, Footer, Logo, PageHeader
lib/                      # mongo, auth, email, cloudinary, prisma helpers
prisma/schema.prisma      # PostgreSQL schema (ready for migration)
middleware.js             # Auth guard for /admin/*
```

---

## 🔌 API surface

| Method | Endpoint                       | Purpose                                        |
| ------ | ------------------------------ | ---------------------------------------------- |
| POST   | `/api/auth/login`              | Sign in as admin                               |
| POST   | `/api/auth/logout`             | Sign out                                       |
| GET    | `/api/auth/me`                 | Session info                                   |
| POST   | `/api/contact`                 | Public contact form                            |
| POST   | `/api/enquiries`               | Public training/consultancy enquiry            |
| POST   | `/api/apply`                   | Public job application                         |
| GET    | `/api/admin/dashboard`         | Dashboard counts + recent items (auth)         |
| GET    | `/api/admin/leads`             | All contacts + enquiries + applications (auth) |
| GET    | `/api/admin/{resource}`        | List (auth)                                    |
| POST   | `/api/admin/{resource}`        | Create (auth)                                  |
| PUT    | `/api/admin/{resource}/:id`    | Update (auth)                                  |
| DELETE | `/api/admin/{resource}/:id`    | Delete (auth)                                  |
| POST   | `/api/upload`                  | Cloudinary upload (auth)                       |

`{resource}` ∈ `trainers | testimonials | events | announcements | jobs | gallery | clients | stats`

---

## 🎨 Design tokens

Colors are locked in `tailwind.config.js`:

```js
brand: {
  green: '#8CC63F',
  greenDark: '#6EA82F',
  blue: '#83B9E6',
  blueDark: '#5C9CD3',
  charcoal: '#231F20',
  gray: '#D8D8D8',
  accent: '#F7F9FA',
}
```

Typography: **Poppins** (headings) + **Inter** (body).

---

© Connect Dharwad.
