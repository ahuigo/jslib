export function setSearchParam(
  params: Record<string, string>={},
  oriurl: undefined | string = undefined
) {
  // @ts-ignore
  const urlInfo = (oriurl instanceof URL) ?
    oriurl :
    new URL(oriurl || window.location.href);
  let searchParams = new window.URLSearchParams(urlInfo.search);
  Object.entries(params).forEach(([key,value])=>{
      if (value === undefined || value === null) {
          searchParams.delete(key);
      } else {
          searchParams.set(key, value);
      }
  })

  urlInfo.search = searchParams.toString();
  const url = urlInfo.toString();
  return url
}
