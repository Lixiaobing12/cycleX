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
            <div className="bg-gradient-to-b p-4 pr-1  lg:p-8 lg:pt-16 rounded-t-box flex mt-6">
                <div className="w-[60%]">
                    {
                        i18n.language === 'en' ? (
                            <>
                                <div className="text-white text-base lg:text-2xl">
                                    {
                                        width > 600 ? (
                                            <span style={{ lineHeight: "2.5rem" }}>Rich Alliance: CycleX's first batch of incentive dividend plan</span>
                                        ) : (
                                            <span className="pt-20 text-lg font-bold">Rich Alliance</span>
                                        )
                                    }
                                </div>
                                <div className="text-white lg:text-base my-1 lg:my-4">
                                    {
                                        width > 600 ?
                                            <span>
                                                Invite friends to get <span className="text-[#5F79FF]">100,000 USDT</span> and <span className="text-[#5F79FF]">100M WFC</span>
                                            </span>
                                            : <span>
                                                <span>Invite friends to get <br /></span>
                                                <span className="font-bold">100,000 USDT & 100M WFC</span>
                                            </span>
                                    }
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-white text-base lg:text-2xl">
                                    {
                                        width > 600 ? (
                                            <span style={{ lineHeight: "2.5rem" }}>暴富者联盟: <br />CycleX首批激励奖金计划</span>
                                        ) : (
                                            <span className="pt-20 text-lg font-bold">暴富者联盟</span>
                                        )
                                    }
                                </div>
                                <div className="text-white lg:text-base my-1 lg:my-4">
                                    {
                                        width > 600 ?
                                            <span>
                                                邀请好友瓜分<span className="text-[#5F79FF]">100,000 USDT</span> 和 <span className="text-[#5F79FF]">100M WFC</span>
                                            </span>
                                            : <span>
                                                <span>邀请好友瓜分<br /></span>
                                                <span className="font-bold">100,000 USDT & 100M WFC</span>
                                            </span>
                                    }
                                </div>
                            </>
                        )
                    }

                    <div className="bg-[#212125] p-3 rounded-md w-full mt-4 lg:mt-10 lg:w-4/5">
                        <div className="text-grey text-xs mb-1">{t("Event end countdown")}</div>
                        <div className="text-white flex items-end justify-between">
                            <Countdown
                                title=""
                                value={getDiffTime()}
                                format="HH:mm:ss"
                                valueStyle={{
                                    color: "#fff",
                                    alignSelf: "flex-end",
                                    fontSize: width > 600 ? "1.5rem" : "1.125rem",
                                    fontWeight: width > 600 ? "normal" : "bold"
                                }}
                            />
                            <div className="text-lg lg:text-2xl self-end mg-0 lg:mb-[3px]"><span className="font-bold lg:font-normal">{days}</span> <span className="text-xs">{t("days")}</span></div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="w-full lg:w-4/5 mx-auto">
                        <img src="/assets/dividend.gif" alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r rounded-b-box">
                <div className="divider h-0 after:bg-gery-300 before:bg-gery-300 after:h-[1px] before:h-[1px] mx-4 lg:mx-8"></div>
                <div className="flex items-center gap-2 lg:gap-8 px-4 lg:px-8 w-full justify-between">
                    <div className="text-xs lg:text-sm whitespace-nowrap">{t("My invitation link")}</div>
                    <div className="text-white text-xs lg:text-sm truncate">{account?.referral_code ? invite_url : t("Please login first!")}</div>
                    <button className="btn bg-[#fff] font-normal text-black border-0 p-3 py-2 lg:py-3 lg:px-6 h-auto min-h-0 self-stretch hover:bg-[#fff]" onClick={() => handleCopy(invite_url)}>{t("Copy link")}</button>
                </div>
                <div className="divider h-0 after:bg-gery-300 before:bg-gery-300 after:h-[1px] before:h-[1px] mx-4 lg:mx-8"></div>

                <div className="relative">
                    <div className="pt-6 pb-4 px-8">
                        <h2 className="text-white text-xl lg:text-2xl font-bold text-center">{t("Ranking List")}</h2>
                    </div>
                    <div className="bg-[#272727] flex items-center justify-center gap-x-8 gap-y-2 text-grey text-xs py-4 flex-wrap">
                        <div className="flex items-end gap-1">
                            <span>{t("My ranking")}</span>
                            <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{userRankInfo.ranking > 1000 ? '1000+' : userRankInfo.points === 0 ? t("Unranked") : userRankInfo.ranking}</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span>{t("Points")}</span>
                            <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{BigNumber(userRankInfo.points).toFormat(0)}</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{BigNumber(userRankInfo.needPoints || 1).toFormat(0)}</span>
                            <span>{t("points away from the reward")}</span>
                        </div>
                    </div>

                    <div className="overflow-auto hidden-scroll px-4 lg:px-8 max-h-96 mt-4">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-white border-gery-120">
                                    <th className="min-w-14">#</th>
                                    <th>{t("Account")}</th>
                                    <th className="text-right">{t("Points")}</th>
                                    <th className="text-right">{t("Expcted reward USDT")}</th>
                                    <th className="text-right">{t("Expcted reward WFC")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr className="border-gery-120">
                                        <th className="text-center">
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