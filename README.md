# Imperion — Unified Financial Super-App

A production-grade financial super-app combining neobank, payments, and crypto features
into a single unified account. Web (Next.js 16) + shared Supabase backend.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Supabase (PostgreSQL + RLS + Auth) — project `nzrkwmbaktjrokwesofu` (us-east-1)
- Zustand / React Query
- Vitest (unit)

## Setup
1. `.env.local` already contains Supabase URL + anon key.
2. `npm install`
3. `npm run dev` (http://localhost:3000)
4. `npm run build` to verify production build.
5. `npm test` (Vitest)

## Schema
Tables: profiles, accounts, balances, transactions, cards, wallets, kyc_documents, notifications, devices.
RLS enabled per-user. Profile + fiat/crypto accounts auto-created on signup with seeded balances.

## Features (current)
- Auth (email/password signup + login)
- Dashboard with multi-currency balances + recent activity
- Money (P2P send)
- Cards (list, freeze/unfreeze)
- Crypto (portfolio, wallets, connect)
- Settings (sign out)
- Notifications

## Notes
Provider integrations (Stripe issuing, WalletConnect, KYC vendor) are scaffolded at the
data-model/UI level; wire real credentials in production.
