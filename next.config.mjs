/**
 * تنظیمات Next.js برای پروژه DataGrid
 * 
 * این فایل شامل:
 * - تنظیمات ESLint و TypeScript برای توسعه
 * - تنظیمات بهینه‌سازی تصاویر
 * - تنظیمات build و development
 * 
 * نکات مهم:
 * - ESLint و TypeScript errors در زمان build نادیده گرفته می‌شوند
 * - تصاویر بهینه‌سازی نمی‌شوند (برای توسعه)
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // نادیده گرفتن خطاهای ESLint در زمان build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // نادیده گرفتن خطاهای TypeScript در زمان build
  typescript: {
    ignoreBuildErrors: true,
  },
  // غیرفعال کردن بهینه‌سازی تصاویر
  images: {
    unoptimized: true,
  },
}

export default nextConfig
