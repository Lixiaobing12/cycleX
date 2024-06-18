import { useTranslation } from "react-i18next";
import { useWindowSize } from "usehooks-ts";

const BlindBox = () => {
    const { t } = useTranslation();
    const size = useWindowSize()
    return <div>
        <div className="bg-blindboxbg gap-4 py-10 flex-center-col">
            <img src="/assets/WonWFC.png" alt="" width={350} className="max-w-[80vw]" />
            <img src="/assets/box-shine.png" width={300} alt="" />
        </div>
    </div>
}

export default BlindBox