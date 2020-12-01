$(document).ready(() => {
  $("#categorySelect").change(function() {
    getAdsByCategory($(this).val());
  });

  getAdsByCategory = category => {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + category;
    }
    $.ajax({
      method: "GET",
      url: categoryString
    }).then(() => {
      const url = document.location;
      document.location = url + "category/" + category;
    });
  };

  getAds = () => {
    $.ajax({
      method: "GET",
      url: "/api/advertisements"
    }).then(res => {
      console.log(res);
    });
  };

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

  // Contact page enquiry
  $(".submit-enquiry").on("click", () => {
    const phoneNo = $("#contact-phoneNo")
      .val()
      .trim();
    const compName = $("#contact-compName")
      .val()
      .trim();
    const enquiry = $("#contact-enquiry")
      .val()
      .trim();
    document.location.href =
      "mailto:aman.kmr4@yahoo.com?subject=BAP Enquiry" +
      "&body=" +
      "Company Name:" +
      encodeURIComponent(compName) +
      "%0d" +
      "Phone No:" +
      encodeURIComponent(phoneNo) +
      "%0d" +
      "%0d" +
      encodeURIComponent(enquiry);
  });

  // When the submit button is clicked, store all entered values in an object
  // eslint-disable-next-line no-unused-vars
  $(".submit-ad").on("click", event => {
    console.log($("#user_uploads").val());
    // event.preventDefault();
    // $.post("/api/images")

    // check if email address is valid and that it is not left null
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        $(".businessEmail")
          .val()
          .trim()
      )
    ) {
      $(".businessName")
        .val()
        .trim() !== "" &&
        $("#businessCategory")
          .val()
          .trim() &&
        $(".prodName")
          .val()
          .trim() !== "" &&
        $(".prodDesc")
          .val()
          .trim() !== "" &&
        $(".webLink")
          .val()
          .trim() &&
        $(".originalPrice")
          .val()
          .trim() !== "" &&
        $(".discount")
          .val()
          .trim() !== "" &&
        $("#user_uploads")
          .val()
          .trim() !== "";
      // Thank you modal call
      $("#myModal").modal();
      // Changes background colour of email input box back to white.
      // A user may input an incorrect email first, making the box turn red. It should turn white after a successful entry.
      $(".prod-image").css("background-color", "white");
      const business = {
        bussName: $(".businessName")
          .val()
          .trim(),
        bussCategory: $("#businessCategory")
          .val()
          .trim(),
        bussEmail: $(".businessEmail")
          .val()
          .trim()
      };
      // value of field in C://fakepath/imgName. Just need the imgName part.
      // const relativeImgName = $(".prod-image")
      //   .val()
      //   .trim()
      //   .substr(12);
      //removing the http before saving on db
      let newWebLink = $(".webLink")
        .val()
        .trim();
      newWebLink = newWebLink.replace("https://", "");
      // console.log(relativeImgName);

      const advertisement = {
        prodName: $(".prodName")
          .val()
          .trim(),
        prodDesc: $(".prodDesc")
          .val()
          .trim(),
        webLink: newWebLink,
        originalPrice: $(".originalPrice")
          .val()
          .trim(),
        discount: $(".discount")
          .val()
          .trim(),
        // prodImg: $(".prod-image").val(),
        bussEmail: $(".businessEmail")
          .val()
          .trim(),
        imgSingleFileUploadURL: $("#user_uploads").val()
        // active: false
      };
      // Post the business object to /api/businesses then post the advertisement object to /api/advertisements
      // postBusiness(business);
      $.post("/api/businesses", business, () => {
        getBusinesses();

        postAd(advertisement);

        // Empty input after post has been made
        $(".businessName").val("");
        $(".businessCategory").val("");
        $(".businessEmail").val("");
        $(".prodName").val("");
        $(".prodDesc").val("");
        $(".webLink").val("");
        $(".originalPrice").val("");
        $(".discount").val("");
        $(".prod-image").val("");
      });
    }

    if (
      $("#user_uploads")
        .val()
        .trim() === ""
    ) {
      // Changes border colour of image selection box to red if empty
      $(".prod-image").css("background-color", "red");
      $("#user_uploads").css("border-color", "red");
    }
  });

  postAd = ad => {
    $.post("/api/advertisements", ad, () => {
      getAds();
      // Thank you modal call
      $("#myModal").modal();
    });
  };

  // Delete the advertisement if it is rejected
  $(".reject").on("click", event => {
    // Reconfirm if admin really wants to delete the advertisement.
    const recheck = confirm(
      "Are you sure that you want to delete this advertisement!?"
    );

    const id = event.target.id;
    if (recheck) {
      $.ajax("/api/advertisements/" + id, {
        type: "DELETE"
      })
        .then(() => location.reload())
        .then(() => getAds());
    }
  });

  // Update the status of the advertisement on clicking the approve button
  $(".approve").on("click", event => {
    // store id of approve button that is clicked
    const id = event.target.id;

    const newState = {
      active: true
    };
    // Change status of the approved product from 'pending' to 'active' or vice versa
    $.ajax("/api/advertisements/" + id, {
      type: "PUT",
      data: newState
    }).then(() => location.reload());
  });

  // Archive active advertisement on 'archive' button click
  $(".archive").on("click", event => {
    const id = event.target.id;
    // console.log(id);
    const newState = {
      active: false,
      archive: true
    };

    $.ajax("/api/archives/" + id, {
      type: "PUT",
      data: newState
    }).then(() => location.reload());
  });

  // Put advertisement in the active state again
  $(".re-advertise").on("click", event => {
    const id = event.target.id;

    const newState = {
      active: true,
      archive: false
    };
    // Change status of the approved product from 'pending' to 'active' or vice versa
    $.ajax("/api/archives/" + id, {
      type: "PUT",
      data: newState
    }).then(() => location.reload());
  });

  // const imagesPreview = function(input, placeToInsertImagePreview) {
  //   if (input.files) {
  //     const filesAmount = input.files.length;
  //     for (i = 0; i < filesAmount; i++) {
  //       const reader = new FileReader();
  //       reader.onload = function(event) {
  //         $($.parseHTML("<img>"))
  //           .attr("src", event.target.result)
  //           .appendTo(placeToInsertImagePreview);
  //       };
  //       reader.readAsDataURL(input.files[i]);
  //     }
  //   }
  // };
  // $("#input-files").on("change", function() {
  //   imagesPreview(this, "div.preview-images");
  // });
});

(function() {
  "use strict";
  window.addEventListener(
    "load",
    () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      // eslint-disable-next-line no-unused-vars
      const validation = Array.prototype.filter.call(forms, form => {
        form.addEventListener(
          "submit",
          event => {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

$(() => {
  // eslint-disable-next-line quotes
  $('[data-toggle="tooltip"]').tooltip();
});

$(".carousel").carousel({
  interval: 2000
});
