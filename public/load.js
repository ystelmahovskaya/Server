
var points = [];
var chart = null
var user_id
    $(function () {
        if (window.location.hash) {
            console.log("hash", window.location.hash.substr(1))
            user_id = window.location.hash.substr(1)
        }
    $.getJSON('http://192.168.1.215:8000/Statistics/' + user_id, populateList);

    function populateList(data) {

        $.each(data,function(key, item) {
            var date= new Date(item.date);
            points.push({x:new Date(date.getFullYear(),date.getMonth(),date.getDate()),y:parseInt(item.score)});

        });
        chart.render();
    }

    $(function f () {

        console.log(points);
        chart = new CanvasJS.Chart("listOfStatistics", {
            title: {
                text: "My statistic"
            },
            axisX: {
                labelFormatter: function (e) {
                    return CanvasJS.formatDate( e.value, "DD MMM");
                },
                //labelAngle: -20
            },

            data: [
                {
                    type: "line",
                    dataPoints:points
                    // dataPoints: [
                    //     { x: new Date(2012, 00, 1), y: 450 },
                    //     { x: new Date(2012, 01, 1), y: 414 },
                    //     { x: new Date(2012, 02, 1), y: 520 },
                    //     { x: new Date(2012, 03, 1), y: 460 },
                    //     { x: new Date(2012, 04, 1), y: 450 },
                    //     { x: new Date(2012, 05, 1), y: 500 },
                    //     { x: new Date(2012, 06, 1), y: 480 },
                    //     { x: new Date(2012, 07, 1), y: 480 },
                    //     { x: new Date(2012, 08, 1), y: 410 },
                    //     { x: new Date(2012, 09, 1), y: 500 },
                    //     { x: new Date(2012, 10, 1), y: 480 },
                    //     { x: new Date(2012, 11, 1), y: 510 }
                    // ]
                }
            ]
        });
    });
});



