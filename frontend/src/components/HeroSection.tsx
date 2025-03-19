export default function HeroSection(){
    return <div className="w-screen h-[500px] flex justify-around items-center flex-col absolute top-70">
        <div>
            <h1 className="font-inter font-semibold text-[48px] w-[832px] text-center ">DSA Problems? We’ve Got the Code, You Bring the Coffee!</h1>
        </div>
        <div>
            
        </div>
        <div>
            <span className="text-[#504343] font-inter text-[21px]">Get The question from all platform at one place</span>
        </div>
        <div className="flex w-[340px] justify-between items-center">
            <span className="flex justify-center  items-center w-[150px] border-2 p-2 border-[#164e63] font-extrabold">Request a demo</span>
            <span className="flex justify-center items-center w-[150px] text-white p-2 bg-[#164e63] py-3 font-extrabold">Start for free</span>
        </div>
        <div className="mt-[100px] ">
            <span className="font-inter font-medium text-[#585858]">Daily DSA & Competitive Coding Problems — Auto-Extracted from Top Sites for 40,000+ Coders!</span>
        </div>
        <div className="flex w-[400px] justify-between mt-5">
            <span>Leetcode</span>
            <span>CodeChef</span>
            <span>Codeforces</span>
        </div>
    </div>
}