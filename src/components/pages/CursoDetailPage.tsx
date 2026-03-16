"use client";

import { CSSProperties, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function CursoDetailPage() {
  const params = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [dataImg, setDataImg] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;
    api.getCourseInfo(lang, params.id).then(setData).catch(() => null);
    api.getCourseInfoImg(params.id).then(setDataImg).catch(() => null);
  }, [lang, params?.id]);

  if (!data) {
    return (
      <div
        className="flex h-136 w-full items-center justify-center bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/logicielapplab/image/upload/v1653797087/DiveEvolution/Hero/lino-thaesler-3MwuQq6v7eU-unsplash_1_s58aan_qxlcuh.jpg')"
        }}
      />
    );
  }

  return (
    <>
      <div
        className="flex h-112 w-full items-center justify-center bg-cover bg-top bg-no-repeat md:h-136"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/logicielapplab/image/upload/v1653797087/DiveEvolution/Hero/lino-thaesler-3MwuQq6v7eU-unsplash_1_s58aan_qxlcuh.jpg')"
        }}
      >
        <div className="text-4xl text-white md:text-5xl lg:text-7xl" data-aos="fade-down">
          <p className="text-center">{t("Cursos")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl py-12">
        <div className="mb-6 w-full rounded-3xl border shadow-2xl shadow-blue-200">
          <div className="md:grid md:grid-cols-2">
            <div className="m-6" data-aos="fade-up">
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff"
                  } as CSSProperties
                }
                loop
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                autoplay
                modules={[Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
              >
                {(dataImg?.img ?? []).map((image: string) => (
                  <SwiperSlide key={image}>
                    <img className="h-auto w-full rounded-xl object-cover object-center" src={image} alt="" loading="lazy" decoding="async" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                loop
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Thumbs]}
                className="mySwiper"
              >
                {(dataImg?.img ?? []).map((image: string) => (
                  <SwiperSlide key={`${image}-thumb`}>
                    <img className="mt-2 h-auto w-full rounded-xl object-cover object-center" src={image} alt="" loading="lazy" decoding="async" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="h-full rounded-3xl bg-indigo-600 text-white" data-aos="fade-down">
              <div className="m-6">
                <div className="flex flex-col gap-2 pb-2 pt-4 md:flex-row md:items-start md:gap-6 md:pt-0">
                  <p className="break-words text-3xl font-medium md:text-5xl">{data?.course?.title}</p>
                  <p className="text-3xl font-semibold md:text-5xl">${data?.course?.price}</p>
                </div>
                <p className="py-4 text-lg">{data?.course?.description}</p>
                <p className="pb-3 text-lg font-bold">{t("Itinerario")}:</p>
                <div className="pb-6">
                  {(data?.itinerary ?? []).map((item: string) => (
                    <ol className="pl-4" key={item}>
                      <li className="text-lg">
                        <i className="fa-solid fa-clipboard-list pr-2" />
                        {item}
                      </li>
                    </ol>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl" data-aos="fade-down">
          <div className="w-full rounded-3xl border shadow-2xl shadow-blue-200">
            <div className="grid md:grid-cols-3">
              <div className="m-6 md:col-span-2">
                <p className="pt-4 text-lg">{data?.largeDescription}</p>
              </div>
              <div className="row-start-1 m-4 rounded-3xl bg-black text-white md:row-auto">
                <div className="m-6">
                  <p className="pb-2 text-center text-2xl font-bold">{t("Incluye")}:</p>
                  {(data?.course?.included ?? []).map((item: string) => (
                    <ol className="pl-4" key={item}>
                      <li className="text-xl">
                        <i className="fa-solid fa-circle-check pr-2" />
                        {item}
                      </li>
                    </ol>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
