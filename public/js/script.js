$(document).ready(() => {
  /// api get
  getAds = () => {
    $.ajax({
      method: "GET",
      url: "/api/advertisements"
    }).then(res => {
      console.log(res);
    });
  };
  getAds();

  postAd = () => {
    $.ajax({
      method: "POST",
      url: "/admin"
    }).then();
  };
});
