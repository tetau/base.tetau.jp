(function($) {
    $(function(){

        $(window).scroll(function(){
            var y = $(this).scrollTop();
            $('#header').css('background-position', '0 ' + parseInt( -y / 3 ) + 'px');
            //$('#logo_scroll').css('top', parseInt( 40 - y / 15 ) + '%');
        });
        $(document).ready(function() {
            $('[data-fancybox]').fancybox();
        });

        // スムーズスクロール
        $('a[href^="#"]').click(function(){
            var speed = 500;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
        });
        var url = $(location).attr('href');
        if (url.indexOf("?id=") == -1) {
        }else{
            var url_sp = url.split("?id=");
            var hash   = '#' + url_sp[url_sp.length - 1];
            var tgt    = $(hash);
            var pos    = tgt.offset().top;
            $("html, body").animate({scrollTop:pos}, 500, "swing");
        }
    });
})(jQuery);
