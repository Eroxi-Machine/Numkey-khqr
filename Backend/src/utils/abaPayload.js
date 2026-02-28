export const normalizeItemsForAba = (items) => {
    if (items === undefined || items === null || items === "") return "";

    const toBase64 = (value) => Buffer.from(JSON.stringify(value), "utf8").toString("base64");

    if (Array.isArray(items)) {
        return toBase64(items);
    }

    if (typeof items === "string") {
        const trimmed = items.trim();
        if (!trimmed) return "";

        try {
            const decoded = Buffer.from(trimmed, "base64").toString("utf8");
            const parsedDecoded = JSON.parse(decoded);
            if (Array.isArray(parsedDecoded)) {
                return trimmed;
            }
        } catch {
        }

        try {
            const parsed = JSON.parse(trimmed);
            if (!Array.isArray(parsed)) {
                throw new Error("Items must be a JSON array.");
            }
            return toBase64(parsed);
        } catch {
            throw new Error("Invalid items format. Provide array, JSON array string, or Base64-encoded JSON array.");
        }
    }

    throw new Error("Invalid items format. Provide array, JSON array string, or Base64-encoded JSON array.");
};
