
# Google Drive Cleanup

A lightweight Google Apps Script web app for scanning files owned by your Google account and moving scanned files to Trash in bulk.

Built to simplify Google Drive storage cleanup without manually selecting thousands of files.

## Features

- Scan files owned by your Google account
- Process large file collections in batches
- Display file counts and approximate storage size
- Preview scanned files before cleanup
- Bulk-move scanned files to Google Drive Trash
- Verify file ownership before moving files to Trash
- Display progress and cleanup results
- Responsive dashboard for desktop and mobile
- Google Apps Script backend with an HTML frontend

## Tech Stack

- Google Apps Script
- Google Drive Service
- HTML5
- CSS3
- JavaScript

## Project Structure

```text
google-drive-cleanup/
├── Code.gs
├── index.html
└── README.md
```

## Setup

1. Visit https://script.google.com/
2. Create a new Google Apps Script project.
3. Add the backend code to `Code.gs`.
4. Add the dashboard code to `index.html`.
5. Save the project.
6. Add a `doGet()` function in `Code.gs` if it is not already present.
7. Open **Deploy → New deployment**.
8. Select **Web app** as the deployment type.
9. Choose **Execute as: Me**.
10. Restrict access to yourself where possible.
11. Deploy and authorize the required permissions.
12. Open the web app URL.

## How to Use

1. Open the deployed web app.
2. Click **Scan My Drive**.
3. Wait for the scan to finish.
4. Review the file preview and scan results.
5. Confirm the bulk cleanup action if you want to proceed.
6. Review the resulting status and storage usage.

## Important Notes

- This tool moves scanned, accessible files owned by your account to Trash.
- Files owned by other users are excluded.
- The tool does not permanently erase files.
- Review important documents and backups before cleanup.
- Some Google Workspace file types may report zero or approximate sizes.
- Google Apps Script execution quotas and Drive permissions may limit large operations.
- A fresh scan is recommended before retrying a failed cleanup.
- Keep the deployed web app restricted to trusted users.

## Security

This application requires authorization to access Google Drive.

Use a private or appropriately restricted deployment. Do not expose a deployment configured to execute as your account to untrusted users, because they could potentially perform destructive actions on your Drive.

## Limitations

- The scan is limited to files accessible through the Drive service.
- Storage totals may differ from the figures shown by Google Drive.
- Files in Trash may continue to count toward storage until permanently deleted.
- The application does not guarantee that every Drive file will be accessible or processed in one session.

## License

MIT License

You may use, modify, and distribute this project under the terms of the MIT License.
