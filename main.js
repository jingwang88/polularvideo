function innsertDirectoryData (configs, videoList) {
    var html = '';
    configs.forEach(function (config, index) {
        html = '';
        html += '<li class="list-item clearfix"><div class="description-img"><img src="' + config.img + '" class="descript-img"></div><div class="description-info"><a href="' + config.url + '" target="_blank"><span class="info-name">' + config.title + '</span></a><a href="' + config.url + '" target="_blank"><span class="info-link">' + config.url + '</span></a></div></li>';
        $(videoList).append(html);
    });
}

function  loadVideo(config, column) {
    //每次刷新的class 都不同
    var listChunkClass = 'list'+(Math.floor((config.rank-1)/5) + 1);
    var html = '<div class="video-content ' + listChunkClass + '"><div class="video-info-container"><span class="video-info-type">' + config.type +'</span><h2 class="video-info-title"><a href="' + config.url + '">' + config.title + '</a></h2><p class="video-info-description">' + config.description +'</p></div>'+
                '<div class="video-img-container"><a href="' + config.url +'"><div class="video-img"><img src="' + config.pictrue + '" class="cover-img" /><img src="./img/play.png" class="play-btn" /></div><div class="cover-shadow"></div></a></div></div>';
    $(column).append(html);
}


$(function () {
    // 一次性载入多个展示盒子
    function refreshVideoList (videoConfigList) {
        var listChunkClass = 'list'+(Math.floor((videoConfigList[0].rank-1)/5) + 1);
        if (windowWidth > 1157) {
            videoConfigList.forEach(function (config) {
                loadVideo(config, $('.video-column')[startColumnNum]);
                startColumnNum = startColumnNum >= 2 ? 0 : (startColumnNum+1);
            });
        } else if (windowWidth > 615) {
            videoConfigList.forEach(function (config) {
                loadVideo(config, $('.video-column')[startColumnNum]);
                startColumnNum = startColumnNum >= 1 ? 0 : (startColumnNum+1);
            })
        } else {
            videoConfigList.forEach(function (config) {
                loadVideo(config, $('.video-column')[0]);
            })
        }
        $('.video-content.'+listChunkClass).hide();
        $('.video-content.'+listChunkClass).fadeIn(3000);
    }

    // 初始化页面数据
    $.each($('.video-list'), function (index, ele) {
        console.log(ele);
        innsertDirectoryData(directoryConfigs[index], ele);
    });

    var windowWidth =$('body').width();
    var startColumnNum = 0;
    var refreshNum = 1;
    refreshVideoList (videoConfigList);
    $(document).bind('scroll', function (event) {
        var clientHeight = document.documentElement.scrollHeight;
        var scrollHeight = document.documentElement.clientHeight + window.scrollY;
        if (clientHeight === scrollHeight) {
            $('.load-notice').css('display', 'block');
            $.ajax({
                type: "GET",
                url: "www.baidu.com",
                data: {refreshNum: ++refreshNum},
                dataType: "json",
                beforeSend: function (xhr) {
                    console.log("before send");
                },
                success: function (data, textStauts) {
                    console.log("success");
                    refreshVideoList(data);
                    $('.load-notice').css('display', 'none');
                },
                error: function (xhr, textStauts, error) {
/*                    throw throwError;
*/                  console.log("error");
                    refreshNum--;
                    $('.load-notice').css('display', 'none');
                },
                complete: function () {
                    console.log('complete');
                }
            });
        }
    });

    


    // 动画
    $('.video-img-container').hover(function() {
        $(this).children('a').children('.cover-shadow').show();
    }, function () {
        $(this).children('a').children('.cover-shadow').hide();
    });
});