import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <div className="flex justify-between items-center w-screen h-20 fixed top-11 ">
            <div className="ml-10 flex justify-between items-center w-[700px]">

                <Link to="/">
                    <h1 className="--font-inter font-semibold text-2xl" >TLE Eliminators</h1>
                </Link>
                <ul className="flex w-[400px] justify-between">
                    <li>Products</li>
                    <li>Solutions</li>
                    <li>Resources</li>
                <Link to={'/contests'}>
                <span className="font-serif text-lg font-semibold">Problems</span>
                </Link>
                </ul>
            </div>
            <div>
            </div>
            <div className="w-[300px] mr-10">
                <ul className=" flex justify-around items-center">
                    <li className="font-inter  text-lg  font-bold font-serif">Login</li>
                    <li className="w-[115px] h-[40px] bg-[#164E63] cursor-pointer rounded-sm shadow-md shadow-black flex items-center justify-center text-white font-extrabold font-serif">
    Start for free
</li>

                </ul>
            </div>
        </div>
    );
}
