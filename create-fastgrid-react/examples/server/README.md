# FastGrid React example server

This server exists only to demonstrate local FastGrid file, SQLite and PDF
examples.

## Security warning

This is **not a production server**. It intentionally exposes demonstration
endpoints and sample data and listens only on `127.0.0.1`.

Do not:

- bind it to a public interface;
- deploy it to the internet;
- use its sample authentication logic in an application;
- process untrusted file paths, SQL values, HTML or XLSX files with it;
- use `--no-sandbox` Puppeteer settings in an untrusted environment.

Production integrations must add authentication, authorization, input
validation, path containment, parameterized SQL, CSRF protection, restrictive
CORS, request-size limits, logging and process isolation.
