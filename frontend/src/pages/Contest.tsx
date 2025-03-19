import { useState } from "react";
import filterIcon from "../../public/filter.svg";
import calendar from "../../public/calendar.svg";
import clock from "../../public/clock.svg";
import { useContests } from "../utils/CustomHooks/useContests";

export default function Contest() {
    const { currentContests, pastContests, youtubeData } = useContests();
    const [filterArr, setFilterArr] = useState<string[]>([]);

    // Function to toggle filter categories
    const filterCategories = (attr: string) => {
        setFilterArr((prev) =>
            prev.includes(attr) ? prev.filter((str: string) => str !== attr) : [...prev, attr]
        );
    };

    // Function to remove a filter category
    const removeCategory = (attr: string) => {
        setFilterArr((prev) => prev.filter((str) => str !== attr));
    };

    // Function to filter contests based on selected platforms
    const filterContests = (contests) => {
        if (filterArr.length === 0) return contests; // No filters applied, return all contests
        return contests.filter((contest) => filterArr.includes(contest.platform.toLowerCase()));
    };

    // Get video link for a contest title
    const getVideoLink = (title: string) => {
        const video = youtubeData.find((val) => val.title.includes(title));
        return video ? video.url : "";
    };

    // Apply filters to current and past contests
    const filteredCurrentContests = filterContests(currentContests);
    const filteredPastContests = filterContests(pastContests);

    return (
        <div>
            {/* Filter Section */}
            <div className="flex w-screen justify-center">
                <section className="absolute top-20 mr-10 w-[1500px] p-4 flex flex-col rounded-md bg-[#083344]">
                    <section className="flex my-4 items-center ml-10">
                        <img className="w-5 h-5 mr-4" src={filterIcon} alt="Filter Icon" />
                        <h1 className="font-inter text-white text-2xl font-semibold">Filters</h1>
                    </section>

                    <div className="w-[1500px] ml-[-20px] h-[1px] bg-white"></div>

                    {/* Website Filters */}
                    <section className="flex w-[1000px] mt-5 ml-7">
                        <span className="mr-10 text-white font-semibold">Website</span>
                        <ul className="flex w-[500px] justify-between">
                            {["codechef", "codeforces", "leetcode"].map((site) => (
                                <li
                                    key={site}
                                    onClick={() => filterCategories(site)}
                                    className={`cursor-pointer duration-200 w-[127px] h-[39px] flex items-center justify-between px-3 text-white font-inter font-semibold rounded-sm ${
                                        filterArr.includes(site) ? "bg-[#06b6d4]" : "bg-[#155e75]"
                                    }`}
                                >
                                    <span className="flex justify-between items-center w-full">
                                        {site.charAt(0).toUpperCase() + site.slice(1)}
                                    </span>
                                    {filterArr.includes(site) && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeCategory(site);
                                            }}
                                            className="ml-2 text-lg font-bold text-white hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Difficulty Filters */}
                    <section className="flex w-[1000px] mt-5 ml-7">
                        <span className="mr-10 text-white font-semibold">Difficulty</span>
                        <ul className="flex w-[500px] justify-between">
                            {["Easy", "Medium", "Hard"].map((level) => (
                                <li
                                    key={level}
                                    onClick={() => filterCategories(level.toLowerCase())}
                                    className={`cursor-pointer duration-200 w-[127px] h-[39px] flex items-center justify-between px-3 text-white font-inter font-semibold rounded-sm ${
                                        filterArr.includes(level.toLowerCase()) ? "bg-[#06b6d4]" : "bg-[#155e75]"
                                    }`}
                                >
                                    <span>{level}</span>
                                    {filterArr.includes(level.toLowerCase()) && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeCategory(level.toLowerCase());
                                            }}
                                            className="ml-2 text-lg font-bold text-white hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </div>

            {/* Contests Section */}
            <div className="mt-[400px] w-full flex flex-col justify-around px-[200px] items-start align-items">
                <h1 className="text-3xl my-10 font-semibold font-inter">Current Contests</h1>
                <ul>
                    {filteredCurrentContests.length > 0 ? (
                        filteredCurrentContests.map((contest, index) => (
                            <li
                                key={index}
                                className="w-[350px] h-[300px] px-[34px] py-[15px] rounded-md border-1 border-[#07602D] shadow-xl shadow-dark-200"
                            >
                                <h2 className="font-semibold text-xl font-inter">
                                    {"name" in contest ? String(contest.name) : contest.title}
                                </h2>
                                <p className="flex justify-center items-center text-sm p-[15px] rounded-md font-semibold mt-[10px] w-[80px] h-[20px] bg-[#D6ffe7]">
                                    {contest.platform}
                                </p>
                                <div className="flex w-[110px] justify-between mt-4">
                                    <img src={calendar} alt="Calendar Icon" />
                                    <span className="text-gray-400 font-semibold">Start time</span>
                                </div>
                                <p className="ml-[35px]">{new Date(contest.startTime * 1000).toLocaleString()}</p>
                                <div className="flex w-[100px] justify-between mt-4">
                                    <img src={clock} alt="Clock Icon" />
                                    <span className="text-gray-400 font-semibold">Duration</span>
                                </div>
                                <p className="ml-[35px]">2 Hours</p>
                                <div className="w-[300px] mt-2 flex justify-between items-center">
                                    <a
                                        href={contest.link}
                                        className="w-[120px] h-[40px] bg-[#003617] text-sm text-white font-semibold rounded-md flex items-center justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Go to Contest
                                    </a>
                                    <a
                                        className="border-2 border-[#07602D] text-sm font-semibold w-[120px] h-[40px] flex items-center justify-center"
                                        href={getVideoLink(contest.title)}
                                    >
                                        View Solution
                                    </a>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="w-[500px] p-10 flex justify-center bg-[#cffafe]">
                            <h1 className="text-xl">No Contest Active</h1>
                        </li>
                    )}
                </ul>

                <h1 className="text-3xl my-10 font-semibold font-inter">Past Contests</h1>
                <ul className="flex flex-wrap gap-10">
                    {filteredPastContests.map((contest, index) => (
                        <li
                            key={index}
                            className="w-[350px] h-[300px] px-[34px] py-[15px] rounded-md border-1 border-[#07602D] shadow-xl shadow-dark-200"
                        >
                            <h2 className="font-semibold text-xl font-inter">
                                {"name" in contest ? String(contest.name).slice(0, 40) + "..." : contest.title}
                            </h2>
                            <div className="flex w-[200px] justify-between">
                                <p className="flex justify-center items-center text-sm p-[15px] rounded-md font-semibold mt-[10px] w-[80px] h-[20px] bg-[#cffafe]">
                                    {contest.platform}
                                </p>
                                <p className="flex justify-center items-center text-sm p-[15px] rounded-md font-semibold mt-[10px] w-[80px] h-[20px] bg-[#cffafe]">
                                    Finished
                                </p>
                            </div>
                            <div className="flex w-[110px] justify-between mt-4">
                                <img src={calendar} alt="Calendar Icon" />
                                <span className="text-gray-400 font-semibold">Start time</span>
                            </div>
                            <p className="ml-[35px]">{new Date(contest.startTime * 1000).toLocaleString()}</p>
                            <div className="flex w-[100px] justify-between mt-4">
                                <img src={clock} alt="Clock Icon" />
                                <span className="text-gray-400 font-semibold">Duration</span>
                            </div>
                            <p className="ml-[35px]">2 Hours</p>
                            <div className="w-[300px] mt-2 flex justify-between items-center">
                                <a
                                    href={contest.link}
                                    className="w-[120px] h-[40px] bg-[#164e63] text-sm text-white font-semibold rounded-md flex items-center justify-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Go to Contest
                                </a>
                                <a
                                    className="border-2 rounded-md border-[#164e63] text-sm font-semibold w-[120px] h-[40px] flex items-center justify-center"
                                    href={getVideoLink(contest.title)}
                                >
                                    View Solution
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}