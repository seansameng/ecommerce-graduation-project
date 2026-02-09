// Minimal JWT payload decode for extracting non-sensitive claims client-side.
// This does not verify signatures; it is only for convenience (e.g. "sub" user id).

function base64UrlDecodeToJson(base64Url) {
    if (!base64Url || typeof base64Url !== "string") return null;
    try {
        const b64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, "=");
        const json = atob(padded);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function getJwtPayload(token) {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    return base64UrlDecodeToJson(parts[1]);
}

export function getUserIdFromToken(token) {
    const payload = getJwtPayload(token);
    const sub = payload?.sub;
    const id = Number(sub);
    return Number.isFinite(id) ? id : null;
}

