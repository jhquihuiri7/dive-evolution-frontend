"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

type NavbarProps = {
  routes: string[];
};

export default function Navbar({ routes }: NavbarProps) {
  const { t } = useLanguage();
  const [images, setImages] = useState<any>(null);
  const [abierto, setAbierto] = useState(false);
  const [abiertoTours, setAbiertoTours] = useState(false);

  useEffect(() => {
    api.getHeaderImg().then(setImages).catch(() => null);
  }, []);

  const icono = ["fa-solid fa-align-justify", "fa-solid fa-x"];
  const iconoTour = ["fa-solid fa-angle-down ml-1", "fa-solid fa-angle-up ml-1"];

  return (
    <div className="absolute top-0 z-50 w-full bg-gradient-to-r">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex">
          <div className="ml-3 flex items-center py-2 text-lg font-semibold uppercase text-white md:ml-7">
            <img src={images?.logo} alt="" className="h-20" />
            <p className="ml-1">Dive Evolution</p>

            <button
              className="absolute right-10 rounded border-2 bg-black px-4 py-2 hover:bg-white hover:text-black lg:hidden"
              onClick={() => setAbierto((value) => !value)}
            >
              <i className={icono[abierto ? 1 : 0]} />
            </button>
          </div>

          <div className="ml-24 hidden items-center gap-6 text-white lg:flex lg:block">
            <Link className="navbarItem" href={routes[0]}>
              {t("inicio")}
            </Link>
            <Link className="navbarItem" href={routes[1]}>
              {t("nosotros")}
            </Link>
            <button onClick={() => setAbiertoTours((value) => !value)} className="cursor-pointer font-semibold uppercase">
              {t("tours")}
              <span className="rounded-lg">
                <i className={iconoTour[abiertoTours ? 1 : 0]} />
                <div className={`absolute mt-1 rounded-lg bg-black duration-700 ${!abiertoTours ? "hidden scale-0" : ""}`}>
                  <Link className="grid px-3 py-3 text-sm text-white hover:rounded-lg hover:bg-neutral-900" href={routes[2]}>
                    San Cristobal
                  </Link>
                </div>
              </span>
            </button>
            <Link className="navbarItem" href={routes[3]}>
              {t("cursos de buceo")}
            </Link>
            <Link className="navbarItem" href={routes[4]}>
              {t("contacto")}
            </Link>
          </div>
        </div>

        {abierto && (
          <div className="z-50 grid border-b border-t bg-white lg:hidden" data-aos="fade-down">
            <Link href={routes[0]} className="cursor-pointer rounded-md py-3 text-center text-base font-semibold hover:bg-black hover:text-white">
              {t("inicio")}
            </Link>
            <Link href={routes[1]} className="cursor-pointer rounded-md py-3 text-center text-base font-semibold hover:bg-black hover:text-white">
              {t("nosotros")}
            </Link>
            <button
              className="cursor-pointer rounded-md py-3 text-center text-base font-semibold hover:bg-black hover:text-white"
              onClick={() => setAbiertoTours((value) => !value)}
            >
              {t("tours")} <i className={iconoTour[abiertoTours ? 1 : 0]} />
            </button>
            <div className={`grid bg-black text-white duration-700 ${!abiertoTours ? "hidden scale-0" : ""}`}>
              <Link
                className="cursor-pointer py-3 text-center text-base font-semibold hover:bg-white hover:text-black"
                href={routes[2]}
              >
                San Cristobal
              </Link>
            </div>
            <Link href={routes[3]} className="cursor-pointer rounded-md py-3 text-center text-base font-semibold hover:bg-black hover:text-white">
              {t("cursos de buceo")}
            </Link>
            <Link href={routes[4]} className="cursor-pointer rounded-md py-3 text-center text-base font-semibold hover:bg-black hover:text-white">
              {t("contacto")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
