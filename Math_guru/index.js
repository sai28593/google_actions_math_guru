'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');
const Parameters = {
    number: 'number'
};

const twoParameters = {
    first:'first',
    second:'second'
};

const rectParameters = {
    length: 'length',
    width: 'width'
};

const triangleParameters = {
    base: 'base',
    height: 'height'
};

const volumeParameters = {
    height: 'height',
    radius: 'radius'
};

const add_on = 'Do you want me to calculate '
const anthing_else = '. Do you need anything else ?'
exports.weatherWebhook = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    var intent_name = JSON.stringify(request.body.result.metadata.intentName).toString();



function responseSquareAreaCal (app) {

    let side = app.getArgument(Parameters.number);
    if (parseInt(side) === 0){
        app.ask('zero' + anthing_else);}

    let total = parseInt(side) * parseInt(side);

    if (intent_name.includes('Square_Perimeter_cal_yes'))
        app.ask(total.toString() + anthing_else);
    app.ask(total.toString() + '.' + add_on +'perimeter of square too?');

}



// Fulfill action business logic
function responseSquarePerimeterCal (app) {
    let number = app.getArgument(Parameters.number);
    if (parseInt(number) === 0){
        app.ask('zero' + anthing_else);}
    let perimeter = parseInt(number) * 4;
    console.log(intent_name + 'this is it');
    if (intent_name.includes('Square_area_cal_yes'))
        app.ask(perimeter.toString() + anthing_else);
    app.ask(perimeter.toString() + '.' + add_on +'area of square too?');


}

function responseAreaRectangleCal (app) {
        let length = app.getArgument(rectParameters.length);
        let width =  app.getArgument(rectParameters.width);
        if (parseInt(length) === 0 || parseInt(width) === 0 )
            app.ask('zero' + anthing_else);
        let areaOfRec = parseInt(length) *  parseInt(width);
        if (intent_name.includes('Rectangle_peri_cal_yes'))
            app.ask(areaOfRec.toString() + anthing_else);
        app.ask(areaOfRec.toString() + '.' + add_on +'perimeter of rectangle too?');
}


function responsePerRectangleCal (app) {
        let length = app.getArgument(rectParameters.length);
        let width =  app.getArgument(rectParameters.width);
        if (parseInt(length) === 0 || parseInt(width) === 0 ){
            app.ask('zero' + anthing_else);

        }
        else
        {
            let perimeterOfRec = 2 * (parseInt(length) +  parseInt(width));
            if (intent_name.includes('Rectangle_area_calc_yes'))
                app.ask(perimeterOfRec.toString() + anthing_else);
            app.ask(perimeterOfRec.toString() +'.' + add_on +'area of rectangle too?');
        }


}


function responseAreaCircleCal (app) {
        let radius = app.getArgument(Parameters.number);
        if (parseInt(radius) === 0)
            app.ask('zero' + anthing_else);
        let areaOfCircle = (3.14159 * parseInt(radius) * parseInt(radius)).toFixed(2);
        if (intent_name.includes('Circle_circum_cal_yes'))
            app.ask(areaOfCircle.toString() + anthing_else);
        app.ask(areaOfCircle.toString() + '.' + add_on + 'circumference too ?') ;
}

function responseCircumferenceOfCircleCal (app) {
        let radius = app.getArgument(Parameters.number);
        if (parseInt(radius) === 0)
            app.ask('zero' + anthing_else);
        let circumferenceOfCircle = (3.14159 * parseInt(radius) * 2).toFixed(2);
        if(intent_name.includes('Circle_area_calc_yes'))
            app.ask(circumferenceOfCircle + anthing_else);
        app.ask(circumferenceOfCircle.toString() + '.' + add_on + 'area too ?');
}

function responseAreaOfTriangleCal (app) {
        let base = app.getArgument(triangleParameters.base);
        let height = app.getArgument(triangleParameters.height);
        if (parseInt(base) === 0 || parseInt(height) === 0)
            app.ask('zero' + anthing_else);
        let areaOfTriangle = (parseInt(base) * parseInt(height)) / 2
        app.ask(areaOfTriangle.toString() + anthing_else );
}

