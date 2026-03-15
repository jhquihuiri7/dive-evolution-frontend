const BASE_URL = "https://diveevolutiongpsbackend.uc.r.appspot.com";
const MAIL_BASE_URL = "https://mailservicebackend.uc.r.appspot.com/api/standardMail";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export const api = {
  getHeaderImg: () => getJson<any>(`${BASE_URL}/api/getHeaderImg`),
  getFooter: (lang: string) => getJson<any>(`${BASE_URL}/api/getFooter/${lang}`),
  getFooterImg: () => getJson<any>(`${BASE_URL}/api/getFooterImg`),

  getIndex: (lang: string) => getJson<any>(`${BASE_URL}/api/getIndex/${lang}`),
  getIndexImg: () => getJson<any>(`${BASE_URL}/api/getIndexImg`),

  getAbout: (lang: string) => getJson<any>(`${BASE_URL}/api/getAbout/${lang}`),
  getAboutImg: () => getJson<any>(`${BASE_URL}/api/getAboutImg`),

  getCourses: (lang: string) => getJson<any>(`${BASE_URL}/api/getCourses/${lang}`),
  getCoursesImg: () => getJson<any>(`${BASE_URL}/api/getCoursesImg`),
  getCourseInfo: (lang: string, id: string) => getJson<any>(`${BASE_URL}/api/getCourseInfo/${lang}/${id}`),
  getCourseInfoImg: (id: string) => getJson<any>(`${BASE_URL}/api/getCourseInfoImg/${id}`),

  getContact: (lang: string) => getJson<any>(`${BASE_URL}/api/getContact/${lang}`),
  getContactImg: () => getJson<any>(`${BASE_URL}/api/getContactImg`),

  getTours: (lang: string, island: "sc" | "sx" | "ib") =>
    getJson<any>(`${BASE_URL}/api/getTours/${lang}/${island}`),
  getToursImg: () => getJson<any>(`${BASE_URL}/api/getToursImg`),
  getTourInfo: (lang: string, id: string) => getJson<any>(`${BASE_URL}/api/getToursInfo/${lang}/${id}`),
  getTourInfoImg: (id: string) => getJson<any>(`${BASE_URL}/api/getToursInfoImg/${id}`),

  sendEmail: async (phone: string, email: string, message: string, name: string) => {
    const response = await fetch(MAIL_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        email,
        message,
        name,
        clientName: "Jhonatan Quihuiri"
      })
    });
    if (!response.ok) {
      throw new Error(`Mail request failed: ${response.status}`);
    }
    return response.json();
  }
};
