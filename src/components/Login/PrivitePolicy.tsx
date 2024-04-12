import { useTranslation } from "react-i18next";

const PrivitePolicy = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("Privacy Policy")}</h2>
            <p>{t("Last Updated: Apr. 2024")}</p>
            {i18n.language === "en" ? (
                <div>
                    <p>This Privacy Policy (the "Policy") describes how Whaleflow collects, uses and discloses information, and your choices regarding this information. Please read this Policy carefully and if you have questions, please contact us at services@whaleflow.co.</p>
                    <h2 className="my-2 text-bold text-base">This Policy</h2>
                    <p>
                        This Policy applies to our services, which includes the services we provide on our platform, the user interface of the Agreement, or any other website, page, feature, mobile application or content owned or operated by us (collectively, the "Website"), Or when you use any Whaleflow API or third party applications that rely on such API and related services (collectively, the "Services"). If you do not agree to the terms of this Policy, do not access or use the Services, the Website or any other aspect of our business.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        What we collect
                    </h2>
                    <p>
                        When you interact with our services, we may collect:
                    </p>
                    <p>
                        Contact information, such as your email address.
                    </p>
                    <p>
                        Financial information, such as your Ethereum address, cryptocurrency wallet information, transaction history, and related fees paid.
                        Transaction information, such as information about transactions you make on our services, such as transaction type, transaction amount, and timestamp.
                        Communications, such as your feedback, questionnaires and other survey responses, and information you provide to our support team, including through our help chat.
                        Online identifiers such as geolocation/tracking details, browser fingerprints, operating system, browser name and version, and/or personal IP addresses.
                        Usage data, such as user preferences and other data collected through cookies and similar technologies.
                    </p>
                    <p>
                        Information we obtain from others. We may obtain information about you from other sources, including public databases, credit agencies and authentication partners, as required or permitted by applicable law. We may combine the information we collect from these sources with the information we obtain from this Site in order to comply with our legal obligations and limit the use of our services for fraudulent or other illegal activities.
                    </p>
                    <p>
                        Information from cookies and other tracking technologies. We and our authorized third parties may collect information about the use of the Services and our interactions with you through websites and mobile applications. This information may include Internet protocol (IP) address, browser type, Internet service provider (ISP), reference/exit page, operating system, date/timestamp and clickstream data, as well as information about your interaction with communications we send to you. We may combine this automatically collected log information with other information we collect about you. You may choose to set your web browser to reject cookies, or to alert you when a cookie is being sent. If you do this, please be aware that some parts of our services may not function properly.
                        How do we use information
                        We use your information in accordance with your instructions (including any applicable provisions in the Terms of Use) and as required by applicable law. We may also use the information we collect to:
                        To provide services and features
                        We may use the information we collect to provide, personalize, maintain and improve our products and services, including the information described in our Terms of Use. This includes using information to:
                        Operate, maintain, customize, measure and improve our services, and manage our business;
                        Processing transactions;
                        Sending information, including confirmations, notifications, updates, security alerts, and support and management messages; and
                        Create de-identified or aggregated data.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        Security Assurance
                    </h2>
                    <p>
                        We may use your information to help maintain the security and integrity of you and our services, including:
                        Protect, investigate, and deter fraudulent, unauthorized, or illegal activity;
                        Monitor and verify identity or service access to combat spam, malware or security risks;
                        Perform internal operations necessary to provide our services, including resolving software bugs and operational issues;
                        Enforce our agreements with third parties and resolve violations of our Terms of Use or other service agreements; And comply with applicable safety laws and regulations.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        User Support
                    </h2>
                    <p>
                        We may use the information we collect to provide support, including:
                        Direct questions to the appropriate support person;
                        Investigate and resolve user concerns; and
                        Monitor and improve our customer support responses and processes.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Research and development
                    </h2>

                    <p>
                        We may use the information we collect for testing, research, analysis, and product development to improve your experience. This helps us improve and enhance the security of our services, enhance our ability to prevent the use of our Services for illegal or improper purposes, and develop new features and products related to our Services.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Compliance with laws and regulations
                    </h2>
                    <p>
                        We may verify your identity by comparing the personal information you provide to third-party databases and public records. We may use the information we collect to investigate or resolve claims or disputes related to the use of our services, or as permitted by applicable law or as requested by regulatory authorities, government entities and official investigations.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Direct Marketing
                    </h2>

                    <p>
                        We may use the information we collect to market our services to you. This may include sending you information about our services, features, promotions, surveys, news, updates and events, as well as managing your participation in those promotions and events. If you do not wish us to send you marketing newsletters, please select "unsubscribe" from any marketing emails we send, or contact us at services@whaleflow.co.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        How do we share and disclose information
                    </h2>
                    <p>
                        We may share your information if:
                        With your consent. For example, you may let us share personal information with others for their own marketing purposes. These uses will be governed by their privacy policies.
                        4 Comply with our legal obligations. We may share your information to: (A) cooperate with government or regulatory investigations; (B) when we are compelled to do so as a result of a subpoena, court order or similar legal process; (C) when we believe in good faith that disclosure of personal information is necessary to prevent harm to others; (iv) to report suspected illegal acts; (E) investigate violations of our User Agreement or any other applicable policies.
                        With service providers. We may share your information with service providers that help facilitate business and compliance operations, such as marketing and technical services. Our contracts require these service providers to use your information only for the services they provide to us.
                        During periods of change in our business. Subject to standard confidentiality arrangements, some or all of your information may be shared or transferred if we engage in a merger, acquisition, bankruptcy, dissolution, reorganization, sale of some or all of our assets or stock, capital raising, public offering of securities, acquisition of all or part of our business, similar transactions or proceedings, or in the course of considering such activities.
                        Aggregated or de-identified data. We may share aggregated and/or anonymized data with others for their own use.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        Data Retention
                    </h2>
                    <p>
                        To view or update your information, please contact us at services@whaleflow.co. We store your information for the entire life of your use of this Agreement and retain your information for at least five (5) years to comply with our legal obligations or to resolve disputes. If you cease to use this Agreement, we will not use your information for any further purpose, nor will we sell or share your information with third parties, except as required by law or as necessary to prevent fraud and assist law enforcement in accordance with this Policy.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Security
                    </h2>
                    <p>
                        We maintain administrative, technical and physical protections designed to protect the personal information we maintain from unauthorized access or disclosure. No system can be completely secure. Therefore, although we take steps to protect your information, we cannot guarantee that your information, searches, or other communications will always remain secure. You are responsible for all activities on protocols associated with any of your Ethereum network addresses and/or cryptocurrency wallets.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Age limit
                    </h2>
                    <p>
                        To the extent prohibited by applicable law, we do not allow the use of our services and websites by any person below the legal age of the user's jurisdiction of residence. If you find that any person under the legal age has illegally provided us with personal data, please contact us at services@whaleflow.co and we will take steps to remove such information, close any such accounts, and prevent the user from continuing to use our services to the extent possible.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        This Policy
                    </h2>
                    <p>
                        If we make any changes, we will change the last updated date above. We encourage you to review this policy to stay informed. We will provide additional notice if we make material changes, such as through the email specified in your account or through the service or website.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Follow the opt-out guide online
                    </h2>
                    <p>
                        Like many online companies, we use services provided by Google and other companies that use tracking technology. These services rely on tracking technology (such as cookies and web beacons) to collect information directly from your device about your browsing activities, your interactions with the website, and the device you use to connect to the Internet. There are a variety of ways to opt out of collecting your online activity and device data through these services, which we summarize below:
                        Block cookies in your browser. Most browsers allow you to delete or reject cookies, including those used for interest-based advertising. To do so, follow the instructions in your browser Settings. Many browsers accept cookies by default until you change your Settings. For more information aboutcookies, including how to see which cookies are set on your device and how to manage and delete them, visit www.allaboutcookies.org.
                        Block the use of AD ids in your mobile Settings. Your mobile device Settings may provide features that restrict the use of the AD ID associated with your mobile device for interest-based advertising purposes. Use a privacy plug-in or browser. You can use a browser with privacy features to prevent our website from setting cookies for interest-based advertising.
                        Platform opt-out. The following advertising partners with opt out function, let you can choose not to use your information based on the interest of advertising - Google:https://adssettings.google.com. The advertising industry opt-out tool. You can also use the opt-out options listed below to restrict participating companies from using your information for interest-based advertising. Note that since these opt-out mechanisms are specific to the device or browser that performs them, you will need to opt out on each browser and device that you use. Digital advertising alliance: http://optout.aboutads.info network advertising initiative: http://optout.networkadvertising.org/
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        Privacy Practices
                    </h2>
                    <p>
                        We do not "sell" the personal information we collect (as defined in the CCPA) for monetary value (and do not sell such information without providing an opt-out right). Like many companies, we may use third-party cookies for advertising purposes. If you would like to learn how to opt out of our cookies and other tracking technologies, please review the instructions provided in the Online Tracking Opt-out Guide section of this Policy.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        Privacy Rights
                    </h2>
                    <p>
                        The CCPA grants individuals the following rights:
                        Information. You may request information about how we have collected, used, and shared your personal information during the past 12 months. Please see the "What We Collect" section of this Policy for detailed information about the personal information we have collected during the past 12 months, including categories of sources. We collect this information for the business and commercial purposes described in the "How We Use Information" section of this Policy. We share this information with the categories of third parties described in the "How We Share and Disclose Information" section of this Policy.
                        Usage rights. You may request a copy of the personal information we keep about you.
                        Delete. You may request that we delete personal information we have collected or maintained about you.
                        Note that the CCPA limits these rights by, for example, prohibiting us from providing certain sensitive information in response to an access request and limiting the circumstances under which we must comply with a removal request. We will only respond to requests for information and access if we are able to use reasonable efforts to link the information we maintain to the identifying details you provided in the request. If we deny your request, we will communicate our decision to you. You have the right to exercise the above rights without discrimination.
                    </p>
                    <h2 className="my-2 text-bold text-base">
                        How to Submit a Request
                    </h2>

                    <p>
                        To request access to or removal of your personal information, email services@whaleflow.co.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        Authentication
                    </h2>

                    <p>
                        The CCPA requires us to verify the identity of individuals who submit requests to access or remove personal information before we can respond substantively to the request. When you submit a request, we will ask you to verify your identity.
                    </p>

                    <h2 className="my-2 text-bold text-base">
                        For our consumers and clients
                    </h2>
                    <p>
                        This additional disclosure governs our collection, use and sharing of personal information provided to us by our users to initiate or complete the process of interacting with the Agreement. In the event of any conflict between this additional disclosure and other sections of the Privacy Policy, the additional disclosure shall prevail.
                        The types of personal information we collect and share include:
                        <h2 className="my-2 text-bold text-base">
                            Contact information
                        </h2>
                        <h2 className="my-2 text-bold text-base">
                            Transaction history
                        </h2>
                        Cryptocurrency Balances and Wallets When you are no longer our customer, we will continue to share your information as described in this notice.
                        We may share your personal information
                        We need to share users' personal information to operate the agreement and certain aspects of our business. Below is a description of whether we share your personal information, why we share your personal information and whether you can limit such sharing
                        We share users' personal information for everyday business purposes, such as processing and matching your orders and responding to court orders and legal investigations. You cannot restrict us from sharing this information.
                        We share users' personal information for marketing purposes, such as providing you with our products and services. You cannot restrict us from sharing this information.
                        We do not share users' personal information for the purpose of joint marketing with financial companies.
                        We do not share users' personal information for the day-to-day business purposes of our affiliates.
                        We do not share users' personal information with our affiliates for the purpose of marketing to you.
                        We do not share users' personal information with non-affiliated parties for the purpose of marketing to you.
                        "Affiliates" means affiliates that have joint ownership or control; "Non-affiliated company" means a company in which there is no joint ownership or control; "Joint marketing" is a formal agreement between unaffiliated financial companies to jointly market financial products or services to you.
                        <h2 className="my-2 text-bold text-base">
                            How does Whaleflow protect my personal information?
                        </h2>
                        To protect your personal information from unauthorized access and use, we use security measures that comply with applicable law. These measures include computer safeguards and protected documents and buildings.
                        <h2 className="my-2 text-bold text-base">
                            How does Whaleflow collect my personal information?
                        </h2>
                        For example, we collect your personal information when you deposit a digital asset in an agreement, transact using an agreement, or withdraw a digital asset from an Agreement. We may also collect your personal information from other companies.
                        <h2 className="my-2 text-bold text-base">
                            Contact Us
                        </h2>
                        If you have any questions about this Policy or seek to exercise any statutory rights, please contact us. We will respond within a reasonable period of time in accordance with applicable law. You can contact us at services@whaleflow.co.
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        本隐私政策（“政策”）描述了 Whaleflow如何收集、使用和披露信息，以及您对此信息的选择。请仔细阅读本政策，如有疑问，请通过services@whaleflow.co与我们联系。
                        <h2 className="my-2 text-bold text-base">
                            本政策
                        </h2>
                        本政策适用于我们的服务，其中包括我们在我们的平台、协议的用户界面或我们拥有或运营的任何其他网站、页面、功能、移动应用程序或内容（统称为“网站”）上提供的服务，或者当您使用任何 Whaleflow API 或依赖此类 API 的第三方应用程序以及相关服务（统称为“服务”）。如果您不同意本政策的条款，请勿访问或使用服务、网站或我们业务的任何其他方面。
                        <h2 className="my-2 text-bold text-base">
                            我们收集
                        </h2>
                        当您与我们的服务互动时，我们可能会收集：
                        联系信息，例如您的电子邮件地址。
                        财务信息，例如您的以太坊地址、加密货币钱包信息、交易历史记录以及支付的相关费用。
                        交易信息，例如您在我们的服务上进行的交易的信息，例如交易类型、交易金额和时间戳。
                        通信，例如您的反馈、调查问卷和其他调查回复，以及您向我们的支持团队提供的信息，包括通过我们的帮助聊天提供的信息。
                        在线标识符，例如地理位置/跟踪详细信息、浏览器指纹、操作系统、浏览器名称和版本和/或个人IP地址。
                        使用数据，例如用户偏好以及通过 cookie 和类似技术收集的其他数据。
                        我们从他人那里获得的信息。我们可能会根据适用法律的要求或允许从其他来源获取有关您的信息，包括公共数据库、信用机构和身份验证合作伙伴。我们可能将从这些来源收集的信息与我们从本网站获得的信息结合起来，以遵守我们的法律义务并限制将我们的服务用于欺诈或其他非法活动。
                        来自 cookie 和其他跟踪技术的信息。我们和我们授权的第三方可能会通过网站和移动应用程序收集有关服务使用以及我们与您互动的信息。这些信息可能包括互联网协议 (IP) 地址、浏览器类型、互联网服务提供商 (ISP)、引用/退出页面、操作系统、日期/时间戳和点击流数据，以及有关您与我们发送给您的通信的交互信息。我们可能会将这些自动收集的日志信息与我们收集的有关您的其他信息结合起来。您可以选择将您的网络浏览器设置为拒绝 cookie，或在发送 cookie 时提醒您。如果您这样做，请注意我们服务的某些部分可能无法正常运行。
                        <h2 className="my-2 text-bold text-base">
                            我们如何使用信息
                        </h2>
                        我们根据您的指示（包括使用条款中的任何适用条款）以及适用法律的要求使用您的信息。我们还可能将收集的信息用于：
                        <h2 className="my-2 text-bold text-base">
                            提供服务和功能
                        </h2>
                        我们可能会使用收集到的信息来提供、个性化、维护和改进我们的产品和服务，包括我们在使用条款中所述的信息。这包括使用信息来：
                        运营、维护、定制、衡量和改进我们的服务，以及管理我们的业务；
                        <h2 className="my-2 text-bold text-base">
                            处理交易；
                        </h2>
                        发送信息，包括确认、通知、更新、安全警报以及支持和管理消息；和
                        创建去识别化或聚合的数据。
                        <h2 className="my-2 text-bold text-base">
                            安全保障
                        </h2>
                        我们可能会使用您的信息来帮助维护您和我们的服务的安全性和完整性，包括：
                        保护、调查和阻止欺诈、未经授权或非法活动；
                        监控和验证身份或服务访问，打击垃圾邮件、恶意软件或安全风险；
                        执行提供我们的服务所需的内部操作，包括解决软件错误和操作问题；
                        执行我们与第三方的协议，并解决违反我们的使用条款或其他服务协议的行为；和遵守适用的安全法律和法规。
                        <h2 className="my-2 text-bold text-base">
                            用户支持
                        </h2>
                        我们可能会使用收集的信息来提供支持，包括：
                        直接向适当的支持人员提出问题；
                        调查并解决用户的疑虑；和
                        监控和改进我们的客户支持响应和流程。
                        <h2 className="my-2 text-bold text-base">
                            研究与开发
                        </h2>
                        我们可能会将收集的信息用于测试、研究、分析和产品开发，以改善您的体验。这有助于我们改善和增强我们服务的安全性，提高我们防止将我们的服务用于非法或不当目的的能力，并开发与我们的服务相关的新功能和产品。
                        法律和法规合
                        我们可能会通过将您提供的个人信息与第三方数据库和公共记录进行比较来验证您的身份。我们可能会使用我们收集的信息来调查或解决与使用我们的服务有关的索赔或争议，或在适用法律允许的情况下，或根据监管机构、政府实体和官方调查的要求。
                        <h2 className="my-2 text-bold text-base">
                            直接营销
                        </h2>
                        我们可能会使用收集的信息向您推销我们的服务。这可能包括向您发送有关我们的服务、功能、促销、调查、新闻、更新和活动的信息，以及管理您对这些促销和活动的参与。如果您不希望我们向您发送营销通讯，请选择“取消订阅”我们发送的任何营销电子邮件，或通过services@whaleflow.co联系我们。
                        <h2 className="my-2 text-bold text-base">
                            我们如何分享和披露信息
                        </h2>
                        我们可能会在以下情况下共享您的信息：
                        经您同意。例如，您可以让我们与其他人共享个人信息以供他们自己的营销用途。这些用途将受其隐私政策的约束。
                        遵守我们的法律义务。我们可能会共享您的信息： (A) 配合政府或监管机构的调查； (B) 当我们因传票、法院命令或类似法律程序而被迫这样做时； (C) 当我们真诚地相信披露个人信息对于防止他人受到伤害是必要的； （四）举报涉嫌违法行为； (E) 调查违反我们的用户协议或任何其他适用政策的行为。
                        与服务提供商。我们可能会与帮助促进业务和合规运营（例如营销和技术服务）的服务提供商共享您的信息。我们的合同要求这些服务提供商仅将您的信息用于他们为我们提供的服务。
                        在我们的业务发生变化期间。如果我们从事合并、收购、破产、解散、重组、出售我们的部分或全部资产或股票、融资、公开发行证券、收购我们的全部或部分业务、类似的交易或程序，或在考虑此类活动的过程中，您的部分或全部信息可能会被共享或转移，但须遵守标准保密安排。
                        聚合或去识别化的数据。我们可能会与其他人共享汇总和/或匿名数据供他们自己使用。
                        <h2 className="my-2 text-bold text-base">
                            数据保留
                        </h2>
                        要查看或更新您的信息，请通过services@whaleflow.co 联系我们。我们在您使用本协议的整个生命周期内存储您的信息，并保留您的信息至少五 (5) 年，以遵守我们的法律义务或解决争议。如果您停止使用本协议，我们不会将您的信息用于任何进一步的目的，也不会向第三方出售或共享您的信息，除非根据法律要求或根据本政策为防止欺诈和协助执法所必需。
                        <h2 className="my-2 text-bold text-base">
                            安全
                        </h2>
                        我们维护旨在保护我们维护的个人信息免遭未经授权的访问或披露的管理、技术和物理保护措施。任何系统都不可能是完全安全的。因此，尽管我们采取措施保护您的信息，但我们不能保证您的信息、搜索或其他通信始终保持安全。您对与您的任何以太坊网络地址和/或加密货币钱包相关的协议上的所有活动负责。
                        <h2 className="my-2 text-bold text-base">
                            年龄限制
                        </h2>
                        在适用法律禁止的范围内，我们不允许任何低于用户居住司法管辖区法定年龄的人使用我们的服务和网站。如果您发现任何低于法定年龄的人非法向我们提供个人数据，请通过services@whaleflow.co与我们联系，我们将采取措施删除此类信息、关闭任何此类帐户，并尽可能阻止用户继续使用我们的服务。
                        <h2 className="my-2 text-bold text-base">
                            本政策
                        </h2>
                        如果我们进行任何更改，我们将更改上面的最后更新日期。我们鼓励您查看本政策以随时了解情况。如果我们做出重大变更，我们将提供额外通知，例如通过您帐户中指定的电子邮件或通过服务或网站。
                        <h2 className="my-2 text-bold text-base">
                            在线跟踪选择退出指南
                        </h2>
                        与许多在线公司一样，我们使用谷歌和其他使用跟踪技术的公司提供的服务。这些服务依靠跟踪技术（例如 Cookie 和网络信标）直接从您的设备收集有关您的浏览活动、您与网站的交互以及您用于连接互联网的设备的信息。有多种方法可以选择不通过这些服务收集您的在线活动和设备数据，我们总结如下：
                        阻止浏览器中的 cookie。大多数浏览器允许您删除或拒绝 cookie，包括用于基于兴趣的广告的 cookie。为此，请按照浏览器设置中的说明进行操作。许多浏览器默认接受 cookie，直到您更改设置。有关 Cookie 的更多信息，包括如何查看您的设备上设置了哪些 Cookie 以及如何管理和删除它们，请访问www.allaboutcookies.org。
                        阻止在您的移动设置中使用广告 ID。您的移动设备设置可能会提供限制将与您的移动设备关联的广告 ID 用于基于兴趣的广告目的的功能。使用隐私插件或浏览器。您可以使用具有隐私功能的浏览器来阻止我们的网站设置用于基于兴趣的广告的 Cookie。
                        平台选择退出。以下广告合作伙伴提供选择退出功能，让您可以选择不将您的信息用于基于兴趣的广告 - Google：https://adssettings.google.com。广告行业选择退出工具。您还可以使用下面列出的退出选项来限制参与公司将您的信息用于基于兴趣的广告。请注意，由于这些选择退出机制特定于执行这些机制的设备或浏览器，因此您需要在您使用的每个浏览器和设备上选择退出。数字广告联盟：http://optout.aboutads.info网络广告倡议：http://optout.networkadvertising.org/
                        <h2 className="my-2 text-bold text-base">
                            隐私惯例
                        </h2>
                        我们不会以货币价值“出售”我们收集的个人信息（如 CCPA 中定义的术语）（并且在不提供选择退出权的情况下不会出售这些信息）。与许多公司一样，我们可能会使用第三方 cookie 来实现广告目的。如果您想了解如何选择不使用我们的 cookie 和其他跟踪技术，请查看本政策的在线跟踪选择退出指南部分中提供的说明。
                        隐私权
                        CCPA 授予个人以下权利：
                        信息。您可以索取有关我们在过去 12 个月内如何收集、使用和共享您的个人信息的信息。有关我们在过去 12 个月内收集的个人信息的详细信息（包括来源类别），请参阅本政策的“我们收集的内容”部分。我们出于本政策“我们如何使用信息”部分中所述的业务和商业目的收集这些信息。我们与本政策“我们如何共享和披露信息”部分中描述的第三方类别共享此信息。
                        使用权。您可以索取我们保存的有关您的个人信息的副本。
                        删除。您可以要求我们删除我们收集或维护的有关您的个人信息。
                        请注意，CCPA 限制这些权利，例如，禁止我们提供某些敏感信息来响应访问请求，并限制我们必须遵守删除请求的情况。仅当我们能够通过合理的努力将我们维护的信息与您在请求中提供的识别详细信息关联起来时，我们才会回复信息和访问请求。如果我们拒绝您的请求，我们会将我们的决定传达给您。您有权不受歧视地行使上述权利。
                        <h2 className="my-2 text-bold text-base">
                            如何提交请求
                        </h2>
                        如需请求访问或删除个人信息，请发送电子邮件至services@whaleflow.co。
                        <h2 className="my-2 text-bold text-base">
                            身份验证
                        </h2>
                        CCPA 要求我们在对请求做出实质性回应之前验证提交访问或删除个人信息请求的个人的身份。当您提交请求时，我们会要求您验证您的身份。
                        针对我们的消费者和客户的
                        本附加披露规定了我们对用户向我们提供的个人信息的收集、使用和共享，以启动或完成与协议交互的过程。如果本附加披露与隐私政策其他部分之间存在冲突，则以附加披露为准。
                        我们收集和共享的个人信息类型包括：
                        联系方式
                        交易记录
                        加密货币余额和钱包当您不再是我们的客户时，我们将继续按照本通知中所述共享您的信息。
                        我们可以分享您的个人信息
                        我们需要共享用户的个人信息来运营协议和我们业务的某些方面。下面介绍我们是否共享您的个人信息、我们共享您的个人信息的原因以及您是否可以限制这种共享
                        我们出于日常业务目的共享用户的个人信息，例如处理和匹配您的订单以及响应法院命令和法律调查。您不能限制我们共享此信息。
                        我们出于营销目的共享用户的个人信息，例如向您提供我们的产品和服务。您不能限制我们共享此信息。
                        我们不会为了与金融公司联合营销而共享用户的个人信息。
                        我们不会出于附属公司的日常业务目的而共享用户的个人信息。
                        我们不会为了向您进行营销而与我们的附属公司共享用户的个人信息。
                        我们不会为了向您进行营销而与非关联方共享用户的个人信息。
                        “关联公司”是指具有共同所有权或控制权的关联公司； “非关联公司”是指不存在共同所有权或控制权的公司； “联合营销”是指非附属金融公司之间共同向您营销金融产品或服务的正式协议。
                        Whaleflow 如何保护我的个人信息？
                        为了保护您的个人信息免遭未经授权的访问和使用，我们使用符合适用法律的安全措施。这些措施包括计算机防护措施以及受保护的文件和建筑物。
                        Whaleflow 如何收集我的个人信息？
                        例如，当您在协议中存入数字资产、使用协议进行交易或从协议中提取数字资产时，我们会收集您的个人信息。我们还可能从其他公司收集您的个人信息。
                        <h2 className="my-2 text-bold text-base">
                            联系我们
                        </h2>
                        如果您对本政策有任何疑问或寻求行使任何法定权利，请联系我们。根据适用法律，我们将在合理的时间内做出回应。您可以通过services@whaleflow.co联系我们。

                    </p>
                </div>
            )}
        </div>
    )
};

export default PrivitePolicy;