function responseAverageCal (app) {
    var elements = app.getArgument(Parameters.number);

    console.log(elements.length);
    var sum = 0;
    elements.forEach(function (value) {
        sum += value
    })
    var average = (sum / elements.length).toFixed(4);
    app.ask(average.toString() + anthing_else);
}

    function responseSumCal (app) {
        var elements = app.getArgument(Parameters.number);
        var sum = 0;
        elements.forEach(function (value) {
            sum += value
        })
        app.ask(sum.toString() +'.' +add_on + 'average too ? ')

    }


function responseCylinderCal (app) {
        var height = app.getArgument(volumeParameters.height);
        var radius = app.getArgument(volumeParameters.radius);
        if(parseInt(height) === 0 || parseInt(radius) === 0)
            app.ask('zero' + anthing_else);
        var volume = (3.14159 * parseInt(radius) * parseInt(radius) * parseInt(height)).toFixed(2);
        app.ask(volume.toString() + anthing_else);
}

function responseSubtractNumbers(app) {
    var first = app.getArgument(twoParameters.first);
    var second = app.getArgument(twoParameters.second);
    var result = parseInt(first) - parseInt(second);
    app.ask(result.toString() + anthing_else);

}

function responseSquareRootCal(app)
{
    var number = app.getArgument(Parameters.number);
    var sqrtVal = Math.sqrt(Math.abs(number));
    app.ask(sqrtVal.toString() + anthing_else)

}

function responseMultiplyCal(app)
{
    var first = app.getArgument(twoParameters.first);
    var second = app.getArgument(twoParameters.second);
    var mulVal = parseInt(first) * parseInt(second);
    app.ask(mulVal.toString() + anthing_else)

}

function responseDivideCal(app)
{
    var first = app.getArgument(twoParameters.first);
    var second = app.getArgument(twoParameters.second);
    if ( second === "0")
        app.ask('infinte'  + anthing_else);
    var divVal = parseInt(first) / parseInt(second);
    app.ask(divVal.toString() + anthing_else)

}

function responseVolumeCone(app)
{
    var height = app.getArgument(volumeParameters.height);
    var radius = app.getArgument(volumeParameters.radius);
    if(parseInt(height) === 0 || parseInt(radius) === 0)
        app.ask('zero' + anthing_else);
    var volume = (3.14159 * parseInt(radius) * parseInt(radius) * parseInt(height) / 3).toFixed(2);
        app.ask(volume.toString() + anthing_else)

}

function responseVolumeSphere(app)
{
        var radius = app.getArgument(Parameters.number);
        if(parseInt(radius) === 0)
            app.ask('zero' + anthing_else);
        var volume = (3.14159 * parseInt(radius) * parseInt(radius) * parseInt(radius) * 4 / 3).toFixed(2);
        app.ask(volume.toString() + anthing_else)

}

function responsePrimeCal (app) {
        var number = app.getArgument(Parameters.number);

        var isprime = require('isprime');
        var primeOrNot = isprime(parseInt(number));
        if(primeOrNot)
            app.ask('yes it is' + anthing_else);
        app.ask('nope its not' + anthing_else);

}

const actionMap = new Map();
 actionMap.set('input.squareperimetercal', responseSquarePerimeterCal);
actionMap.set('input.squareareacal', responseSquareAreaCal);
 actionMap.set('input.areaofrectangle', responseAreaRectangleCal);
 actionMap.set('input.perimeterrectangle', responsePerRectangleCal);
 actionMap.set('input.areaofcircle', responseAreaCircleCal);
 actionMap.set('input.circumferenceofcircle', responseCircumferenceOfCircleCal);
 actionMap.set('input.areaoftriangle', responseAreaOfTriangleCal);
 actionMap.set('input.averageCal', responseAverageCal);
 actionMap.set('input.cylindercal', responseCylinderCal);
 actionMap.set('input.primeCal', responsePrimeCal);
 actionMap.set('input.sumofnumbers', responseSumCal);
 actionMap.set('input.squarenumbercal', responseSquareRootCal);
 actionMap.set('input.subtractnumbers', responseSubtractNumbers);
 actionMap.set('input.volumeCone', responseVolumeCone);
 actionMap.set('input.volumeSphere', responseVolumeSphere);
 actionMap.set('input.multiplyNumber', responseMultiplyCal);
 actionMap.set('input.divideNumbers', responseDivideCal);



app.handleRequest(actionMap);
});
