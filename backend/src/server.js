require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.text({ type: "application/xml" })); // Handle XML properly

const API_KEY = "AIzaSyB6J99Ggw493JAezbzzsR7oFi1YI-ai13c";
const CHANNEL_ID = "UCqL-fzHtN3NQPbYqGymMbTA";
const HUB_URL = "https://pubsubhubbub.appspot.com/subscribe";
const CALLBACK_URL = "https://14bc-103-132-31-43.ngrok-free.app/youtube-webhook"; // Replace with actual deployed URL
const TOPIC_URL = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// LeetCode API
app.post("/leetcode", async (req, res) => {
    try {
        const query = `{ allContests { title startTime duration } }`;

        const response = await axios.post("https://leetcode.com/graphql", { query }, {
            headers: { "Content-Type": "application/json" }
        });
        let data = await response.data
        data  = data.data.allContests.map((contest)=>(
            {...contest, url: `https://leetcode.com/contest/${contest.title.toLowerCase().replace(/ /g, '-')}/`,}
        ))
        res.json(data);
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error);
        res.status(500).json({ error: "Failed to fetch LeetCode contests" });
    }
});

// CodeChef API
app.post("/codechef", async (req, res) => {
    try {

         const query = `{ contestList { name startTime endTime } }`;

        const response = await axios.post("https://www.codechef.com/graphql", { query }, {
            headers: { "Content-Type": "application/json" }
        });
        let res  = await response.json()
        console.log(res.data)
        let data  = [...data.future_contests, ...data.present_contests, ...data.past_contests].map(contest => ({
            ...contest,
            url: `https://www.codechef.com/${contest.contest_code}`,
            startTime: new Date(contest.contest_start_date).getTime() / 1000,
            duration: contest.duration * 60,
        }));
        res.json(data);
    } catch (error) {
        console.error("Error fetching CodeChef contests:", error);
        res.status(500).json({ error: "Failed to fetch CodeChef contests" });
    }
});
app.post("/codeforce", async (req, res) => {
    try {

        console.log("hello there"); const query = `{ contestList { name startTime endTime } }`;

        const response = await axios.post("https://codeforces.com/api/contest.list", { query }, {
            headers: { "Content-Type": "application/json" }
        });
        let data  = response.data
        data =  data.result.map(contest => ({
            ...contest,
            url: `https://codeforces.com/contest/${contest.id}`,
            startTime: contest.startTimeSeconds,
            duration: contest.durationSeconds,
        }));
    
        res.json(data);
    } catch (error) {
        console.error("Error fetching CodeChef contests:", error);
        res.status(500).json({ error: "Failed to fetch CodeChef contests" });
    }
});
// YouTube Webhook
app.post("/youtube-webhook", async (req, res) => {
    try {
        console.log("Headers:", req.headers);
        console.log("Received Body:", req.body);

        xml2js.parseString(req.body, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error("Error parsing XML:", err);
                return res.status(400).send("Invalid XML");
            }

            const entry = result?.feed?.entry;
            if (!entry) {
                return res.status(400).send("No valid entry found");
            }

            const videoId = entry["yt:videoId"];
            if (!videoId) {
                return res.status(400).send("No video ID found");
            }

            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            console.log("New Video Detected:", videoUrl);

            return res.status(200).send("Received");
        });
    } catch (error) {
        console.error("Error in Webhook:", error);
        res.status(500).send("Server Error");
    }
});
app.get("/youtube-webhook", (req, res) => {
    const challenge = req.query["hub.challenge"];
    if (challenge) {
        console.log("🔄 YouTube Webhook Verification Challenge:", challenge);
        return res.status(200).send(challenge);
    }
    res.status(400).send("No challenge token received");
});


// Fetch YouTube Videos
app.get("/youtube/videos", async (req, res) => {
    try {
        console.log("Fetching YouTube videos...");

        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: "snippet,id",
                order: "date",
                maxResults: 50
            }
        });

        const videos = response.data.items
            .filter(item => item.id.videoId)
            .map(item => ({
                title: item.snippet.title,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                publishedAt: item.snippet.publishedAt
            }));

        res.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

const subscribeToYouTube = async () => {
    try {
        const response = await axios.post(HUB_URL, null, {
            params: {
                "hub.mode": "subscribe",
                "hub.topic": TOPIC_URL,
                "hub.callback": CALLBACK_URL,
                "hub.lease_seconds": 864000, // 10 days
            },
        });

        if (response.status === 202) {
            console.log("✅ Successfully requested YouTube Pub/Sub subscription.");
        } else {
            console.warn("⚠️ Subscription request sent, but response was not 202:", response.data);
        }
    } catch (error) {
        console.error("❌ Error subscribing to YouTube:", error.response?.data || error.message);
    }
};


async function getCodeChefContests() {
    try {
        const url = 'https://www.codechef.com/contests';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        let contests = [];

        $('.dataTable tbody tr').each((index, element) => {
            const cols = $(element).find('td');
            if (cols.length > 0) {
                contests.push({
                    code: $(cols[0]).text().trim(),
                    name: $(cols[1]).text().trim(),
                    startTime: $(cols[2]).text().trim(),
                    endTime: $(cols[3]).text().trim(),
                });
            }
        });

        console.log(contests);
    } catch (error) {
        console.error("Error fetching contests:", error.message);
    }
}

getCodeChefContests();

// Subscribe when the server starts
subscribeToYouTube();

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
