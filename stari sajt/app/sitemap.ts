import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://m2architecture.ba' // Change to your domain

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/portfolio',
    '/services',
    '/media',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages]
}
