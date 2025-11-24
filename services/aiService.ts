
import { GoogleGenAI } from "@google/genai";

// Lazy initialization of the GoogleGenAI client.
// This prevents the app from crashing immediately if the API key is missing.
let ai: GoogleGenAI | null = null;

try {
    // We assume process.env.API_KEY is injected by the build system/environment.
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("Gemini API Key is missing. AI features will be disabled.");
    }
} catch (error) {
    console.error("Error initializing Gemini AI client:", error);
}

/**
 * Runs a given prompt against the Gemini API.
 * @param {string} prompt The prompt to send to the AI.
 * @returns {Promise<string>} The AI's response or an error message.
 */
async function runPrompt(prompt: string): Promise<string> {
    if (!ai) {
        // Try to re-initialize in case the env var was injected late (rare, but possible)
        try {
             if (process.env.API_KEY) {
                ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             }
        } catch (e) {
            console.error(e);
        }
        
        if (!ai) {
            return "⚠️ **AI Unavailable**: The AI service is not configured. Please ensure `API_KEY` is set in your environment variables.";
        }
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text ?? "The AI returned an empty response.";
    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        return `⚠️ **AI Error**: An error occurred while contacting the AI service.\n\nError details: ${error.message || error.toString()}`;
    }
}

export interface RepoSummaryContext {
    name: string;
    description: string;
    topics: string[];
    primaryLanguage: string;
    readme: string | null;
}

export const aiService = {
    summarizeRepo: (context: RepoSummaryContext): Promise<string> => {
        const prompt = `
            You are an expert technical writer. Generate a concise, one-paragraph summary of the following GitHub repository.
            
            Use the metadata provided below to understand the project, even if the README is empty or missing.
            
            **Repository Metadata:**
            - **Name:** ${context.name}
            - **Description:** ${context.description || 'N/A'}
            - **Primary Language:** ${context.primaryLanguage || 'N/A'}
            - **Topics:** ${context.topics.join(', ') || 'None'}
            
            **README Content Snippet:**
            ---
            ${(context.readme || '').substring(0, 8000)}
            ---
            
            **Goal:** Focus on the main purpose, key features, and intended audience. Avoid jargon where possible. If the README is missing, rely on the description and topics.
        `;
        return runPrompt(prompt);
    },

    checkRepoHealth: (readmeContent: string): Promise<string> => {
        const prompt = `
            Analyze the health of a GitHub repository based on its README.md file. 
            Provide a brief, two-sentence analysis covering:
            1.  Clarity of purpose and documentation.
            2.  Potential red flags or signs of being unmaintained (e.g., outdated info, broken links if mentioned).
            
            Be constructive and focus on what a potential user or contributor should know.
            
            README Content:
            ---
            ${readmeContent.substring(0, 10000)}
            ---
        `;
        return runPrompt(prompt);
    },

    explainCode: (codeSnippet: string): Promise<string> => {
        const prompt = `
            Explain the following code snippet in a clear and concise way. 
            Break down what the code does, its purpose, and any important concepts or syntax. 
            Format your response using markdown for readability.
            
            Code Snippet:
            ---
            \`\`\`
            ${codeSnippet}
            \`\`\`
            ---
        `;
        return runPrompt(prompt);
    },
};
