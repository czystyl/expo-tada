import * as z from 'zod';
import axios from 'axios';

export async function getRandomFact() {
  const response = await axios.get(
    'https://uselessfacts.jsph.pl/api/v2/facts/random'
  );

  return factSchema.parse(response.data);
}

const factSchema = z.object({
  id: z.string(),
  text: z.string(),
  source: z.string(),
  source_url: z.string(),
  language: z.string(),
  permalink: z.string(),
});

export type Fact = z.infer<typeof factSchema>;
