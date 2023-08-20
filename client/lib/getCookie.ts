import Cookies from "js-cookie";

const getCookie = (name: string) => {
  return Cookies.get(name)
};

export default getCookie;
