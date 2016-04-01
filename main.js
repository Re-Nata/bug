// for ongoing-project-page: show and hide a block's part and organizer's phone number
window.onload = function() {
    $('body').on('click', '.show-hide', function(event) {
        openbox(event.target.id, this);
    });
    $('body').on('click', '.call', function(event) {
        div = document.getElementById(event.target.id).nextElementSibling;
        if(div.style.display == "" || div.style.display == "block") {
            $(div).hide("slow");
        }
        else {
            $(div).show("slow");
        }
    });
    $('body').on('click', 'a.upbutton', function(event) {
    event.preventDefault();
    $('div#offer').show(); });

    $('body').on('click', '#sendbug', function(event) {
        event.preventDefault();
        // send form data here
        //
        $('div#offer').hide();
        $('div#bug-add-notification').show('slow');
        setTimeout(function() {
            $('div#bug-add-notification').hide('slow');
        }, 5000);
     });


    //for carousel on ongoing page
    $('.thumbs').delegate('img','click', function() {
        $('.largeImage').attr('src',$(this).attr('src').replace('thumb','large'));
    });

    $(":file").change(function () {
        element = this;
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = (function(evt){
                $(element.previousElementSibling).attr('src', evt.target.result);
                $(element.previousElementSibling).show();
            });
            reader.readAsDataURL(this.files[0]);
        }
    });

};

function openbox(id, ShowHide) {
    var div = document.getElementById(id).previousElementSibling;
    if(div.style.display == "" || div.style.display == "block") {
        $(div).hide("slow");
        ShowHide.innerHTML = div.className;
    }
    else {
        $(div).show("slow");
        ShowHide.innerHTML = "Свернуть";
    }
}


// map for ongoing-project-page and for MAP-tab (projects page)
var map;
var map2;
var map3;

var all_markers = [{lat: 50.444109, lng:30.439992},
                   {lat: 50.445079, lng: 30.436924},
                   {lat: 50.445229, lng: 30.441565},
                   {lat: 50.448667, lng: 30.443114},
                   {lat: 50.449401, lng: 30.448221}]

var active_marker_id = 2;
var active_marker = all_markers[active_marker_id];

function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 50.443972, lng: 30.439873},
                zoom: 16
            });

           var image = {
               url:'3.3.5_custom/images/location.svg',
               scaledSize: new google.maps.Size(40,40),
           };

           var marker = new google.maps.Marker({
               position: {lat: 50.444109, lng:30.439992},
               map: map,
               icon: image
           });


    map2 = new google.maps.Map(document.getElementById('bigmap'), {
        center: active_marker,
        zoom: 17
    });

    var active_image = {
        url:'3.3.5_custom/images/location.svg',
        scaledSize: new google.maps.Size(40,40),
    };

    var inactive_image = {
        url:'3.3.5_custom/images/location2.svg',
        scaledSize: new google.maps.Size(40,40),
    };

    var marker = new google.maps.Marker({
        position: active_marker,
        map: map2,
        icon: active_image
    });

    $.each(all_markers, function(idx, mkr) {
        if (idx != active_marker_id) {
            new google.maps.Marker({
                position: mkr,
                map: map2,
                icon: inactive_image
            });
        };
    }); // .each
} // initMap

//for modal gallery on projects page
$('.fancybox').attr('rel', 'gallery');
$(".fancybox").fancybox({
    padding: 0,
    openEffect  : 'none',
    closeEffect : 'none',
    afterLoad   : function(ev) {
         unroll2 = ev.content.get()[0].getElementsByClassName('gallery')[0].getElementsByClassName('thumbs')[0];
         after = unroll2.firstElementChild.getAttribute('src');
         $('.largeImage').attr('src', after);
         this.content.html();
    }
});

//for carousel on ongoing page
$('#thumbs').delegate('img','click', function(){
    $('#largeImage').attr('src',$(this).attr('src').replace('thumb','large'));
    $('#description').html($(this).attr('alt'));
});

//for add-bug button when person is not logged-in
$(document).ready(function() {
        $('a#upbutton').click( function(event){
            event.preventDefault();
        $('#overlay').fadeIn(
            function(){
                $('#notification2')
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        });
});

$('#overlay').click( function(){
    $('#notification2')
    .animate({opacity: 0, top: '45%'}, 200,
    function(){
        $(this).css('display', 'none');
        $('#overlay').fadeOut(400);
    }
        );
    });
});



