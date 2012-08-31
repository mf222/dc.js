require("./env");

var vows = require('vows');
var assert = require('assert');

var suite = vows.describe('Bubble overlay chart');


suite.addBatch({
    'creation': {
        topic: function() {
            var id = "bubble-overlay";
            var div = d3.select("body").append("div").attr("id", id);
            var svg = div.append("svg");
            var chart = dc.bubbleOverlay("#" + id)
                .svg(svg)
                .dimension(stateDimension)
                .group(stateValueSumGroup)
                .r(d3.scale.linear().domain([0, 3]))
                .point("California", 100, 120)
                .point("Colorado", 300, 120)
                .point("Delaware", 500, 220)
                .point("Ontario", 180, 90)
                .point("Mississippi", 120, 220)
                .point("Oklahoma", 200, 350);
            chart.render();
            return chart;
        },
        'an instance of dc chart should be generated':function(chart){
            assert.isTrue(dc.instanceOfChart(chart));
        },
        'should be registered':function(chart) {
            assert.isTrue(dc.hasChart(chart));
        },
        'correct number of overlay g should be generated':function(chart){
            assert.equal(chart.selectAll("g.node")[0].length, 6);
        },
        'correct class name for overlay g should be generated':function(chart){
            assert.equal(d3.select(chart.selectAll("g.node")[0][0]).attr("class"), "node california");
            assert.equal(d3.select(chart.selectAll("g.node")[0][3]).attr("class"), "node ontario");
        },
        'correct number of overlay bubble should be generated':function(chart){
            assert.equal(chart.selectAll("circle.bubble")[0].length, 6);
        },
        'correct translate for overlay g should be generated':function(chart){
            assert.equal(d3.select(chart.selectAll("g.node")[0][0]).attr("transform"), "translate(100,120)");
            assert.equal(d3.select(chart.selectAll("g.node")[0][3]).attr("transform"), "translate(180,400)");
        },
        'correct translate for overlay g should be generated':function(chart){
            assert.equal(d3.select(chart.selectAll("circle.bubble")[0][0]).attr("r"), "51.33333333333333");
            assert.equal(d3.select(chart.selectAll("circle.bubble")[0][3]).attr("r"), "25.666666666666664");
        },

        'teardown': function() {
            resetAllFilters();
            resetBody();
        }
    }
});

suite.export(module);


