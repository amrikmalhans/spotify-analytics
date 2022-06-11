import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const Me: NextPage = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [popularity, setPopularity] = useState<number>(0);
  const router = useRouter();
  const code = router.query.code;

  const fetchArtists = async () => {
    const { data } = await axios.get("http://localhost:8000/top/artists", {
      withCredentials: true,
    });
    setArtists(data.items);
    const popularity: any = [];

    data.items.forEach((item: any) => {
      popularity.push(item.popularity);
    });

    setPopularity(
      popularity.reduce((a: number, b: number) => a + b, 0) / popularity.length
    );
  };
  useEffect(() => {
    (async () => {
      if (code) {
        await axios.get(`http://localhost:8000/token?code=${code}`, {
          withCredentials: true,
        });
      }
    })();
    router.replace("/me", undefined, { shallow: true });
  }, [code, router]);

  useEffect(() => {
    fetchArtists();
  }, [artists]);

  return (
    <div>
      <div className="btn-div">
        {artists.length === 0 ? (
          <button>Loding your data...</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Your music popularity score:</p>
            <h1 className="score">{popularity}</h1>
          </div>
        )}
      </div>
      <div className="graph-div">
        {artists.length > 0 ? (
          <BarChart width={500} height={300} data={artists}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="popularity" fill="#8884d8" />
          </BarChart>
        ) : (
          ""
        )}
      </div>
      <div className="grid-div">
        {artists.length > 0 &&
          artists.map((artist) => {
            return (
              <div className="grid-div-item" key={artist.id}>
                <Image
                  height="150px"
                  width="150px"
                  style={{ borderRadius: "100px" }}
                  loader={() => artist.images[0].url}
                  src={artist.images[0].url}
                  alt={artist.name}
                />
                <h4>
                  {artist.name}: {artist.popularity}
                </h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Me;
