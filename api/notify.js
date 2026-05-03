// Vercel Serverless Function for Discord Webhook
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'No content' });
    }

    // Your Discord webhook URL
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1500385896405532774/ac6pGQwykr7WGJ_EZ4dQBsS-aAXJIJmJY50Xe58b-oSi4RWj9wkFAbAe1t94MQcwLTLf";

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error('Discord webhook failed');
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Failed to send' });
    }
}
