export const fetchLeetCodeContests = async () => {
    try {
        const response = await fetch("http://localhost:5000/leetcode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `{ allContests { title startTime duration } }` }),
        });
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error);
        return [];
    }
};

export const fetchCodeChefContests = async () => {
    try {
        const response = await fetch("http://localhost:5000/codechef",{
            method:"post"
        });
        const data = await response.json();
        return [...data.future_contests, ...data.present_contests, ...data.past_contests].map(contest => ({
            ...contest,
            url: `https://www.codechef.com/${contest.contest_code}`,
            startTime: new Date(contest.contest_start_date).getTime() / 1000,
            duration: contest.duration * 60,
        }));
    } catch (error) {
        console.error("Error fetching CodeChef contests:", error);
        return [];
    }
};

export const fetchCodeforcesContests = async () => {
    try {
     
        const response = await fetch("http://localhost:5000/codeforce",{
            method:"Post"
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching Codeforces contests:", error);
        return [];
    }
};

export const fetchYoutubeVideos = async () => {
    try {
        const response = await fetch("http://localhost:5000/youtube/videos");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
};
