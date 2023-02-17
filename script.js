"use strict";

$(document).ready(function () {
  // UPDATE YEAR OF FOOTER FIRST
  $("#spanYear").html(new Date().getFullYear() + " ");
  // ******************************************
  // Showing all data
  // ******************************************

  let cmpnyApi =
    "https://testingapis.softinn.pk/api/CompanyInfo/GetAllCompanies";

  let x;

  // getting APi
  $.getJSON(cmpnyApi, {
    format: "json",
  })
    .done(function (response) {
      let data = response.Values;

      let [lastElement] = data.slice(-1);
      let lastIndex = lastElement.companyId;

      $("#lastID").html(
        `<p class="lastID-color">The latest company id is <span class="last-id"> ${lastIndex}</span>. New Company ID input should be big than <span class="last-id"> ${lastIndex}</span> or write 0 as default</p>`
      );

      console.log(data);

      // displaying data
      const displayData = function () {
        $(".data-table").html(`<tr>
      <th scope="row">1</th>
      <td>Company Id</td>
      <td>${response.Values[`${x}`].companyId}</td>
      </tr>
          <tr>
            <th scope="row">2</th>
            <td>Company Name</td>
            <td>${response.Values[`${x}`].companyName}</td>
          </tr>
      
          <tr>
            <th scope="row">3</th>
            <td>Company Address</td>
            <td>${response.Values[`${x}`].companyAddress}</td>
          </tr>
      
          <tr>
            <th scope="row">4</th>
            <td>No. of Users</td>
            <td>${response.Values[`${x}`].noofUsersAllowed}</td>
          </tr>`);
      };

      // SHOW FIRT DATA
      $(".show-data").click(function () {
        x = 0;
        displayData();

        // buttons
        if (x === 0) {
          $(".move-btn").on("click", function () {
            // next button
            if ($(this).hasClass("next")) {
              if (x < data.length - 1) {
                x++;
                displayData();
                console.log(x);
              }
            }
            // previous
            else if ($(this).hasClass("previous")) {
              if (x > 0) {
                x--;
                console.log(x);
                displayData();
              }
            }
          });
        }
      });

      // NEXT BUTTON
    })
    .fail(function () {
      $(".btn").on("click", function () {
        $("#error").html("Fail To Load Data");
        setTimeout(function () {
          $("#error").fadeOut();
        }, 2000);
      });
    });

  // ******************************************
  // ADDING NEW COMPANY
  // ******************************************

  $("#companyForm").submit(function (e) {
    e.preventDefault();
    let companyID = 0;
    let companyName = $("#companyName").val();
    let companyAddress = $("#companyAddress").val();
    let noofUsersAllowed = $("#noofUsersAllowed").val();

    let data = {
      companyId: companyID,
      companyName: companyName,
      companyAddress: companyAddress,
      noofUsersAllowed: noofUsersAllowed,
    };

    $.ajax({
      type: "POST",
      url: "https://testingapis.softinn.pk/api/CompanyInfo/AddCompany",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        $.getJSON(cmpnyApi, {
          format: "json",
        }).done(function (response) {
          let data = response.Values;

          let [lastElement] = data.slice(-1);
          let lastIndex = lastElement;

          // displaying data
          $(".success-data").html(` <div class="card" style="width: 30em">
          <div class="card-body d-flex flex-column gap-3">
            <h5 class="card-title text-center">
              Company Added Successfully, Check Data
            </h5>
            <div class="card-text">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Data</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody class="data-table">
                  <tr>
                    <th scope="row">1</th>
                    <td>Company Id</td>
                    <td>${lastIndex.companyId}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Company Name</td>
                    <td>${lastIndex.companyName}</td>
                  </tr>
  
                  <tr>
                    <th scope="row">3</th>
                    <td>Company Address</td>
                    <td>${lastIndex.companyAddress}</td>
                  </tr>
  
                  <tr>
                    <th scope="row">4</th>
                    <td>No. of Users</td>
                    <td>${lastIndex.noofUsersAllowed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- **************************** -->
            <!-- BUTTONS SECTION -->
  
            <div>
              <div class="d-flex flex-column justify-content-center mt-3">
                <a class="btn btn-primary" href="add-company.html" role="button">Go Back</a>
              </div>
            </div>
          </div>
        </div>`);
        });
      },
      error: function (error) {
        alert("Error submitting data");
      },
    });
  });

  // my method to add data, not workingg????????
  // new-copmany is button
  // $("new-company").click(function () {
  //   let companyID = 0;
  //   let companyName = $("#companyName").val();
  //   let companyAddress = $("#companyAddress").val();
  //   let noofUsersAllowed = $("#noofUsersAllowed").val();

  //   let data = {
  //     companyId: companyID,
  //     companyName: companyName,
  //     companyAddress: companyAddress,
  //     noofUsersAllowed: noofUsersAllowed,
  //   };

  //   $.ajax({
  //     type: "POST",
  //     url: "https://testingapis.softinn.pk/api/CompanyInfo/AddCompany",
  //     data: JSON.stringify(data),
  //     contentType: "application/json",
  //     success: function (response) {
  //       alert("Data submitted successfully");
  //     },
  //     error: function (error) {
  //       alert("Error submitting data");
  //     },
  //   });
  // });

  // *********************************
  // deleting data
  // *********************************

  $("#delete-form").submit(function (e) {
    e.preventDefault(); // prevent the form from submitting

    let number = $("#numberInput").val();
    let apiUrl = `https://testingapis.softinn.pk/api/CompanyInfo/DeleteCompany?Companyid=${number}`;

    console.log(apiUrl);

    $.ajax({
      type: "DELETE",
      url: apiUrl,
      success: function (response) {
        console.log("Data deleted successfully!");
      },
      error: function (error) {
        console.log("Error deleting data: " + error);
      },
    });
  });

  // *********************************
  // searching data
  // *********************************

  $("#search-form").submit(function (e) {
    e.preventDefault(); // prevent the form from submitting

    let searchNum = $("#searchInput").val();
    let searchUrl = `https://testingapis.softinn.pk/api/CompanyInfo/GetSpecificCompany?Companyid=${searchNum}`;

    $.ajax({
      type: "GET",
      url: searchUrl,
      success: function (response) {
        let searchData = response.Values;
        if (
          searchData.companyId === undefined ||
          searchData.companyId === null
        ) {
          alert("No record found against this id");
          return false;
        } else {
          $("#search-id").text(`${searchData.companyId}`);
          $("#search-name").text(`${searchData.companyName}`);
          $("#search-address").text(`${searchData.companyAddress}`);
          $("#search-users").text(`${searchData.noofUsersAllowed}`);
        }
      },
      error: function (error) {
        console.log("Error getting ata: " + error);
      },
    });
  });

  $(".update-data").hide();
  let userID;
  // search company to update
  $("#update-search-form").submit(function (e) {
    e.preventDefault(); // prevent the form from submitting

    let searchNum = $("#searchInput").val();

    let searchUrl = `https://testingapis.softinn.pk/api/CompanyInfo/GetSpecificCompany?Companyid=${searchNum}`;

    $.ajax({
      type: "GET",
      url: searchUrl,
      success: function (response) {
        let searchData = response.Values;

        userID = searchData.companyId;

        if (
          searchData.companyId === undefined ||
          searchData.companyId === null ||
          searchData.companyId === 0
        ) {
          alert("No record found against this id");
          return false;
        } else {
          $(".old-update-data").html(` <div class="card" style="width: 30em">
              <div class="card-body d-flex flex-column gap-3">
                <div class="card-text">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Data</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody class="search-table">
                      <tr>
                        <th scope="row">1</th>
                        <td>Company Id</td>
                        <td id="search-id">${userID}</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Company Name</td>
                        <td id="search-name">${searchData.companyName}</td>
                      </tr>
    
                      <tr>
                        <th scope="row">3</th>
                        <td>Company Address</td>
                        <td id="search-address">${searchData.companyAddress}</td>
                      </tr>
    
                      <tr>
                        <th scope="row">4</th>
                        <td>No. of Users</td>
                        <td id="search-users">${searchData.noofUsersAllowed}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <a href="update.html">
              <button class="btn btn-warning my-3 mx-3">Go Back</button>
              </a>
            </div>`);

          $(".update-data").show(1000);
          $(".update-id").text(`${searchData.companyId}`);
        }
      },
      error: function (error) {
        console.log("Error getting ata: " + error);
      },
    });

    let upCompanyID = searchNum;
    console.log(upCompanyID);
  });

  // update the data
  $("#update-new-form").submit(function (e) {
    e.preventDefault();

    let updateId = userID;
    let newCompanyName = $("#newCompanyName").val();
    let newCompanyAddress = $("#newCompanyAddress").val();
    let newNoOfUsersAllowed = $("#newNoOfUsersAllowed").val();

    let updateData = {
      companyId: updateId,
      companyName: newCompanyName,
      companyAddress: newCompanyAddress,
      noofUsersAllowed: newNoOfUsersAllowed,
    };

    $.ajax({
      type: "POST",
      url: "https://testingapis.softinn.pk/api/CompanyInfo/UpdateCompany",
      data: JSON.stringify(updateData),
      contentType: "application/json",
      success: function (response) {
        alert("data updated succefully");
        let newData = response.Values;
        console.log(newData);
      },
      error: function (error) {
        alert(`Error submitting data`);
      },
    });
  });
});
