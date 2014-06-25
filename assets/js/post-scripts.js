
// Make videos responsive!
var $all_videos = $('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]');

$all_videos.each(function() {
    $(this).data('aspect_ratio', this.height / this.width)
        .removeAttr('height')
        .removeAttr('width');
});

var vid_width = $('article').width();
    $all_videos.each(function() {
        var el = $(this);
        el.width(vid_width).height(vid_width * el.data('aspect_ratio'));
    });