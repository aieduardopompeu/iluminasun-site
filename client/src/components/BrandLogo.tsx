import { useState } from "react";

type BrandLogoProps = {
  className?: string;
  alt?: string;
  href?: string;
  width?: number;
  height?: number;
};

export function BrandLogo({
  className = "",
  alt = "Ilumina Sun",
  href = "/",
  width = 156,
  height = 36,
}: BrandLogoProps) {
  const [fallbackToPng, setFallbackToPng] = useState(false);

  const src = fallbackToPng ? "/logo.png" : "/logo.svg";

  return (
    <a href={href} aria-label="Ir para a página inicial" className="inline-flex items-center">
      <img
        src={src}
        srcSet={
          fallbackToPng
            ? "/logo.png 1x, /logo@2x.png 2x, /logo@3x.png 3x"
            : undefined
        }
        width={width}
        height={height}
        style={{ width, height }}
        className={`block select-none ${className}`}
        alt={alt}
        loading="eager"
        decoding="async"
        draggable={false}
        onError={() => setFallbackToPng(true)}
      />
    </a>
  );
}
