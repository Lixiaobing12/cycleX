import { Divider } from "antd";
import { useTranslation } from "react-i18next";

const Law = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Law")}</h1>
      <Divider />

      <div className="mt-10">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("User service agreement")}</summary>
          <div className="collapse-content">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("Terms of Service")}</h2>
            <p>{t("Last Updated: July. 2024")}</p>
            {i18n.language === "en" ? (
              <ul className="ml-6">
                <li>
                  These terms of service, together with any documents and additional terms they expressly incorporate by reference, which includes any other terms and conditions or other agreement
                  that WHALE FLOW Inc. ("WHALE FLOW," "we," "us" and "our") posts publicly or makes available to you or the company or other legal entity you represent ("you" or "your") (collectively,
                  these "Terms" or "Agreement"), are entered into between WHALE FLOW and you concerning your use of, and access to, WHALE FLOW's websites, including WHALE FLOW; web applications;
                  mobile applications; and all associated sites linked thereto by WHALE FLOW or its affiliates (collectively with any materials and services available therein, and successor website(s)
                  or application(s) thereto, the "Site") and the Services (as defined in Section 2.1 hereto).
                </li>
                <li>
                  By clicking "I agree" (or a similar language) to these Terms, acknowledging these Terms by other means, or otherwise accessing or using the Site or the Services, you accept and agree
                  to be bound by and to comply with these Terms, including, without limitation, the mandatory arbitration provision in Section 14. If you do not agree to these Terms, then you must not
                  access or use the Site or the Services. Please carefully review the disclosures and disclaimers set forth in Section 12 in their entirety before using any software developed or owned
                  by WHALE FLOW. The information in Section 12 provides important details about the legal obligations associated with your use of the Services.
                </li>
                <li>
                  1. Modifications to These Terms
                  <ol className="ml-2">
                    <li>
                      We reserve the right, in our sole discretion, to modify these Terms from time to time. If we make changes, we will provide you with notice of such changes, such as by providing
                      notice through the Services or updating the "Last Updated" date at the top of these Terms. Unless we state otherwise in our notice, all such modifications are effective
                      immediately, and your continued use of the Site and the Services after we provide that notice will confirm your acceptance of the changes. If you do not agree to the amended
                      Terms, then you must stop using the Site and the Services.
                    </li>
                  </ol>
                </li>
                <li>
                  2. Use of Services
                  <ol className="ml-2">
                    <li>
                      2.1 The Services. The Site provides information regarding and, subject to eligibility requirements and the successful completion of WHALE FLOW’s onboarding process, the ability
                      to access certain products issued by special purpose vehicles (each, a “Product”) and operated by WHALE FLOW (collectively“Services”).  Note that each Product remains
                      independently subject to all terms, conditions, and requirements set forth in any applicable Product specific agreements, which are parallel to and not amended or otherwise
                      replaced by these Terms. Services may include, for example, providing you access to the Products through messaging protocols to interact with centralized or decentralized
                      applications; APIs; and other software that WHALE FLOW has developed or otherwise owns or provides to support accessing the Products.  Entering into bilateral transactions
                      (including smart contract based decentralized transactions) involving the Products and/or cryptocurrency or other blockchain based assets (collectively, “Digital Assets”) is not
                      part of the Services and any such activities or transactions are done at your own risk.  You acknowledge and agree that WHALE FLOW does not provide execution, settlement, or
                      clearing services of any kind and is not responsible for the execution, settlement, or clearing of transactions automated through a blockchain. You acknowledge that any 
                      execution and settlement of decentralized blockchain transactions (including involving a Digital Asset) occurs directly on the Ethereum blockchain (or such other blockchain as
                      may be indicated in the relevant Services interface) and that WHALE FLOW is not involved in any such activity or transactions.
                    </li>
                    <li>
                      2.2 Conditions. As a condition to accessing or using the Services or the Site, you represent and warrant to WHALE FLOW the following:
                      <ol className="ml-1">
                        <li>
                          2.2.1 if you are entering into these Terms as an individual, then you are of legal age in the jurisdiction in which you reside and you have the legal capacity to enter into
                          these Terms and be bound by them and if you are entering into these Terms as an entity, then you must have the legal authority to accept these Terms on that entity's behalf,
                          in which case "you" (except as used in this paragraph) will mean that entity; 2.2.2 you are not a resident, national, or agent of china,Iran, Cuba, North Korea, Syria, or the
                          Crimean Region of the Ukraine or any other country to which the United States embargoes goods or imposes similar sanctions (collectively, "Restricted Territories"); 2.2.3 you
                          are not a member of any sanctions list or equivalent maintained by the United States government, the United Kingdom government, the European Union, or the United Nations
                          (collectively, "Sanctions Lists Persons") and you do not intend to transact with any Restricted Person or Sanctions List Person; 2.2.4 you do not, and will not, use VPN
                          software or any other privacy or anonymization tools or techniques to circumvent, or attempt to circumvent, any restrictions that apply to the Services; and 2.2.5 your access
                          to the Services is not (a) prohibited by and does not otherwise violate or assist you to violate any domestic or foreign law, rule, statute, regulation, by-law, order,
                          protocol, code, decree, or another directive, requirement, or guideline, published or in force that applies to or is otherwise intended to govern or regulate any person,
                          property, transaction, activity, event or other matter, including any rule, order, judgment, directive or other requirement or guideline issued by any domestic or foreign
                          federal, provincial or state, municipal, local or other governmental, regulatory, judicial or administrative authority having jurisdiction over WHALE FLOW, you, the Site or
                          the Services, or as otherwise duly enacted, enforceable by law, the common law or equity (collectively, "Applicable Laws"); or (b) contribute to or facilitate any illegal
                          activity.
                        </li>
                        <li>
                          2.2.2 You are not a resident, national or agent of China, Iran, Cuba, North Korea, Syria or the Crimea region of Ukraine, or any other country to which the United States has
                          imposed a goods embargo or similar sanctions (collectively, the "Restricted Area") people;
                        </li>
                        <li>
                          2.2.3 You are not a member of any sanctions list or equivalent list maintained by the United States Government, the United Kingdom Government, the European Union or the
                          United Nations (collectively, the "Sanctions Listed Persons"), nor do you intend to interact with any restricted person or person on the Sanctions List Personnel conduct
                          transactions;
                        </li>
                        <li>
                          2.2.4 You will not and will not use virtual private network software or any other privacy or anonymity tools or technologies to circumvent or attempt to circumvent any
                          restrictions applicable to the Services;
                        </li>
                        <li>
                          2.2.5 Your use of the Services is not (a) prohibited from, or shall violate or assist your violation of, any domestic or foreign law, applicable to or otherwise governing or
                          regulating any person, property, transaction, activity, event or other matter , including any rules, orders, judgments, directives or other requirements or guidelines
                          promulgated by any domestic or foreign federal government, provincial or state, municipal, local or other governmental, regulatory, judicial or administrative authority
                          having jurisdiction over WHALE FLOW, You, the Site or the Services, or otherwise duly enacted and enforceable by common law or equity (collectively, "Applicable Law"); or (b)
                          promote or facilitate any illegal activity.
                        </li>
                      </ol>
                    </li>
                    <li>
                      2.3 As a condition to accessing or using the Services or the Site, you acknowledge, understand, and agree to the following:
                      <ol className="ml-1">
                        <li>
                          2.3.1 from time to time the Site and the Services may be inaccessible or inoperable for any reason, including, without limitation: (a) equipment malfunctions; (b) periodic
                          maintenance procedures or repairs that WHALE FLOW or any of its suppliers or contractors may undertake from time to time; (c) causes beyond WHALE FLOW's control or that WHALE
                          FLOW could not reasonably foresee; (d) disruptions and temporary or permanent unavailability of underlying blockchain infrastructure; or (e) unavailability of third-party
                          service providers or external partners for any reason; 2.3.2 we reserve the right to disable or modify access to the Site and the Services at any time in the event of any
                          breach of these Terms, including, without limitation, if we reasonably believe any of your representations and warranties may be untrue or inaccurate, and we will not be
                          liable to you for any losses or damages you may suffer as a result of or in connection with the Site or the Services being inaccessible to you at any time or for any reason;
                          2.3.3 the Site and the Services may evolve, which means WHALE FLOW may apply changes, replace, or discontinue (temporarily or permanently) the Services at any time in its
                          sole discretion; 2.3.4 the general pricing information provided on the Site is informational and does not represent an offer, a solicitation of an offer, or any advice
                          regarding, or recommendation to enter into, a transaction with WHALE FLOW;
                        </li>
                        <li>
                          2.3.2 We reserve the right to disable or modify access to the Site and Services at any time in connection with any breach of these Terms, including, without limitation, if we
                          have reason to believe that any of your representations and warranties may be untrue or inaccurate , we will not be liable for any loss or damage you may suffer as a result
                          of or in connection with the Website or Services being inaccessible to you at any time or for any reason;
                        </li>
                        <li>
                          2.3.3 The website and services are subject to change, which means that WHALE FLOW may change, replace or terminate the services at any time (temporarily or permanently) at
                          its sole discretion;
                        </li>
                        <li>
                          2.2.4 You will not and will not use virtual private network software or any other privacy or anonymity tools or technologies to circumvent or attempt to circumvent any
                          restrictions applicable to the Services; and
                        </li>
                        <li>2.3.5 WHALE FLOW does not act as an agent for you or any other user of the Site or the Services;</li>
                        <li>2.3.6 you are solely responsible for your use of the Services, including all of your transfers of Digital Assets and the custody and control of your Digital Assets;</li>
                        <li>
                          2.3.7 to the fullest extent not prohibited by Applicable Law, we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such duties or
                          liabilities may exist at law or in equity, you hereby irrevocably disclaim, waive, and eliminate those duties and liabilities;
                        </li>
                        <li>2.3.8 you are solely responsible for reporting and paying any taxes applicable to your use of the Services;</li>
                        <li>
                          2.3.9 we have no control over, or liability for, the delivery, quality, safety, legality, or any other aspect of any Digital Assets that you may transfer to or from a third
                          party, and we are not responsible for ensuring that an entity with whom you transact completes the transaction or is authorized to do so, and if you experience a problem with
                          any transactions in Digital Assets using the Services, then you bear the entire risk.
                        </li>
                      </ol>
                    </li>
                    <li>
                      2.4 As a condition to accessing or using the Services or the Site, you covenant to WHALE FLOW the following:
                      <ol className="ml-1">
                        <li>
                          2.4.1 in connection with using the Services, you only will transfer legally-obtained Digital Assets that belong to you; 2.4.2 you will comply with all Applicable Laws in
                          connection with using the Services, and you will not use the Site or the Services if the laws of your country, or any other Applicable Law, prohibit you from doing so; 2.4.3
                          any Digital Assets you use in connection with the Services are either owned by you or you are validly authorized to carry our actions using such Digital Assets; 2.4.4 in
                          addition to complying with all restrictions, prohibitions, and other provisions of these Terms, you will ensure that, at all times, all information that you provide on the
                          Site and during your use of the Services is current, complete, and accurate; maintain the security and confidentiality of your private keys associated with your public Ether
                          address, passwords, API keys, private keys associated with your Services account and other related credentials.
                        </li>
                        <li>
                          2.4.2 In connection with your use of the Services, you must comply with all applicable laws, and you will not use the Website or Services if the laws of your country or any
                          other applicable law prohibit you from doing so;
                        </li>
                        <li>2.4.3 You use any digital assets related to the service, or they are owned by you, or you are validly authorized to use such digital assets to operate;</li>
                        <li>
                          2.4.4 In addition to complying with all restrictions, prohibitions and other provisions of these Terms, you must ensure that all information you provide on the website and
                          during use of the Services is current, complete and accurate at all times; maintain your The security and confidentiality of Ether addresses, passwords, API passwords,
                          private keys associated with your service account and other related credentials.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  3. Fees and Price Estimates
                  <p>
                    In connection with your use of the Services, you are required to pay all fees necessary for interacting with the Ethereum or any other applicable blockchain, including transaction
                    costs, as well as any other fees reflected on the Site at the time of your use of the Services. Where relevant, although we attempt to provide accurate fee information, this
                    information reflects our estimates of fees, which may vary from the actual fees paid to use the Services and interact with the Ethereum or any other applicable blockchain.
                  </p>
                </li>
                <li>
                  4. No Professional Advice or Fiduciary Duties
                  <p>
                    Unless otherwise stated, all information provided in connection with your access and use of the Site and the Services is for informational purposes only and should not be construed
                    as professional advice. You should not take, or refrain from taking, any action based on any information contained on the Site or any other information that we make available at
                    any time, including, without limitation, blog posts, articles, links to third-party content, discord content, news feeds, tutorials, tweets, and videos. Before you make any
                    financial, legal, or other decisions involving the Services, you should seek independent professional advice from an individual who is licensed and qualified in the area for which
                    such advice would be appropriate.
                  </p>
                </li>
                <li>
                  5. Prohibited Activity
                  <p>
                    You may not use the Services to engage in the categories of activity set forth below ("Prohibited Uses"). The specific activities set forth below are representative, but not
                    exhaustive, of Prohibited Uses. If you are uncertain as to whether or not your use of the Services involves a Prohibited Use or have other questions about how these requirements
                    apply to you, then please contact us at services@whaleflow.co.By using the Site or Services, you confirm that you will not use the Site or Services to do any of the following:
                  </p>
                  <ol className="ml-2">
                    <li>
                      5.1 violate any Applicable Laws including, without limitation, any relevant and applicable anti-money laundering and anti-terrorist financing laws and sanctions programs, such
                      as, without limitation, the US Department of Treasury's Office of Foreign Asset Controls; 5.2 engage in transactions involving items that infringe or violate any copyright,
                      trademark, right of publicity or privacy or any other proprietary right under Applicable Law, including but not limited to, sales, distribution, or access to counterfeit music,
                      movies, software, or other licensed materials without the appropriate authorization from the rights holder; use of WHALE FLOW's intellectual property, name, or logo, including
                      use of WHALE FLOW's trade or service marks, without express consent from WHALE FLOW or in a manner that otherwise harm WHALE FLOW; any action that implies an untrue endorsement
                      by or affiliation with WHALE FLOW; 5.3 use the Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the
                      Services, or that could damage, disable, overburden, or impair the functioning of the Site or the Services in any manner; 5.4 engage in activity that violates any applicable law,
                      rule, or regulation concerning the integrity of trading markets, including (but not limited to) the manipulative tactics commonly known as spoofing and wash trading.
                    </li>
                    <li>
                      5.2 Engage in transactions involving infringement or violation of any copyright, trademark, publicity or privacy rights or any other proprietary rights under applicable law,
                      including but not limited to the sale, distribution or acquisition of counterfeit music, movies, without appropriate authorization from the rights holder , software or other
                      licensed materials; without WHALE FLOW's express consent or otherwise damaging WHALE FLOW's intellectual property rights, names or logos, including the use of WHALE FLOW's
                      trademarks or service marks; any suggestion of untrue endorsement or affiliation by WHALE FLOW Behavior;
                    </li>
                    <li>
                      5.3 Use the Services in any way that may interfere with, disrupt, negatively affect or prevent other users from fully enjoying the Services, or in any way impair, disable,
                      overburden or impair the functionality of the Site or Services;
                    </li>
                    <li>
                      5.4 Engage in activities that violate any applicable laws, rules or regulations regarding the integrity of the trading market, including (but not limited to) commonly known as
                      deceptive and money laundering transactions.
                    </li>
                    <li>
                      5.5 circumvent any content-filtering techniques, security measures or access controls that WHALE FLOW employs on the Site, including, without limitation, through the use of a
                      VPN;
                    </li>
                    <li>
                      5.6 use any robot, spider or other automated means or interface not provided by us, to access the Services or to extract data, or introduce any malware, virus, Trojan horse,
                      worm, backdoor, shutdown mechanism or other harmful material into the Site or the Services; 5.7 provide false, inaccurate, or misleading information while using the Site or the
                      Services or engage in activity that operates to defraud WHALE FLOW, other users of the Services, or any other person; 5.8 use or access the Site or Services to transmit or
                      exchange Digital Assets that are the direct or indirect proceeds of any criminal or fraudulent activity, including, without limitation, terrorism or tax evasion; 5.9 use the Site
                      in any way that is, in our sole discretion, libelous, defamatory, profane, obscene, pornographic, sexually explicit, indecent, lewd, vulgar, suggestive, harassing, stalking,
                      hateful, threatening, offensive, discriminatory, bigoted, abusive, inflammatory, fraudulent, deceptive, or otherwise objectionable or likely or intended to incite, threaten,
                      facilitate, promote, or encourage hate, racial intolerance, or violent acts against others; 5.10 use the Site or the Services from a jurisdiction that we have, in our sole
                      discretion, determined is a jurisdiction where the use of the Site or the Services is prohibited; 5.11 harass, abuse, or harm of another person or entity, including WHALE FLOW's
                      employees and service providers; impersonate another user of the Services or otherwise misrepresent yourself; or 5.12 engage in activity that violates any applicable law, rule,
                      or regulation of the United States or another relevant jurisdiction, including (but not limited to) the restrictions and regulatory requirements imposed by US law.
                    </li>
                    <li>
                      5.7 Provide false, inaccurate or misleading information when using the Site or Services or engage in activities that defraud WHALE FLOW, other users of the Services, or any other
                      person;
                    </li>
                    <li>
                      5.8 Use or access the Site or Services to transmit or exchange digital assets that are the direct or indirect proceeds of any criminal or fraudulent activity, including but not
                      limited to terrorism or tax evasion;
                    </li>
                    <li>
                      5.9 Use this website in any way that is defamatory, defamatory, profane, obscene, pornographic, sexually explicit, indecent, indecent, vulgar, suggestive, harassing, stalking,
                      hateful, threatening, offensive, discriminatory, bigoted, abusive, inflammatory , is deceptive, deceptive or otherwise objectionable or is likely or intended to incite, threaten,
                      facilitate, promote or encourage hatred, racial intolerance or violence against others;
                    </li>
                    <li>
                      5.10 In the jurisdictions in which the website or services are used, we have the right to determine at our sole discretion whether the use of the website or services is
                      prohibited;
                    </li>
                    <li>
                      5.11 Harass, abuse, or harm another person or business entity, including WHALE FLOW’s employees and service providers; impersonate another user of the Service or otherwise
                      misrepresent yourself;
                    </li>
                    <li>
                      5.12 Engage in activities that violate any applicable laws, rules or regulations of the United States or other relevant jurisdictions, including (but not limited to) restrictions
                      and regulatory requirements imposed by United States law.
                    </li>
                    <li>
                      5.13 encourage, induce or assist any third party, or yourself attempt, to engage in any of the activities prohibited under this Section 5 or any other provision of these Terms.
                    </li>
                  </ol>
                </li>
                <li>
                  6. Content
                  <p>
                    You hereby grant to us a royalty-free, fully paid-up, sublicensable, transferable, perpetual, irrevocable, non- exclusive, worldwide license to use, copy, modify, create derivative
                    works of, display, perform, publish and distribute, in any form, medium, or manner, any content that is available to other users as a result of your use of the Site or the Services
                    (collectively, "Your Content"), including, without limitation, for promoting WHALE FLOW, its affiliates, the Services or the Site. You represent and warrant that (a) you own Your
                    Content or have the right to grant the rights and licenses in these Terms; and (b) Your Content and our use of Your Content, as licensed herein, does not and will not violate,
                    misappropriate or infringe on any third party's rights.
                  </p>
                </li>
                <li>
                  7. Proprietary Rights
                  <ol className="ml-2">
                    <li>
                      7.1 Any of WHALE FLOW's product or service names, logos, and other marks used on the Site or as a part of the Services, including WHALE FLOW's name and logo are trademarks owned
                      by WHALE FLOW, its affiliates, or its applicable licensors. You may not copy, imitate, or use them without the prior written consent of WHALE FLOW or the applicable licensors,
                      and these Terms do not grant you any rights in those trademarks. You may not remove, obscure, or alter any legal notices displayed in or along with the Services.
                    </li>
                  </ol>
                </li>
                <li>
                  8. Links
                  <p>
                    The Services provide, or third parties may provide, links to other World Wide Web or accessible sites, applications, or resources. You acknowledge and agree that the Company is not
                    responsible for the availability of such external sites, applications or resources, and does not endorse and is not responsible or liable for any content, advertising, products, or
                    other materials on or available from such sites or resources. You further acknowledge and agree that Company shall not be responsible or liable, directly or indirectly, for any
                    damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such site or resource.
                  </p>
                </li>
                <li>
                  9. Modification, Suspension, and Termination
                  <p>
                    We may, at our sole discretion, from time to time and with or without prior notice to you, modify, suspend or disable (temporarily or permanently) the Services, in whole or in
                    part, for any reason whatsoever, including, without limitation, to only allow open WHALE FLOW funds to be closed. Upon termination of your access, your right to use the Services
                    will immediately cease. We will not be liable for any losses suffered by you resulting from any modification to any Services or from any modification, suspension, or termination,
                    for any reason, of your access to all or any portion of the Site or the Services. The following sections of these Terms will survive any termination of your access to the Site or
                    the Services, regardless of the reasons for its expiration or termination, in addition to any other provision which by law or by its nature should survive: Sections 7 through 15.
                  </p>
                </li>

                <li>
                  10. Assumption of Risks
                  <ol className="ml-2">
                    <li>
                      10.1 By utilizing the Services or interacting with the Site in any way, you represent and warrant that you understand the inherent risks associated with cryptographic systems and
                      blockchain-based networks; Digital Assets, including the usage and intricacies of native Digital Assets, like Ether (ETH); Ethereum blockchain-based tokens, and systems that
                      interact with blockchain-based networks. WHALE FLOW does not own or control any of the underlying software through which blockchain networks are formed. In general, the software
                      underlying blockchain networks, including the Ethereum blockchain, is open source, such that anyone can use, copy, modify, and distribute it. By using the Services, you
                      acknowledge and agree (a) that WHALE FLOW is not responsible for the operation of the software and networks underlying the Services, (b) that there exists no guarantee of the
                      functionality, security, or availability of that software and networks, and (c) that the underlying networks are subject to sudden changes in operating rules, such as those
                      commonly referred to as "forks," which may materially affect the Services. Blockchain networks use public/private key cryptography. You alone are responsible for securing your
                      private key(s). We do not have access to your private key(s). Losing control of your private key(s) will permanently and irreversibly deny you access to Digital Assets on the
                      Ethereum blockchain or other blockchain-based network. Neither WHALE FLOW nor any other person or entity will be able to retrieve or protect your Digital Assets. If your private
                      key(s) are lost, then you will not be able to transfer your Digital Assets to any other blockchain address or wallet. If this occurs, then you will not be able to realize any
                      value or utility from the Digital Assets that you may hold.
                    </li>
                    <li>
                      10.2 your Digital Assets could be impacted by one or more regulatory inquiries or regulatory actions, which could impede or limit the ability of WHALE FLOW to continue to make
                      available its proprietary software and, thus, could impede or limit your ability to access or use the Services.
                    </li>
                    <li>
                      10.3 You acknowledge and understand that cryptography is a progressing field with advances in code cracking or other technical advancements, such as the development of quantum
                      computers, which may present risks to Digital Assets and the Services, and could result in the theft or loss of your Digital Assets. To the extent possible, we intend to update
                      WHALE FLOW-developed or owned software related to the Services to incorporate additional security measures necessary to address risks presented from technological advancements,
                      but that intention does not guarantee or otherwise ensure full security of the Services.
                    </li>
                    <li>
                      10.4 You understand that the Ethereum blockchain remains under development, which creates technological and security risks when using the Services in addition to uncertainty
                      relating to Digital Assets and transactions therein. You acknowledge that the cost of transacting on the Ethereum blockchain is variable and may increase at any time causing
                      impact to any activities taking place on the Ethereum blockchain, which may result in price fluctuations or increased costs when using the Services.
                    </li>
                    <li>
                      10.5 You acknowledge that the Services are subject to flaws and that you are solely responsible for evaluating any code provided by the Services or Site. This warning and others
                      WHALE FLOW provides in these Terms in no way evidence or represent an on-going duty to alert you to all of the potential risks of utilizing the Services or accessing the Site.
                    </li>
                    <li>
                      10.6 Although we intend to provide accurate and timely information on the Site and during your use of the Services, the Site and other information available when using the
                      Services may not always be entirely accurate, complete, or current and may also include technical inaccuracies or typographical errors. To continue to provide you with as
                      complete and accurate information as possible, information may be changed or updated from time to time without notice, including, without limitation, information regarding our
                      policies. Accordingly, you should verify all information before relying on it, and all decisions based on information contained on the Site or as part of the Services are your
                      sole responsibility. No representation is made as to the accuracy, completeness, or appropriateness for any particular purpose of any pricing information distributed via the Site
                      or otherwise when using the Services. Prices and pricing information may be higher or lower than prices available on platforms providing similar services.
                    </li>
                    <li>
                      10.7 Any use or interaction with the Services requires a comprehensive understanding of applied cryptography and computer science to appreciate the inherent risks, including
                      those listed above. You represent and warrant that you possess relevant knowledge and skills. Any reference to a type of Digital Asset on the Site or otherwise during the use of
                      the Services does not indicate our approval or disapproval of the technology on which the Digital Asset relies, and should not be used as a substitute for your understanding of
                      the risks specific to each type of Digital Asset.
                    </li>
                    <li>
                      10.8 Use of the Services, in particular for Digital Assets transactions and entering into WHALE FLOW funds, may carry financial risk. Digital Assets and decentralized protocols
                      are highly experimental, risky, and volatile. Transactions entered into in connection with the Services are irreversible, final and there are no refunds. You acknowledge and
                      agree that you will access and use the Site and the Services at your own risk. The risk of loss in transacting in Digital Assets using WHALE FLOW funds can be substantial. You
                      should, therefore, carefully consider whether such transactions are suitable for you in light of your circumstances and financial resources. By using the Services, you represent
                      and warrant that you have been, are, and will be solely responsible for making your independent appraisal and investigations into the risks of a given WHALE FLOW pool
                      transaction. You represent that you have sufficient knowledge, market sophistication, professional advice, and experience to make your evaluation of the merits and risks of any
                      transaction conducted in connection with the Services. You accept all consequences of using the Services, including the risk that you may lose access to your Digital Assets
                      indefinitely. All transaction decisions are made solely by you. Not withstanding anything in these Terms, we accept no responsibility whatsoever for, and will in no circumstances
                      be liable to you in connection with, your use of the Services.
                    </li>
                    <li>
                      10.9 We must comply with Applicable Law, which may require us to, upon request by government agencies, take certain actions or provide information, which may not be in your best
                      interests and which may occur without notice to you.
                    </li>
                    <li>
                      10.10 You understand that the Service remains under development, which creates technological, transaction related, and other risks when using the Services. These risks include,
                      among others, delays in trades, withdrawals, and deposits resulting from the servers of WHALE FLOW or any other operator of the Services being offline; an incorrect display of
                      information on the Site in the case of server errors; or transactions using the Services being rolled back in the case of server errors. You acknowledge that these risks may have
                      a material impact on your transactions using the Services, which may result in, among other things, failing to fulfill transactions at your desired price or at all.
                    </li>
                    <li>
                      10.11 You hereby assume, and agree that WHALE FLOW will have no responsibility or liability for, the risks set forth in this Section 10. You hereby irrevocably waive, release and
                      discharge all claims, whether known or unknown to you, against WHALE FLOW, its affiliates, and their respective shareholders, members, directors, officers, employees, agents, and
                      representatives, suppliers, and contractors related to any of the risks set forth in this Section 10.
                    </li>
                  </ol>
                </li>
                <li>
                  11. Indemnification
                  <p>
                    You will defend, indemnify, and hold harmless WHALE FLOW, its affiliates, and its and its affiliates' respective stockholders, members, directors, officers, managers, employees,
                    attorneys, agents, representatives, suppliers, and contractors (collectively, "Indemnified Parties") from any claim, demand, lawsuit, action, proceeding, investigation, liability,
                    damage, loss, cost or expense, including without limitation reasonable attorneys' fees, arising out of or relating to (a) your use of, or conduct in connection with, the Site or
                    the Services (including, without limitation, the Service); (b) Digital Assets associated with your Ethereum or other applicable blockchain address; (c) any feedback or user content
                    you provide to WHALE FLOW, if any, concerning the Site or the Services; (d) your violation of these Terms; or (e) your infringement or misappropriation of the rights of any other
                    person or entity. If you are obligated to indemnify any Indemnified Party, WHALE FLOW (or, at its discretion, the applicable Indemnified Party) will have the right, to control any
                    action or proceeding and to determine whether WHALE FLOW wishes to settle, and if so, on what terms, and you agree to corporate with WHALE FLOW.
                  </p>
                </li>
                <li>
                  12 Disclosures; Disclaimers
                  <p>
                    WHALE FLOW is a developer and owner of software. WHALE FLOW does not operate a Digital Asset or derivatives exchange platform or offer trade execution or clearing services and,
                    therefore, has no oversight, involvement, or control concerning your transactions using the Services or Products. Any secondary transactions between users of the Services are
                    executed peer-to-peer directly between the users' Ethereum or other applicable blockchain addresses through a smart contract. You are responsible for complying with all Applicable
                    Laws that govern your use of Products, including, but not limited to, the Commodity Exchange Act and the regulations promulgated thereunder by the US Commodity Futures Trading
                    Commission ("CFTC"), the federal securities laws and the regulations promulgated thereunder by the US Securities and Exchange Commission ("SEC") and all foreign Applicable Laws.
                    You understand that WHALE FLOW is not registered or licensed by the BVI Financial Services Commission, the CFTC, SEC, or any financial regulatory authority. WHALE FLOW does not own
                    or control the underlying software protocols that are used in connection with Ethereum or other applicable blockchains. In general, decentralized protocols are open source and
                    anyone can use, copy, modify, and distribute them. WHALE FLOW is not responsible for the operation of decentralized protocols, and WHALE FLOW makes no guarantee of their
                    functionality, security, or availability.
                  </p>
                  <p>
                    To the maximum extent permitted under Applicable Law, the Site and the Services (and any of their content or functionality) provided by or on behalf of us are provided on an "AS
                    IS" and "AS AVAILABLE" basis, and we expressly disclaim, and you hereby waive, any representations, conditions or warranties of any kind, whether express or implied, legal,
                    statutory or otherwise, or arising from statute, otherwise in law, course of dealing, or usage of trade, including, without limitation, the implied or legal warranties and
                    conditions of merchantability, merchantable quality, quality or fitness for a particular purpose, title, security, availability, reliability, accuracy, quiet enjoyment and
                    non-infringement of third party rights. Without limiting the foregoing, we do not represent or warrant that the Site or the Services (including any data relating thereto) will be
                    uninterrupted, available at any particular time, or error-free. Further, we do not warrant that errors in the Site or the Services are correctable or will be correctable.
                  </p>
                  <p>
                    You acknowledge that your data on the Site may become irretrievably lost or corrupted or temporarily unavailable due to a variety of causes, and agree that, to the maximum extent
                    permitted under Applicable Law, we will not be liable for any loss or damage caused by denial-of-service attacks, software failures, viruses or other technologically harmful
                    materials (including those which may infect your computer equipment), protocol changes by third-party providers, Internet outages, force majeure events or other disasters,
                    scheduled or unscheduled maintenance, or other causes either within or outside our control.
                  </p>
                  <p>
                    The disclaimer of implied warranties contained herein may not apply if and to the extent such warranties cannot be excluded or limited under the Applicable Law of the jurisdiction
                    in which you reside.
                  </p>
                </li>
                <li>
                  13. Limitation of Liability
                  <p>
                    WHALE FLOW is a software developer and owner. WHALE FLOW does not operate a digital asset or derivatives trading platform, nor does it provide trade execution or settlement
                    services, and therefore has no supervision, involvement or control over transactions using this service or product. Any secondary transactions between users of the Service are
                    performed directly between the users’ Ethereum or other applicable blockchain addresses via smart contracts. You are responsible for complying with all laws that apply to your use
                    of the Products, including, without limitation, the Commodity Exchange Act and regulations promulgated thereunder by the U.S. Commodity Futures Trading Commission (“CFTC”), federal
                    securities laws and the U.S. Securities and Exchange Commission (“CFTC”) SEC") regulations promulgated under this Act, and all applicable foreign laws. You understand that WHALE
                    FLOW is not registered or licensed with the British Virgin Islands Financial Services Commission, Commodity Futures Trading Commission, Securities and Exchange Commission or any
                    financial regulatory agency. WHALE FLOW does not own or control the underlying software protocols associated with Ethereum or other applicable blockchains. Generally speaking,
                    decentralized protocols are open source and anyone can use, copy, modify and distribute them. WHALE FLOW is not responsible for the operation of the protocols, nor does WHALE FLOW
                    guarantee their functionality, security or availability. To the maximum extent permitted by applicable law, this website and the services provided by the Company (and any content
                    or functionality thereof) are provided on an "as is" and "as available" basis, and the Company expressly declares and hereby disclaims any express or No representations, conditions
                    or warranties, whether implied, legal, statutory or otherwise, or any representations, conditions or warranties arising from statute, law, course of dealing or usage of trade,
                    including but not limited to, merchantability, merchantability, quality, or implied or legal warranties and conditions of fitness for a particular purpose, title, security,
                    availability, reliability, accuracy, quiet enjoyment and non-infringement of third party rights. Without limiting the foregoing, we cannot guarantee that the Site or Services
                    (including any related data) will be uninterrupted, available at any particular time, or error-free. FURTHER, WE DO NOT WARRANT THAT ERRORS IN THE SITE OR THE SERVICE ARE OR WILL
                    BE CORRECTED. You acknowledge that your information on this website may be irreparably lost or damaged or temporarily unavailable for various reasons, and agree that to the maximum
                    extent permitted by applicable law, we will not be liable for denial of service attacks, software failures, viruses, or other technologically harmful material (including material
                    that may infect your computer equipment), changes in regulations by third-party suppliers, Internet outages, force majeure events or other disasters, scheduled or unscheduled
                    maintenance, or other reasons within our control or beyond our control responsible for any loss or damage caused. The disclaimer of implied warranties contained in this Contract
                    may not apply if and to the extent such warranties cannot be excluded or limited under applicable law in the jurisdiction in which you reside.
                  </p>
                </li>
                <li>
                  13. Limitation of Liability
                  <p>
                    In no event shall WHALE FLOW's aggregate liability (together with its affiliates, including its and its affiliates' respective stockholders, members, directors, managers, officers,
                    employees, attorneys, agents, representatives, suppliers, or contractors) arising out of or in connection with the Site and the Services (and any of their content and
                    functionality), any performance or nonperformance of the Services, your Digital Assets, or any Product, service or other item provided by or on behalf of WHALE FLOW, whether under
                    contract, tort, negligence, civil liability, statute, strict liability or other theory of liability exceed the lesser of US $50 or the amount of fees paid by you to WHALE FLOW
                    under these Terms, if any, in the twelve (12) month period immediately preceding the event giving rise to the claim for liability, except to the extent of a final judicial
                    determination that such damages were the result of WHALE FLOW's gross negligence, fraud, willful misconduct or intentional violation of the law.
                  </p>
                </li>
                <li>
                  14. Dispute Resolution & Arbitration
                  <ol className="ml-2">
                    <li>
                      14.1 Please read the following section carefully because it requires you to arbitrate certain disputes and claims with WHALE FLOW and limits how you can seek relief from WHALE
                      FLOW. Also, arbitration precludes you from suing in court or having a jury trial. You and WHALE FLOW agree that any dispute arising out of or related to these Terms or the
                      Services is personal to you and WHALE FLOW and that any dispute will be resolved solely through individual action, and will not be brought as a class arbitration, class action,
                      or any other type of representative proceeding.
                    </li>
                    <li>
                      14.2 Any dispute, controversy, or claim arising out of or in relation to these Terms, including the validity, invalidity, breach or termination thereof, shall be settled by
                      arbitration in accordance with the Cayman Islands Arbitration Law, 2012. There shall be one arbitrator; the appointing authority may be based on mutual agreement, be chosen by
                      the parties or in the absence of such agreement, the court may designate an appointing authority. The seat of the arbitration shall be the Cayman Islands and the language of the
                      arbitration shall be English. The applicable law shall be Cayman Islands law or another choice of law determined in WHALE FLOW's sole discretion.
                    </li>
                    <li>
                      With respect to all persons and entities, regardless of whether they have obtained or used the site for personal, commercial or other purposes, all disputes, controversies or
                      claims must be brought in the parties' individual capacity, and not as a plaintiff or class member in any purported class action, collective action or other representative
                      proceeding. This waiver applies to class arbitration, and unless we agree otherwise, the arbitrator may not consolidate more than one person's claims. You agree that, by entering
                      into the agreement, Each party irrevocably and unconditionally waives any objection that it may now or hereafter have to the laying of venue of any action or proceeding arising
                      out of or relating to this Agreement in the courts referred to in this Section 14.2. you and Balancer are each waiving the right to a trial by jury or to participate in a class
                      action, collective action, or other representative proceeding of any kind.
                    </li>
                  </ol>
                  <li>
                    14.3 To the fullest extent permitted by Applicable Law, any claim arising out of or related to these Terms or the Services must be filed within one year after such claim arose;
                    otherwise, the claim is permanently barred, which means that you and WHALE FLOW will not have the right to assert the claim.
                  </li>
                  <li>
                    14.4 If any portion of this Section 14 is found to be unenforceable or unlawful for any reason, (a) the unenforceable or unlawful provision shall be severed from these Terms; (b)
                    severance of the unenforceable or unlawful provision shall have no impact whatsoever on the remainder of this Section 14 or the parties' ability to compel arbitration of any
                    remaining claims on an individual basis under this Section 14; and (c) to the extent that any claims must therefore proceed on a class, collective, consolidated, or representative
                    basis, such claims must be litigated in a civil court of competent jurisdiction and not in arbitration, and the parties agree that litigation of those claims shall be stayed
                    pending the outcome of any individual claims in arbitration. Further, if any part of this Section 14 is found to prohibit an individual claim seeking public injunctive relief, then
                    that provision will have no effect to the extent such relief is allowed to be sought out of arbitration, and the remainder of this Section 14 will be enforceable.
                  </li>
                </li>
                <li>
                  15. General Information
                  <ol className="ml-2">
                    <li>
                      15.1 Privacy Policy. Please refer to our privacy policy, which is incorporated herein by reference and available here at https://whaleflow.co, for information about how we
                      collect, use, share and otherwise process information about you. 15.2 Consent to Electronic Delivery. You consent to receive all communications, agreements, documents, receipts,
                      notices, and disclosures electronically (collectively, our "Communications") that we provide in connection with these Terms or any Services. You agree that we may provide our
                      Communications to you by posting them on the Site or by emailing them to you at the email address you provide in connection with using the Services, if any. You should maintain
                      copies of our Communications by printing a paper copy or saving an electronic copy. You may also contact us with questions, complaints, or claims concerning the Services
                      at services@whaleflow.co 15.3 Remedies. Any right or remedy of WHALE FLOW set forth in these Terms is in addition to, and not in lieu of, any other right or remedy whether
                      described in these Terms, under Applicable Law, at law, or in equity. The failure or delay of WHALE FLOW in exercising any right, power, or privilege under these Terms shall not
                      operate as a waiver thereof.
                    </li>
                    <li>
                      15.2 Electronic delivery of consent form. You agree to receive all electronic communications, agreements, documents, receipts, notices and disclosures from us regarding these
                      Terms or any Services (collectively, our "Communications"). You agree that we may provide you with communications (if any) related to your use of the Service by posting on the
                      Site or by email. You should save a copy of our communications by printing a paper copy or saving an electronic copy. You may also contact us at Services@whaleflow.co with
                      questions, complaints or claims regarding the Services.
                    </li>
                    <li>
                      15.3 Any WHALE FLOW rights or remedies provided by Remedies in these Terms are in addition to, and not in lieu of, any other rights or remedies provided in these Terms,
                      applicable law, law or equity. WHALE FLOW's failure or delay in exercising any right, power or privilege provided for in these Terms shall not operate as a waiver thereof.
                    </li>
                    <li>
                      15.4 Severability. The invalidity or unenforceability of any of these Terms shall not affect the validity or enforceability of any other of these Terms, all of which shall remain
                      in full force and effect.
                    </li>
                    <li>
                      15.5 Force Majeure. We will have no responsibility or liability for any failure or delay in performance of the Site or any of the Services, or any loss or damage that you may
                      incur, due to any circumstance or event beyond our control, including without limitation any flood, extraordinary weather conditions, earthquake, or other act of God, fire, war,
                      insurrection, riot, labor dispute, accident, action of government, communications, power failure, or equipment or software malfunction.
                    </li>
                    <li>
                      15.6 Assignment. You may not assign or transfer any right to use the Site or the Services, or any of your rights or obligations under these Terms, without our express prior
                      written consent, including by operation of law or in connection with any change of control. We may assign or transfer any or all of our rights or obligations under these Terms,
                      in whole or in part, without notice or obtaining your consent or approval.
                    </li>
                    <li>
                      15.7 Governing Law. The interpretation and enforcement of these Terms, and any dispute related to these Terms, the Site or the Services, will be governed by and construed and
                      enforced under the laws of the British Virgin Islands. You agree that we may initiate a proceeding related to the enforcement or validity of our intellectual property rights in
                      any court having jurisdiction. For any other proceeding that is not subject to arbitration under these Terms, the courts located in the British Virgin Islands will have exclusive
                      jurisdiction. You waive any objection to venue in any such courts.
                    </li>
                    <li>15.8 Headings. Headings of sections are for convenience only and shall not be used to limit or construe such sections.</li>
                    <li>
                      15.9 Entire Agreement. These Terms contain the entire agreement between you and WHALE FLOW, and supersede all prior and contemporaneous understandings between the parties
                      regarding the Site and the Services.
                    </li>
                    <li>
                      15.10 Interpretation. In the event of any conflict between these Terms and any other agreement you may have with us, these Terms will control unless the other agreement
                      specifically identifies these Terms and declares that the other agreement supersedes these Terms.
                    </li>
                    <li>
                      15.11 No Third Parties. You agree that, except as otherwise expressly provided in these Terms, there shall be no third-party beneficiaries to the Terms other than the Indemnified
                      Parties.
                    </li>
                  </ol>
                </li>
              </ul>
            ) : (
              <ul className="ml-6">
                <li>
                  这些服务条款，连同任何文件和附加条款，他们明确纳入参考，其中包括任何其他条款和条件或其他协议鲸流有限公司。(“ WHALE FLOW”、“ we”、“ us”和“
                  our”)公开发表或提供给你或你所代表的公司或其他法律实体(“ you”或“ your”)(总的来说，这些“条款”或“协议”) ，由 WHALE FLOW 和你就你使用和访问 WHALE FLOW 的网站(包括 WHALE
                  FLOW)达成;网上应用程式; 流动应用程式; 以及由 WHALE FLOW
                  或其附属机构连接至的所有相关网站(统称为「网站」)及其附属机构所提供的任何资料及服务，及其后续网站或应用程式、「网站」及服务(如本文第2.1节所界定)。
                </li>
                <li>
                  通过点击这些条款的”我同意”(或类似的语言)
                  ，以其他方式确认这些条款，或以其他方式访问或使用网站或服务，你接受并同意受这些条款的约束并遵守这些条款，包括但不限于第14条中的强制性仲裁条款。如果你不同意这些条款，那么你就不能访问或使用网站或服务。在使用
                  WHALE FLOW 开发或拥有的任何软件之前，请仔细阅读第12节中的所有披露和免责声明。第12节中的信息提供了与您使用服务相关的法律义务的重要细节。
                </li>
                <li>
                  1. 对本条款的修改
                  <ol className="ml-2">
                    <li>
                      我们保留权利，在我们的自由裁量权，以修改这些条款不时。如果我们做出更改，我们将通知您，例如通过提供通知或更新这些条款顶部的“最后更新”日期。除非我们在通知中另有说明，否则所有这些修改将立即生效。在我们提供通知后，您继续使用本网站和服务将确认您接受这些修改。如果您不同意修改后的条款，那么您必须停止使用本网站和服务。
                    </li>
                  </ol>
                </li>
                <li>
                  2. 服务的使用
                  <ol className="ml-2">
                    <li>
                      2.1服务。该网站提供有关信息，以及在符合资格要求和成功完成 WHALE FLOW 的登录程序的情况下，访问由 WHALE FLOW
                      (统称为“服务”)运营的特殊目的实体公司来操作。请注意，每个产品仍然独立地受制于任何适用的产品特定协议中规定的所有条款、条件和要求，这些条款互相平行，没有被修改或以其他方式取代。例如，服务可能包括通过消息传递协议提供对产品的访问，以便与集中式或分散式应用程序交互;
                      API; 以及 WHALE FLOW
                      开发的或以其他方式拥有或提供的其他软件，以支持对产品的访问。涉及产品和/或加密货币或其他以区块链为基础的资产(统称”数字资产”)的双边交易(包括基于智能合约的去中心化交易)不属于服务的一部分，任何此类活动或交易均须自行承担风险。您承认并同意
                      WHALE FLOW
                      不提供任何类型的执行、结算或清算服务，并且不负责通过区块链自动执行、结算或清算交易。您承认，任何去中心化的区块链交易(包括涉及数字资产)的执行和结算都直接发生在以太坊区块链(或相关服务接口中可能指明的其他区块链)上，WHALE
                      FLOW 没有参与任何此类活动或交易。
                    </li>
                    <li>
                      2.2条件。作为访问或使用服务或站点的一个条件，你代表并保证 WHALE FLOW 如下:
                      <ol className="ml-1">
                        <li>
                          2.2.1如果你是以个人身份订立这些条款，那么你在你居住的司法管辖区内已达到法定年龄，你有法律行为能力签订这些条款并受其约束;
                          如果你是以商业实体身份订立这些条款，那么你必须有法律权力代表该商业实体接受这些条款，在这种情况下”你”(本段中使用的除外)指该商业实体;
                        </li>
                        <li>2.2.2您不是中国、伊朗、古巴、北朝鲜、叙利亚或乌克兰克里米亚地区或美国对其实施货物禁运或类似制裁的任何其他国家(统称”限制区”)的居民、国民或代理人;</li>
                        <li>2.2.3你不是美国政府、英国政府、欧洲联盟或联合国(统称”制裁名单上的人”)保存的任何制裁名单或同等名单的成员，你也不打算与任何受限制人员或制裁名单上的人员进行交易;</li>
                        <li>2.2.4你不会也不会使用虚拟专用网络软件或任何其他隐私或匿名工具或技术来规避或试图规避适用于服务的任何限制;以及</li>
                        <li>
                          2.2.5你使用服务不受(a)禁止，也不违反或协助你违反任何国内或外国法律,适用于或以其他方式用于管理或规范任何人、财产、交易、活动、事件或其他事项，包括任何国内或国外联邦政府颁布的任何规则、命令、判决、指令或其他要求或指导方针,对
                          WHALE FLOW 拥有管辖权的省或州、市、地方或其他政府、监管、司法或行政当局、你、场址或服务，或其他正式颁布、可依法执行的普通法或衡平法(统称“适用的法律”)
                          ;或(b)促成或便利任何非法活动。
                        </li>
                      </ol>
                    </li>
                    <li>
                      2.3作为访问或使用本服务或本网站的一个条件，您须承认、理解并同意以下事项:
                      <ol className="ml-1">
                        <li>
                          2.3.1服务可能不时因任何原因而无法进入或无法使用，包括但不限于: (a)设备故障; (b) WHALE FLOW 或其任何供应商或承包商可能不时进行的定期维修程序或修理;(c) WHALE FLOW 无法控制或
                          WHALE FLOW 无法合理预见的原因; (d)基础区块链基础设施的中断和暂时或永久无法使用; 或(e)第三方服务提供商或外部合作伙伴因任何原因无法使用;
                        </li>
                        <li>
                          2.3.2我们保留在任何违反这些条款的情况下随时禁用或修改对本网站和服务的访问的权利，包括但不限于，如果我们有理由相信你的任何陈述和保证可能是不真实或不准确的，我们不会对你因本网站或服务在任何时间或任何原因使你无法访问或与本网站或服务有关而可能遭受的任何损失或损害负责;
                        </li>
                        <li>2.3.3网站和服务可能会发生变化，这意味着 WHALE FLOW 可以在任何时候(临时或永久地)自行决定对服务进行更改、替换或终止;</li>
                        <li>2.3.4网站上提供的一般定价信息是信息性的，并不代表邀请要约或对与 WHALE FLOW 进行交易的任何建议或建议;</li>
                        <li>2.3.5 WHALE FLOW并不代理您或本网站或服务的任何其他用户;</li>
                        <li>2.3.6您完全负责使用本服务，包括所有数字资产的转让以及对数字资产的保管和控制;</li>
                        <li>
                          2.3.7在适用法律未禁止的最大限度内，本公司对您或任何其他当事人不承担任何受托责任或法律责任，而在法律或衡平法可能存在任何此类责任或法律责任的范围内，您在此不可撤销地声明不承担、放弃和取消这些责任和法律责任;
                        </li>
                        <li>2.3.8您全权负责申报和支付任何适用于您使用本服务的税款;</li>
                        <li>
                          2.3.9我们对您可能转让给或从第三方转让的任何数字资产的交付、质量、安全、合法性或任何其他方面没有控制或责任，我们也没有责任确保与您交易的商业实体完成交易或授权完成交易，如果您在使用该服务的数字资产的任何交易中遇到问题，那么您将承担全部风险。
                        </li>
                      </ol>
                    </li>
                    <li>
                      2.4作为访问或使用服务或网站的一个条件，你与 WHALE FLOW 签订下列协议:
                      <ol className="ml-1">
                        <li>2.4.1关于使用服务，你只会转让合法取得属于你的数字资产;</li>
                        <li>2.4.2关于使用服务，你必须遵守所有适用的法律，如果你的国家的法律或任何其他适用的法律禁止你这样做，你将不会使用网站或服务;</li>
                        <li>2.4.3你使用与服务有关的任何数字资产，或由你拥有，或你获有效授权使用该等数字资产进行操作;</li>
                        <li>
                          2.4.4除了遵守本条款的所有限制、禁止及其他规定外，你须确保你在网站上及在使用服务期间所提供的所有资料，在任何时候都是最新、完整及准确的;保持您的以太地址、密码、 API
                          密码、与你的服务帐户相关的私人密码匙及其他相关凭据有关的私人密码匙的安全性和保密性。
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  3. 费用及估价
                  <p>
                    就使用服务而言，你须支付与以太坊或任何其他适用的区块链交互所需的一切费用，包括交易费用，以及在使用服务时反映在网站上的任何其他费用。在相关情况下，尽管我们试图提供准确的费用信息，但这些信息反映了我们对费用的估计，这些估计可能与使用服务以及与以太坊或任何其他适用的区块链互动的实际费用不同。
                  </p>
                </li>
                <li>
                  4. 没有专业建议或受托责任
                  <p>
                    除非另有说明，否则所有与您访问和使用本网站及服务有关的信息仅供参考，不应被视为专业意见。你不应该根据网站上的任何信息或我们随时提供的任何其他信息采取或不采取任何行动，包括但不限于博客文章、文章、第三方内容的链接、DISCORD内容、新闻渠道、教程、
                    tweet 和视频。在你作出任何涉及这些服务的财务、法律或其他决定之前，你应该寻求独立的专业意见，
                  </p>
                </li>
                <li>
                  5. 禁止的活动
                  <p>
                    你不得使用本服务进行以下列出的活动类别(“禁止使用”)。下面列出的具体活动是代表性的，但不是详尽的被禁止的用途。如果您不能确定您使用的服务是否涉及禁止使用，或对这些要求如何适用于您有其他问题，请通过Services@whaleflow.co.with
                    与我们联系，您确认您不会使用该网站或服务进行以下任何一项:
                  </p>
                  <ol className="ml-2">
                    <li>5.1违反任何适用的法律，包括但不限于任何相关和适用的反洗钱和反资助恐怖主义的法律和制裁方案，例如但不限于美国财政部</li>
                    <li>
                      5.2未经权利持有人适当授权，从事涉及侵犯或违反任何版权、商标、宣传权或隐私权或适用法律规定的任何其他所有权权利的交易，包括但不限于销售、发行或获取假冒音乐、电影、软件或其他特许材料;未经
                      WHALE FLOW 明确同意或以其他方式损害 WHALE FLOW 的知识产权、名称或标识，包括使用 WHALE FLOW 的商标或服务商标;任何暗示 WHALE FLOW 的不真实认可或从属关系的行为;
                    </li>
                    <li>5.3以任何方式使用服务，可能干扰、破坏、负面影响或阻止其他用户充分享受服务，或以任何方式损害、禁用、过度负担或损害站点或服务的功能;</li>
                    <li>5.4从事违反任何有关交易市场完整性的适用法律、规则或规章的活动，包括(但不限于)通常称为欺骗和洗钱交易。</li>
                    <li>5.5规避 WHALE FLOW 在网站上使用的任何内容过滤技术、安全措施或访问控制，包括但不限于使用 VPN;</li>
                    <li>5.6使用任何机器人、爬虫或其他我们没有提供的自动化手段或接口访问服务或提取数据，或将任何恶意软件、病毒、木马、蠕虫、后门、关闭机制或其他有害方式引入网站或服务;</li>
                    <li>5.7在使用网站或服务或从事欺诈 WHALE FLOW、该服务的其他用户或任何其他人的活动时，提供虚假、不准确或误导性的信息;</li>
                    <li>5.8使用或访问网站或服务来传输或兑换数字资产，这些资产是任何犯罪或欺诈活动的直接或间接收益，包括但不限于恐怖主义或逃税;</li>
                    <li>
                      5.9使用本网站的任何方式是诽谤，诽谤，亵渎，淫秽，色情，性露骨，不雅，下流，庸俗，暗示,骚扰、跟踪、仇恨、威胁、进攻性、歧视性、偏执、辱骂、煽动性、欺骗性、欺骗性或其他令人反感或可能或意图煽动、威胁、便利、促进或鼓励仇恨、种族不容忍或针对他人的暴力行为;
                    </li>
                    <li>5.10使用网站或服务的司法管辖区，我们有权自行决定是否禁止使用网站或服务;</li>
                    <li>5.11骚扰、虐待或伤害另一个人或商业实体，包括 WHALE FLOW 的雇员和服务提供商; 冒充该服务的另一个用户或以其他方式虚假陈述自己;</li>
                    <li>5.12从事违反美国或其他相关司法管辖区任何适用法律、规则或规定的活动，包括(但不限于)美国法律施加的限制和规范要求。</li>
                    <li>5.13鼓励、引诱或协助任何第三者，或你本人企图从事本条第5款或本条款任何其他规定所禁止的任何活动。</li>
                  </ol>
                </li>
                <li>
                  6. 内容
                  <p>
                    您在此授予我们一个免版税的、完全付费的、可转让的、可转让的、永久的、不可撤销的、非排他性的、全球范围的许可，允许我们使用、复制、修改、创作衍生作品、展示、表演、发布和分发由于您使用本网站或服务(统称为“您的内容”)而可供其他用户使用的任何形式、媒介或方式的任何内容，包括但不限于促进
                    WHALE FLOW、其附属机构、服务或本网站。您代表并保证(a)您拥有您的内容或有权根据这些条款授予权利和许可;
                    以及(b)您的内容和我们对您的内容的使用，作为本许可，没有也不会侵犯、不当使用或侵犯任何第三方的权利。
                  </p>
                </li>
                <li>
                  7.专有权
                  <ol className="ml-2">
                    <li>
                      7.1 WHALE FLOW 的任何产品或服务名称、标志和其他在网站上或作为服务一部分使用的标志，包括 WHALE FLOW 的名称和标志，都是 WHALE FLOW、其附属公司或其适用的许可方所拥有的商标。未经
                      WHALE FLOW 或适用的许可方事先书面同意，您不得复制、模仿或使用这些商标，而且这些条款并不授予您对这些商标的任何权利。你不能删除，模糊，或改变任何法律通知显示在或与服务。
                    </li>
                  </ol>
                </li>
                <li>
                  8. 链接
                  <p>
                    服务提供或第三方可能提供到其他万维网或可访问的网站、应用程序或资源的链接。您承认并同意本公司不负责这些外部网站、应用程序或资源的可用性，并且不认可或不负责这些网站或资源上或可用的任何内容、广告、产品或其他材料。您进一步确认并同意，对于任何因使用或依赖在任何该等网站或资源上或通过该等网站或资源提供的任何该等内容、货物或服务而造成或声称造成的任何损害或损失，本公司不负任何直接或间接责任。
                  </p>
                </li>
                <li>
                  9修改、中止和终止
                  <p>
                    由于任何原因，包括但不限于任何原因，我们可以自行决定，不时修改、暂停或停用(全部或部分)服务，不论是否事先通知您，只允许关闭开放的 WHALE FLOW
                    基金。一旦您的访问权限终止，您使用服务的权利将立即终止。我们不会对您因任何服务的修改或因任何原因导致您使用本网站或服务的全部或部分而遭受的任何损失承担责任。这些条款的下列部分将在您访问网站或服务的任何终止中存在，无论其终止或终止的原因，以及任何其他规定，根据法律或其性质应该存在:
                    第7至15节。
                  </p>
                </li>

                <li>
                  10、承担风险
                  <ol className="ml-2">
                    <li>
                      10.1通过使用服务或以任何方式与网站交互，您表示并保证您了解与加密系统和基于区块链的网络、数字资产(包括本地数字资产(如以太坊)的使用和复杂性、基于以太坊的节点以及与基于区块链的网络交互的系统相关的固有风险。WHALE
                      FLOW 不拥有或控制区块链网络形成的任何基础软件。一般来说，区块链网络(包括以太坊网络)的软件是开源的，任何人都可以使用、复制、修改和分发它。通过使用服务，您承认并同意(a) WHALE FLOW
                      不负责服务基础软件和网络的操作; (b)该软件和网络的功能、安全性或可用性不存在任何保证;
                      (c)基础网络的操作规则会发生突然变化，例如通常称为“分叉”的规则，这可能会对服务产生重大影响。区块链网络使用公钥/私钥加密。只有你自己负责保护你的私钥。我们无权访问您的私人密钥。失去对私钥的控制将永久地、不可逆地拒绝你访问以太区块链或其他区块链网络上的数字资产。WHALE
                      FLOW
                      和其他任何个人或实体都不能检索或保护你的数字资产。如果你的私钥丢失，那么你就不能将你的数字资产转移到任何其他区块链地址或钱包。如果发生这种情况，那么你将无法从你可能持有的数字资产中实现任何价值或效用。
                    </li>
                    <li>10.2您的数字资产可能会受到一个或多个监管查询或监管行动的影响，这可能妨碍或限制 WHALE FLOW 继续提供其专有软件的能力，从而可能妨碍或限制您访问或使用服务的能力。</li>
                    <li>
                      10.3你知道并理解加密技术是一个不断发展的领域，随着密码破译或其他技术的进步，例如量子计算机的发展，可能会对数字资产和服务构成风险，并可能导致你的数字资产被盗或丢失。我们打算尽可能更新
                      WHALE flow ——开发或拥有的与服务有关的软件，以纳入其他必要的安全措施，以应对技术进步带来的风险，但这一打算不能保证或以其他方式确保服务的充分安全。
                    </li>
                    <li>
                      10.4您确认以太坊仍在发展中，因此在使用服务时，除了与数字资产及其交易有关的不确定性外，还会带来技术和安全风险。您承认在以太坊上进行交易的成本是可变的，并可能随时增加，从而影响以太坊上正在进行的任何活动，从而在使用服务时可能导致价格波动或成本增加。
                    </li>
                    <li>
                      10.5您承认服务存在缺陷，并承认由您独自负责评估服务或站点提供的任何代码。这个警告和 WHALE FLOW
                      在这些条款中提供的其他警告绝不是证据，也不代表一个持续的职责，提醒您使用服务或访问站点的所有潜在风险。
                    </li>
                    <li>
                      10.6尽管我们打算在本网站及在您使用本服务期间提供准确及及时的信息，但本网站及其他在您使用本服务时提供的信息可能并不总是完全准确、完整或最新的，还可能包括技术上的不准确或排版错误。为继续向您提供尽可能完整和准确的资料，资料可能会不时更改或更新而无须另行通知，包括但不限于有关我们政策的资料。因此，您应该在依赖它之前核实所有信息，并且所有基于站点上所包含的信息或作为服务的一部分的决定都是您的全部责任。在使用服务时，对于通过站点或其他方式分发的任何定价信息的准确性、完整性或任何特定用途的适当性，不作任何陈述。价格和定价信息可能高于或低于提供类似服务的平台的价格。
                    </li>
                    <li>
                      10.7任何与该服务的使用或互动都需要对应用密码学和计算机科学有全面的理解，以了解其固有的风险，包括上述风险。你代表并保证你拥有相关的知识和技能。在使用服务期间，任何提及本网站或其他类型的数字资产的内容，并不表示我们对数字资产所依赖的技术的认可或不认可，亦不应用作取代你对每类数字资产所特有风险的理解。
                    </li>
                    <li>
                      10.8使用服务，特别是数字资产交易和进入 WHALE FLOW
                      基金，可能带来财务风险。数字资产和分散的协议是高度实验性的，风险高，不稳定的。与服务相关的交易是不可逆转的、最终的、不会退款。您承认并同意您将自担风险访问和使用本网站和服务。使用
                      WHALE FLOW 基金进行数字资产交易的损失风险是巨大的。因此，你应该根据你的情况和财务情况仔细考虑这种交易是否适合。通过使用服务，您代表并保证您已经并将完全负责对在WHALE FLOW
                      交易的风险进行独立评估和调查。您代表您具备足够的知识、市场了解度、专业意见及经验，以评估与该服务有关的任何交易的优点及风险。你接受使用这些服务的所有后果，包括你可能无限期地失去你的数字资产的风险。所有的交易决定都是由您自己做出的。我们对您使用本服务不承担任何责任，在任何情况下也不会对您使用本服务向您负责。
                    </li>
                    <li>
                      10.9我们必须遵守适用的法律，这些法律可能会要求我们应政府机构的要求，采取某些行动或提供某些资料，这些行动或资料可能不符合你们的最大利益，而且可能会在没有通知你们的情况下发生。
                    </li>
                    <li>
                      10.10你知道这项服务仍在发展中，在使用这项服务时会产生技术、交易相关和其他风险。这些风险包括: WHALE FLOW 或服务的任何其他运营商的服务器宕机导致的交易、提款和存款延迟;
                      服务器错误时在站点上不正确地显示信息;
                      服务器错误时回到开始使用服务的交易状态。您承认这些风险可能会对使用服务的交易产生实质性影响，这可能会导致，除其他事项外，无法以您所希望的价格或完全无法完成交易。
                    </li>
                    <li>
                      10.11您承担并同意 WHALE FLOW 对本条第10款所列的风险不负任何责任或义务。您特此不可撤销地放弃、解除对 WHALE FLOW
                      及其附属公司及其各自股东、成员、董事、职员、雇员、代理人、代理人、供应商和承包商提出的与本条第10款所列任何风险有关的所有索赔要求，不论您是否知悉。
                    </li>
                  </ol>
                </li>
                <li>
                  11.赔偿
                  <p>
                    您将为 WHALE FLOW
                    及其附属公司、及其附属公司各自的股东、成员、董事、职员、经理、雇员、律师、代理人、代理人、供应商和承包商(统称为“受赔偿方”)提供辩护、赔偿和无害的保护，使其免受任何索赔、要求、诉讼、调查、责任、损害、损失、成本或费用，包括但不限于由于或与之有关的合理的律师费第(a)条使用网站或服务，或与该网站或服务有关的行为(包括但不限于该服务)
                    ;(b)与您的以太坊或其他适用的区块链地址相关的数字资产; (c)您向 WHALE FLOW 提供的任何反馈或用户内容，如果有的话，涉及该网站或服务; (d)您违反这些条款;
                    或(e)您侵犯或挪用任何其他个人或商业实体的权利。如果你有义务赔偿任何受损害的一方，WHALE FLOW (或，在它的酌处权，适用的受损害的一方)，控制任何行动或程序，并决定是否 WHALE FLOW
                    希望和解，如果是，在什么条件下，你同意与 WHALE FLOW 公司和解。
                  </p>
                </li>
                <li>
                  12披露; 免责声明
                  <p>
                    WHALE FLOW 是一个软件开发者和所有者。WHALE FLOW
                    没有运营数字资产或衍生品交易平台，也没有提供交易执行或结算服务，因此，对于使用该服务或产品的交易没有监督、参与或控制。服务用户之间的任何次级事务都是通过智能协议直接在用户的以太坊或其他适用的区块链地址之间执行的。你有责任遵守所有适用于你使用产品的法律，包括但不限于《商品交易法》和美国商品期货交易委员会(“
                    CFTC”)根据该法颁布的规定、联邦证券法和美国证券交易委员会(“ SEC”)根据该法颁布的规定，以及所有外国适用的法律。你知道 WHALE FLOW
                    没有在英属维尔京群岛金融服务委员会、商品期货交易委员会、证券交易委员会或任何金融监管机构注册或许可。WHALE FLOW
                    不拥有或控制与以太坊或其他适用的区块链相关的基础软件协议。一般来说，去中心化协议是开源的，任何人都可以使用、复制、修改和分发它们。WHALE FLOW 不负责协议的操作，WHALE FLOW
                    也不保证它们的功能、安全性或可用性。
                  </p>
                  <p>
                    在适用法律许可的最大限度内，本网站及由本公司提供的服务(及其任何内容或功能)均以「现状」及「可用」为基础提供，本公司明确声明，并在此放弃任何明示或暗示、法律、法定或其他形式的陈述、条件或保证，或由法例、法律、交易过程或贸易惯例引起的任何陈述、条件或保证，包括但不限于,可销售性、可销售性质量、质量或特定用途的适用性、标题、安全性、可用性、可靠性、准确性、安静享受和不侵犯第三方权利的默示或法律保证和条件。在不限制以上内容的情况下，我们不能保证网站或服务(包括任何相关数据)不会被中断，在任何特定时间可用，或者没有错误。此外，我们不保证网站或服务中的错误是可纠正的或将是可纠正的。
                  </p>
                  <p>
                    您承认您在本网站的资料可能因各种原因而不可挽回地遗失或损毁或暂时无法使用，并同意在适用法律所容许的最大限度内，我们不会对因拒绝服务攻击、软件故障、病毒或其他技术上有害的材料(包括可能感染您电脑设备的材料)、第三方供应商更改规约、互联网中断、不可抗力事件或其他灾难、定期或非定期维修，或其他我们可控或不可控的原因而引致的任何损失或损害承担责任。
                  </p>
                  <p>如果并在某种程度上，根据您居住的司法管辖区的适用法律不能排除或限制此类担保，则本合同所载的默示担保的免责声明可能不适用。</p>
                </li>
                <li>
                  13. 责任限制
                  <p>
                    在任何情况下，WHALE FLOW
                    的总责任(及其附属公司，包括其及其附属公司各自的股东、会员、董事、经理、职员、雇员、律师、代理人、代表、供应商或承包商)均不得因本网站及服务(及其任何内容和功能)、本服务、您的数字资产或由
                    WHALE FLOW 或代表 WHALE FLOW
                    提供的任何产品、服务或其他项目的任何表现或不表现,无论根据合同、侵权、过失、民事责任、法规、严格责任或其他责任理论，你是否超过50美元的较小数额，或在紧接引起责任索赔的事件之前的12个月期间，根据这些条款你向
                    WHALE FLOW 支付的费用(如果有的话) ，除非最终司法裁定这些损害是 WHALE FLOW 的严重过失致死、欺诈、故意不当行为或故意违反法律的结果。
                  </p>
                </li>

                <li>
                  14. 争议解决和仲裁
                  <ol className="ml-2">
                    <li>
                      14.1请仔细阅读以下部分，因为它要求你与 WHALE FLOW 仲裁某些争端和索赔，并限制你如何从 WHALE FLOW 寻求救济。同时，仲裁也排除了你在法庭上起诉或者进行陪审团审判的可能性。您和 WHALE
                      FLOW 同意，由这些条款或服务引起的或与之相关的任何争议对您和 WHALE FLOW
                      来说都是私人的，任何争议将仅通过个人诉讼得到解决，不会作为集体仲裁、集体诉讼或任何其他类型的代表性程序提出。
                    </li>
                    <li>
                      14.2根据或与这些条款有关的任何争端、争议或索赔，包括其有效性、无效性、违反或终止，应按照2012年《开曼群岛仲裁法》通过仲裁解决。应当有一名仲裁员;
                      指定机构可以基于双方协议，由当事人选定，或者在没有这种协议的情况下，法院可以指定指定机构。仲裁地点为开曼群岛，仲裁语言为英语。适用的法律为开曼群岛法律或 WHALE FLOW
                      独家决定的其他法律选择。
                    </li>
                    <li>
                      关于所有个人和实体，不论其是否为个人、商业或其他目的获得或使用该网站，所有争议、争议或索赔必须以当事人个人身份提出，而不是在任何所谓的集体诉讼、集体诉讼或其他代表性诉讼中作为原告或集体成员提出。这种放弃适用于集体仲裁，除非我们另有协议，仲裁员不得合并超过一个人的主张。你同意，通过达成协议，你和平衡者各自放弃陪审团审判的权利，或参与集体诉讼，集体诉讼，或其他任何形式的代表性诉讼。各方当事人不可撤销地、无条件地放弃。
                    </li>
                  </ol>
                  <li>14.3在适用法律允许的最大限度内，因这些条款或服务而产生或与之相关的任何索赔必须在索赔发生后一年内提出; 否则，索赔将被永久禁止，这意味着你和 WHALE FLOW 将无权提出索赔。</li>
                  <li>
                    14.4如果本条第14节的任何部分因任何原因被认定为不可执行或不合法，(a)不可执行或不合法的规定应从本条款中分离出来;
                    (b)分离不可执行或不合法的规定不应对本条第14节的其余部分或当事各方根据本条第14节强制个别仲裁任何剩余索赔的能力产生任何影响;
                    以及(c)因此，任何索赔必须在集体、合并或代表的基础上提出，这些索赔必须在具有管辖权的民事法院提起诉讼，而不是在仲裁中提起诉讼，当事各方同意，在仲裁中任何个人索赔的结果出来之前，暂停这些索赔的诉讼。此外，如果发现本条第14节的任何部分禁止寻求公共禁令救济的个人索赔，则该条款在允许通过仲裁寻求这种救济的范围内将不具有效力，本条第14节的其余部分将可强制执行。
                  </li>
                </li>
                <li>
                  15. 一般资料
                  <ol className="ml-2">
                    <li>15.1私隐政策。关于我们如何收集、使用、共享和处理您的信息，请参考我们的隐私政策。</li>
                    <li>
                      15.2电子交付同意书。您同意接收我们就本条款或任何服务提供的所有电子通讯、协议、文件、收据、通知和披露(统称为我们的「通讯」)。您同意我们可透过发布于本网站或以电邮方式向您提供与使用本服务有关的通讯(如有的话)。您应该通过打印纸质副本或保存电子副本来保存我们的通讯副本。您也可以通过
                      Services@whaleflow.co 与我们联系，询问、投诉或索赔有关服务的问题。
                    </li>
                    <li>
                      15.3 Remedies本条款中规定的任何WHALE FLOW权利或补救办法，是对本条款、适用法律、法律或衡平法中规定的任何其他权利或补救办法的补充，而不是替代。WHALE FLOW
                      在行使本条款所规定的任何权利、权力或特权时的失败或延误，不得作为对其的放弃。
                    </li>
                    <li>15.4可分性。任何这些条款的无效或不可执行不应影响任何其他这些条款的有效性或可执行性，所有这些条款应继续充分有效。</li>
                    <li>
                      15.5不可抗力。本网站或任何服务因任何我们无法控制的情况或事件，包括但不限于任何洪水、特殊天气条件、地震或其他天灾、火灾、战争、暴动、骚乱、劳资纠纷、事故、政府行为、通讯、电力故障或设备或软件故障，而导致的任何失败或延误，本网站或任何服务，或您可能遭受的任何损失或损害，本网站概不负责。
                    </li>
                    <li>
                      15.6任务。你不得转让或转让任何使用本网站或服务的权利，或你在本条款下的任何权利或义务，除非得到我们明确的事先书面同意，包括通过法律的实施或与任何控制权的变更有关。我们可以转让或转让我们在这些条款下的任何或全部权利或义务，全部或部分，无须通知或取得您的同意或批准。
                    </li>
                    <li>
                      15.7管辖法律。这些条款的解释和执行，以及与这些条款、网站或服务有关的任何争议，将受英属维尔京群岛法律的管辖、解释和执行。您同意我们可以在任何具有司法管辖权的法院启动与我们知识产权的强制执行或有效性相关的诉讼程序。对于任何其他不受这些条款规定的仲裁的程序，位于英属维尔京群岛的法院将拥有专属管辖权。你放弃对任何此类法院的审理地点的任何异议。
                    </li>
                    <li>15.8标题各节的标题仅为方便起见，不得用于限制或解释这些章节。</li>
                    <li>15.9整个协议。这些条款包含了你和 WHALE FLOW 之间的全部协议，并且取代了双方之间关于网站和服务的所有先前和同时的谅解。</li>
                    <li>15.10释义。如果这些条款与您与我们之间的任何其他协议发生冲突，这些条款将起控制作用，除非其他协议明确指出这些条款，并声明其他协议取代这些条款。</li>
                    <li>15.11无第三方。您同意，除本条款另有明文规定外，本条款不得有第三方受益人，但受损害方除外。</li>
                  </ol>
                </li>
              </ul>
            )}
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Risk warning")}</summary>
          <div className="collapse-content">
            {i18n.language === "en" ? (
              <p>
                Disclaimers: Neither this web page, nor any related discussions, nor any portion hereof or thereof, constitutes any offer to sell, or any solicitation of an offer to buy, any
                securities, including but not limited to Tokens. Neither this web page, nor any related discussions, nor any portion hereof or thereof, constitutes any representation, warranty or
                covenant on the part of WHALE FLOW Inc. or any other person. This web page contains, and officers, agents or representatives of WHALE FLOW Inc. may from time to time make,
                "forward-looking statements". Forward-looking statements are neither historical facts nor assurances of future performance. Instead, they are based only on current beliefs,
                expectations and assumptions. Because forward-looking statements relate to the future, they are subject to inherent uncertainties, risks and changes in circumstances that are difficult
                to predict and many of which are outside of the control of WHALE FLOW Inc., and its officers, agents and representatives. Actual results and financial condition may differ materially
                from those indicated in the forward-looking statements. Therefore, you should not rely on any of these forward-looking statements. Acquiring Tokens is speculative and involves
                substantial risks. There can be no assurances that a Token holder will not incur losses, including total loss of their investment in Tokens.
              </p>
            ) : (
              <p>
                免责声明: 本页面，或任何相关讨论，或其中任何部分，均不构成任何要约邀请，或任何要约收购，任何证券，包括但不限于凭证。本页面，或任何相关讨论，或其中任何部分，均不构成 WHALE FLOW 公司
                或任何其他人的任何陈述、保证或契约。本页面包含，WHALE
                FLOW的职员、代理人或代表可能不时作出“前瞻性声明”。前瞻性声明既不是历史事实，也不是未来业绩的保证。相反，它们仅仅基于当前的信念、期望和假设。由于前瞻性声明涉及未来，它们受到难以预测的内在不确定性、风险和环境变化的影响，其中许多不在
                WHALE FLOW
                公司及其职员、代理人和代表的控制范围之内。实际结果和财务状况可能与前瞻性报表中所指出的有重大差异。因此，你不应该依赖任何这些前瞻性的报表。购买凭证是一种投机行为，涉及大量风险。不能保证凭证持有者不会蒙受损失，包括他们在凭证上的投资的全部损失。
              </p>
            )}
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Disclaimer")}</summary>
          <div className="collapse-content">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("Terms of Service")}:</h2>
            <p className="mb-4">{t("Last Updated: July. 2024")}</p>

            {i18n.language === "en" ? (
              <div>
                <p>
                  The information contained herein is for general information purposes only. Under no circumstances shall any material on this website be used or construed as an offer to sell or an
                  offer to buy any securities, futures or other financial products or instruments, including any interest in any investment fund sponsored or managed by Whaleflow or any investment
                  advisory services provided by any of its affiliates or investment management companies or its affiliates. Any such offer or solicitation may be made only through the applicable
                  confidential Offer Memorandum or other applicable document of each such investment Fund and is limited to the jurisdictions in which such offer is lawful and to individuals who meet
                  the suitability of the investor, and the complexity requirements are at Whaleflow's sole discretion from time to time.
                </p>
                <p>
                  This website is also not intended to provide any investment, financial, legal, regulatory, accounting, tax or similar advice, and nothing on this website should be construed as a
                  recommendation by the Investment Manager, its affiliates or any third party to acquire or dispose of any investment or securities, or to participate in any investment strategy or
                  transaction. You should consult your own investment, legal, tax and/or similar professionals regarding your specific situation and any specific decisions.
                </p>

                <h3 className="text-black text-base my-2">Investment strategy</h3>
                <p>
                  This article describes the various equity approaches offered by Whaleflow, in which the investment manager acts as an investment advisor, and the objective characteristics of the
                  fund's strategy and investments are based on current expectations and should not be considered definitive or a guarantee that the approach, strategy and portfolio will in fact have
                  those characteristics. In addition, the description of risk management strategies herein is based on current expectations and should not be considered definitive or a guarantee that
                  such strategies will reduce all risks. These descriptions are based on information available as of the date this document was written, and descriptions may change over time. The past
                  performance of these strategies is not necessarily indicative of future results. There is the possibility of loss, and all investments involve risk, including the loss of principal.
                </p>

                <h3 className="text-black text-base my-2">Performance result</h3>
                <p>
                  We do not guarantee or predict similar results for any future investments. The Investment Manager makes no suggestion, guarantee, promise, suggestion or guarantee that by
                  participating in any of the Investment Manager's investments or investing with the Investment Manager, you will experience similar investment results and earn any money.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  本文包含的信息仅供一般参考之用。在任何情况下，本网站上的任何材料均不得被使用或视为购买任何证券、期货或其他金融产品或工具的要约出售或购买要约，包括Whaleflow赞助或管理的任何投资基金的任何权益或其任何附属公司或投资管理公司或其附属公司提供的任何投资咨询服务。任何此类要约或招揽只能通过每个此类投资基金的适用保密要约备忘录或其他适用文件进行，且仅限于此类要约合法的司法管辖区，且仅限于符合投资者适宜性的个人，并且复杂性要求由Whaleflow不时全权酌情决定。
                </p>
                <p>
                  本网站也不旨在提供任何投资、财务、法律、监管、会计、税务或类似建议，本网站上的任何内容均不应被解释为投资经理、其附属公司或任何第三方收购的建议或处置任何投资或证券，或参与任何投资策略或交易。您应该就您的具体情况和任何具体决定咨询您自己的投资、法律、税务和/或类似专业人士。
                </p>
                <h3 className="text-black text-base my-2">投资策略</h3>
                <p>
                  本文描述了Whaleflow提供的各类权益的方法，其中投资经理担任投资顾问，以及基金策略和投资的目标特征基于当前的预期，不应被视为确定的或保证方法、策略和投资组合实际上将具有这些特征。此外，本文对风险管理策略的描述基于当前的预期，不应被视为确定的或保证此类策略将降低所有风险。这些描述基于截至本文档编写之日的可用信息，并且描述可能会随着时间的推移而发生变化。这些策略过去的表现并不一定代表未来的结果。存在损失的可能性，所有投资都涉及风险，包括本金损失。
                </p>

                <h3 className="text-black text-base my-2">绩效结果</h3>

                <p>
                  我们不保证或预测任何未来投资的类似结果。投资经理不作任何暗示、保证、承诺、建议或保证，表明通过参与投资经理的任何投资或与投资经理一起投资，您将体验到类似的投资结果并赚取任何金钱。
                </p>
              </div>
            )}
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Restricted Countries")}</summary>
          <div className="collapse-content">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("We do not open access to the following countries and regions")}:</h2>
            <p>{t("Macau, Russia, Cuba, Iran, North Korea, Syria.")}</p>
          </div>
        </details>
      </div>
    </div>
  );
};
export default Law;
