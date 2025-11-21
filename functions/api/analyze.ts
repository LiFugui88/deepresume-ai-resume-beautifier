interface Env {
    OPENROUTER_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const { resumeText } = await request.json() as { resumeText: string };

        if (!resumeText) {
            return new Response(JSON.stringify({ error: "Missing resume text" }), { status: 400 });
        }

        if (!env.OPENROUTER_API_KEY) {
            return new Response(JSON.stringify({ error: "Server configuration error: Missing API Key" }), { status: 500 });
        }

        const MODEL_NAME = "google/gemini-2.0-flash-001";

        const schema = {
            type: "object",
            properties: {
                fullName: { type: "string" },
                title: { type: "string", description: "Current professional title" },
                summary: { type: "string", description: "Professional summary" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                website: { type: "string" },
                linkedin: { type: "string" },
                skills: {
                    type: "array",
                    items: { type: "string" }
                },
                experience: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            company: { type: "string" },
                            role: { type: "string" },
                            duration: { type: "string" },
                            description: {
                                type: "array",
                                items: { type: "string" }
                            }
                        }
                    }
                },
                projects: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            role: { type: "string" },
                            duration: { type: "string" },
                            link: { type: "string" },
                            description: {
                                type: "array",
                                items: { type: "string" }
                            }
                        }
                    }
                },
                education: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            institution: { type: "string" },
                            degree: { type: "string" },
                            year: { type: "string" }
                        }
                    }
                }
            },
            required: ["fullName", "experience"]
        };

        const systemInstruction = `
    You are an expert resume parser. Extract data from the resume text into JSON.
    
    RULES:
    1. Detect language (English/Chinese) and output in the SAME language.
    2. Preserve original meaning and details. Do not summarize.
    3. Output valid JSON matching the schema.
    
    OUTPUT FORMAT:
    Return ONLY the JSON object. No markdown, no thinking traces.
    ${JSON.stringify(schema)}
    `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://deepresume.ai", // Optional, for OpenRouter rankings
                "X-Title": "DeepResume", // Optional
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: systemInstruction
                    },
                    {
                        role: "user",
                        content: `Analyze this resume text:\n\n${resumeText}`
                    }
                ],
                temperature: 0.1, // Low temperature for consistent extraction
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter API Error:", errorText);
            throw new Error(`OpenRouter API Error: ${response.statusText}`);
        }

        const data = await response.json() as any;
        let content = data.choices[0].message.content;

        // 1. Remove <think> tags if present (common in thinking models)
        content = content.replace(/<think>[\s\S]*?<\/think>/g, "");

        // 2. Extract JSON from markdown code blocks if present
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            content = jsonMatch[1];
        } else {
            // Fallback: Try to find the first '{' and last '}'
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                content = content.substring(firstBrace, lastBrace + 1);
            }
        }

        // 3. Validate JSON
        try {
            JSON.parse(content);
        } catch (e) {
            console.error("Invalid JSON received:", content);
            throw new Error("Failed to parse AI response as JSON");
        }

        return new Response(content, {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Analysis Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
