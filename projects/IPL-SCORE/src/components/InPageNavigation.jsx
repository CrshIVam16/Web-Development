import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function InPageNavigation({ teams, children }) {
    let [index, setIndex] = useState(0)
    let tableLineRef = useRef()
    let btnRef = useRef()


    function toggleBtn(btn, i) {
        setIndex(i)
        let { offsetWidth, offsetLeft } = btn
        tableLineRef.current.style.width = offsetWidth + "px"
        tableLineRef.current.style.left = offsetLeft + "px"
    }

    useEffect(() => {
        toggleBtn(btnRef.current, 0)
    }, [])

    return (
        <div className='w-full'>
            <div className={"bg-blue-800 w-full flex justify-between items-end " + (teams.length > 2 ? " h-25 " : "h-12.5")}>
                {
                    teams.length > 2 ?
                        teams.map(({ path, title }, i) =>
                            <Link to={path}>
                                <button
                                    ref={i === 0 ? btnRef : null}
                                    key={i}
                                    className={"px-5 py-2 text-white font-bold hover:bg-gray-200/10 " + (index == i ? "text-white bg-gray-200/20 " : " text-gray-200 ")}
                                    onClick={(e) => toggleBtn(e.target, i)}>
                                    {title}
                                </button>
                            </Link >
                        )
                        : teams.map((data, i) =>
                            <button
                                ref={i === 0 ? btnRef : null}
                                key={i}
                                className={
                                    "bg-black border border-gray-500 font-bold  w-[50%] h-full px-10 " +
                                    (index == i ? "text-white " : "text-gray-400 ")
                                }
                                onClick={(e) => toggleBtn(e.target, i)}>
                                {data}
                            </button>
                        )
                }
                <hr ref={tableLineRef}
                    className="border-white absolute border-2 duration-300" />
            </div>
            {teams.length > 2 ? "" : children[index]}
        </div>
    )
}

export default InPageNavigation