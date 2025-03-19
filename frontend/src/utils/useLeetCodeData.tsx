import { useEffect, useState } from "react";
interface ILeetcodeData{
    title:string,
    url:string,
    publishedAt:string,
    platform?:string,
    startTime:number,
    duration:number,
}
export async function useLeetCodeData(){

    const [currentContests,setCurrentContests] = useState<ILeetcodeData[]>()
    const [pastContests,setPastContests] = useState<ILeetcodeData[]>()
    useEffect(() => {
         const fetchContests = async () => {
             const leetCodeContests = await fetchLeetCodeContests();
             console.log(leetCodeContests)
    
             // Combine all contests
             const allContests:ILeetcodeData[] = [
                 ...leetCodeContests.map((contest:ILeetcodeData)  => ({ ...contest, platform: "LeetCode" })),
             ];
    
             // Categorize contests into past and current
             const now = Math.floor(Date.now() / 1000); // Current time in seconds
             const current:ILeetcodeData[] = [];
             const past:ILeetcodeData[] = [];

             allContests.forEach((contest:ILeetcodeData) => {
                 const startTime = contest.startTime;
                 const endTime = startTime + contest.duration;
    
                 if (startTime <= now && endTime >= now) {
                     current.push(contest); // Current contest
                 } else if (endTime < now) {
                     past.push(contest); // Past contest
                 }
             });
    
             setCurrentContests(current);
             setPastContests(past);
         };
    
         fetchContests();
     }, []);
     return { currentContests, pastContests };
    
     // Fetch LeetCode contests via proxy server
     const fetchLeetCodeContests = async () => {
         try {
             const response = await fetch("http://localhost:5000/leetcode", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                     query: `
                     {
                       allContests {
                         title
                         startTime
                         duration
                       }
                     }
                     `,
                 }),
             });
    
             const data = await response.json();
             if (data.data && data.data.allContests) {
                 return data.data.allContests.map((contest:ILeetcodeData) => ({
                     ...contest,
                     link: `https://leetcode.com/contest/${contest.title.toLowerCase().replace(/ /g, '-')}/`,
                 }));
             }
         } catch (error) {
             console.error("Error fetching LeetCode contests:", error);
         }
         return [];
     };
}
   
   