import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface NewsInter {
  id: number;
  sort: 0 | 1;
  name: null | string;
  title: string;
  desc: null | string;
  img_url: string;
  type: "NEWS";
  status: 1;
  video_img: "";
  video_url: "";
  created_at: string;
  updated_at: string;
  content: string;
}
const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsInter>();
  const [newslist, setNewsList] = useState<NewsInter[]>([]);
  useEffect(() => {
    axios.get("https://api.whaleflow.co/article/getDetail?id=" + id).then<any>(({ data }) => {
      setNews(data.data);
    });
    axios.get("https://api.whaleflow.co/article/getList?page=0&size=5&type=NEWS").then(({ data }) => {
      let others = data.data.filter((item: NewsInter) => item.id !== Number(id));
      setNewsList(others);
    });
  }, [id]);
  return (
    <div className="w-[92%] md:w-2/3 m-auto md:p-20 mt-14 md:mt-0 overflow-hidden pb-10" id="news-detail">
      <div className="text-black font-bold text-3xl max-w-[800px]">{news?.title}</div>
      <p className="text-threePranentTransblack my-4 flex gap-2 items-center">
        <img src="/assets/icon.png" width={42} alt="" />
        {news?.updated_at}
      </p>
      <Divider />
      <div className="flex gap-10 flex-col md:flex-row">
        <div>
          <div className="">{news?.img_url && <img src={"https://api.whaleflow.co/storage/" + news?.img_url} alt="" />}</div>
          <div dangerouslySetInnerHTML={{ __html: news?.content ?? "" }} className="inner-img"></div>
        </div>
        <Divider className="md:hidden" />
        <div>
          {newslist.map((item, index) => (
            <div className="flex flex-col gap-4 self-start" key={index}>
              <img src={item.img_url} alt="" className="rounded-box w-full md:w-60 h-56 cursor-pointer" onClick={() => navigate("/new/" + item.id + "#news-detail")} />
              <div className="text-greyblack">{item.created_at}</div>
              <div className="w-full md:w-60 cursor-pointer" onClick={() => navigate("/new/" + item.id + "#news-detail")}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewsDetails;
