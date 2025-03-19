import filter from '../../public/filter.svg'
import { useState } from 'react';
import Contest from '../pages/Contest';
import { useContests } from '../utils/CustomHooks/useContests';

export function Filter() {
    const [filterArr, setFilterArr] = useState<string[]>([]);
    function reRender(){
        setFilterData(filterArr)
    }

    function filterCategories(attr: string) {
        setFilterArr(prev =>
            prev.includes(attr) ? prev.filter((str: string) => str !== attr) : [...prev, attr]
        );
    }

    function removeCategory(attr: string) {
        setFilterArr(prev => prev.filter(str => str !== attr));
    }

    return (
        <div className='flex w-screen justify-center '>

        <section className=" absolute top-20 mr-10 w-[1500px] p-4 flex flex-col rounded-md bg-[#083344]">
            <section className='flex my-4 items-center ml-10'>
                <img className="w-5 h-5 mr-4" src={filter} alt="" />
                <h1 className="font-inter text-white text-2xl font-semibold">Filters</h1>
            </section>
            
            <div className="w-[1500px] ml-[-20px] h-[1px] bg-white"></div>

            {/* Website Filters */}
            <section className="flex w-[1000px] mt-5 ml-7">
                <span className="mr-10 text-white font-semibold">Website</span>
                <ul className="flex w-[500px] justify-between">
                    {["codechef", "codeforce", "leetcode"].map((site) => (
                        <li
                            key={site}
                            onClick={() => filterCategories(site)}
                            className={`cursor-pointer duration-200 w-[127px] h-[39px] flex items-center justify-between px-3 text-white font-inter font-semibold rounded-sm ${
                                filterArr.includes(site) ? "bg-[#06b6d4]" : "bg-[#155e75]"
                            }`}
                        >
                            <span className='flex justify-between items-center w-full'>{site.charAt(0).toUpperCase() + site.slice(1)}</span>
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

            <button onClick={()=>reRender()}  className=" ml-7 mb-5 cursor-pointer mt-10 w-[200px] px-4 py-4 bg-[#155E75] text-white font-semibold rounded-sm hover:bg-[#0891b2]">
                Apply Filter
            </button>
        </section>
        </div>
    );
}
