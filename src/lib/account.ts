export const isDev = import.meta.env.DEV;

export const getCurrentAccount = () => {
  if (!isDev) {
    const clientIdGuid = parent.Xrm.Page.data.entity.getId();
    return clientIdGuid.slice(1, -1);
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('id');
};