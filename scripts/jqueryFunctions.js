/*-------------- JQUERY FUNCTIONS --------------*/
var $ = require('jquery');
/*-------------- SMOOTH SCROLL FROM CALENDAR TO LIST --------------*/
function smoothScrollDown(){
    $(function(){
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function(event) {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('header').removeClass('nav-down').addClass('nav-up');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                }
            }

            lastScrollTop = st;
        }

        $(".JSscroll").click(function(event) {
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({
                scrollTop: dest
            }, 800, 'swing');
        });
    });
}
/*-------------- END SMOOTH SCROLL FROM CAlENDAR TO LIST --------------*/

/*-------------- GOING BTN --------------*/
function goingBtn(){
    $('.JSgoing').click(function() {
        $(this).next('.JSgoingDropdownContent').stop().slideToggle(500);

        $('.JSregisterBtn').click(function() {
            //If name is added in input field:
            if($(this).siblings('.JSnameInput').val() == true || $(this).siblings('.JSnameInput').val().trim() != ''){
                $('.JSgoingDropdownContent').stop().slideUp(500);
                $(this).parent().siblings('.JSgoing').addClass('JSgoing-registered');
                $(this).parent().siblings('.JSgoing').text("You're going!"); //Feedback to user
            }
        })
    })
}
/*-------------- END GOING BTN --------------*/
/*-------------- SCROLL TO TOP --------------*/
//Click event to scroll to top
function scrollToTop(){
    $('#arrowScrollToTop').click(function() {
        $("html, body").animate({
            scrollTop : 0},800);
        return false;
    })
}
/*-------------- end SCROLL TO TOP --------------*/
/*-------------- END JQUERY FUNCTIONS --------------*/

exports.smoothScrollDown = smoothScrollDown;
exports.goingBtn = goingBtn;
exports.scrollToTop = scrollToTop;
