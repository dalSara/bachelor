/*-------------- JQUERY FUNCTIONS --------------*/
//module.exports = function(){
    //function jqueryFunctions(){
var $ = require('jquery');
/*-------------- SMOOTH SCROLL FROM CALENDAR TO LIST --------------*/
function smoothScrollDownFunction(){
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
function goingBtnFunction(){
    $(function(){
        $('.JSgoing').click(function() {
            $(this).addClass('JSgoing-clicked');
            $(this).next('.JSgoingDropdownContent').stop().slideToggle(500);

            $('.JSregisterBtn').click(function() {
                $('.JSgoingDropdownContent').stop().slideUp(500);
                $(this).parent().siblings('.JSgoing').addClass('JSgoing-registered');
            })
        })
    });
}
/*-------------- END GOING BTN --------------*/
/*-------------- END JQUERY FUNCTIONS --------------*/
//}
//};
exports.smoothScrollDownFunction = smoothScrollDownFunction;
exports.goingBtnFunction = goingBtnFunction;
