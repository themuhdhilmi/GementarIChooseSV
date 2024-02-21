/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdna.artstation.com", "picsum.photos"],
  },
  // secret: process.env.NEXTAUTH_SECRET,
};
