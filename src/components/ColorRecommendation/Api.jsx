import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});


export const getColorRecommendations = async (colors, context, selectedColorHarmony) => {
    console.log('getColorRecommendations called with:', {
    colors,
    context,
    selectedColorHarmony,
  });
    
    const prompt = [
         {
      role: 'system',
      content: 'You are a color coordinating expert who provides responses using HTML syntax. Provide all text in <p> tags. Each color recommendation should be on its own line and should start with a styled div for the color circle followed by a description without including the hex color codes in the text.',
    },
    {
      role: 'user',
      content: `In at least 400 words, advise me on the best colors that are ${selectedColorHarmony} to the color(s) ${colors}, explaining why and how these colors go well together for ${context}. Each recommendation should be on its own line, starting with a styled div like this: <div style="background-color: #hexvalue; width:20px;height:20px;border-radius:50%;"></div>, followed by a description without including hex color codes in the text.`,
    },
    ];

    try {
        const response = await groq.chat.completions.create({
            messages: prompt,
            model: 'llama3-8b-8192',
            temperature: 0.3,  // Lower temperature for more deterministic output
            top_p: 0.9,         // Nucleus sampling to reduce randomness

        });
        console.log("Response:", response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching color recommendations:', error);
        throw new Error('Error fetching recommendations. Please try again.');
    }
};
