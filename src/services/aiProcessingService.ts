/**
 * AI Processing Service
 *
 * This service encapsulates all interactions with the Hugging Face Inference API.
 * It provides methods for summarizing, categorizing, extracting entities, and
 * creating vector embeddings for a given text.
 *
 * It relies on the HUGGING_FACE_API_KEY environment variable for authentication.
 */

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_BASE_URL = 'https://api-inference.huggingface.co/models/';

// Define a more specific type for NER results
interface NerEntity {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
}

/**
 * A generic query function to interact with the Hugging Face API.
 * @param model - The name of the model to query.
 * @param payload - The data to send to the model.
 * @returns The JSON response from the API.
 */
async function queryHuggingFace(model: string, payload: object): Promise<unknown> {
  if (!HUGGING_FACE_API_KEY) {
    throw new Error('Hugging Face API key is not configured.');
  }

  const response = await fetch(`${API_BASE_URL}${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (response.status !== 200) {
    if (typeof result === 'object' && result !== null && 'error' in result) {
      throw new Error((result as { error: string }).error);
    }
    throw new Error('Failed to query Hugging Face API');
  }
  return result;
}

/**
 * Summarizes a given text.
 * @param text - The text to summarize.
 * @returns A promise that resolves to the summary text.
 */
export async function summarize(text: string): Promise<string> {
  const result = await queryHuggingFace('sshleifer/distilbart-cnn-6-6', {
    inputs: text,
  }) as { summary_text: string }[];
  return result[0].summary_text;
}

/**
 * Classifies a text into one of the given categories (zero-shot).
 * @param text - The text to classify.
 * @param candidateLabels - An array of potential categories.
 * @returns A promise that resolves to the most likely category.
 */
export async function categorize(
  text: string,
  candidateLabels: string[]
): Promise<string> {
  const result = await queryHuggingFace('valhalla/distilbart-mnli-12-3', {
    inputs: text,
    parameters: { candidate_labels: candidateLabels },
  }) as { labels: string[] };
  return result.labels[0];
}

/**
 * Extracts named entities (like persons, organizations, locations) from a text.
 * @param text - The text to process.
 * @returns A promise that resolves to an array of entities.
 */
export async function extractEntities(text: string): Promise<NerEntity[]> {
  const result = await queryHuggingFace('dslim/bert-base-NER', {
    inputs: text,
  }) as NerEntity[];
  return result;
}

/**
 * Creates vector embeddings for a given text.
 * @param text - The text to vectorize.
 * @returns A promise that resolves to an array of numbers representing the vector.
 */
export async function vectorize(text: string): Promise<number[]> {
  const result = await queryHuggingFace(
    'sentence-transformers/all-MiniLM-L6-v2',
    {
      inputs: {
        source_sentence: text,
        sentences: [text]
      },
    }
  ) as number[][];
  return result[0];
}

/**
 * A composite function to process an article through the entire AI pipeline.
 * @param text - The article content.
 * @returns A structured object with all the AI-generated metadata.
 */
export async function processArticle(text: string) {
  const categories = ['Technology', 'Politics', 'Business', 'Health', 'Sports', 'Entertainment'];

  const [summary, category, entities, vector] = await Promise.all([
    summarize(text),
    categorize(text, categories),
    extractEntities(text),
    vectorize(text),
  ]);

  return {
    summary,
    category,
    entities,
    vector,
  };
}
