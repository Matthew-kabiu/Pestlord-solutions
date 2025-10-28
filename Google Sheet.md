# Pestlord Solutions — Booking Google Sheet Structure

This sheet stores booking requests sent via the website to an n8n webhook and then to Google Sheets. Columns below map 1:1 with the website booking form and include a few operational fields.

## Sheet: Bookings

- **submission_id**: Unique ID generated in n8n (UUID). Example: `c0a8012f-...`.
- **submitted_at**: ISO timestamp when request was received. Example: `2025-10-28T10:35:21.123Z`.
- **source**: Constant string set by website, e.g. `website-booking`.
- **name**: Full name from form. Example: `John Doe`.
- **email**: Email from form. Example: `john@example.com`.
- **phone**: Phone number from form. Example: `+254700000000`.
- **preferred_date**: Preferred date from form (YYYY-MM-DD). Example: `2025-11-02`.
- **preferred_time**: Preferred time slot text. Example: `10:00 AM - 12:00 PM`.
- **service_type**: Selected service type. Example: `Termite Inspection`.
- **location**: Property location/address. Example: `Nairobi, Kenya`.
- **additional_notes**: Free text notes. Example: `Gate code 1234`.
- **status**: Operational status. Default `pending`. Allowed: `pending`, `contacted`, `scheduled`, `completed`, `cancelled`.
- **assigned_to**: Team member handling the request. Example: `Mary W.`.
- **admin_comments**: Internal comments from ops team.

## n8n Webhook Payload (sample)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254700000000",
  "preferred_date": "2025-11-02",
  "preferred_time": "10:00 AM - 12:00 PM",
  "service_type": "Termite Inspection",
  "location": "Nairobi, Kenya",
  "additional_notes": "Gate code 1234",
  "submitted_at": "2025-10-28T10:35:21.123Z",
  "source": "website-booking"
}
```

## Suggested n8n Steps (high level)

1. Webhook (POST) → Respond `202 Accepted` immediately.
2. Set/Generate `submission_id` if not present.
3. Add defaults: `status=pending`, `assigned_to=''`.
4. Append row to Google Sheet `Bookings` with the fields above.
5. Optional: Slack/Email notification to team.

## Data Validation Tips

- **preferred_date**: Data validation as date, format `YYYY-MM-DD`.
- **status**: Dropdown list of allowed values.
- **email**: Basic email validation (REGEXMATCH) optional.
- **phone**: Normalize to international format where possible.

## Minimal Required Columns

`submission_id, submitted_at, source, name, email, phone, preferred_date, preferred_time, service_type, location, additional_notes, status`
