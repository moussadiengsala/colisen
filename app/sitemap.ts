import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://colisen.store',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://colisen.store/announces',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        
    ]
}