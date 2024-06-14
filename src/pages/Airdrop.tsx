import { Divider, Statistic } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import WrapperButton from "../components/Common/Button";
import WrapperImg from "../components/Common/Img";
import { request } from "../utils/request";

type GlobalAggregates = {
  /**活跃贷款价值 */
  active_originated_amount_sum: number;
  /**贷款总额 */
  total_originated_amount_sum: number;
  /** apy */
  total_yield_avg: number;
  /** 时间 */
  updated_at: string;
  /** 稳定币市值 */
  marketCapSum: number;
  /** 周转帐量 */
  weeklyTransferVolume: number;
  /** 活跃地址数 */
  totalActiveAddresses: number;
  /** 国债总量 */
  treasuriesTotalValue: number;
  /**国债到期收益 */
  AvgYieldMaturity: number;
  /** 加权平均期限 */
  weightedAverageMaturity: string;
};
const Airdrop = () => {
  const [reset, setReset] = useState(false);
  const [toast] = useAtom(messageContext);
  const { t, i18n } = useTranslation();
  const [activeItem, setItem] = useState(0);
  const [tokenizedes, setTokenizedes] = useState<Array<Object>>([]);
  const [ustreasury, setUStreasury] = useState<Array<Object>>([]);
  const [stablecoins, setStablecoins] = useState<Array<Object>>([]);

  useEffect(() => {
    if (activeItem === 0 || reset) {
      request.get("/rwa/getdata?url=https://app.rwa.xyz/").then(({ data }) => setTokenizedes(data));
      request.get("/rwa/getdata?url=https://app.rwa.xyz/treasuries").then(({ data }) => setUStreasury(data));
      request.get("/rwa/getdata?url=https://app.rwa.xyz/stablecoins").then(({ data }) => setStablecoins(data));
      setReset(false);
    }
  }, [activeItem, reset]);
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/airdrop-bg.png" className="w-full h-[60vh]" alt="" />
        <p className="text-white text-2xl text-center absolute  font-bold font-whalebold">{t("Leading world-class RWA trading platform")}</p>
      </div>
      <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-14">
        <div className="flex flex-col md:flex-row justify-between flex-wrap md:item-center gap-2">
          <div className="flex gap-6 text-sm flex-wrap">
            <WrapperButton click={() => setItem(0)} isActive={activeItem === 0}>
              {t("Private Credit")}
            </WrapperButton>
            <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
              {t("U.S. Treasury")}
            </WrapperButton>
            <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
              {t("Stablecoin")}
            </WrapperButton>
          </div>
          <div className="flex gap-2 items-center self-end text-greyblack text-sm">
            {t("Last Updated: Apr. 2024")}
            <a onClick={() => setReset(true)}>
              <WrapperImg src="/assets/reflush.png" width={18} />
            </a>
          </div>
        </div>

        <div className="flex items-start md:items-center md:justify-between my-10 flex-col md:flex-row gap-4">
          {activeItem === 0
            ? tokenizedes.map((items, key) => (
                <Statistic
                  key={key}
                  valueStyle={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                  title={Object.keys(items)[0]}
                  value={Object.values(items)[0]}
                  formatter={(value) =>
                    value.toString().endsWith("B") ? (
                      <CountUp
                        end={Number(
                          value
                            .toString()
                            .replace(/B|\$|,/g, "")
                            .trim()
                        )}
                        separator=","
                        decimal="."
                        decimals={2}
                        suffix="B"
                        prefix="$"
                      />
                    ) : value.toString().startsWith("$") ? (
                      <CountUp end={Number(value.toString().replace(/\$|,/g, ""))} separator="," decimal="." decimals={2} prefix="$" />
                    ) : value.toString().endsWith("%") ? (
                      <CountUp end={Number(value.toString().replace(/%|,/g, ""))} separator="," decimal="." decimals={2} suffix="%" />
                    ) : value.toString().endsWith("M") ? (
                      <CountUp end={Number(value.toString().replace(/\M|,/g, ""))} separator="," decimal="." decimals={2} suffix="M" />
                    ) : Number(value.toString().replace(/,/g, "")) ? (
                      <CountUp end={Number(value.toString().replace(/,/g, ""))} separator="," decimal="." decimals={2} />
                    ) : (
                      value.toString()
                    )
                  }
                />
              ))
            : activeItem === 1
            ? ustreasury.map((items, key) => (
                <Statistic
                  key={key}
                  valueStyle={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                  title={Object.keys(items)[0]}
                  value={Object.values(items)[0]}
                  formatter={(value) =>
                    value.toString().endsWith("B") ? (
                      <CountUp
                        end={Number(
                          value
                            .toString()
                            .replace(/B|\$|,/g, "")
                            .trim()
                        )}
                        separator=","
                        decimal="."
                        decimals={2}
                        suffix="B"
                        prefix="$"
                      />
                    ) : value.toString().startsWith("$") ? (
                      <CountUp end={Number(value.toString().replace(/\$|,/g, ""))} separator="," decimal="." decimals={2} prefix="$" />
                    ) : value.toString().endsWith("%") ? (
                      <CountUp end={Number(value.toString().replace(/%|,/g, ""))} separator="," decimal="." decimals={2} suffix="%" />
                    ) : value.toString().endsWith("M") ? (
                      <CountUp end={Number(value.toString().replace(/\M|,/g, ""))} separator="," decimal="." decimals={2} suffix="M" />
                    ) : Number(value.toString().replace(/,/g, "")) ? (
                      <CountUp end={Number(value.toString().replace(/,/g, ""))} separator="," decimal="." decimals={2} />
                    ) : (
                      value.toString()
                    )
                  }
                />
              ))
            : stablecoins.map((items, key) => (
                <Statistic
                  key={key}
                  valueStyle={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                  title={Object.keys(items)[0]}
                  value={Object.values(items)[0]}
                  formatter={(value) =>
                    value.toString().endsWith("B") ? (
                      <CountUp
                        end={Number(
                          value
                            .toString()
                            .replace(/B|\$|,/g, "")
                            .trim()
                        )}
                        separator=","
                        decimal="."
                        decimals={2}
                        suffix="B"
                        prefix="$"
                      />
                    ) : value.toString().startsWith("$") ? (
                      <CountUp end={Number(value.toString().replace(/\$|,/g, ""))} separator="," decimal="." decimals={2} prefix="$" />
                    ) : value.toString().endsWith("%") ? (
                      <CountUp end={Number(value.toString().replace(/%|,/g, ""))} separator="," decimal="." decimals={2} suffix="%" />
                    ) : value.toString().endsWith("M") ? (
                      <CountUp end={Number(value.toString().replace(/\M|,/g, ""))} separator="," decimal="." decimals={2} suffix="M" />
                    ) : Number(value.toString().replace(/,/g, "")) ? (
                      <CountUp end={Number(value.toString().replace(/,/g, ""))} separator="," decimal="." decimals={2} />
                    ) : (
                      value.toString()
                    )
                  }
                />
              ))}
        </div>

        <Divider />

        {activeItem === 0 ? (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t(
              "Earn real income by investing in corporate private credit, a $1.6T market in traditional finance where credit agreements facilitate organization, deal financing and borrower repayment"
            )}
          </p>
        ) : activeItem === 1 ? (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t("View tokenized US treasuries, bonds, and cash-equivalents and understand the nuances between them. Read our deep dive research report on tokenized treasuries on the")}
          </p>
        ) : (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t("Explore the activity and risks behind crypto and asset-backed stablecoins. View encumbent and new issuer on-chain traction, regulatory information, and structural data.")}
          </p>
        )}

        <Divider />

        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("About us")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CycleX is committed to building a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently, no matter where they are. Through the collaborative efforts of the asset management department and the tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and achieved seamless interactions. In the process, we improve the accessibility of financial products and connect traditional assets through smart contracts to provide users with the best choices. In addition to our technical efforts, we also actively embrace regulation, protect investors, establish a transparent reporting system, and continuously iterate on smart contracts. We work with leading industry partners to provide best-in-class services to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you can find detailed disclosures about the product, how it operates, and eligibility requirements. If you are interested in a product, you can invest through a digital wallet link. The currency units we accept include US dollars and US dollar stablecoins."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">Cycle X - {t("White paper")}</div>
          <Divider />

          <div className="text-base">
            <p className="text-threePranentTransblack font-xs">{t("Last Updated: Apr. 2024")}</p>
            <p className="my-2">
              {t(
                "What's really powerful is not the reinvention of traditional finance, but the fact that people are using RWA as a new paradigm,And building things that would not have been possible without this technology."
              )}
            </p>
            <p>
              {t(
                "Cycle X platform is a token asset trading platform, providing a variety of services such as token asset listing, trading and rating. The products involved include tokenization of traditional financial products such as stocks, bonds, foreign exchange and options. Our goal is to link global financial assets with users, reduce the transaction cost of financial products, tokenize real assets, and enable global users to enjoy the convenience of investment.The token fund series products issued by the platform are specially designed for qualified investors who hold stable coins to seek realistic asset returns. It provides exposure to realistic return on assets while maintaining the stability of stable coin investments. The token fund products issued by the platform are linked to real assets, diversify the portfolio and invest in real assets, and introduce tokenization of real assets into the RWA ecosystem."
              )}
            </p>
            {i18n.language === "en" ? (
              <ul className="ml-2">
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Introduction of the project
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          The CycleX platform, as an innovative real-world asset tokenization (RWA) platform, is defining a new future of asset management and investment. By converting real-world
                          assets into digital tokens, the platform not only increases the liquidity and accessibility of these assets, but also provides investors with unprecedented opportunities. Our
                          definition of RWA is intentionally broader than traditional financial assets and includes assets such as creator royalties, commodities, physical goods, in addition to
                          traditional assets such as trade finance, structured credit, Treasury bills, real estate, creator royalties, etc. Our mission is to bring traditional and new-age assets into
                          the global on-chain ecosystem. We introduce the Token Fund model, which is a type of token backed by an underlying asset class backed by real assets that will mature within
                          an agreed period.
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Product features
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          2.1 Product Diversity: Cycle X is committed to the realization of a wide range of assets tokenization, covering accounts receivable, REITS, bills and other products. This
                          rich and diverse selection of assets enables investors to diversify their risk and optimize their portfolios.
                        </li>
                        <li>
                          2.2 Technological Innovation: The Cycle X platform ensures transparency and security of transactions through secure blockchain technology, while automating the transaction
                          process through smart contracts to improve efficiency and reduce costs.
                        </li>
                        <li>
                          2.3 Global Transaction: Based on the characteristics of blockchain, Cycle X breaks through the geographical and economic restrictions of traditional markets, opens up the
                          participation of global investors, and realizes the diversified global investment of assets.
                        </li>
                        <li>
                          2.4 Sense of Use: The platform provides intuitive user interface and comprehensive customer service to simplify the tokenization and investment process and ensure convenient
                          and efficient user experience.
                        </li>
                        <li>
                          2.5 Liquidity: CycleX has significantly enhanced asset liquidity and investment attractiveness by subdividing large value assets into smaller token units, opening the
                          investment door to a wide group of investors.
                        </li>
                        <li>
                          2.6 Security: Using the most advanced encryption and blockchain technology, CycleX ensures high security and immutability of transactions, providing investors with
                          confidence.
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Market impact and potential
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p>
                        The CycleX platform builds a new bridge between traditional asset holders and global investors. It makes high-value assets that are usually inaccessible easier to invest in and
                        circulate, not only enhancing asset value, but also opening up a broader capital market for asset holders. The platform product portfolio is diversified, the use of convenience
                        and smoothness, and the secondary market is opened up to increase market liquidity.
                      </p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Compliance
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p>
                        All CycleX products are distributed through the foundation in Singapore. Comply with local laws and regulations in Singapore and have legal opinions issued by local law firms.
                        The Token Fund is developed according to the ERC 1400 standard and is equipped with the latest security features and is certified by BlockSec and Zellic.io. Investors can both
                        mint and redeem the Token Fund through CycleX, which is specifically created for qualified investors seeking a stable rate of return and is only transferable to account holders
                        pre-approved through the KYC/AML whiterist mechanism.
                      </p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Operation process of platform products
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          5.1 Casting The user's USDT can be transferred through the APP operation, and once the system is confirmed, the Token Fund tokens will be manufactured through the interaction
                          with the Token Fund smart contract.
                        </li>
                        <li>
                          5.2 Redemption Token Fund redemption can be applied for through the APP. Token exchange enables verified qualified investors to exchange token funds for USDT. This process
                          can only be performed by whitelist addresses. The final settlement amount is calculated as the Token Fund redemption amount * handling fee.
                        </li>
                        <li>
                          5.3 Secondary market liquidity of the Token Fund The purpose of establishing the secondary market for Token funds is to provide secondary market liquidity and increase
                          returns for Token Fund holders. Through the secondary trading market, users can redeem and purchase products. The secondary market plans to trade through other Stablecoins in
                          the future, such as USDC and DAI. By providing liquidity, verified qualified investors can offer single or multiple stable coins to generate gains from the secondary market.
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Token Fund smart contract
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          6.1 Main Functions
                          <p className="my-2">
                            The Token Fund balance is dynamic and represents the holder's share in the total value of the underlying asset controlled by the protocol. The concept of "user share" was
                            introduced into the smart contract, so the smart contract also stores the sum of all shares to calculate the token balance of each account, Equal to :sharesOf(user) *
                            totalPooledToken Fund/totalShares
                          </p>
                          <ol className="ml-2">
                            <li>
                              6.1.1 Token issuance Token issuance, which creates new Cycle X tokens that users can purchase through the APP. New fund tokens are minted and deposited into the user's
                              account.
                            </li>
                            <li>
                              6.1.2 Distribution of benefits During the duration of the project, users can enjoy the benefits brought by the project. Users return tokens to Cycle X to recover funds
                              (plus accrued earnings) When these underlying assets earn earnings, that earnings are reinvested into purchasing more assets, automatically compounding the user's
                              earnings.
                            </li>
                            <li>
                              6.1.3 Redemption of tokens Users sell their tokens in the secondary market. After the project period ends, the project's tokens are destroyed on the chain. At the
                              specified time, the user will receive the token in the account. The user is then free to transfer the tokens to their wallet account. At any time, if the user wants to
                              redeem the token, the user token will be burned and the user will then receive the USDC.
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.2 ERC1400 Security Token Standard & Rights Management
                          <p className="my-2">
                            The ERC1400 standard is divided into several modular sub-standards: ERC1410 defines partially fungible tokens, the balance of which can have an associated metadata.
                          </p>
                          <p className="my-2">ERC1594 defines transmission limits and core security token functionality.</p>
                          <p className="my-2">ERC1643, defines document management functions.</p>
                          <p className="my-2">ERC1644, which defines the controller operation functions</p>
                          <p className="my-2">
                            In particular, the Token Fund token contract implements the ERC1594 transmission limit specification and the ERC1644 controller operation specification
                          </p>
                          <ol className="ml-2">
                            <li>
                              6.2.1 ERC1594 Limited transmission
                              <p className="my-2">
                                The Token Fund utilizes a whitelist mechanism to determine whether the transmission and reception of an address is authorized and to specify a time lock parameter.
                              </p>
                            </li>
                            <li>6.2.2 ERC1644 controller operation</li>
                            <li>
                              6.2.3 Permission management
                              <p className="my-2">The permission framework of the Token Fund contract is roughly divided into three different roles:</p>
                              <p className="my-2">
                                ControllerRole, which defines the role of the contract controller and has the power to perform the compulsory transfer and redemption as defined by ERC1644.
                              </p>
                              <p className="my-2">IssuerRole, which defines the role of the token issuer, which has the authority to perform normal token issuance and redemption.</p>
                              <p className="my-2">
                                ModeratorRole, which defines the role of the contract moderator, has the authority to perform the permission configuration of the address defined by ERC1594.
                              </p>
                              <p className="my-2">
                                All three roles mentioned above are referred to as administrators. The initial proposal was to designate a single external control smart contract with timelock
                                functionality as the controller contract for all three roles. All Token Fund administrator activities are executed through this controller contract, and each action
                                goes through two phases of proposal and execution, and the execution must conform to the delay specified by the time lock.
                              </p>
                              <p className="my-2">For the implementation of the controller, we have the following assumptions:</p>
                              <p>
                                Remove the "minDelay" design to prevent differences in the duration of time locks for different operations. If "minDelay" is set to 60s, the safety of the "mindelay"
                                operation cannot be ensured because it requires a 4-hour delay, while the "burn" operation can only be delayed for 60 hours. Avoid passing delay parameters from the
                                caller to prevent security issues due to compromised business systems.
                              </p>
                              <p className="my-2">
                                Add custom logic to the controller smart contract implementation to set different "delay" values (parsed according to the first four bytes of calldata) for various
                                actions.
                              </p>
                              <p className="my-2">
                                In order to modify the "delay" value in the future, redeploy a new controller smart contract and set the administrator role of the Token Fund to the new controller
                                through the old controller.
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.3 Overall Structure
                          <p className="my-2">The Time Lock controller contract is the entry contract to invoke the Token Fund contract. The roles involved in the contract are as follows:</p>
                          <p className="my-2">Owner: contract yourself to achieve self-management</p>
                          <p className="my-2">
                            Proposer/Executor/Canceller: These are the most important EOA addresses that control the agent and any calls involving management roles in the Token Fund contract. These
                            addresses are specified when the contract is deployed.
                          </p>
                          <p className="my-2">The agent contract is the agent of the Token Fund contract and is responsible for the upgrade of the Token Fund</p>
                          <p className="my-2">
                            When deployed, the owner of the agent contract is set as a time-limited lock contract, and the subsequent upgrade of the Token Fund contract is limited when the lock
                            contract control. Token Fund contract
                          </p>
                          <p className="my-2">The owner is the timelock Controller contract.</p>
                          <p className="my-2">After the Token Fund is deployed, the controller/issuer/moderators are all set as time-locked controllers.</p>
                          <ol className="ml-2">
                            <li>
                              6.3.1 Security
                              <p className="my-2">
                                With the above setup, the time lock contract becomes the only administrator role and the security of the Token Fund contract is normalized to the security of each
                                proposer/executor/canceller role of the time lock controller.
                              </p>
                              <p className="my-2">
                                Proposer/Executor/Canceller are three different EOA addresses, where proposer and Executor are Cactus escrow addresses. Any management operation on the contract needs
                                to be initiated by the proposer through the timelock contract. After the timelock expires, the executor will invoke and execute the operation, and both the proposer and
                                the executor will sign the operation. A Canceler is a self-hosted hardware wallet (or two) that can call a timelock controller to cancel an operation that has been
                                scheduled during timelock. For now, to balance security and operational efficiency, we set timelock cycles for Mint, Burn, and Rebase to a fixed time.
                              </p>
                            </li>
                            <li>
                              6.3.2 Redemption
                              <p className="my-2">
                                There are three ways to sell coins in the contract, namely "redeem", "redeemFrom" and "controllerRedeem". Only the administrator can operate these three methods.
                              </p>
                              <p className="my-2">
                                To redeem, the user first needs to approve the corresponding number of tokens to the contract's administrator, and then the administrator initiates the 'redeemFrom'
                                method call to the smart contract. If the user's address belongs to a CycleX account, the system will automatically help the user to call the 'approve' method.
                                Otherwise, the user needs to actively call the "approve" method to authorize a certain number of tokens to the smart contract's administrator, which is the timelock
                                controller.
                              </p>
                              <p className="my-2">
                                The administrator of the contract initiates this method call to the smart contract in order to redeem the tokens belonging to the administrator. User tokens can be
                                burned without the user's permission, which conflicts with the decentralized nature of blockchains
                              </p>
                              <p className="my-2">
                                The method is part of the ERC1400 specification, and the rationale for discussing this EIP specification is explained as follows: Tokens representing ownership of
                                securities may require an authorized operator to have additional control over the token.
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.4 Smart Contract upgrade
                          <ol className="ml-2">
                            <li>
                              6.4.1 Token Fund upgrade
                              <p className="my-2">
                                This is mainly applicable to scenarios where the Token Fund contract logic needs to be modified. The specific actions include redeploying the Token Fund smart contract
                                and calling the "resetimimplementation" method of the proxy contract through the time lock controller to specify the new implementation of the Token Fund contract.
                              </p>
                            </li>
                            <li>
                              6.4.2 Upgrade the timelock controller
                              <p className="my-2">
                                This mainly addresses scenarios where the timelock duration length needs to be updated. The specific actions include redeploying the Timelock controller smart contract
                                and updating the proxy contract owner and the Token Fund controller/issuer/mediator to the new timelock by calling the "old Timelock contract".
                              </p>
                              <p className="my-2">
                                This will result in subsequent Token Fund contract calls being directed to the new timelock controller. It is important to note that all existing operations for the
                                "old timelock contract" must already have been executed.
                              </p>
                            </li>
                            <li>
                              6.4.3 Redeploy all contracts
                              <p className="my-2">This is mainly related to serious attacks of unknown origin.</p>
                              <p className="my-2">
                                This process involves taking a snapshot of the contract state at a specified block height and reconstructing the user's balance based on post-deployment events (such as
                                issuance, redemption, transfer, etc.) that have occurred up to that block. By calling the issue method of the newly deployed contract, the token can be reissued.
                              </p>
                            </li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Token information (Platform governance tokens)
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p className="my-2">Issuer: WHALEFLOW FUND PTE. LTD.</p>
                      <p className="my-2">Token Name: WhaleFlow Coin</p>
                      <p className="my-2">Token abbreviation: WFC</p>
                      <p className="my-2">Number of tokens: 100,000,000,000</p>
                      <p className="my-2 flex gap-4">
                        Distribution ratio:
                        <ol className="ml-4">
                          <li>Team: 50%</li>
                          <li>Airdrop: 20%</li>
                          <li>Sales: 30% (including public and private)</li>
                        </ol>
                      </p>
                      <p className="my-2">Standard: ERC20</p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Token features
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>8.1 Payments</li>
                        <li>8.2 Voting</li>
                        <li>8.3 Pledge</li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Road Map (2024)
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          9.1 The second quarter
                          <ol className="ml-2">
                            <li>9.1.1 Platform version 2.0 goes live, inside the main network. Start the airdrop incentive season.</li>
                            <li>
                              9.1.2 In-depth User experience optimization: Based on the collected user feedback, in-depth interface and transaction process optimization will be carried out to improve
                              user satisfaction and platform ease of use.
                            </li>
                            <li>
                              9.1.3 Strategic Market Expansion Plan: Carry out comprehensive market analysis, explore new asset classes and regional markets, and formulate targeted market expansion
                              strategies. In addition to Greater China, we will begin to expand the Southeast Asian market.
                            </li>
                          </ol>
                        </li>
                        <li>
                          9.2 The third quarter
                          <ol className="ml-2">
                            <li>9.2.1 Issuance of Tokens</li>
                            <li>
                              9.2.2 Comprehensive upgrade of platform functions: Advanced functions based on the latest market trends and user needs are introduced to improve transaction efficiency
                              and security.
                            </li>
                            <li>
                              9.2.3 Enhance the partner network: Strengthen cooperation with financial institutions and asset management companies, expand new cooperation channels, and jointly enhance
                              market competitiveness.
                            </li>
                          </ol>
                        </li>
                        <li>
                          9.3 The fourth quarter
                          <ol className="ml-2">
                            <li>9.3.1 IEO (Token-on-exchange)</li>
                            <li>
                              9.3.2 Enhanced Global Compliance: Continuously monitor legal and regulatory changes in global financial markets to ensure that platform operations are always in
                              compliance with international compliance standards. Obtain relevant business qualifications in accordance with the requirements of the countries in which the platform
                              operates.
                            </li>
                            <li>
                              9.3.3 Diversified marketing activities: Implement a full range of marketing activities, including online promotion, social media activities and industry cooperation, to
                              further enhance the brand influence.
                            </li>
                            <li>
                              9.3.4 Active global market expansion: Actively enter new regional and asset class markets and broaden investment channels and opportunities based on market research and
                              analysis. Business expansion into Europe and North America.
                            </li>
                            <li>9.3.5 Submit the application for listing on Nasdaq and strive for listing by the end of the year. By the first quarter of 2025 at the latest.</li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>

                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Platform ecosystem
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>10.1 Asset Issuance Various real assets are issued on the platform through tokenization and operated through smart contracts.</li>
                        <li>10.2 Asset Trading The token products issued by the platform shall be circulated and transferred in the secondary market of the platform.</li>
                        <li>
                          10.3 Asset Rating All products are subject to off-chain due diligence and enhanced security through guaranteed credit enhancement measures. And have a professional team to
                          rate the assets.
                        </li>
                        <li>10.4 Stable coin systems The platform enhances asset liquidity and security by issuing stable coins, and improves the platform's asset management scale ability.</li>
                        <li>
                          10.5 Investment Banking Specialized institutions are responsible for the sponsor business of the platform on the business, responsible for business development, initial due
                          diligence, product release preparation, etc.
                        </li>
                        <li>10.6 Derivatives Market For stocks, foreign exchange, options and other products, the corresponding derivatives business is issued.</li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Conclusion
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p className="my-2">
                        Rich types of assets, through off-chain due diligence and guarantee credit enhancement measures, make assets more secure and traceable, to ensure the safety of customers'
                        investment funds.
                      </p>
                      <p className="my-2">
                        Cycle X is committed to the effective operation of real assets through blockchain to maximize the value of assets. And enable global investors to enjoy the benefits of
                        investment convenience. The purpose of the platform is to use technology to break down physical boundaries and improve the best match rate between funds and assets.
                      </p>
                    </div>
                  </details>
                </li>
              </ul>
            ) : (
              <ul className="ml-6">
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      项目介绍
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          CycleX平台作为一个创新的现实资产代币化（RWA）平台，正在定义资产管理和投资的新未来。平台通过将现实世界的资产转换为数字代币，不仅增加了这些资产的流动性和可访问性，而且为投资者提供了前所未有的机会。
                          我们对 RWA
                          的定义有意比传统金融资产更广泛，除了贸易融资、结构性信贷、国库券、房地产、创作者版税等传统资产外，还包括创作者版税、商品、实物商品等资产。我们使命是将传统和新时代资产带入全球链上生态系统。我们引入Token
                          Fund，即代币基金模式，这是一种由现实资产作为担保的的基础资产类支持的代币，这些代币基金将在约定期间内到期。
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      产品特征
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>2.1产品多样性: CycleX致力于实现资产的广泛代币化，覆盖应收账款、REITS、票据及等多种产品。这种丰富多样的资产选择使投资者得以分散风险，优化投资组合。</li>
                        <li>2.2技术革新: CycleX平台通过安全区块链技术确保交易的透明和安全，同时通过智能合约自动化交易流程，提高效率并降低成本。</li>
                        <li>2.3全球交易: 基于区块链的特性，CycleX突破了传统市场的地域和经济限制，开放全球投资者参与，实现资产的多元化全球投资。</li>
                        <li>2.4使用感: 平台提供直观的用户界面和全面的客户服务，简化代币化和投资过程，确保用户体验的便捷和高效。</li>
                        <li>2.5 流动性: CycleX通过将大额资产细分为更小的代币单位，显著增强了资产流动性和投资吸引力，为广泛投资者群体打开了投资大门。</li>
                        <li>2.6安全性: 运用最先进的加密和区块链技术，CycleX确保交易的高度安全和不可篡改性，为投资者提供信心保障。</li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      市场影响与潜力
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p>
                        CycleX平台为传统资产持有者和全球投资者搭建了新的桥梁。它使得通常不易接触的高价值资产更容易投资和流转，不仅提升资产价值，还为资产持有者开辟更广阔的资本市场。平台产品投资组合多样化，使用便利丝滑，开放二级市场，增加市场流动性。
                      </p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      合规性
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p>
                        CycleX的所有产品，通过新加坡的基金会发行产品。遵守新加坡当地的法律规范，并由当地律所出具合法的法律意见书。Token Fund是根据ERC
                        1400标准开发的，并配备了最新的安全功能，通过了BlockSec和Zellic.io的认证。投资者既可以通过CycleX铸造和赎回Token
                        Fund，它专为寻求稳定收益率的合格投资者而创建，并且仅可转让给通过KYC/AML白名单机制预先批准的账户持有人。
                      </p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      平台产品运行流程
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          5.1铸造
                          <p className="my-2">用户的USDT可以通过APP操作转入，一旦系统得到确认，通过与Token Fund智能合约的交互，Token Fund代币将被制造出来。</p>
                        </li>
                        <li>
                          5.2赎回
                          <p className="my-2">
                            Token Fund赎回可以通过APP申请。代币交换使经过验证的合格投资者能够将Token Fund交换为USDT。这个过程只能通过白名单地址来执行。 最终结算金额计算为Token Fund赎回金额*手续费
                          </p>
                        </li>
                        <li>
                          5.3 Token Fund的二级市场流动性
                          <p className="my-2">
                            建立Token Fund二级市场的目的是为Token Fund持有人提供二级市场流动性和增加回报。用户通过二级交易市场，可以对产品进行赎回和购买。
                            二级市场未来计划通过其他稳定币，例如USDC、DAI等进行交易。通过提供流动性，经过验证的合格投资者可以提供单个或多个稳定币，以从二级市场中获得收益。
                          </p>
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      Token Fund智能合约
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          6.1主要功能
                          <p className="my-2">
                            Token
                            Fund余额是动态的，代表了持有者在协议控制的基础资产总价值中的份额，“用户份额”的概念被引入到智能合约中，因此智能合约还存储了所有份额的总和，以计算每个账户的令牌余额，等于:sharesOf(user)
                            * totalPooledToken Fund / totalShares
                          </p>
                          <ol className="ml-2">
                            <li>
                              6.1.1代币发行
                              <p className="my-2">代币发行，创建新的 CycleX代币，用户可以通过APP进行购买。新的基金代币被铸造并存入用户的账户中。</p>
                            </li>
                            <li>
                              6.1.2利益分配
                              <p className="my-2">
                                在项目持续期间，用户可以享受项目带来的收益。用户将代币返还给CycleX
                                以收回资金（加上应计收益）当这些基础资产赚取收益时，该收益将被再投资于购买更多资产，从而自动复利用户的收益。
                              </p>
                            </li>
                            <li>
                              6.1.3代币赎回
                              <p className="my-2">
                                用户在二级市场出售其代币。项目期结束后，项目的Token在链上进行销毁处理。在规定的时间，用户就会在账户中收到代币。然后，用户可以自由地将代币转移给自己的钱包账户。在任何时候，如果用户想赎回代币，用户代币都会被烧毁，然后用户会收到
                                USDC。
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.2 ERC1400安全令牌标准与权限管理
                          <p className="my-2">
                            ERC1400标准分为几个模块化子标准:
                            <p>ERC1410定义了部分可替换的令牌，令牌的余额可以有一个相关的元数据。</p>
                          </p>
                          <p className="my-2">ERC1594定义了传输限制和核心安全令牌功能。</p>
                          <p className="my-2">ERC1643，定义了文档管理功能。 定义控制器操作功能的ERC1644 特别是，Token Fund令牌合约实现了ERC1594传输限制规范和ERC1644控制器操作规范</p>
                          <p className="my-2">定义控制器操作功能的ERC1644</p>
                          <p className="my-2">特别是，Token Fund令牌合约实现了ERC1594传输限制规范和ERC1644控制器操作规范</p>
                          <ol className="ml-2">
                            <li>
                              6.2.1 ERC1594限制传输
                              <p className="my-2">Token Fund利用白名单机制来确定地址的传输和接收是否被授权，并指定时间锁定参数。</p>
                            </li>
                            <li>6.2.2 ERC1644控制器操作</li>
                            <li>
                              6.2.3权限管理
                              <p className="my-2">Token Fund合同的权限框架大致分为三个不同的角色:</p>
                              <p className="my-2">ControllerRole，定义了合同控制人的角色，有权执行ERC1644定义的强制转让和赎回。</p>
                              <p className="my-2">IssuerRole，定义了token发行者的角色，该角色有权执行正常的token发行和赎回</p>
                              <p className="my-2">ModeratorRole，定义了合约版主的角色，有权执行ERC1594定义的地址的权限配置</p>
                              <p className="my-2">
                                上面提到的三种角色都被称为管理员。最初的建议是指定一个具有timelock功能的单一外部控制智能合约作为所有三个角色的控制器合约。所有的Token
                                Fund管理员活动都是通过这个控制器契约来执行的，每个操作都要经过提议和执行两个阶段，执行必须符合时间锁指定的延迟。
                              </p>
                              <p className="my-2">对于controller的实现，我们有以下假设:</p>
                              <p className="my-2">
                                去除“minDelay”设计，以防止不同操作的时间锁持续时间的差异。如果“minDelay”设置为60s，则无法确保“铸币”操作的安全性，因为它需要4小时的延迟，而“刻录”操作只能延迟60小时。
                                避免从调用者那里传入延迟参数，以防止因业务系统受损而产生的安全问题。
                              </p>
                              <p className="my-2">
                                在控制器智能合约实现中添加自定义逻辑，为各种操作设置不同的“延迟”值(根据calldata的前四个字节进行解析)。
                                为了在未来修改“延迟”值，重新部署一个新的控制器智能合约，并通过旧控制器将Token Fund的管理员角色设置为新控制器。
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.3整体结构
                          <p className="my-2">时间锁控制器合同是调用Token Fund合同的入口合同，合同中涉及的角色:</p>
                          <p className="my-2">业主:承包自己，实现自我经营</p>
                          <p className="my-2">提议者/执行者/取消者:它们是最重要的EOA地址，控制代理和Token Fund合同中涉及管理角色的任何调用。这些地址在部署合同时被指定。</p>
                          <p className="my-2">代理合同是Token Fund合同的代理，负责Token Fund的升级</p>
                          <p className="my-2">部署时将代理合同的所有者设置为限时锁合同，Token Fund合同的后续升级受限时锁合同控制。</p>
                          <p className="my-2">Token Fund合同</p>
                          <p className="my-2">业主是timelock控制器合同。 部署Token Fund后，控制器/发行人/版主均被设置为时间锁定控制器。</p>
                          <ol className="ml-2">
                            <li>
                              6.3.1安全
                              <p className="my-2">通过上述设置，时间锁合约成为唯一的管理员角色，Token Fund合约的安全性被标准化为时间锁控制器的每个提议者/执行者/取消者角色的安全性。</p>
                              <p className="my-2">
                                提议者/执行者/取消者是三个不同的EOA地址，其中提议者和执行者是Cactus托管地址。任何对合同的管理操作都需要提议者通过timelock合同发起，在timelock到期后，执行者会调用并执行操作，提议者和执行者都要签署操作，二者缺一不可。Canceler是一个(或两个)自托管硬件钱包，可以调用timelock控制器来取消在timelock期间已经安排好的操作。目前，为了平衡安全性和运营效率，我们将Mint、Burn和Rebase的timelock周期设置为固定时间。
                              </p>
                            </li>
                            <li>
                              6.3.2赎回
                              <p className="my-2">合约中完成销币的方法有三种，分别是“redeem”、“redeemFrom”、“controllerRedeem”，只有管理员才能操作这三种方法。</p>
                              <p className="my-2">
                                要进行赎回，用户首先需要向合约的管理员批准相应数量的令牌，然后管理员启动对智能合约的' redeemFrom
                                '方法调用。如果用户地址属于CycleX账户，系统会自动帮助用户调用“approve”方法。否则，用户需要主动调用“approve”方法，将一定数量的令牌授权给智能合约的管理员，也就是timelock控制器。
                              </p>
                              <p className="my-2">合约的管理员向智能合约发起此方法调用，以赎回属于该管理员的令牌。</p>
                              <p className="my-2">
                                用户令牌可以在没有用户许可的情况下被焚烧，这与区块链的去中心化性质相冲突
                                该方法是ERC1400规范的一部分，讨论该EIP规范时的理由解释为:代表证券所有权的令牌可能需要授权运营商对令牌有额外的控制。
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li>
                          6.4智能合约升级
                          <ol className="ml-2">
                            <li>
                              6.4.1 Token Fund升级
                              <p className="my-2">
                                这主要适用于需要修改Token Fund契约逻辑的场景。 具体操作包括重新部署Token Fund智能合约，并通过时间锁控制器调用代理合约的“resetimimplementation”方法来指定Token
                                Fund合约的新实现。
                              </p>
                            </li>
                            <li>
                              6.4.2升级timelock控制器
                              <p className="my-2">这主要解决了timelock持续时间长度需要更新的场景。</p>
                              <p className="my-2">
                                具体操作包括重新部署时间锁控制器智能合约，并通过调用“旧时间锁合约”将代理合约所有者和Token Fund控制器/发行者/调解人更新为新的时间锁。 这将导致后续的Token
                                Fund合同调用被定向到新的时间锁控制器。需要注意的是，“旧timelock合约”的所有现有操作必须已经被执行。
                              </p>
                            </li>
                            <li>
                              6.4.3重新部署所有合约
                              <p className="my-2">这主要与来源不明的严重攻击有关。</p>
                              <p className="my-2">
                                这个过程包括在指定的区块高度对合约状态进行快照，并根据部署后发生的事件(如发行、赎回、转让等)重构用户的余额，这些事件一直发生到该区块。通过调用新部署的合约的发行方法，可以重新发行令牌。
                              </p>
                            </li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      代币信息（平台治理代币）
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p className="my-2">发行主体：WHALEFLOW FUND PTE. LTD.</p>
                      <p className="my-2">代币名称：WhaleFlow Coin</p>
                      <p className="my-2">代币简称：WFC</p>
                      <p className="my-2">代币数量：100,000,000,000</p>
                      <p className="my-2 flex gap-4">
                        分配比例:
                        <ol className="ml-4">
                          <li>团队：50%</li>
                          <li>空投：20%</li>
                          <li>销售：30%（含公开和私募）</li>
                        </ol>
                      </p>
                      <p className="my-2">区块链：以太坊 标准：ERC20</p>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      代币功能
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>8.1 支付</li>
                        <li>8.2 投票</li>
                        <li>8.3 质押</li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      路线图（2024）
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>
                          9.1 第二季度
                          <ol className="ml-2">
                            <li>9.1.1 平台2.0版本上线，主网内侧。开始空投激励季节。</li>
                            <li>9.1.2用户体验深度优化: 根据已收集的用户反馈，进行深入的界面和交易流程优化，提高用户满意度和平台易用性。</li>
                            <li>9.1.3战略市场扩张计划: 开展全面市场分析，探索新的资产类别和地区市场，制定针对性的市场扩张策略。除了大中华区之外，开始拓展东南亚市场。</li>
                          </ol>
                        </li>
                        <li>
                          9.2 第三季度
                          <ol className="ml-2">
                            <li>9.2.1发行Token</li>
                            <li>9.2.2平台功能全面升级: 引入基于最新市场趋势和用户需求的先进功能，提升交易效率和安全性。</li>
                            <li>9.2.3增强合作伙伴网络: 加强与金融机构、资产管理公司的合作，拓展新的合作渠道，共同提升市场竞争力。</li>
                          </ol>
                        </li>
                        <li>
                          9.3 第四季度
                          <ol className="ml-2">
                            <li>9.3.1 IEO （Token上交易所）</li>
                            <li>9.3.2全球合规性加强: 持续监测全球金融市场的法律法规变化，确保平台操作始终符合国际合规标准。并按照业务所在国的要求，取得相关的业务资质。</li>
                            <li>9.3.3多元化市场营销活动: 实施全方位的市场营销活动，包括线上推广、社交媒体活动和行业合作，进一步提升品牌影响力。</li>
                            <li>9.3.4积极全球市场扩展: 根据市场研究和分析，积极进入新的地区和资产类别市场，拓宽投资渠道和机会。业务拓展欧洲和北美。</li>
                            <li>9.3.5 递交纳斯达克上市申请，争取年底上市。最晚于2025年第一季度上市。</li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                  </details>
                </li>

                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      平台生态体系
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <ol className="ml-2">
                        <li>10.1 资产发行 平台已经发行的代币产品在平台二级市场流通转让。</li>
                        <li>10.2 资产交易 平台已经发行的代币产品在平台二级市场流通转让。</li>
                        <li>10.3 资产评级 所有的产品均通过链下尽调，并通过担保增信措施增加安全。并有专业团队对资产评级。</li>
                        <li>10.4 稳定币体系 平台通过发行稳定币增强资产流动性和安全性，并提高平台资产管理规模能力。</li>
                        <li>10.5 投资银行 专门机构负责业务上平台的保荐业务，负责业务拓展、初期尽调、产品发行准备等。</li>
                        <li>10.6 衍生品市场 对于股票、外汇、期权等产品，发行相对应的衍生品业务。</li>
                      </ol>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="collapse collapse-arrow bg-white text-black">
                    <summary className="collapse-title text-md font-normal" style={{ paddingLeft: 0 }}>
                      结论
                    </summary>
                    <div className="collapse-content text-sm text-black-800">
                      <p className="my-2">资产种类丰富、通过链下的尽调以及担保增信措施，让资产更加具备安全性和可溯性，以保证客户投资资金的安全。</p>
                      <p className="my-2">
                        CycleX致力于将现实资产通过区块链手段进行有效运营，发挥资产的价值最大化。并让全球投资者享受到投资便利的益处。 平台的宗旨是利用科技手段打破物理界限，提高资金和资产的最佳匹配率。
                      </p>
                    </div>
                  </details>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-wide bg-black text-white"
            onClick={() => {
              toast?.warning({
                message: t("Coming soon"),
                icon: <img src="/assets/error.png" width={30} />,
              });
            }}>
            {t("Receive airdrop")}
          </button>
        </div>

        <div className="mt-28">
          <div className="text-center text-2xl  font-bold font-whalebold">{t("Contact us")}</div>

          <div className="flex items-center justify-center mt-14 gap-2">
            <div className="flex gap-2 items-center">
              <img src="/assets/telegram-drak.png" width={28} height={28} alt="" />
              <span className="text-black font-bold font-whalebold  text-xs">
                <a href="https://t.me/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363]">
                  {t("Telegram community")}
                </a>
              </span>
            </div>
            <Divider type="vertical" className="mx-0" />
            <div className=" flex gap-2 items-center">
              <img src="/assets/twitter-dark.png" width={28} height={28} alt="" />
              <span className="text-black font-bold font-whalebold text-xs flex">
                X
                <a href="https://twitter.com/CycleXTeam" target="_blank" className="ml-1 hover:text-[#636363]">
                  @CycleXTeam
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
