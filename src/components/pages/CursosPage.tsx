"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function CursosPage() {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState(3);
  const [data, setData] = useState<any>(null);
  const [dataImg, setDataImg] = useState<any>(null);

  useEffect(() => {
    api.getCourses(lang).then(setData).catch(() => null);
    api.getCoursesImg().then(setDataImg).catch(() => null);
  }, [lang]);

  return (
    <>
      <div
        className="flex h-136 w-full items-center justify-center bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/logicielapplab/image/upload/v1653794137/DiveEvolution/Hero/cursos_chju78.jpg')"
        }}
      >
        <div className="text-5xl text-white lg:text-7xl" data-aos="fade-down">
          <p className="text-center">{t("cursos de buceo")}</p>
        </div>
      </div>

      <p className="pt-3 text-center text-3xl font-bold">{t("Metodología")}</p>

      {data && (
        <div className="mx-auto max-w-6xl">
          <div className="mx-4 mt-6 hidden grid-cols-3 md:grid">
            {(data?.methodology?.methods ?? []).map((item: any, index: number) => (
              <div key={`${item?.title}-${index}`}>
                <div className="relative z-10 flex justify-center">
                  <div
                    className={`absolute bottom-16 pb-16 ${
                      selected === index ? "visible animate__animated animate__fadeIn animate__faster" : "invisible"
                    }`}
                    onMouseOver={() => setSelected(index)}
                    onMouseOut={() => setSelected(3)}
                  >
                    <div className="rounded-xl border bg-white/95 p-6">
                      <p className="text-center text-lg font-medium">{item?.title}</p>
                      <p>{item?.description}</p>
                      <p>{item?.question1}</p>
                      <p>{item?.work}</p>
                      <p>{item?.question2}</p>
                      <ol className="pl-9">
                        {(item?.advantages ?? []).map((advantage: string) => (
                          <li className="list-disc" key={advantage}>
                            {advantage}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <img
                    className="h-24 w-24 rounded object-cover hover:cursor-pointer"
                    src={dataImg?.methodsImg?.[index]}
                    alt=""
                    onMouseOver={() => setSelected(index)}
                    onMouseOut={() => setSelected(3)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data && (
        <div className="pt-7 md:hidden">
          {(data?.methodology?.methods ?? []).map((item: any, index: number) => (
            <div key={`${item?.title}-${index}`} className="mb-7 grid" data-aos="fade-down">
              <div className="rounded-xl border shadow-2xl shadow-blue-200 md:grid md:grid-cols-3">
                <div className="flex justify-center pt-4">
                  <img className="h-24 w-24 rounded object-cover" src={dataImg?.methodsImg?.[index]} alt="" />
                </div>
                <div className="py-4 pl-4 pr-7 md:col-span-2">
                  <p className="text-center text-lg font-medium">{item?.title}</p>
                  <p>{item?.description}</p>
                  <p>{item?.question1}</p>
                  <p>{item?.work}</p>
                  <p>{item?.question2}</p>
                  <ol className="pl-9">
                    {(item?.advantages ?? []).map((advantage: string) => (
                      <li className="list-disc" key={advantage}>
                        {advantage}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="pb-5 pt-10 text-center text-3xl font-bold">{t("Tipo de cursos")}</p>

      {data && (
        <div className="mx-auto grid max-w-5xl">
          {(data?.courseTypes ?? []).map((item: any, index: number) => (
            <div key={`${item?.ref}-${index}`} className="mb-7 grid" data-aos="fade-down">
              <div className="rounded-xl border shadow-2xl shadow-blue-200 md:grid md:grid-cols-3">
                <div className="m-4 md:m-0">
                  <img className="h-full w-full rounded object-cover" src={dataImg?.coursesImg?.[index]} alt="" />
                </div>
                <div className="py-4 pl-4 pr-7 md:col-span-2">
                  <div className="flex justify-between">
                    <p className="text-center text-lg font-medium">{item?.title}</p>
                    <p className="text-right text-lg font-bold">${item?.price}</p>
                  </div>
                  <p>{item?.description}</p>
                  <ol className="pl-9">
                    {(item?.included ?? []).map((include: string) => (
                      <li className="list-disc" key={include}>
                        {include}
                      </li>
                    ))}
                  </ol>
                  <div className="text-center md:text-right">
                    <Link href={`/cursos/${item?.ref}`} className="btn-tours">
                      {t("Ver más")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
