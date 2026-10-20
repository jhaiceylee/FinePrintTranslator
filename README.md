# Fine Print Translator

Zero-login web page: drop a PDF or photo of dense fine print, get a three-part plain-language summary (what it is, what you must do, traps/fees/deadlines). Free for users. You keep the copy on your device.

## Run locally

1. Install [Node.js](https://nodejs.org/) 18+.
2. Copy `app/.env.example` to `app/.env`.
3. Put a Google Gemini **free-tier** API key in `GEMINI_API_KEY`. Keep Gemini **billing off** so you are not charged.
4. From the `app` folder:

```bash
npm start
```

5. Open http://127.0.0.1:3847

## Tests

```bash
cd app
npm test
```

## Notes

- No user accounts. No payment. No server-side history of uploads or results.
- The Gemini key stays in `app/.env` only — never commit `.env`.
- When free capacity is exhausted, the page asks the person to try later.
