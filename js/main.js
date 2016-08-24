var map_data_url = "data/judicialdistricts.json",
    main_data_url = "data/data.json",
    data_main,
    data,
    districts,
    windowHeight,
    containerWidth,
    isMobile,
    resizeTimer,
    drawgraphs,
    $graphic1 = $("#graphic1"),
    $graphic2 = $("#graphic2");


function graph1() {

    var margin = {
        top: 60,
        right: 15,
        bottom: 95,
        left: 70
    };

    var width = $graphic1.width() - margin.left - margin.right,
        height = Math.min(450, windowHeight - 100 - margin.top - margin.bottom);

    $graphic1.empty();

    var svg = d3.select("#graphic1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("id", "text1")
        .attr("x", 10)
        .attr("y", 20)
        .attr("fill", "#000")

    var gs = graphScroll()
        .container(d3.select('#container1'))
        .graph(d3.selectAll('#graphic1'))
        .sections(d3.selectAll('#section1 > div'))
        .on('active', function (i) {

            svg.select("#text1")
                .text("section 1 " + i)
        });
}

function graph2() {

    var margin = {
        top: 60,
        right: 15,
        bottom: 95,
        left: 70
    };

    var width = $graphic1.width() - margin.left - margin.right,
        height = Math.min(450, windowHeight - 100 - margin.top - margin.bottom);

    $graphic2.empty();

    var svg = d3.select("#graphic2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    svg.append("text")
        .attr("id", "text2")
        .attr("x", 10)
        .attr("y", 20)
        .attr("fill", "#000")

    var gs = graphScroll()
        .container(d3.select('#container2'))
        .graph(d3.selectAll('#graphic2'))
        .sections(d3.selectAll('#section2 > div'))
        .on('active', function (i) {
            svg.select("#text2")
                .text("section 2 " + i)
        });
}

$(document).ready(function () {
    //console.log("window width is " + $(window).width());
    //console.log("window inner height is " + $(window).innerHeight());
    containerWidth = $("#container1").width();
    windowHeight = $(window).innerHeight();


    if ($(window).innerWidth() < 768) {
        //console.log("I'm on mobile!");
        isMobile = true;

        var drawgraphs = function () {
            //console.log("Drawing mobile graphs");

            //some stuff
        }

    } else {
        //console.log("I'm on desktop");
        isMobile = false;

        var drawgraphs = function () {
            //console.log("Drawing desktop graphs");
            graph1();
            graph2();
        }
    }

    function resize() {
        //if the container is resized, redraw the graphs
        //don't need to redraw if the window is resized but not the container
        if ((containerWidth - $("#container1").width()) != 0) {
            containerWidth = $("#container1").width();
            //console.log($("#container1").width());

            //switch between mobile and desktop if crossing the threshold
            //otherwise, just drawgraphs
            if ($(window).innerWidth() < 768) {
                var drawgraphs = function () {
                    //some stuff
                }

                if (!isMobile) {
                    isMobile = true;
                }

            } else if ($(window).innerWidth() >= 768) {
                //console.log($("#graphic1").width());
                var drawgraphs = function () {
                    //console.log("Drawing desktop graphs");
                    graph1();
                    graph2();
                }
                if (isMobile) {
                    isMobile = false;
                }

            }
            drawgraphs();
        }
    }

    $(window).load(function () {
        //console.log("window loaded");
        if (Modernizr.svg) { // if svg is supported, draw dynamic chart
            //console.log("modernizr success")
            //d3.json(main_data_url, function (json) {
            //    data_main = json;
            drawgraphs();

            //on resize, fire resize function but only after a small delay
            //prevents it from resizing constantly while dragging the window size
            window.onresize = function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    resize();
                }, 250);
            };
            //});
        }
    });

});