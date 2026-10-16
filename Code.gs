
const BATCH_SIZE = 100;
const DELETE_BATCH_SIZE = 50;

/**
 * Scan files owned by the current Google account.
 * The Apps Script project itself is excluded.
 */
function getOwnedFilesBatch(continuationToken) {
  const scriptId = ScriptApp.getScriptId();

  const iterator = continuationToken
    ? DriveApp.continueFileIterator(continuationToken)
    : DriveApp.searchFiles(
        "'me' in owners and trashed = false"
      );

  const files = [];
  let checked = 0;

  while (iterator.hasNext() && checked < BATCH_SIZE) {
    const file = iterator.next();
    checked++;

    // Never trash the Apps Script project running this tool.
    if (file.getId() === scriptId) continue;

    let size = 0;
    try {
      size = file.getSize();
    } catch (e) {
      // Some file types may not expose a usable size.
    }

    files.push({
      id: file.getId(),
      name: file.getName(),
      size: size,
      sizeMB: Number((size / (1024 * 1024)).toFixed(2)),
      type: file.getMimeType()
    });
  }

  const more = iterator.hasNext();

  return {
    files: files,
    nextToken: more ? iterator.getContinuationToken() : null,
    done: !more
  };
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Google Drive Cleanup");
}

/**
 * Move a batch of previously scanned files to Trash.
 * Rechecks ownership before each operation.
 */
function trashOwnedFilesBatch(ids) {
  if (!Array.isArray(ids) || ids.length > DELETE_BATCH_SIZE) {
    throw new Error("Invalid batch. Maximum 50 files per request.");
  }

  const scriptId = ScriptApp.getScriptId();
  const email = Session.getEffectiveUser().getEmail();

  if (!email) {
    throw new Error(
      "Could not verify your Google account. Reauthorize and try again."
    );
  }

  let trashed = 0;
  let skipped = 0;
  const errors = [];

  ids.forEach(function(id) {
    try {
      if (id === scriptId) {
        skipped++;
        return;
      }

      const file = DriveApp.getFileById(id);
      const owner = file.getOwner();

      if (!owner || owner.getEmail() !== email) {
        skipped++;
        return;
      }

      if (file.isTrashed()) {
        skipped++;
        return;
      }

      file.setTrashed(true);
      trashed++;
    } catch (e) {
      errors.push({
        id: id,
        message: String(e.message || e).slice(0, 150)
      });
    }
  });

  return {
    trashed: trashed,
    skipped: skipped,
    errors: errors
  };
}

