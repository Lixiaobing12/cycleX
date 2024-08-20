import Countdown from "antd/es/statistic/Countdown";
import moment from "moment";
import { useEffect, useState } from "react";
import useAccounts from "../../hooks/user";
import { useCopyToClipboard } from "usehooks-ts";
import { useAtom } from "jotai";
import { messageContext } from "../../App";
import BigNumber from "bignumber.js";

type ListItem = {
    id: number;
    name: string;
    avatar: string;
    ranking: number;
    value: number;
    usdt_reward: number;
    wfc_reward: number;
}
const Divdend = () => {
    const [toast] = useAtom(messageContext);
    const [, copy] = useCopyToClipboard();
    const [, account] = useAccounts();
    const [invite_url, setInviteUrl] = useState("");
    const endDate = moment("2024-09-23 23:59:59", "YYYY-MM-DD HH:mm:ss");
    const [days, setDays] = useState('');
    const [userRankInfo, setUserRankInfo] = useState({
        ranking: 10000,
        points: 0,
        needPoints: 0, // 距离上榜还需要多少积分
    });
    const [list, setList] = useState<ListItem[]>([]);

    const handleCopy = (text: string) => {
        copy(text)
            .then(() => {
                toast?.success({
                    icon: <img src="/assets/success.png" width={30} />,
                    message: "Copied!",
                });
            })
            .catch((error) => {
                console.error("Failed to copy!", error);
            });
    };
    useEffect(() => {
        const days = endDate.diff(moment(), "days");
        setDays(days < 10 ? '0' + days : days.toString());
    }, [])
    useEffect(() => {
        setInviteUrl(window.location.origin + "/login?t=up&referral=" + account?.referral_code);
    }, [account]);
    return (
        <div className="w-full bg-black rounded-box overflow-hidden xl:overflow-visible">
            <div className="bg-gradient-to-b from-[#000000] to-[#1E1E21] p-8 pt-16 rounded-t-box relative">
                <div className="relative z-10">
                    <div className="text-grey text-xs">Rich Alliance: CycleX's first batch of incentive dividend plan</div>
                    <div className="text-white text-base leading-4 my-4">
                        Invite friends to share <span className="text-lg text-[#5F79FF]">100,000 USDT</span> and <span className="text-lg text-[#5F79FF]">100 million WFC</span> prize pool
                    </div>
                    <div className="bg-[#212125] p-4 px-6 rounded-md inline-block">
                        <div className="text-grey text-xs mb-1">Event end countdown</div>
                        <div className="text-2xl text-white flex items-end">
                            <div className="self-end mb-[3px] mr-4">{days} <span className="text-xs">days</span></div>
                            <Countdown
                                title=""
                                value={moment().endOf('day').valueOf()}
                                format="HH:mm:ss"
                                valueStyle={{
                                    color: "#fff",
                                    alignSelf: "flex-end",
                                    fontSize: "1.5rem",
                                    width: "80px"
                                }}
                            />
                        </div>
                    </div>
                </div>
                <img src="/assets/div-header.png" className="absolute bottom-0 right-[-40px] w-64" alt="" />
            </div>
            <div className="bg-gradient-to-r from-[#212125] to-[#1A1A1D] p-8 rounded-b-box">
                <div className="flex items-center gap-8 mb-12">
                    <div className="flex-1 p-4 py-2 flex items-center rounded-lg border border-gery-120 relative">
                        <div>My invitation link</div>
                        <div className="divider divider-horizontal after:bg-gery-120 before:bg-gery-120 after:w-[1px] before:w-[1px]"></div>
                        <div className="text-grey">{invite_url}</div>

                        <div className="absolute left-0 right-0 top-12">
                            <p className="text-gery-300 text-xs">
                                Invite friends to register and purchase funds to earn points. At the end of the event, the top <span className="text-grey-700">1,000 users</span> will share <span className="text-grey-700">100,000 USDT and 100 million WFC</span> in the prize pool
                            </p>
                        </div>
                    </div>
                    <button className="btn bg-[#2D2D2F] text-white border-0 py-2 px-6 h-auto min-h-0 self-stretch hover:bg-[#2D2D2F]" onClick={() => handleCopy(invite_url)}>Copy link</button>
                </div>
                <div className="divider after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] mb-0 mt-16"></div>
                <div className="pt-6 pb-4">
                    <h2 className="text-white text-2xl font-bold text-center">Ranking List</h2>
                </div>
                <div className="bg-div_barner_image flex items-center justify-center gap-8 text-grey text-xs py-4">
                    <div className="flex items-end gap-1">
                        <span>My ranking</span>
                        <span className="text-white text-base leading-none">{userRankInfo.ranking > 1000 ? '1000+' : userRankInfo.ranking}</span>
                    </div>
                    <div className="flex items-end gap-1">
                        <span>Points</span>
                        <span className="text-white text-base leading-none">{BigNumber(userRankInfo.points).toFormat(0)}</span>
                    </div>

                    <div className="flex items-end gap-1">
                        <span className="text-white text-base leading-none">{BigNumber(userRankInfo.needPoints).toFormat(0)}</span>
                        <span>points away from the reward</span>
                    </div>
                </div>
                <div className="divider after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] mb-0"></div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-white">
                                <th>#</th>
                                <th>Account</th>
                                <th>Conribution</th>
                                <th>Expcted reward USDT</th>
                                <th>Expcted reward WFC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr>
                                    <th>{
                                        index === 0 ? <img src="/assets/ranking-1.png" width={20} /> :
                                            index === 1 ? <img src="/assets/ranking-2.png" width={20} /> :
                                                index === 2 ? <img src="/assets/ranking-3.png" width={20} /> :
                                                    index + 1
                                    }</th>
                                    <td>{
                                        <div className="flex items-center gap-2">
                                            <img src={item.avatar} width={14} alt="" />
                                            <span>{item.name.replace(/^(.{3}).*(.{2}@.*\.com)$/, "$1***$2")}</span>
                                        </div>
                                    }</td>
                                    <td>{BigNumber(item.value).toFormat(0)}</td>
                                    <td>{item.usdt_reward}</td>
                                    <td>{item.wfc_reward}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Divdend;