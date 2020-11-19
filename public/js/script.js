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

  $.ajax({
    method: "GET",
    url: "/admin"
  }).then(res => {
    
  })
});
