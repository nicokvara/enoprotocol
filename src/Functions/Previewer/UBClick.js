//UBClick stands for Unlock Button Click 𐂂
export const UBClick = () => {
  window.location.href =
    window.location.origin +
    window.location.pathname.replace("previewer", "viewer");
};
