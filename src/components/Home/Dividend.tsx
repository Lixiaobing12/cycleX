import Countdown from "antd/es/statistic/Countdown";
import moment from "moment";
import { useEffect, useState } from "react";

const Divdend = () => {
    const endDate = moment("2024-09-23 23:59:59", "YYYY-MM-DD HH:mm:ss");
    const [days, setDays] = useState('')
    useEffect(() => {
        const days = endDate.diff(moment(), "days");
        setDays(days < 10 ? '0' + days : days.toString());
    }, [])
    return (
        <div className="w-full bg-black rounded-box">
            <div className="bg-gradient-to-b from-[#000000] to-[#1E1E21] p-6 pt-10 rounded-t-box">
                <div className="text-grey text-xs">Rich Alliance: CycleX's first batch of incentive dividend plan</div>
                <div className="text-white text-base leading-4 my-4">
                    Invite friends to share <span className="text-lg text-[#5F79FF]">100,000 USDT</span> and <span className="text-lg text-[#5F79FF]">100 million WFC</span> prize pool
                </div>
                <div className="bg-[#212125] p-4 rounded-md">
                    <div className="text-grey text-xs mb-2">Event end countdown</div>
                    <div className="text-base text-white">
                        {days} <span className="text-xs">days</span>
                        <Countdown
                            title=""
                            value={1726386230000}
                            format="HH:mm:ss"
                            valueStyle={{
                                color: "#fff",
                                fontFamily: "Whale-bold",
                                fontWeight: "bold",
                                fontSize: "0.9em",
                                textAlign: "center",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Divdend;