# System Design Quests

> Spine: `jobsearch/WAMA-SYSTEM-DESIGN-PREP.md` — "You rated this 0/10. You have
> done the work. This is translation, not learning. ~2 hours."
> **Day 0: rewrite all six topics from memory, then compare against the WAMA doc.**

**Format every answer the same way:**
> **Problem → Options considered → Choice + why → What I'd do differently at 10× scale**

## The six WAMA topics (write from memory, 90 min)

| # | Topic | Your story |
|---|---|---|
| 1 | Multi-tenant SaaS architecture | the job portal — shared DB + scoped query layer, hybrid promotion |
| 2 | Caching | Redis — TTL as backstop, invalidate on write, stampede/penetration |
| 3 | Database scaling | the honest ladder: fix query → index → replicas → cache → shard last |
| 4 | Async, queues, idempotency | LLM/WhatsApp workflows — idempotency keys, backoff + jitter, DLQ |
| 5 | API design | versioning, `Idempotency-Key`, token-bucket rate limiting, signed webhooks |
| 6 | Zero-downtime deployment | expand-and-contract; contract is its own deploy — your strongest story |

`npm run xp -- award sd-topic-N --kind sd --note "<one-line summary>"` → +200 XP each.

## Ten practice scenarios

Write **two full ones** in Week 3 (charter booking + one more); talk through the rest.

| # | Scenario | Focus |
|---|---|---|
| 1 | **Charter/flight booking platform** | inventory, booking, payments, Redis cache, queues (your domain) |
| 2 | Multi-tenant job portal | tenant isolation, scoped queries (your real work) |
| 3 | URL shortener | hashing, lookup at scale, analytics |
| 4 | Rate limiter | token bucket, per-client, 429 + Retry-After |
| 5 | Notification system | SMS/WhatsApp/email fan-out, retries, DLQ |
| 6 | Chat / messaging | WebSockets, presence, message history |
| 7 | Ride/charter dispatch | matching, geolocation, real-time updates |
| 8 | E-commerce cart + inventory | consistency, oversell prevention |
| 9 | Video transcoding pipeline | async workers, object storage, status polling |
| 10 | News feed | fan-out vs fan-in, caching hot reads |

`npm run xp -- award sd-scenario-N --kind sd --note "<scenario>"` → +200 XP each.

## Free references (as of 2026-10-06)

- [System Design Primer](https://github.com/donnemartin/system-design-primer) (free, canonical)
- [ByteByteGo](https://bytebytego.com/) free chapters
- [designgurus.io free guide](https://www.designgurus.io/blog/free-system-design-resources)
- `Data Structures and Algorithms - Narasimha Karumanchi .pdf` (offline theory reference)

Skip paid courses (ByteByteGo paid, Educative) until an interview is booked.
