import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
}
const News = () => {
  const navigate = useNavigate();
  const [news, setNewsList] = useState<NewsInter[]>([]);
  useEffect(() => {
    axios.get("https://api.whaleflow.co/article/getList?page=0&size=10&type=NEWS").then(({ data }) => {
      setNewsList(data.data);
    });
  }, []);
  return (
    // <div className="w-full flex flex-col md:flex-row items-center overflow-auto text-black justify-center gap-16 flex-wrap">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 ">
      {news.map((item, index) => (
        <div className="w-full flex flex-col gap-1 self-start " key={index}>
          <img src={item.img_url} alt="" className="rounded-box w-full md:w-80 h-56 cursor-pointer" onClick={() => navigate("/new/" + item.id + "#news-detail")} />
          <div className="text-greyblack">{item.created_at}</div>
          <span className="w-full cursor-pointer text-black line-clamp-2 overflow-hidden" onClick={() => navigate("/new/" + item.id + "#news-detail")}>
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};
export default News;
