import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const axios = require('axios');

const prompt = "Write a catchy ad for a productivity tool.";




const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product } = body;

    if (!product) {
      return NextResponse.json({ message: 'Product description is required' }, { status: 400 });
    }
    // console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY);
    const prompt = `Generate a catchy ad title and description for this product: ${product}`;

    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //     // model: 'distilgpt2',
    //   messages: [
    //     { role: 'system', content: 'You are a creative copywriter.' },
    //     { role: 'user', content: prompt },
    //   ],
    //   max_tokens: 10,
    // });

    // const generatedText = completion.choices[0]?.message?.content || '';
    // const [titleLine, ...descriptionLines] = generatedText.split('\n');
    // const title = titleLine.replace(/^Title:\s*/, '').trim();
    // const description = descriptionLines.join(' ').replace(/^Description:\s*/, '').trim();
    console.log(prompt, process.env.OPENROUTER_API_KEY);
    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a creative ad copywriter.' },
            { role: 'user', content: prompt },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            // 'HTTP-Referer': 'http://localhost', // or your deployed URL
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response:', response.data.choices[0].message.content);
      const generatedText = response.data.choices[0].message.content || '';
    const [titleLine, ...descriptionLines] = generatedText.split('\n');
    const title = titleLine.replace(/.*?Title:\s*/, '').trim();
    const description = descriptionLines.join(' ').replace(/.*?Description:\s*/, '').trim();

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
