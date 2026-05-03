const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = 3001;

// 🔒 Your webhook URL stays HERE, on the server — never sent to the browser
const WEBHOOK_URL = "https://discord.com/api/webhooks/1500385896405532774/ac6pGQwykr7WGJ_EZ4dQBsS-aAXJIJmJY50Xe58b-oSi4RWj9wkFAbAe1t94MQcwLTLf";

app.use(express.json());

// Serve your frontend files
app.use(express.static(__dirname));

// Your frontend posts here → server forwards to Discord
app.post("/notify", async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "No content" });
    }

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });
        res.json({ ok: true });
    } catch (e) {
        console.error("Webhook error:", e);
        res.status(500).json({ error: "Failed to send" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
