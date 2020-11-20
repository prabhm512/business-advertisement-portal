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
  // get the adds that are currently in the db
  getAds();

  getBusinesses = () => {
    $.ajax({
      method: "GET",
      url: "/api/businesses"
    }).then(res => {
      console.log(res);
    });
  };

  getBusinesses();

  // When the submit button is clicked, store all entered values in an object
  $(".submit-ad").on("click", event => {
    event.preventDefault;
    const business = {
      bussName: $(".bussinessName")
        .val()
        .trim(),
      bussCategory: $(".bussinessCategory")
        .val()
        .trim(),
      bussEmail: $(".bussinessEmail")
        .val()
        .trim()
    };
    const advertisement = {
      prodName: $(".prodName")
        .val()
        .trim(),
      prodDesc: $(".prodDesc")
        .val()
        .trim(),
      originalPrice: $(".originalPrice")
        .val()
        .trim(),
      discount: $(".discount")
        .val()
        .trim(),
      prodImg: $(".prod-image").val(),
      bussEmail: $(".bussinessEmail")
        .val()
        .trim()
    };
    // Post the business object to /api/businesses then post the advertisement object to /api/advertisements
    // postBusiness(business);
    $.post("/api/businesses", business).then(() => {
      getBusinesses();
      postAd(advertisement);
    });
  });

  // postBusiness = bus => {
  // };
  postAd = ad => {
    $.post("/api/advertisements", ad).then(getAds);
  };
});
