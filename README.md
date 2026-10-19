# SM Green Energy Worker Portal

A Next.js + PostgreSQL + Prisma worker portal for SM Green Energy Solutions.

## Features

- Workers cannot register themselves.
- Each worker uses an owner-created Worker ID + PIN.
- Worker sessions use an HttpOnly cookie.
- Workers submit solar project/customer data.
- Full customer name/mobile/address are stored privately.
- Public project API never returns private customer fields.
- Submitted projects are immediately public.
- Worker can see their own submissions.
- Zod validation is applied server-side.

## Stack

- Next.js App Router
- PostgreSQL
- Prisma
- bcryptjs
- jose
- Zod

## 1. Install

```bash
npm install
```

Use Node.js 24+ for the current Prisma/Next.js setup.

## 2. Configure environment

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL="your-postgresql-connection-string"
AUTH_SECRET="a-long-random-secret"
```

Never commit `.env`.

## 3. Database

```bash
npx prisma migrate dev --name init
npm run db:seed
```

The seed creates a demo worker:

- Worker ID: `SMW-001`
- PIN: `2468`

Change/remove this demo worker before production.

## 4. Run

```bash
npm run dev
```

Open:

- `/` home
- `/login` worker login
- `/worker` worker portal
- `/projects` public projects
- `GET /api/projects` public project API
- `POST /api/projects` authenticated worker submission

## Production security checklist

Before production:

1. Replace the demo worker PIN.
2. Generate a strong `AUTH_SECRET`.
3. Add rate limiting/WAF at your hosting layer.
4. Add CAPTCHA if abuse becomes an issue.
5. Put uploaded photos in object storage rather than the database.
6. Add an owner-only worker-management area/API to create, disable, reset and rotate Worker IDs/PINs.
7. Add audit logs for worker submissions.
8. Keep customer fields out of all public API responses.
9. Add backups to PostgreSQL.
10. Add HTTPS in production.

## Public API response

`GET /api/projects` intentionally returns only public fields such as:

- project code
- city/district/state
- project type
- capacity
- panel/inverter
- dates
- status
- description
- public images

It does NOT return:

- customer name
- customer mobile
- full address
- worker ID
- worker name
- PIN/password

## Important

This starter uses image URLs, not direct file uploads. For production, add an authenticated image-upload route using a storage provider and validate MIME type, file size and dimensions.
