import { useEffect, useState } from "react";
import { fetchLeetCodeContests, fetchCodeChefContests, fetchCodeforcesContests, fetchYoutubeVideos } from "../api";

interface IContestData {
    title: string;
    url?: string;
    platform?: string;
    startTime: number;
    duration: number;
    link?: string;
}

export function useContests() {
    const [currentContests, setCurrentContests] = useState<IContestData[]>([]);
    const [pastContests, setPastContests] = useState<IContestData[]>([]);
    const [youtubeData, setYoutubeData] = useState<{ title: string; url: string }[]>([]);

    

    useEffect(() => {
        const fetchContests = async () => {
            try {
                let leetcode: IContestData[] = [];
                let codechef: IContestData[] = [];
                let codeforces: IContestData[] = [];

  
                    [leetcode, codechef, codeforces] = await Promise.all([
                        fetchLeetCodeContests(),
                        fetchCodeChefContests(),
                        fetchCodeforcesContests(),
                    ]);
                

                const allContests = [
                    ...leetcode.map(contest => ({ ...contest, platform: "LeetCode" })),
                    ...codechef.map(contest => ({ ...contest, platform: "CodeChef" })),
                    ...codeforces.map(contest => ({ ...contest, platform: "Codeforces" })),
                ];

                const now = Math.floor(Date.now() / 1000);
                const current = allContests.filter(contest => contest.startTime <= now && contest.startTime + contest.duration >= now);
                const past = allContests.filter(contest => contest.startTime + contest.duration < now);

                setCurrentContests(current);
                setPastContests(past);
                console.log("past",pastContests)
                const videos = await fetchYoutubeVideos();
                setYoutubeData(videos);
            } catch (error) {
                console.error("Error fetching contests:", error);
            }
        };

        fetchContests();
    },[]); // ✅ Re-fetch when `platformArr` changes

    return { currentContests, pastContests, youtubeData };
}