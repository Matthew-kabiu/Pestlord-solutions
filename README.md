pestlord-solutions

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```bash
   # n8n webhook for Booking submissions
   VITE_N8N_WEBHOOK_URL=https://n8n.example.com/webhook/test-booking-webhook

   # NewsAPI configuration
   VITE_NEWSAPI_KEY=your_newsapi_key_here
   # Optional tuning
   VITE_NEWSAPI_QUERY=pest control OR termites OR rodents
   VITE_NEWSAPI_PAGE_SIZE=9
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Booking via n8n → Google Sheets

The booking form posts to an n8n webhook, which should append rows to a Google Sheet.

1. Set `VITE_N8N_WEBHOOK_URL` in your `.env`.
2. Use an n8n Webhook node (POST). Sample payload is in `Google Sheet.md`.
3. Map the payload to a Google Sheets → Append operation targeting the `Bookings` sheet.

## Blog via NewsAPI

Blog items are fetched from NewsAPI.

1. Get an API key from `https://newsapi.org` and set `VITE_NEWSAPI_KEY`.
2. Optionally configure `VITE_NEWSAPI_QUERY` and `VITE_NEWSAPI_PAGE_SIZE`.
