// Netlify Serverless Function for Discord Webhook
exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const { content } = JSON.parse(event.body);

    if (!content) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No content' })
        };
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

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true })
        };
    } catch (error) {
        console.error('Webhook error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send' })
        };
    }
};
