/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The shipped portfolio placeholders are locally authored SVGs.
    // When real nail photography (.jpg/.webp) replaces them this flag is harmless.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
