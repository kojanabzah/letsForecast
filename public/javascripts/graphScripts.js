var graph;
var xPadding = 30;
var yPadding = 30;

var data = { values:[]};

function getMaxY() {
    var max = 0;

    for(var i = 0; i < data.values.length; i ++) {
        if(data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
}

function getMinY() {
    var min = data.values[0].Y;

    for(var i = 0; i < data.values.length; i ++) {
        if(data.values[i].Y < min) {
            min = data.values[i].Y;
        }
    }

    min += 10 - min % 10;
    return min;
}

function getXPixel(val) {
    return ((graph.width() - xPadding) / data.values.length) * val + (xPadding * 1.5);
}

function getYPixel(val) {
    return graph.height()- (((graph.height()  - yPadding) / getMaxY()) * val) - yPadding;
}

function initGraph(context, dateArray){
    console.log('start initGraph');
    //set data to show
    data.values = data.values.concat(dateArray);

    context.lineWidth = 2;
    context.strokeStyle = '#333';
    context.font = 'italic 8pt sans-serif';
    context.textAlign = "center";
    context.beginPath();
    context.moveTo(xPadding, 0);
    context.lineTo(xPadding, graph.height() - yPadding);
    context.lineTo(graph.width(), graph.height() - yPadding);
    context.stroke();

    //set label dayes
    for(var i = 0; i < data.values.length; i ++) {
        context.fillText(data.values[i].X, getXPixel(i), graph.height() - yPadding + 20);
    }

    //draw Y
    context.textAlign = "right"
    context.textBaseline = "middle";

    var minCenter =  getMinY()/2;
    var x = minCenter-(minCenter %10);
    for(var i = 0; i < getMaxY(); i += 10) {
        context.fillText(x + i, xPadding - 1, getYPixel(i));
    }

    //draw the inner graph
    context.strokeStyle = '#f00';
    context.beginPath();
    context.moveTo(getXPixel(0), getYPixel(data.values[0].Y));

    for(var i = 1; i < data.values.length; i ++) {
        context.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
    }
    context.stroke();

    console.log('end initGraph');
}