import sharp, { OutputInfo } from "sharp";

const allowed = ["png", "jpg", "jpeg", "webp", "avif"];

export const convertImage = async (i: string, o: string): Promise<string | OutputInfo> => {
    try {
        const outputExt = o.split(".").pop()?.toLowerCase();
        if (!outputExt || !allowed.includes(outputExt)) {
        return "Invalid output format";
        }

        let pipeline = sharp(i);

        switch (outputExt) {
        case "png":
            pipeline = pipeline.png();
            break;
        case "jpg":
        case "jpeg":
            pipeline = pipeline.jpeg();
            break;
        case "webp":
            pipeline = pipeline.webp();
            break;
        case "avif":
            pipeline = pipeline.avif();
            break;
        default:
            return "Unsupported format";
        }

        return await pipeline.toFile(o);
    } catch (err) {
        return err instanceof Error ? err.message : "Internal Server Error"
    }
}