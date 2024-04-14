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
    <div className="w-full flex flex-col md:flex-row items-center overflow-auto text-black justify-center gap-6 flex-wrap">
      {news.map((item, index) => (
        <div className="flex flex-col gap-4 self-start" key={index}>
          <img src={item.img_url} alt="" className="rounded-box w-full md:w-80 h-56 cursor-pointer" onClick={() => navigate("/new/" + item.id)} />
          <div className="text-greyblack">{item.created_at}</div>
          <div className="w-full md:w-80 cursor-pointer" onClick={() => navigate("/new/" + item.id)}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};
export default News;
