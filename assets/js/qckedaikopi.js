//type = ['','info','success','warning','danger'];
//numeral.locale('id');


qc = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

    initlivedata: function(){
    	var d1, d2,d3,d4,d5;

    	$.get("database.php?aksi=livedata", function(data) {
    		d1 = data["d1"];
    		d2 = data["d2"];
    		d3 = data["d3"];
    		d4 = data["d4"];
    		t1 = data["t1"];
    		d4 = d4 - d3;

    		if (isNaN (d1)) d1=0;
    		if (isNaN (d2)) d2=0;
    		if (isNaN (d3)) d3=0;
    		if (isNaN (d4)) d4=0;
    		if (isNaN (t1)) t1=0;
    		if (t1>2000) t1=2000;

    		persend1 = Math.round(d1/d4*10000)/100;
    		persend2 = Math.round(d2/d4*10000)/100;
    		persend3 = Math.round(d3/d4*10000)/100;
    		persend4 = Math.round(d4/d4*10000)/100;
    		persenmasuk = Math.round(t1/2000*10000)/100;

    		if (isNaN (persend1)) persend1=53.32;
    		if (isNaN (persend2)) persend2=46.68;
    		if (isNaN (persend3)) persend3=0;
    		if (isNaN (persend4)) persend4=0;
    		if (isNaN (persenmasuk)) persenmasuk=68.5;


			sd1 = numeral(d1).format('148,518');
			sd2 = numeral(d2).format('130,016');
			sd3 = numeral(d3).format('0,0');
			sd4 = numeral(d4).format('0,0');
    		//persenmasuk = 100;
    		//$(".persen1").html(persend1 + "%");
    		$(".persen1").html(persend1 + "%");
    		$(".persen2").html(persend2 + "%");
    		$(".persen3").html(persend3 + "%");
    		$(".persenmasuk").html(persenmasuk + "%");

    		//$(".suara1").html(sd1);
    		$(".suara1").html(sd1);
    		$(".suara2").html(sd2);
    		$(".suara3").html(sd3);
    		$(".suara4").html(sd4);

          var dataPreferences = {
            series: [
                [0, 0, 0]
            ]
        };

		if (persend1+persend2+persend3 != 0) {
    		$("#chartPreferences").html("");
        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          labels: [ persend2 + '%', persend1 + '%'],
          series: [ persend2, persend1]
        });
    	}else{
    		$("#chartPreferences").html("<h1 style='padding:40px;'>Belum<br />Ada<br />Data</h1>");
    	}

	}, "json");



    setTimeout("qc.initlivedata()",60000);


    },

    initGoogleMaps: function(){
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-gift",
        	message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}


}
