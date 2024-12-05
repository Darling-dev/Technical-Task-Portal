export const setCookie = (
  name: string,
  value: string,
  maxAgeInSeconds: number
) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeInSeconds};`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0;`;
};
