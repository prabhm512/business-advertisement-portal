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
  // getAds();

  // When the submit button is clicked, store all entered values in an object
  $(".submit-ad").on("click", event => {
    event.preventDefault;

    const advertisement = {
      // businessName: $(".bussinessName")
      //   .val()
      //   .trim(),
      prodName: $(".prodName")
        .val()
        .trim(),
      prodDesc: $(".prodDesc")
        .val()
        .trim(),
      marketPrice: $(".marketPrice")
        .val()
        .trim(),
      offeredPrice: $(".offeredPrice")
        .val()
        .trim(),
      prodImg: $(".prod-image").val()
    };
    // Post this object to the api route
    postAd(advertisement);
  });

  postAd = ad => {
    $.post("/api/advertisements", ad).then(getAds);
  };
});
