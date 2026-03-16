"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function NosotrosPage() {
  const { lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [dataImg, setDataImg] = useState<any>(null);

  useEffect(() => {
    api.getAbout(lang).then(setData).catch(() => null);
    api.getAboutImg().then(setDataImg).catch(() => null);
  }, [lang]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <div
        className="grid lg:grid-cols-3"
        style={{
          background: "linear-gradient(0deg, rgba(130, 247, 229, 1) 0%, rgba(0, 130, 104, 1) 77%)"
        }}
      >
        <div
          style={{
            background: "linear-gradient(0deg, rgba(130, 247, 229, 1) 0%, rgba(0, 130, 104, 1) 77%)"
          }}
        >
          <div
            className="flex h-128 w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-136"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/logicielapplab/image/upload/v1656048849/DiveEvolution/Hero/about1_yychgy.png')"
            }}
          >
            <p className="text-center text-5xl text-white lg:text-7xl" data-aos="fade-down">
              {data?.history?.question}
            </p>
          </div>
        </div>

        <div className="flex h-128 w-full items-center text-white md:h-136">
          <div className="mx-6" data-aos="fade-up">
            <p className="pb-4 pt-7 text-center text-2xl font-bold md:pt-0">{data?.history?.introduction}</p>
            <p className="text-center text-xl font-semibold">{data?.history?.brief}</p>
          </div>
        </div>

        <div className="flex h-128 w-full items-center bg-cover bg-center bg-no-repeat text-white md:h-136">
          <div className="mx-auto grid">
            <p className="pb-4 pt-7 text-center text-xl font-bold md:pt-0">{data?.history?.ask}</p>
            <p className="pb-4 pt-7 text-center text-lg font-bold md:pt-0">{data?.history?.answer}</p>
            <div className="flex justify-center">
              <a href="https://www.pssworldwide.org/es/default.aspx" target="_blank" rel="noreferrer">
                <img className="mb-12 h-36 object-cover" src={dataImg?.historyImg?.logo} alt="" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex w-full items-center bg-cover bg-center bg-no-repeat py-10 text-white md:h-136 md:py-0"
        style={{ backgroundImage: `url('${dataImg?.missionImg}')` }}
      >
        <div className="mx-8 lg:mx-20 lg:grid lg:grid-cols-3 2xl:mx-32" data-aos="fade-right">
          <div className="col-span1">
            <div className="font-semibold">
              <p className="pb-4 text-center text-2xl lg:text-4xl">{data?.mission?.title}</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <p className="text-justify text-xl lg:text-4xl">{data?.mission?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex w-full items-center bg-cover bg-center bg-no-repeat py-10 text-white md:h-136 md:py-0"
        style={{ backgroundImage: `url('${dataImg?.vissionImg}')` }}
      >
        <div className="mx-8 lg:mx-20 lg:grid lg:grid-cols-3 2xl:mx-32" data-aos="fade-down">
          <div className="col-span1">
            <div className="font-semibold">
              <p className="pb-4 text-center text-2xl lg:text-4xl">{data?.vission?.title}</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <p className="text-justify text-xl lg:text-4xl">{data?.vission?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center bg-black py-10 text-white md:h-128 md:py-0">
        <div className="mx-8 lg:mx-20 lg:grid lg:grid-cols-3 2xl:mx-32" data-aos="fade-right">
          <div className="col-span1">
            <div className="font-semibold">
              <p className="pb-4 text-center text-2xl lg:text-4xl">{data?.value?.title}</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <p className="text-justify text-xl lg:text-4xl">{data?.value?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid bg-black text-xl text-white sm:grid-cols-2 lg:grid-cols-5">
        {(dataImg?.valueImg ?? []).map((image: string, index: number) => (
          <div className="flex h-40 w-full justify-center" key={image}>
            <div
              className="flex h-20 w-20 items-end justify-center bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${image}')` }}
              data-aos="fade-down"
              data-aos-delay={index * 100}
            >
              <p className="translate-y-12 pb-5 font-semibold">{data?.value?.values?.[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
