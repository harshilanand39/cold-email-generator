import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Please generate an investment memo based on the following notes from a call with the founders. Please ensure that each section is limited to 3-5 lines maximum and contains as much detail as possible based on the notes provided.
Every statement should be written properly and without shortcut style writing i.e should be a proper sentence with context.

Some examples of good investment memos are:

- Doordash venture investment memo: https://www.alexanderjarvis.com/doordash-venture-capital-investment-memo/
- Shopify investment memo: https://www.bvp.com/memos/shopify
- Twitch Investment memo: https://medium.com/think-with-bvp/a-look-at-the-internal-memos-of-twitch-and-periscope-55a41cd19d6c
- Airbase investment memo: https://www.airbase.com/blog/the-memo-that-raised-funding-in-10-days

The memo should follow the format below, with a whitespace line break between each section:

Problem: -||- [NEW_LINE]

Solution: -||- [NEW_LINE] test line

Business Model (write in bullet points here): -||- [NEW_LINE]

MOAT: -||-[NEW_LINE]

Who we are: -||- [NEW_LINE]

Round Pricing: -||- [NEW_LINE]

Notes:"""
{text input here}
"""

`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.5,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;