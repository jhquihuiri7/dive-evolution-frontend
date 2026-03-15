"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { api } from "@/src/lib/api";
import { useLanguage } from "@/src/hooks/useLanguage";

type ContactForm = {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
};

export default function ContactoPage() {
  const { lang, t } = useLanguage();
  const [datosContacto, setDatosContacto] = useState<any>(null);
  const [contactoImg, setContactoImg] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [socialMedia, setSocialMedia] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    nombre: "",
    email: "",
    telefono: "",
    asunto: ""
  });
  const [touched, setTouched] = useState<Record<keyof ContactForm, boolean>>({
    nombre: false,
    email: false,
    telefono: false,
    asunto: false
  });

  useEffect(() => {
    api.getContact(lang).then(setDatosContacto).catch(() => null);
    api.getContactImg().then(setContactoImg).catch(() => null);
    api.getFooter(lang).then((data) => {
      setSocialMedia(data?.social_media ?? null);
      setPhone(data?.phone ?? "");
    }).catch(() => null);
  }, [lang]);

  const errors = useMemo(() => {
    const currentErrors: Partial<Record<keyof ContactForm, string>> = {};

    if (!form.nombre.trim()) {
      currentErrors.nombre = "required";
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      currentErrors.email = "invalid";
    }

    if (!/^\d+$/.test(form.telefono) || form.telefono.length < 9) {
      currentErrors.telefono = "invalid";
    }

    if (!form.asunto.trim()) {
      currentErrors.asunto = "required";
    }

    return currentErrors;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const setField = (field: keyof ContactForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      setTouched({
        nombre: true,
        email: true,
        telefono: true,
        asunto: true
      });
      return;
    }

    try {
      setCargando(true);
      const resp = await api.sendEmail(form.telefono, form.email, form.asunto, form.nombre);
      await Swal.fire({
        icon: "success",
        text: `${resp?.success ?? "Enviado correctamente"}`
      });
      setForm({ nombre: "", email: "", telefono: "", asunto: "" });
      setTouched({ nombre: false, email: false, telefono: false, asunto: false });
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {contactoImg && (
        <div
          className="h-180 w-full bg-cover bg-center bg-no-repeat md:h-156"
          style={{ backgroundImage: `url('${contactoImg?.background}')` }}
        >
          <div className="mx-4 pt-20 md:mx-0 md:pt-0">
            <div className="mx-auto max-w-4xl px-6 pb-6 pt-6 text-5xl text-white md:pb-6 lg:text-7xl" data-aos="fade-down">
              <p className="text-center md:translate-y-36 md:text-right">{datosContacto?.title}</p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="grid h-120 md:grid-cols-2">
                <div>
                  <div className="flex h-96 w-full items-center justify-center md:h-140 md:-translate-y-20" data-aos="fade-up">
                    <img className="h-80 w-auto md:h-96" src={contactoImg?.foreground} alt="" />
                  </div>
                  <div className="mx-6 mb-8 flex md:-translate-y-28">
                    <a
                      className="w-full rounded-xl bg-white py-5 text-center text-lg font-semibold uppercase text-black hover:bg-black hover:bg-opacity-50 hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://api.whatsapp.com/send/?phone=${phone}`}
                    >
                      {datosContacto?.button}
                    </a>
                  </div>
                </div>

                <div className="flex items-center md:-translate-y-28" data-aos="fade-down">
                  <div className="grid gap-10 bg-black bg-opacity-50 py-14 pl-10 pr-6 text-lg text-white">
                    <p className="text-center text-xl">{datosContacto?.introduction}</p>
                    <p>
                      <i className="fa-solid fa-location-dot pr-4" />
                      {datosContacto?.contactInfo?.address}
                    </p>
                    <p>
                      <i className="fa-solid fa-envelope pr-4" />
                      {datosContacto?.contactInfo?.email}
                    </p>
                    <p>
                      <i className="fa-solid fa-mobile pr-4" />
                      {datosContacto?.contactInfo?.phone}
                    </p>
                    <div className="flex items-end justify-around">
                      {socialMedia?.facebook && (
                        <a
                          className="facebook fa-xl z-20 rounded-full bg-white px-1 py-1 hover:scale-105"
                          href={socialMedia.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa-brands fa-facebook" />
                        </a>
                      )}
                      {socialMedia?.instagram && (
                        <a
                          className="instagram fa-xl z-20 rounded-full bg-white px-1 py-1 hover:scale-105"
                          href={socialMedia.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa-brands fa-instagram" />
                        </a>
                      )}
                      {socialMedia?.twitter && (
                        <a
                          className="twitter fa-xl z-20 rounded-full bg-white px-1 py-1 hover:scale-105"
                          href={socialMedia.twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa-brands fa-twitter" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${contactoImg?.form}')` }}>
        <div className="mx-auto max-w-4xl py-20">
          <form onSubmit={onSubmit}>
            <div className="mx-4 grid text-white" data-aos="fade-up">
              <p className="pb-3 text-2xl font-semibold">{datosContacto?.formtitle}</p>

              <div className="mb-8 grid">
                <input
                  className="rounded-md border border-gray-300 p-2 text-black"
                  type="text"
                  value={form.nombre}
                  onBlur={() => setTouched((value) => ({ ...value, nombre: true }))}
                  onChange={(event) => setField("nombre", event.target.value)}
                  placeholder={t("Nombre")}
                />
                {touched.nombre && errors.nombre && (
                  <div className="text-right text-base font-light">
                    <span>{t("Ingrese un nombre")}</span>
                  </div>
                )}
              </div>

              <div className="mb-8 grid">
                <input
                  className="rounded-md border border-gray-300 p-2 text-black"
                  type="email"
                  value={form.email}
                  onBlur={() => setTouched((value) => ({ ...value, email: true }))}
                  onChange={(event) => setField("email", event.target.value)}
                  placeholder={t("Correo electrónico")}
                />
                {touched.email && errors.email && (
                  <div className="text-right text-base font-light">
                    <span>{t("Ingrese un correo electrónico válido")}</span>
                  </div>
                )}
              </div>

              <div className="mb-8 grid">
                <input
                  className="rounded-md border border-gray-300 p-2 text-black"
                  type="text"
                  value={form.telefono}
                  onBlur={() => setTouched((value) => ({ ...value, telefono: true }))}
                  onChange={(event) => setField("telefono", event.target.value)}
                  placeholder={t("Número teléfono")}
                />
                {touched.telefono && errors.telefono && (
                  <span className="text-right text-base font-light">{t("Ingrese un número de teléfono válido")}</span>
                )}
              </div>

              <div className="mb-8 grid">
                <textarea
                  className="rounded-md border border-gray-300 p-2 text-base text-black"
                  rows={5}
                  value={form.asunto}
                  onBlur={() => setTouched((value) => ({ ...value, asunto: true }))}
                  onChange={(event) => setField("asunto", event.target.value)}
                  placeholder={t("Asunto")}
                />
                {touched.asunto && errors.asunto && (
                  <span className="text-right text-base font-light">{t("Es necesario ingresar el asunto")}</span>
                )}
              </div>

              <div className="flex pb-3 md:justify-end md:pb-0">
                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full rounded-lg bg-white py-2 text-center text-lg font-semibold text-black hover:bg-black hover:bg-opacity-50 hover:text-white md:w-auto md:px-4"
                >
                  {cargando ? <i className="fa-solid fa-spinner animate-spin" /> : t("Enviar")}
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="pb-3 text-center text-3xl text-white lg:text-4xl">{t("Encuentranos en:")}</p>
        <div className="mx-2 flex justify-center pb-9 text-white" data-aos="fade-down">
          <iframe
            width="800"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAZaiVYZgI1rdT44_eVyJkDDe7cxymPCls&q=-0.9015997,-89.6108186"
          />
        </div>
      </div>
    </>
  );
}
