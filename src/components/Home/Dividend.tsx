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
import { Table, TableColumnsType } from "antd";

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
    const [startDate, setStartDate] = useState<Moment | null>();
    const [days, setDays] = useState('0');
    const [userRankInfo, setUserRankInfo] = useState({
        ranking: 0,
        points: 0,
        needPoints: 0, // 距离上榜还需要多少积分
        isRanked: false, // 是否上榜
    });
    const [list, setList] = useState<any[]>([]);
    const columns: TableColumnsType = [
        {
            title: '#',
            width: 50,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            align: 'center',
            className: "",
            render: (text, record, index) => {
                return <div className="w-full flex justify-center">{
                    index === 0 ? <img src="/assets/ranking_1.png" width={22} /> :
                        index === 1 ? <img src="/assets/ranking_2.png" width={22} /> :
                            index === 2 ? <img src="/assets/ranking_3.png" width={22} /> :
                                <span className="text-white">{index + 1}</span>
                }</div>
            }
        },
        {
            title: t("Account"),
            width: 200,
            dataIndex: 'age',
            key: 'age',
            render: (text, record, index) => {
                return <div className="flex items-center gap-2">
                    <div><img src={record.user.avatar} className="rounded-full w-5 h-5" alt="" /></div>
                    <span>{record.user.name.replace(/^(.{3}).*(.{2}@.*\.com)$/, "$1***$2")}</span>
                </div>
            }
        },
        {
            title: t('Points'),
            dataIndex: 'contribute_count',
            key: 'contribute_count',
            align: 'right',
            width: 100,
            render: (text, record, index) => {
                return BigNumber(record.contribute_count).toFormat(2)
            }
        },
        {
            title: t("Expcted reward USDT"),
            dataIndex: 'usdtReward',
            key: 'usdtReward',
            align: 'right',
            width: i18n.language === 'en' ? 150 : 120,
            render: (text, record, index) => {
                return BigNumber(record.usdtReward).toFormat(0)
            }
        },
        {
            title: t("Expcted reward WFC"),
            dataIndex: 'address',
            key: '3',
            width: i18n.language === 'en' ? 150 : 120,
            align: 'right',
            render: (text, record, index) => {
                return BigNumber(record.wfcReward).toFormat(0)
            }
        },
    ];
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
            console.log('res.data.data.start_at', res.data.data.start_at)
            const endDate = moment(res.data.data.end_at, "YYYY-MM-DD HH:mm:ss");
            const days = endDate.diff(moment(), "days");
            setDays(days < 10 ? '0' + days : days.toString());
            setEndDate(endDate);
            setStartDate(moment(res.data.data.start_at, "YYYY-MM-DD HH:mm:ss"));
        })

        request.post('/api/api/contributionOrder/getList').then(res => {
            setList(res.data.data);
        })
    }
    const getData = () => {

        request.post('/api/api/contributionOrder/getUserContributionInfo').then(res => {
            setUserRankInfo(state => {
                state = {
                    ranking: res.data.data.todayRank,
                    points: res.data.data.todayContribution,
                    needPoints: res.data.data.gapToTop1000,
                    isRanked: res.data.data.todayRank > 0
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
        <div className="w-full bg-[#08090A] rounded-box overflow-hidden xl:overflow-visible">
            <div className="bg-gradient-to-b p-4 pb-1 pr-1 pt-1 lg:p-8 lg:pt-16 rounded-t-box flex mt-6">
                <div className="w-[60%]">
                    <div className="w-full">
                        {
                            i18n.language === 'en' ? (
                                <>
                                    <div className="text-white text-base lg:text-2xl">
                                        {
                                            width > 600 ? (
                                                <span style={{ lineHeight: "2.5rem" }}>Rich Alliance: CycleX's first batch of incentive dividend plan</span>
                                            ) : (
                                                <span className="text-base font-bold">Rich Alliance</span>
                                            )
                                        }
                                    </div>
                                    <div className="text-white lg:text-base 2xl:text-lg my-1 lg:my-4">
                                        {
                                            width > 600 ?
                                                <span>
                                                    Invite friends to get <span className="text-[#fff]">100,000 USDT</span> and <span className="text-[#fff]">100M WFC</span>
                                                </span>
                                                : <span>
                                                    <span>Invite friends to get <br /></span>
                                                    <span className="font-bold text-xs lg:text-base">100,000 USDT & 100M WFC</span>
                                                </span>
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-white text-base lg:text-2xl">
                                        {
                                            width > 600 ? (
                                                <span style={{ lineHeight: "2.5rem" }}>暴富者联盟 <br />CycleX首批激励奖金计划</span>
                                            ) : (
                                                <span className="pt-20 text-lg font-bold">暴富者联盟</span>
                                            )
                                        }
                                    </div>
                                    <div className="text-white lg:text-base my-1 lg:my-4">
                                        {
                                            width > 600 ?
                                                <span>
                                                    邀请好友瓜分<span className="text-[#fff]">100,000 USDT</span> 和 <span className="text-[#fff]">100M WFC</span>
                                                </span>
                                                : <span>
                                                    <span>邀请好友瓜分<br /></span>
                                                    <span className="font-bold text-xs lg:text-base">100,000 USDT & 100M WFC</span>
                                                </span>
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>


                    <div className="bg-[#212125] py-1 px-4 lg:py-3 rounded-md w-4/5 mt-4 lg:mt-10 lg:w-4/5">
                        {
                            moment().isBefore(startDate) ?
                                <>
                                    <div className="text-grey text-xxs lg:text-xs">{t("Event Start Time")}</div>
                                    <div className="text-white mt-2">
                                        <div>{t("Aug 27th, 00:00")}</div>
                                    </div>
                                </>
                                :
                                moment().isAfter(endDate) ?
                                    <>
                                        <div className="text-grey text-xxs lg:text-xs">{t("Event end countdown")}</div>
                                        <div className="text-white mt-2">{t("Event has ended")}</div>
                                    </>
                                    :
                                    <>
                                        <div className="text-grey text-xxs lg:text-xs">{t("Event end countdown")}</div>
                                        <div className="text-white flex items-center justify-between">
                                            <Countdown
                                                title=""
                                                value={getDiffTime()}
                                                format="HH:mm:ss"
                                                valueStyle={{
                                                    color: "#fff",
                                                    alignSelf: "flex-end",
                                                    fontSize: width > 600 ? "1.5rem" : ".9rem",
                                                    fontWeight: width > 600 ? "normal" : "bold"
                                                }}
                                            />
                                            <div className="text-base lg:text-2xl self-end mg-0 lg:mb-[3px]"><span className="text-sm lg:text-2xl font-bold lg:font-normal">{days}</span> <span className="text-xxs lg:text-sm">{t("days")}</span></div>
                                        </div>
                                    </>

                        }
                    </div>
                </div>
                <div className="flex-1">
                    <div className="w-full lg:w-4/6 mx-auto">
                        <img src="/assets/dividend.gif" alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r rounded-b-box">
                <div className="divider h-0 after:bg-[#373839] before:bg-[#373839] after:h-[1px] before:h-[1px] mx-4 lg:mx-8 lg:mt-0"></div>
                <div className="flex items-center gap-4 lg:gap-8 px-4 lg:px-8 w-full justify-between">
                    <div className="text-xxs lg:text-sm whitespace-nowrap">{t("My invitation link")}</div>
                    <div className="text-white text-xxs lg:text-sm truncate">{account?.referral_code ? invite_url : t("Please login first!")}</div>
                    <button className="btn bg-[#fff] font-normal text-black border-0 p-3 py-[5px] lg:py-3 lg:px-6 h-auto min-h-0 self-stretch hover:bg-[#fff] text-xs rounded-md" onClick={() => handleCopy(invite_url)}>{t("Copy link")}</button>
                </div>
                <div className="divider h-0 after:bg-[#373839] before:bg-[#373839] after:h-[1px] before:h-[1px] mx-4 lg:mx-8 lg:mb-0"></div>

                <div className="pb-4 relative lg:mt-6">
                    <img src="/assets/dividend_card_bg.png" className="absolute top-0 right-0 w-1/2 hidden lg:block" alt="" />
                    <div className="pb-4 px-8 ">
                        <h2 className="text-white text-sm lg:text-2xl font-bold text-center">{t("Ranking List")}</h2>
                    </div>

                    <div className="pb-4 px-4 lg:px-8">
                        <div className="bg-[#272727] flex items-center justify-around text-grey text-xxs  w-full hidden-scroll py-2 lg:py-4 rounded-md px-4 overflow-auto">
                            <div className="flex items-end gap-1 whitespace-pre">
                                <span>{t("My ranking")}</span>
                                <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{account ? (userRankInfo.isRanked ? userRankInfo.ranking : '1000+') : '-'}</span>
                            </div>
                            <div className="divider divider-horizontal after:bg-gery-120 before:bg-gery-120 after:w-[1px] before:w-[1px] mx-3 mt-[2px] h-3"></div>
                            <div className="flex items-end gap-1 whitespace-pre	">
                                <span>{t("Points")}</span>
                                <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{account ? BigNumber(userRankInfo.points).toFormat(2) : '-'}</span>
                            </div>
                            {
                                (userRankInfo.ranking > 1000 || !account || !userRankInfo.isRanked) && (
                                    <>
                                        <div className="divider divider-horizontal after:bg-gery-120 before:bg-gery-120 after:w-[1px] before:w-[1px]  mt-[2px] h-3"></div>
                                        <div className="flex items-end gap-1 whitespace-pre">
                                            <span className="text-white lg:text-base" style={{ lineHeight: "1rem" }}>{account ? BigNumber(userRankInfo.needPoints || 1).toFormat(0) : '-'}</span>
                                            <span>{t("points away from the reward")}</span>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="lg:px-8 px-4 pb-6">
                        <div className="divider h-0 after:bg-gery-120 before:bg-gery-120 after:h-[1px] before:h-[1px] my-1"></div>
                        <Table columns={columns} dataSource={list} scroll={{ x: 650, y: 300 }} size="small" pagination={false} rowKey={record => record.id} locale={{
                            emptyText: () => <div className="text-white my-4 text-base">{t("Wait for activity to begin")}</div>
                        }} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Divdend;