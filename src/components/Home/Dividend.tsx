import Countdown from "antd/es/statistic/Countdown";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import useAccounts from "../../hooks/user";
import { useCopyToClipboard, useWindowSize } from "usehooks-ts";
import { useAtom } from "jotai";
import { messageContext } from "../../App";
import BigNumber from "bignumber.js";
import { request } from "../../utils/request";
import { useTranslation } from "react-i18next";

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
    const { width } = useWindowSize();
    const { t, i18n } = useTranslation();
    const [toast] = useAtom(messageContext);
    const [, copy] = useCopyToClipboard();
    const [, account] = useAccounts();
    const [invite_url, setInviteUrl] = useState("");
    const [endDate, setEndDate] = useState<Moment | null>();
    const [days, setDays] = useState('0');
    const [userRankInfo, setUserRankInfo] = useState({
        ranking: 0,
        points: 0,
        needPoints: 0, // 距离上榜还需要多少积分
    });
    const [list, setList] = useState<any[]>([]);

    const handleCopy = (text: string) => {
        if (!account?.referral_code) {
            toast?.error({
                icon: <img src="/assets/error.png" width={30} />,
                message: t("Please login first!"),
            });
            return;
        }
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

    const getDiffTime = () => {

        const subTime = moment(endDate);
        const hours = subTime.hours();
        const minutes = subTime.minutes();
        const seconds = subTime.seconds();

        const targetTime = moment().hours(hours).minutes(minutes).seconds(seconds);

        if (endDate?.isBefore(moment())) {
            return 0;
        }
        if (targetTime.isBefore(moment())) {
            targetTime.add(1, "days");
        }
        return targetTime.valueOf();

    }

    const getDivdendConfig = () => {
        request.post('/api/api/contributionActivite/index').then(res => {
            const endDate = moment(res.data.data.end_at, "YYYY-MM-DD HH:mm:ss");
            const days = endDate.diff(moment(), "days");
            setDays(days < 10 ? '0' + days : days.toString());
            setEndDate(endDate);
        })

        request.post('/api/api/contributionOrder/getList').then(res => {
            setList(res.data.data);
        })
    }
    const getData = () => {

        request.post('/api/api/contributionOrder/getUserContributionInfo').then(res => {
            console.log('res.data.data', res.data.data)
            setUserRankInfo(state => {
                state = {
                    ranking: res.data.data.todayRank,
                    points: res.data.data.todayContribution,
                    needPoints: res.data.data.gapToTop1000
                }
                return { ...state }
            })
            // const {}
        })

    }
    useEffect(() => {
        getDivdendConfig();
    }, [])
    useEffect(() => {
        getData();
        setInviteUrl(window.location.origin + "/login?t=up&referral=" + account?.referral_code);
    }, [account]);
    return (
        <div className="w-full bg-black rounded-box overflow-hidden xl:overflow-visible">
            <div className="bg-gradient-to-b from-[#000000] to-[hsl(240,5%,12%)] p-4 lg:p-8 lg:pt-16 rounded-t-box relative">
                <div className="relative z-[1] w-[70%] md:max-w-[60%]">
                    {
                        i18n.language === 'en' ? (
                            <>
                                <div className="text-grey text-lg hidden lg:block">Rich Alliance: CycleX's first batch of incentive dividend plan</div>
                                <div className="text-white text-base lg:text-2xl leading-10 my-6 font-bold" style={{ lineHeight: width > 600 ? '2.5rem' : '1.5rem' }}>
                                    {
                                        width > 600 ? (
                                            <>
                                                Invite friends to share <span className="text-lg lg:text-2xl text-[#5F79FF]">100,000 USDT</span> <br /> and <span className="text-base lg:text-2xl text-[#5F79FF]">100 million WFC</span> prize pool
                                            </>
                                        ) : (
                                            <>
                                                Invite friends to share <span className="text-lg lg:text-2xl text-[#5F79FF]">100,000 USDT</span> and <br /> <span className="text-base lg:text-2xl text-[#5F79FF]">100 million WFC</span> prize pool
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-grey text-lg hidden lg:block">暴富者联盟：CycleX首批激励奖金计划</div>
                                <div className="text-white text-base lg:text-2xl leading-10 my-4 font-bold" style={{ lineHeight: width > 600 ? '2.5rem' : '1.5rem' }}>
                                    {
                                        width > 600 ? (
                                            <>
                                                邀请好友分享 <span className="text-lg lg:text-2xl text-[#5F79FF]">100,000 USDT</span> <br /> 和 <span className="text-lg lg:text-2xl text-[#5F79FF]">100 million WFC</span> 奖池
                                            </>
                                        ) : (
                                            <>
                                                邀请好友分享 <br /> <span className="text-lg lg:text-2xl text-[#5F79FF]">100,000 USDT</span> 和 <br /> <span className="text-lg lg:text-2xl text-[#5F79FF]">100 million WFC</span> 奖池
                                            </>
                                        )
                                    }

                                </div>
                            </>
                        )

                    }

                    <div className="bg-[#212125] p-2 lg:p-4 rounded-md inline-block">
                        <div className="text-grey text-xs mb-1">{t("Event end countdown")}</div>
                        <div className="text-2xl text-white flex items-end">
                            <div className="self-end mb-[3px] mr-2 lg:mr-6">{days} <span className="text-xs">{t("days")}</span></div>
                            <Countdown
                                title=""
                                value={getDiffTime()}
                                format="HH:mm:ss"
                                valueStyle={{
                                    color: "#fff",
                                    alignSelf: "flex-end",
                                    fontSize: "1.5rem",
                                    width: width > 600 ? "120px" : "100px"
                                }}
                            />
                        </div>
                    </div>
                </div>
                <img src="/assets/div-header.png" className="absolute bottom-0 right-[-40px] w-56 lg:w-80" alt="" />
            </div>
            <div className="bg-gradient-to-r from-[#262629] to-[#1A1A1D] py-8 rounded-b-box">
                <div className="flex items-center gap-8 lg:mb-12 px-4 lg:px-8">
                    <div className="flex-1 p-4 py-2 flex items-center rounded-lg border border-gery-120 relative w-full">
                        <div className="text-sm whitespace-nowrap">{t("My invitation link")}</div>
                        <div className="divider divider-horizontal after:bg-gery-120 before:bg-gery-120 after:w-[1px] before:w-[1px] mx-1 lg:mx-3"></div>
                        <div className="text-grey text-sm truncate">{account?.referral_code ? invite_url : t("Please login first!")}</div>
                        <img src="/assets/dividend_copy.png" className="w-4 md:hidden" alt="" onClick={() => handleCopy(invite_url)} />
                        <div className="absolute left-0 right-0 top-12 hidden lg:block">
                            {i18n.language === 'en' ? <p className="text-gery-300 text-xs">
                                Invite friends to register and purchase funds to earn points. At the end of the event, the top <span className="text-grey-700">1,000 users</span> will share <span className="text-grey-700">100,000 USDT and 100 million WFC</span> in the prize pool
                            </p> : <p className="text-gery-300 text-xs">
                                邀请好友注册并购买基金以赚取积分。活动结束时，前 <span className="text-grey-700">1,000 名用户</span> 将分享 <span className="text-grey-700">100,000 USDT 和 100,000,000 WFC</span> 的奖金池
                            </p>}
                        </div>
                    </div>
                    <button className="btn bg-[#2D2D2F] text-white border-0 py-2 px-6 h-auto min-h-0 self-stretch hover:bg-[#2D2D2F] hidden md:block" onClick={() => handleCopy(invite_url)}>{t("Copy link")}</button>
                </div>
                {
                    width > 600 && (
                        <div className="divider h-0 after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] mb-0 mt-16  mx-4 lg:mx-8"></div>
                    )
                }
                <div className="relative">
                    <img src="/assets/dividend_card_bg.png" className="absolute top-0 right-0 w-1/2 hidden lg:block" alt="" />
                    <div className="pt-6 pb-4 px-8">
                        <h2 className="text-white text-xl lg:text-2xl font-bold text-center">{t("Ranking List")}</h2>
                    </div>
                    <div className="bg-div_barner_image flex items-center justify-center gap-4 lg:gap-8 text-grey text-xs py-4 flex-wrap">
                        <div className="flex items-end gap-1">
                            <span>{t("My ranking")}</span>
                            <span className="text-white text-base leading-none">{userRankInfo.ranking > 1000 ? '1000+' : userRankInfo.points === 0 ? t("Unranked") : userRankInfo.ranking}</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span>{t("Points")}</span>
                            <span className="text-white text-base leading-none">{BigNumber(userRankInfo.points).toFormat(0)}</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-white text-base leading-none">{BigNumber(userRankInfo.needPoints || 1).toFormat(0)}</span>
                            <span>{t("points away from the reward")}</span>
                        </div>
                    </div>
                    <div className="divider after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] mb-0  mx-4 lg:mx-8"></div>

                    <div className="overflow-auto hidden-scroll px-4 lg:px-8 max-h-96">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-white border-gery-120">
                                    <th className="min-w-14">#</th>
                                    <th>{t("Account")}</th>
                                    <th className="text-right">{t("Conribution")}</th>
                                    <th className="text-right">{t("Expcted reward USDT")}</th>
                                    <th className="text-right">{t("Expcted reward WFC")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr className="border-gery-120">
                                        <th>
                                            <a>{
                                                index === 0 ? <img src="/assets/ranking_1.png" width={20} /> :
                                                    index === 1 ? <img src="/assets/ranking_2.png" width={20} /> :
                                                        index === 2 ? <img src="/assets/ranking_3.png" width={20} /> :
                                                            <span className="text-white">{index + 1}</span>
                                            }</a>
                                        </th>
                                        <td className="text-right">{
                                            <div className="flex items-center gap-2">
                                                <div><img src={item.user.avatar} className="rounded-full w-4 h-4" alt="" /></div>
                                                <span>{item.user.name.replace(/^(.{3}).*(.{2}@.*\.com)$/, "$1***$2")}</span>
                                            </div>
                                        }</td>
                                        <td className="text-right">{BigNumber(item.contribute_count).toFormat(0)}</td>
                                        <td className="text-right">{BigNumber(item.usdtReward).toFormat(0)}</td>
                                        <td className="text-right">{BigNumber(item.wfcReward).toFormat(0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden px-4">
                        <div className="divider after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] mb-0"></div>

                        {i18n.language === 'en' ? <p className="text-gery-300 text-xs">
                            Invite friends to register and purchase funds to earn points. At the end of the event, the top <span className="text-grey-700">1,000 users</span> will share <span className="text-grey-700">100,000 USDT and 100 million WFC</span> in the prize pool
                        </p> : <p className="text-gery-300 text-xs">
                            邀请好友注册并购买基金以赚取积分。活动结束时，前 <span className="text-grey-700">1,000 名用户</span> 将分享 <span className="text-grey-700">100,000 USDT 和 100,000,000 WFC</span> 的奖金池
                        </p>}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Divdend;