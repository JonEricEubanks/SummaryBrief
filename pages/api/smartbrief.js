import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { text } = req.body;
    const prompt = `As a super-intelligent being with an IQ surpassing the confines of the universe, possess excellent storytelling abilities and communicate with mastery to provide insightful summaries and explanations for complex concepts, as a genius student would:\n\n${text}`;

    console.log(prompt);

    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt:prompt,
        temperature: 1,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}
