import { ImageResponse } from "next/og";
import { AppIcon } from "./_components/app-icon";

export const contentType = "image/png";

const SIZES = [192, 512];

export function generateImageMetadata() {
  return SIZES.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType,
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  return new ImageResponse(<AppIcon size={size} />, {
    width: size,
    height: size,
  });
}
