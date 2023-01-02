(function() {
  "use strict";
  // Animate loader off screen
  $(window).load(function() {
    $(".spinner-cover").fadeOut("slow", function() {
      $(this).remove();
    });
  });
  var owlCarousel = function() {
    $("#slider-small").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      autoplay: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      },
      navText: [
        "<i class='custom-arrow fa fa-chevron-right ' style='margin-right:10px;margin-top:-320px'></i>",
        "<i class='custom-arrow fa fa-chevron-left ' style='margin-right:65px;margin-top:-320px;'></i>"
      ]
    });
    $("#slider-small-1").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
    $("#slider-small-3").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
    $("#slider-carousel").owlCarousel({
      loop: true,
      margin: 0,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 2
        }
      },
      dots: false,
      nav: true,
      autoplay: true,
      navText: [
        "<i class='custom-arrow fa fa-chevron-right ' style='margin-right:10px;margin-top:-260px'></i>",
        "<i class='custom-arrow fa fa-chevron-left ' style='margin-right:65px;margin-top:-260px;'></i>"
      ]
    });
    $("#slideshow_big").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      items: 1,
      margin: 0,
      stagePadding: 0,
      smartSpeed: 450,
      loop: true,
      autoplay: true,
      nav: false,
      navText: [
        "<i class='custom-arrow fa fa-chevron-right ' style='margin-right:10px;margin-top:-290px'></i>",
        "<i class='custom-arrow fa fa-chevron-left ' style='margin-right:65px;margin-top:-290px;'></i>"
      ]
    });
    $("#slideshow_big2").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      items: 1,
      margin: 0,
      stagePadding: 0,
      smartSpeed: 450,
      loop: true,
      autoplay: true,
      dots: false
    });
    $(".custom-arrow").css({
      float: "right",
      color: "grey",
      border: "2px solid grey",
      padding: "10px"
    });
    $(".custom-arrow").click(function() {
      $(this).css({
        opacity: 0.4,
        color: "grey",
        transform: "translateY(-3px)"
      });
    });
    $(".custom-arrow").hover(function() {
      $(this).css({
        opacity: 0.4,
        color: "grey",
        transform: "translateY(-3px)"
      });
    });
    $(".custom-arrow").mouseleave(function() {
      $(this).css({
        opacity: "1",
        "background-color": "white",
        color: "grey",
        transform: "translateY(0px)"
      });
    });

    $("#slideshow_face").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      items: 1,
      margin: 0,
      stagePadding: 0,
      smartSpeed: 450,
      loop: true,
      autoplay: true,
      dots: false
    });
  };
  var contentWayPoint = function() {
    var i = 0;
    $(".animate-box").waypoint(
      function(direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function() {
            $("body .animate-box.item-animate").each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };
  var goToTop = function() {
    $(".js-gotop").on("click", function(event) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $("html").offset().top
        },
        500,
        "swing"
      );
      return false;
    });
    $(window).scroll(function() {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  $("#btn_features").on("click", function(event) {
    if (window.location.pathname === "/") {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $("#category_features").offset().top
        },
        500,
        "swing"
      );
      return false;
    }
  });
  var slickNav = function() {
    $("#main-menu").slicknav({
      label: "MENU",
      duration: 150,
      allowParentLinks: true,
      prependTo: "#nav"
    });
    $("#sidebar-menu").slicknav({
      label: "MENU",
      duration: 150,
      allowParentLinks: true,
      prependTo: ".menu-main-menu-container"
    });
  };
  var OffCanvas = function() {
    $(".off-canvas-toggle").on("click", function(event) {
      $("#wrapper").addClass("toggled");
      $("#off-canvas-toggle").addClass("hidden");
    });
    $(".off-canvas-close").on("click", function(event) {
      $("#wrapper").removeClass("toggled");
    });
    $(document).mouseup(function(e) {
      var offcanvas = $("#sidebar-wrapper");
      if (!offcanvas.is(e.target) && offcanvas.has(e.target).length === 0) {
        $("#wrapper").removeClass("toggled");
      }
    });
  };
  var TopSearch = function() {
    $(".top-search").on("click", function(event) {
      $(".top-search-form").slideDown();
    });
    $(document).mouseup(function(e) {
      var container = $(".top-search-form");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.slideUp();
      }
    });
  };
  var SubMenu = function() {
    $("li.menu-item-has-children").on({
      mouseenter: function() {
        $(".sub-menu:first, .children:first", this)
          .stop(true, true)
          .slideDown("fast");
      },
      mouseleave: function() {
        $(".sub-menu:first, .children:first", this)
          .stop(true, true)
          .slideUp("fast");
      }
    });
  };
  var MasonryGrid = function() {
    $(".grid").masonry({
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      percentPosition: true
    });
  };
  var theiaSticky = function() {
    $(".sidebar_right").theiaStickySidebar({
      additionalMarginTop: 30
    });
  };
  var moreAticles = function() {
    $(window).on("scroll", function() {
      var scrollHeight = $(document).height();
      var bottomHeight = $(".bottom").height() + 300;
      var scrollPosition = $(window).height() + $(window).scrollTop();
      var $more_articles = $(".single-more-articles");
      if (scrollHeight - scrollPosition < bottomHeight) {
        $more_articles.addClass("single-more-articles--visible");
      } else {
        $more_articles.removeClass("single-more-articles--visible");
      }
      $(".single-more-articles-close-button").on("click", function(event) {
        $more_articles.hide();
      });
      console.log(scrollHeight, scrollPosition, bottomHeight);
    });
  };
  $(function() {
    owlCarousel();
    contentWayPoint();
    goToTop();
    slickNav();
    OffCanvas();
    TopSearch();
    SubMenu();
    MasonryGrid();
    theiaSticky();
    moreAticles();
  });
})();

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let current_datetime = new Date();
let formatted_date =
  months[current_datetime.getMonth()] +
  " " +
  current_datetime.getDate() +
  ", " +
  current_datetime.getFullYear();
document.getElementById("todayDay").innerHTML = n;
document.getElementById("todayDate").innerHTML = formatted_date;

var weekdayNepali = new Array(7);
weekdayNepali[0] = "आइतवार";
weekdayNepali[1] = "सोमवार";
weekdayNepali[2] = "मङ्गलवार";
weekdayNepali[3] = "बुधवार";
weekdayNepali[4] = "बिहिवार";
weekdayNepali[5] = "शुक्रवार";
weekdayNepali[6] = "शनिवार";
var nepaliDay = weekdayNepali[d.getDay()];
document.getElementById("todayNepaliBar").innerHTML = nepaliDay;
var time = d.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true
});
document.getElementById("timeNepali").innerHTML = time;

$(".video-hover-effect")
  .mouseenter(function() {
    $(this).css({ opacity: "0.5", cursor: "pointer" });
  })
  .mouseleave(function() {
    $(this).css("opacity", "1");
  });

//date formatter

function dateFormatter(forexDate) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var forexMonth = forexDate.slice(5, 7) - 1;
  var forexDay = forexDate.slice(8, 10);
  var forexYear = forexDate.slice(0, 4);
  var formatedForexDate =
    month[forexMonth] + " " + forexDay + "," + " " + forexYear;
  return formatedForexDate;
}

/*search features*/
$(document).ready(function() {
  $(".myInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $(".searchTable tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
