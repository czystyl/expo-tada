import * as z from 'zod';
import axios from 'axios';

export async function getNumberFact(number: number) {
  const response = await axios.get(`http://numbersapi.com/${number}/math`);

  const text = z.string().parse(response.data);

  return { text };
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
