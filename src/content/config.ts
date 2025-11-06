import { defineCollection, z } from 'astro:content';

const berita = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
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
    date: z.coerce.date(),
    relation: z.string().optional(),
    message: z.string().optional(),
    lang: z.enum(['id', 'en']).default('id'),
    draft: z.boolean().default(false),
  }),
});

const alumni = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.string(),
    csvFile: z.string().optional(),
    csvData: z.array(z.object({
      no: z.string().optional(),
      name: z.string(),
      program: z.string().optional(),
    })).optional(),
  }),
});

const pengurus = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    position: z.string(),
    photo: z.string(),
    order: z.number().default(1),
  }),
});

export const collections = { berita, kabarDuka, alumni, pengurus };
