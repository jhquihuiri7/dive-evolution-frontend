"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

type ToursPageProps = {
  island: "sc" | "sx" | "ib";
  title: string;
  backgroundImg: string;
};

export default function ToursPage({ island, title, backgroundImg }: ToursPageProps) {
  const { lang, t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [dataImg, setDataImg] = useState<any>(null);
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    api.getTours(lang, island).then(setData).catch(() => null);
    api.getToursImg().then(setDataImg).catch(() => null);
  }, [island, lang]);

  return (
    <>
      <div
        className="flex h-112 w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-136"
        style={{ backgroundImage: `url('${backgroundImg}')` }}
      >
        <div className="text-4xl text-white md:text-5xl lg:text-7xl" data-aos="fade-down">
          <p className="text-center">{t(title)}</p>
        </div>
      </div>

      {data && (
        <div className="w-full bg-gray-100">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mx-4 grid gap-3 py-4 lg:grid-flow-col">
              <button className={selectedButton === 0 ? "btn-tours-selected" : "btn-tours"} onClick={() => setSelectedButton(0)}>
                {t("Tours de esnórquel")}
              </button>
              <button className={selectedButton === 1 ? "btn-tours-selected" : "btn-tours"} onClick={() => setSelectedButton(1)}>
                {t("Tours de buceo")}
              </button>
              <button className={selectedButton === 2 ? "btn-tours-selected" : "btn-tours"} onClick={() => setSelectedButton(2)}>
                {t("Tours de tierra")}
              </button>
            </div>
          </div>

          {selectedButton === 0 && (
            <div className="mx-auto grid max-w-5xl">
              {(data?.snorkel ?? []).map((item: any, index: number) => (
                <div key={`${item?.ref}-${index}`} className="mb-7 grid" data-aos="fade-down">
                  <div className="mx-4 w-auto border shadow-xl md:mx-auto md:grid md:max-w-5xl md:grid-cols-3">
                    <div className="m-4 md:m-0">
                      <img src={dataImg?.snorkelImg?.[index]} alt="" className="h-full w-full rounded object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="py-4 pl-4 pr-7 md:col-span-2">
                      <div className="flex justify-between pb-2">
                        <p className="text-center text-lg font-medium">{item?.title}</p>
                        <p className="text-right text-lg font-bold">${item?.price}</p>
                      </div>
                      <p>{item?.description}</p>
                      <p>{t("Incluye")}:</p>
                      {(item?.included ?? []).map((included: string) => (
                        <ol className="pl-9" key={included}>
                          <li className="list-disc">{included}</li>
                        </ol>
                      ))}
                      <div className="text-center md:text-right">
                        <Link href={`/tours/${item?.ref}`} className="btn-tours">
                          {t("Ver más")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedButton === 1 && (
            <div className="mx-auto grid max-w-5xl">
              {(data?.dive ?? []).map((item: any, index: number) => (
                <div key={`${item?.ref}-${index}`} className="mb-7 grid" data-aos="fade-down">
                  <div className="mx-4 w-auto border shadow-xl md:mx-auto md:grid md:max-w-5xl md:grid-cols-3">
                    <div className="m-4 md:m-0">
                      <img src={dataImg?.diveImg?.[index]} alt="" className="h-full w-full rounded object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="py-4 pl-4 pr-7 md:col-span-2">
                      <div className="flex justify-between">
                        <p className="text-center text-lg font-medium">{item?.title}</p>
                        <p className="text-right text-lg font-bold">${item?.price}</p>
                      </div>
                      <p>{item?.description}</p>
                      <p>{t("Incluye")}:</p>
                      {(item?.included ?? []).map((included: string) => (
                        <ol className="pl-9" key={included}>
                          <li className="list-disc">{included}</li>
                        </ol>
                      ))}
                      <div className="text-center md:text-right">
                        <Link href={`/tours/${item?.ref}`} className="btn-tours">
                          {t("Ver más")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedButton === 2 && (
            <div className="mx-auto grid max-w-5xl">
              {(data?.land ?? []).map((item: any, index: number) => (
                <div key={`${item?.ref}-${index}`} className="mb-7 grid" data-aos="fade-down">
                  <div className="mx-4 w-auto border shadow-xl md:mx-auto md:grid md:max-w-5xl md:grid-cols-3">
                    <div className="m-4 md:m-0">
                      <img src={dataImg?.landImg?.[index]} alt="" className="h-full w-full rounded object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="py-4 pl-4 pr-7 md:col-span-2">
                      <div className="flex justify-between">
                        <p className="text-center text-lg font-medium">{item?.title}</p>
                        <p className="text-right text-lg font-bold">${item?.price}</p>
                      </div>
                      <p>{item?.description}</p>
                      <p>{t("Incluye")}:</p>
                      {(item?.included ?? []).map((included: string) => (
                        <ol className="pl-9" key={included}>
                          <li className="list-disc">{included}</li>
                        </ol>
                      ))}
                      <div className="text-center md:text-right">
                        <Link href={`/tours/${item?.ref}`} className="btn-tours">
                          {t("Ver más")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
