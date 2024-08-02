import { z } from 'zod'

/**
 * JSON Resume Schema
 * @see {@link https://jsonresume.org/schema}
 */
export const schema = z.object({
  awards: z.array(z.object({
    awarder: z.string().describe('e.g. Time Magazine').optional(),
    date: z.any().optional(),
    summary: z.string().describe('e.g. Received for my work with Quantum Physics').optional(),
    title: z.string().describe('e.g. One of the 100 greatest minds of the century').optional(),
  }).catchall(z.any()))
    .describe('Specify any awards you have received throughout your professional career')
    .optional(),
  basics: z.object({
    email: z.string().email().describe('e.g. thomas@gmail.com').optional(),
    image: z.string().describe('URL (as per RFC 3986) to a image in JPEG or PNG format').optional(),
    label: z.string().describe('e.g. Web Developer').optional(),
    location: z.object({
      address: z.string()
        .describe('To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.')
        .optional(),
      city: z.string().optional(),
      countryCode: z.string().describe('code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN').optional(),
      postalCode: z.string().optional(),
      region: z.string().describe('The general region where you live. Can be a US state, or a province, for instance.').optional(),
    })
      .catchall(z.any())
      .optional(),
    name: z.string().optional(),
    phone: z.string().describe('Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923').optional(),
    profiles: z.array(z.object({
      network: z.string().describe('e.g. Facebook or Twitter').optional(),
      url: z.string().url().describe('e.g. http://twitter.example.com/neutralthoughts').optional(),
      username: z.string().describe('e.g. neutralthoughts').optional(),
    }).catchall(z.any()))
      .describe('Specify any number of social networks that you participate in')
      .optional(),
    summary: z.string().describe('Write a short 2-3 sentence biography about yourself').optional(),
    url: z.string().url().describe('URL (as per RFC 3986) to your website, e.g. personal homepage').optional(),
  })
    .catchall(z.any())
    .optional(),
  certificates: z.array(z.object({
    date: z.any().optional(),
    issuer: z.string().describe('e.g. CNCF').optional(),
    name: z.string().describe('e.g. Certified Kubernetes Administrator').optional(),
    url: z.string().url().describe('e.g. http://example.com').optional(),
  }).catchall(z.any()))
    .describe('Specify any certificates you have received throughout your professional career')
    .optional(),
  education: z.array(z.object({
    area: z.string().describe('e.g. Arts').optional(),
    courses: z
      .array(z.string().describe('e.g. H1302 - Introduction to American history'))
      .describe('List notable courses/subjects')
      .optional(),
    endDate: z.any().optional(),
    institution: z.string().describe('e.g. Massachusetts Institute of Technology').optional(),
    score: z.string().describe('grade point average, e.g. 3.67/4.0').optional(),
    startDate: z.any().optional(),
    studyType: z.string().describe('e.g. Bachelor').optional(),
    url: z.string().url().describe('e.g. http://facebook.example.com').optional(),
  }).catchall(z.any()))
    .optional(),
  interests: z.array(z.object({
    keywords: z.array(z.string().describe('e.g. Friedrich Nietzsche')).optional(),
    name: z.string().describe('e.g. Philosophy').optional(),
  }).catchall(z.any()))
    .optional(),
  languages: z.array(z.object({
    fluency: z.string().describe('e.g. Fluent, Beginner').optional(),
    language: z.string().describe('e.g. English, Spanish').optional(),
  }).catchall(z.any()))
    .describe('List any other languages you speak')
    .optional(),
  meta: z.object({
    canonical: z.string().url().describe('URL (as per RFC 3986) to latest version of this document').optional(),
    lastModified: z.string().describe('Using ISO 8601 with YYYY-MM-DDThh:mm:ss').optional(),
    version: z.string().describe('A version field which follows semver - e.g. v1.0.0').optional(),
  })
    .catchall(z.any())
    .describe('The schema version and any other tooling configuration lives here')
    .optional(),
  projects: z.array(z.object({
    description: z.string().describe('Short summary of project. e.g. Collated works of 2017.').optional(),
    endDate: z.any().optional(),
    entity: z.string().describe('Specify the relevant company/entity affiliations e.g. \'greenpeace\', \'corporationXYZ\'').optional(),
    highlights: z.array(z.string().describe('e.g. Directs you close but not quite there')).describe('Specify multiple features').optional(),
    keywords: z.array(z.string().describe('e.g. AngularJS')).describe('Specify special elements involved').optional(),
    name: z.string().describe('e.g. The World Wide Web').optional(),
    roles: z
      .array(z.string().describe('e.g. Team Lead, Speaker, Writer'))
      .describe('Specify your role on this project or in company')
      .optional(),
    startDate: z.any().optional(),
    type: z.string().describe(' e.g. \'volunteering\', \'presentation\', \'talk\', \'application\', \'conference\'').optional(),
    url: z.string().url().describe('e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html').optional(),
  }).catchall(z.any()))
    .describe('Specify career projects')
    .optional(),
  publications: z.array(z.object({
    name: z.string().describe('e.g. The World Wide Web').optional(),
    publisher: z.string().describe('e.g. IEEE, Computer Magazine').optional(),
    releaseDate: z.any().optional(),
    summary: z.string().describe('Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML.').optional(),
    url: z.string().url().describe('e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html').optional(),
  }).catchall(z.any()))
    .describe('Specify your publications through your career')
    .optional(),
  references: z.array(z.object({
    name: z.string().describe('e.g. Timothy Cook').optional(),
    reference: z
      .string()
      .describe(
        'e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
      )
      .optional(),
  }).catchall(z.any()))
    .describe('List references you have received')
    .optional(),
  skills: z.array(z.object({
    keywords: z.array(z.string().describe('e.g. HTML')).describe('List some keywords pertaining to this skill').optional(),
    level: z.string().describe('e.g. Master').optional(),
    name: z.string().describe('e.g. Web Development').optional(),
  }).catchall(z.any()))
    .describe('List out your professional skill-set')
    .optional(),
  volunteer: z.array(z.object({
    endDate: z.any().optional(),
    highlights: z
      .array(z.string().describe('e.g. Increased profits by 20% from 2011-2012 through viral advertising'))
      .describe('Specify accomplishments and achievements')
      .optional(),
    organization: z.string().describe('e.g. Facebook').optional(),
    position: z.string().describe('e.g. Software Engineer').optional(),
    startDate: z.any().optional(),
    summary: z.string().describe('Give an overview of your responsibilities at the company').optional(),
    url: z.string().url().describe('e.g. http://facebook.example.com').optional(),
  }).catchall(z.any()))
    .optional(),
  work: z.array(z.object({
    description: z.string().describe('e.g. Social Media Company').optional(),
    endDate: z.any().optional(),
    highlights: z
      .array(z.string().describe('e.g. Increased profits by 20% from 2011-2012 through viral advertising'))
      .describe('Specify multiple accomplishments')
      .optional(),
    location: z.string().describe('e.g. Menlo Park, CA').optional(),
    name: z.string().describe('e.g. Facebook').optional(),
    position: z.string().describe('e.g. Software Engineer').optional(),
    startDate: z.any().optional(),
    summary: z.string().describe('Give an overview of your responsibilities at the company').optional(),
    url: z.string().url().describe('e.g. http://facebook.example.com').optional(),
  }).catchall(z.any()))
    .optional(),
}).catchall(z.any())
