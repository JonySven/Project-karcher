$(document).ready(function () {
	
    // bottom menu
    $('.bottom-poisk .menu').click(function (e) {
        e.preventDefault()
        $('.item-li').slideToggle(300)
    });



    // Carusel photo
    $('#inner a').click(function (e) {
        if ($('.big-photo img ').attr('src') !== $(this).attr('href')) {
            $('.big-photo img ').hide().attr("src", $(this).attr('href')).fadeIn(1000);
        }
        e.preventDefault();
    })

    $('#inner a img').click(function () {
        $('#inner a img').fadeTo(500, 1).css({
            'border': "none"
        })
        $(this).fadeTo(300, 0.6).css({
            'border': "1px solid red"
        });
    })




    // звезды
    $('.stars .item').click(function(e) {
        let index = $(this).index();
        
        $('.stars .item').each(function(i) {
            if (i <= index) { 
                $(this).addClass('active');
                $(this).removeClass('default')
            } else {
                $(this).addClass('default');
                $(this).removeClass('active');
            }
        })
    })

    // scrol
    $(document).scroll(function (e) {
        if (window.innerWidth > 479 ){
            $('.header-top').css({position: 'fixed',
                                zIndex:100})
        }
        else { $('.header-top').css({position: 'static',
        zIndex:100})}
        
    })


    //  click тумблера
    $('#tag img').click(function (e) {
        $('#tag img:nth-child(1)').insertAfter($('#tag img:nth-child(2)'))
    })

    $('.bg').click( function () {
        $.ajax({
            type:"get",
            url: "https://www.cbr-xml-daily.ru/daily_json.js", 
            data: {
                id: 1,
                price: 2020,
                modeProduct: 'HIT'
            },

            success: function(respuns){
                console.log(respuns)
            
            },
            error:function(error){
                
            }
        })
    })

    $('.btn-call').click(function () {
        $.ajax({
            type: "get",
            url: "https://www.cbr-xml-daily.ru/daily_json.js",
            data: {
            id: 3,
            text:"обратный звонок"  
        },
            
            success: function (respuns) {
                console.log(respuns)
            },
            error: function (error) {
                
            }
            
        })
    }) 

});






