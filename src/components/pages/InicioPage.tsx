"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function InicioPage() {
  const { lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [backGroundImg] = useState(
    "https://res.cloudinary.com/logicielapplab/image/upload/v1651954750/DiveEvolution/IndexBody/shark-g2b72e37ba_1920_gfmze3.jpg"
  );

  useEffect(() => {
    api.getIndex(lang).then(setData).catch(() => null);
    api.getIndexImg().then(setImages).catch(() => null);
  }, [lang]);

  const items = data?.body?.section2?.items ?? [];
  const quality = data?.body?.section1?.calidad ?? [];
  const price = data?.body?.section1?.precio ?? [];
  const qualityImg = images?.body_img?.section1?.calidad ?? [];
  const priceImg = images?.body_img?.section1?.precio ?? [];
  const section2Img = images?.body_img?.section2?.items ?? [];

  return (
    <>
      {backGroundImg.length > 1 && (
        <div
          className="h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${backGroundImg}')` }}
        >
          <div className="pt-32 text-center text-white" data-aos="fade-down">
            <p className="px-4 pb-24 text-3xl lg:text-7xl">{data?.body?.title}</p>
            <p className="px-4 pb-5 text-3xl lg:text-5xl">{data?.body?.subtitle}</p>
            <p className="px-4 pb-24 text-2xl lg:text-3xl">{data?.body?.little}</p>
            <Link className="btn-index" href="/nosotros">
              {data?.body?.button}
            </Link>
          </div>
        </div>
      )}

      {quality.length > 1 && price.length > 1 && (
        <div className="text-white md:grid md:grid-cols-2">
          <div
            className="flex h-96 w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat object-cover md:justify-end"
            style={{ backgroundImage: `url('${qualityImg[0]}')` }}
          >
            <div className="md:mr-8">
              <div className="z-10 max-w-xs rounded-2xl bg-indigo-600 bg-opacity-40" data-aos="fade-down">
                <div className="flex justify-center py-7">
                  <img className="h-20" src={priceImg[1]} alt="" loading="lazy" decoding="async" />
                </div>
                <p className="text-center text-2xl font-bold">{price[0]}</p>
                <p className="mx-5 pb-7 text-lg font-semibold">{price[1]}</p>
              </div>
            </div>
          </div>
          <div
            className="flex h-96 w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat object-cover md:justify-start"
            style={{ backgroundImage: `url('${priceImg[0]}')` }}
          >
            <div className="md:ml-8">
              <div className="z-10 max-w-xs rounded-2xl bg-black bg-opacity-50" data-aos="fade-down">
                <div className="flex justify-center py-7">
                  <img className="h-20" src={qualityImg[1]} alt="" loading="lazy" decoding="async" />
                </div>
                <p className="text-center text-2xl font-bold">{quality[0]}</p>
                <p className="mx-5 pb-7 text-lg font-semibold">{quality[1]}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && section2Img.length > 1 && (
        <>
          <div
            className="h-96 w-full bg-cover bg-center bg-no-repeat md:h-140"
            style={{ backgroundImage: `url('${section2Img[0]}')` }}
          >
            <div className="grid lg:grid-cols-3 md:pt-32" data-aos="fade-right">
              <div className="col-span-2 col-start-1 px-4 text-white">
                <p className="text-center text-4xl lg:text-6xl">{items[0]?.title}</p>
                <p className="mx-4 my-4 text-center text-2xl lg:text-4xl">{items[0]?.description}</p>
                <div className="pt-3 text-center">
                  <Link className="btn-index" href="/cursos" target="_blank">
                    {items[0]?.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="h-96 w-full bg-cover bg-center bg-no-repeat md:h-140"
            style={{ backgroundImage: `url('${section2Img[1]}')` }}
          >
            <div className="grid lg:grid-cols-3 md:pt-32" data-aos="fade-right">
              <div className="col-span-2 col-start-2 px-4 text-white">
                <p className="text-center text-4xl lg:text-6xl">{items[1]?.title}</p>
                <p className="mx-4 my-4 text-center text-2xl lg:text-4xl">{items[1]?.description}</p>
                <div className="pt-3 text-center">
                  <Link className="btn-index" href="/cursos/9e88e4c6-51be-446a-ab54-d09907304593" target="_blank">
                    {items[1]?.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
