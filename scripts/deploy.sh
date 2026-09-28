#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$(readlink -f "$0")"
SCRIPT_DIR="$(dirname "$SCRIPT_PATH")"
LOG_FILE="/home/pi/deploy.log"
CRON_SCHEDULE="*/5 * * * *"
CRON_MARKER="dev-portfolio-auto-deploy"

cd "$SCRIPT_DIR"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# --- Pull latest repo changes; re-exec if anything (including this
#     script) changed, so the rest of the run uses the fresh code -----
BEFORE_COMMIT="$(git rev-parse HEAD)"
git pull --ff-only -q
AFTER_COMMIT="$(git rev-parse HEAD)"

if [ "$BEFORE_COMMIT" != "$AFTER_COMMIT" ] && [ -z "${DEPLOY_REEXECED:-}" ]; then
  log "Repo updated ($BEFORE_COMMIT -> $AFTER_COMMIT) — re-running with latest code..."
  export DEPLOY_REEXECED=1
  exec "$SCRIPT_PATH" "$@"
fi

# --- Keep the crontab in sync with what's committed here ----------------
ensure_cron_installed() {
  local desired_line="${CRON_SCHEDULE} ${SCRIPT_PATH} >> ${LOG_FILE} 2>&1 # ${CRON_MARKER}"
  local existing
  existing="$(crontab -l 2>/dev/null || true)"

  if printf '%s\n' "$existing" | grep -qF "$desired_line"; then
    return 0
  fi

  log "Cron entry missing or out of date — updating crontab..."
  {
    printf '%s\n' "$existing" | grep -vF "$CRON_MARKER" || true
    echo "$desired_line"
  } | grep -v '^$' | crontab -
}

ensure_cron_installed

# --- Deploy ----------------------------------------------------------------
get_image_ids() {
  docker compose config --images 2>/dev/null | while read -r image; do
    docker image inspect -f '{{.Id}}' "$image" 2>/dev/null || echo "none"
  done | sort
}

log "Checking for new deploy..."

BEFORE="$(get_image_ids)"
docker compose pull -q
AFTER="$(get_image_ids)"

if [ "$BEFORE" != "$AFTER" ]; then
  log "Deploying new version..."
  docker compose up -d
  docker image prune -f
  log "New version deployed." 
else
  log "No new version found."
fi