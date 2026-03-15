"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

type FooterProps = {
  routes: string[];
};

export default function Footer({ routes }: FooterProps) {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const [socialMedia, setSocialMedia] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [imgData, setImgData] = useState<any>(null);

  useEffect(() => {
    api.getFooter(lang).then((data) => {
      setSocialMedia(data?.social_media ?? null);
      setPhone(data?.phone ?? "");
    }).catch(() => null);
    api.getFooterImg().then(setImgData).catch(() => null);
  }, [lang]);

  const activeTours = useMemo(() => {
    return (
      pathname.startsWith("/san-cristobal") ||
      pathname.startsWith("/santa-cruz") ||
      pathname.startsWith("/isabela") ||
      pathname.startsWith("/tours/")
    );
  }, [pathname]);

  return (
    <>
      <div>
        <a href={`https://api.whatsapp.com/send/?phone=${phone}`} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-whatsapp fa-3x whatsappColor fixed bottom-3 right-2 z-50 animate-bounce rounded-full p-2" />
        </a>
      </div>

      <div className="relative bg-[#00061A]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="absolute left-0 right-0 z-50 mx-auto flex items-center justify-center py-4 text-base font-semibold uppercase text-white md:relative md:left-0">
            {imgData?.logo && <img src={imgData.logo} alt="" className="h-20 pr-5" />}
            <div className="grid">
              <Link className="flex cursor-pointer items-center justify-between hover:scale-105" href={routes[0]}>
                <p>{t("inicio")}</p>
                {pathname === routes[0] && <img src="/assets/buzo.png" className="w-9" alt="" />}
              </Link>

              <Link className="flex cursor-pointer items-center justify-between hover:scale-105" href={routes[1]}>
                <p>{t("nosotros")}</p>
                {pathname.startsWith("/nosotros") && <img src="/assets/buzo.png" className="w-9" alt="" />}
              </Link>

              <Link className="flex cursor-pointer items-center justify-between hover:scale-105" href={routes[2]}>
                <p>{t("tours")}</p>
                {activeTours && <img src="/assets/buzo.png" className="w-9" alt="" />}
              </Link>

              <Link className="flex cursor-pointer items-center justify-between hover:scale-105" href={routes[4]}>
                <p>{t("contacto")}</p>
                {pathname.startsWith("/contacto") && <img src="/assets/buzo.png" className="w-9" alt="" />}
              </Link>
            </div>
          </div>

          <div className="absolute left-0 right-0 z-50 mx-auto flex translate-y-48 justify-center md:relative md:left-0 md:translate-y-0 md:pt-3">
            <div>
              <p className="text-center text-lg font-semibold uppercase text-white">{t("Encuentranos en nuestras redes")}</p>
              <div className="flex justify-around pt-3 md:pt-6">
                {socialMedia?.facebook && (
                  <a className="facebook fa-xl z-50 rounded-full bg-white px-1 py-1 hover:scale-105" href={socialMedia.facebook} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-facebook" />
                  </a>
                )}
                {socialMedia?.instagram && (
                  <a className="instagram fa-xl z-50 rounded-full bg-white px-1 py-1 hover:scale-105" href={socialMedia.instagram} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-instagram" />
                  </a>
                )}
                {socialMedia?.twitter && (
                  <a className="twitter fa-xl z-50 rounded-full bg-white px-1 py-1 hover:scale-105" href={socialMedia.twitter} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-twitter" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div
            className="h-96 w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/logicielapplab/image/upload/v1654662701/DiveEvolution/Hero/footer_ozw9ir.png')",
              opacity: 0.05
            }}
          />
        </div>

        <div className="mx-4 flex justify-center border-t pb-3 pt-4 text-center text-base text-white">
          <p>
            {t("Copyright © 2022 Dive Evolution. Desarrollado por")}{" "}
            <a className="font-bold" href="https://www.logicielapplab.com/" target="_blank" rel="noreferrer">
              Logiciel Applab
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
