// PID means Post ID. GetPID means get Post ID
export const GetPID = () => {
  return window.location.pathname
    .replace("/previewer/", "")
    .replace("viewer", "")
    .replace("//", "");
};
