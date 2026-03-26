import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ImageState = "loading" | "loaded" | "error";

interface PreloadedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  w?: any;
  h?: any;
  mb?: any;
  rounded?: any;
  borderRadius?: any;
  objectFit?: any;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export function PreloadedImage({
  src,
  alt,
  fallbackSrc = "/launch-placeholder.png",
  w,
  h,
  mb,
  rounded,
  borderRadius,
  objectFit = "cover",
  loading = "lazy",
  decoding = "async",
  referrerPolicy = "no-referrer",
}: PreloadedImageProps) {
  const [state, setState] = useState<ImageState>("loading");

  useEffect(() => {
    setState("loading");

    let cancelled = false;
    const img = new window.Image();
    img.decoding = decoding;
    img.referrerPolicy = referrerPolicy;
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      setState("loaded");
    };

    img.onerror = () => {
      if (cancelled) return;
      setState("error");
    };

    return () => {
      cancelled = true;
    };
  }, [src, decoding, referrerPolicy]);

  return (
    <Box position="relative" overflow="hidden" borderRadius={borderRadius ?? rounded} w={w} h={h}>
      {state === "loading" ? <Skeleton rounded={rounded} w={w} h={h} /> : null}
      {state === "loaded" ? (
        <Image
          position="absolute"
          top={0}
          left={0}
          rounded={rounded}
          borderRadius={borderRadius}
          src={src}
          alt={alt}
          w={w}
          h={h}
          mb={mb}
          objectFit={objectFit}
          loading={loading}
          decoding={decoding}
          referrerPolicy={referrerPolicy}
          onError={() => setState("error")}
        />
      ) : null}
      {state === "error" ? (
        <Image
          position="absolute"
          top={0}
          left={0}
          rounded={rounded}
          borderRadius={borderRadius}
          src={fallbackSrc}
          alt={alt}
          w={w}
          h={h}
          mb={mb}
          objectFit={objectFit}
        />
      ) : null}
    </Box>
  );
}

