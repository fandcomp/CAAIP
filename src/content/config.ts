import { defineCollection, z } from 'astro:content';

const berita = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().transform((s) => new Date(s)),
    author: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(['id', 'en']).default('id'),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const kabarDuka = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    date: z.string().transform((s) => new Date(s)),
    relation: z.string().optional(),
    message: z.string().optional(),
    lang: z.enum(['id', 'en']).default('id'),
    draft: z.boolean().default(false),
  }),
});

const alumni = defineCollection({
  type: 'data',
  schema: z.object({
    angkatan: z.string(),
    members: z.array(z.object({
      name: z.string(),
      program: z.string().optional(),
      year: z.string().optional(),
    })),
    lang: z.enum(['id', 'en']).default('id'),
  }),
});

export const collections = { berita, kabarDuka, alumni };
