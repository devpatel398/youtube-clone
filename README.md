# ViewTube

A Youtube-inspired video-sharing website.

> This is mock website for practice purposes. There is a max limit of 10 videos for the Mux api free plan. (If there are 10 videos you MIGHT not be able to upload your own to test)

### Tech

- NextJS
- React 19
- tRPC v11
- Drizzle
- Neon DB
- Mux
- Clerk Auth
- Svix Webhook
- Upstash Redis + Ratelimit
- Upstash Workflow
- Google Gemini 2.0 API
- Cloudflare Workers AI
- Tailwind V4

--- Local:

- Ngrok: Local development tunnel for Clerk webhooks

### Features

- [x] User-uploaded videos (With managed details, categories, tags, etc)
- [x] Video processing service (Mux)
- [x] Video playlist creation and management
- [x] Channel subscriptions
- [x] Video comments and likes system
- [x] AI-Generation tools for the user to use (Video title, description, thumbnail)
- [ ] Real-time status updates for long-running tasks using SSE

--- Tech

- [ ] Use of Redis KV service as event channel for communication between Workflows and tRPC subscription endpoints. This allows real-time status tracking of the state of workflows for the client.
- [x] Using NextJS Parallel Routes and Route Intercepting for the creation of Router-compliant modals
- [x] Clerk Auth synchronization to local own db though Webhooks (Svix verification)
- [x] Authenticated server component prefetching through tRPC v11's support for server-side calls
- [x] Vercel KV (Upstash) Redis service for request rate limiting
- [x] Implementation of Background Jobs using Upstash Workflow for dealing with long-running tasks, such as AI-generation requests

---
