# Imperion

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://imperion-bank.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://imperion-bank.vercel.app)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com)

A unified financial super-app combining neobank, payments, and crypto features into a single account — one identity, one balance, across web and mobile.

**Live demo:** https://imperion-bank.vercel.app

## Overview

Imperion merges the best patterns from leading neobanks (Chime, Revolut, N26), payment platforms (Stripe, Square, Adyen), and crypto apps (Coinbase, Kraken, Phantom) into one cohesive product. Users get a single login, a unified ledger spanning fiat and crypto, card management, and a shared design system — on web (Next.js) and mobile (Expo, planned).

## Features

- **Unified account** — single identity, single balance view across fiat and crypto
- **Multi-currency balances** — USD, EUR, GBP, BTC, ETH, USDC, and more
- **Send money** — P2P, domestic, international (fiat)
- **Card management** — virtual/physical cards, freeze/unfreeze, spend controls
- **Crypto** — custodial wallet, buy/sell/swap, send/receive, portfolio tracking
- **Security** — Supabase Auth, RLS per user, 2FA/passkey-ready schema
- **Dark mode first** — cohesive design system with light mode option

## Tech stack

| Layer | Technology |
|-------|------------|
| Web | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Mobile | Expo (React Native) — planned |
| API | Supabase (PostgreSQL + RLS + Auth) |
| State | Zustand (client), React Query (server) |
| Testing | Vitest (unit), Playwright (e2e, planned) |
| Deploy | Vercel (web), Supabase (backend) |

## Architecture

```
src/
├── app/
│   ├── (app)/          # Authenticated app shell (sidebar + bottom nav)
│   │   ├── dashboard/  # Unified balance + recent activity
│   │   ├── money/      # Send, request, exchange, vaults
│   │   ├── cards/      # Card list, freeze/unfreeze, controls
│   │   ├── crypto/     # Portfolio, buy/sell/swap, wallets
│   │   ├── notifications/
│   │   └── settings/   # Profile, security, devices
│   ├── (auth)/         # Login, signup
│   └── page.tsx        # Landing
├── components/
│   ├── layout/         # Sidebar, bottom nav
│   └── ui/             # Button, Card
└── lib/
    ├── supabase/       # Browser + server clients
    └── utils.ts
```

## Database

Supabase project (us-east-1). Schema (migration `unified_financial_schema`):

- `profiles` — extends `auth.users`, KYC status, risk score
- `accounts` — fiat + crypto, auto-created on signup
- `balances` — multi-currency, seeded on account creation
- `transactions` — unified ledger (fiat + crypto)
- `cards` — virtual/physical, freeze status, spend limits
- `wallets` — crypto addresses (custodial + connected)
- `kyc_documents`, `notifications`, `devices`

Row Level Security is enabled on every table (per-user policies).

## Getting started

### Prerequisites

- Node.js 20+
- A Supabase project (or use the hosted one)

### Setup

```bash
git clone https://github.com/Pmvita/imperion.git
cd imperion
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Run:

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm test           # Vitest unit tests
npm run lint       # ESLint
```

## Deployment

Deployed on Vercel: https://imperion-bank.vercel.app

To deploy your own:

```bash
vercel --prod
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project settings.

## Roadmap

- [ ] Stripe issuing integration (virtual + physical cards)
- [ ] WalletConnect (external wallet connect)
- [ ] KYC vendor integration (ID verification, selfie, address proof)
- [ ] Passkeys (WebAuthn) + TOTP 2FA
- [ ] Expo mobile app (feature parity)
- [ ] Playwright e2e suite
- [ ] Storybook component docs

## License

MIT © [Pierre Mvita](https://github.com/Pmvita)

