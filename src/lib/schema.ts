/* eslint-disable perfectionist/sort-objects */
import * as z from 'zod'

const location = z.object({
  address: z.string().optional().default('2712 Broadway St')
    .describe('To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.'),
  postalCode: z.string().optional().default('CA 94115'),
  city: z.string().optional().default('San Francisco'),
  country: z.string().min(2).max(2).optional().default('US')
    .describe('code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN'),
  region: z.string().optional().default('California')
    .describe('The general region where you live. Can be a US state, or a province, for instance.'),
})
  .optional()
  .describe('Location')

const profiles = z.array(z.object({
  network: z.string().default('Twitter')
    .describe('e.g. Facebook or Twitter'),
  username: z.string().default('john')
    .describe('e.g. neutralthoughts'),
  url: z.string().url().default('https://twitter.com/john')
    .describe('e.g. http://twitter.example.com/neutralthoughts'),
}).describe('Specify any number of social networks that you participate in'))
//   .optional()
  .describe('Profiles')
  .default([
    {
      network: 'Twitter',
      username: 'john',
      url: 'https://twitter.com/john',
    },
  ])

const basics = z.object({
  name: z.string().default('John Doe'),
  label: z.string().default('Programmer')
    .describe('e.g. Web Developer'),
  image: z.string().url().optional()
    .describe('URL (as per RFC 3986) to a image in JPEG or PNG format'),
  email: z.string().email().optional().default('john@gmail.com')
    .describe('e.g. thomas@gmail.com'),
  phone: z.string().optional().default('(912) 555-4321')
    .describe('Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923'),
  url: z.string().url().optional().default('https://johndoe.com')
    .describe('URL (as per RFC 3986) to your website, e.g. personal homepage'),
  summary: z.string().optional().default('A summary of John Doe…')
    .describe('Write a short 2-3 sentence biography about yourself'),
  location,
  profiles,
})

/**
 * JSON Resume Schema
 * @see {@link https://jsonresume.org/schema}
 */
export const schema = z.object({
  basics,
})
/* eslint-enable perfectionist/sort-objects */
