import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://acme.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://acme.com/announces',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        
    ]
}