module.exports =   function(argv , options = { mergeSingleFlage : false }) {

    return parse(argv, options.mergeSingleFlage)
 
 
}


function convertArgToPremitive(value) {

    if(isBoolean(value)){
        return toBoolean(value);
    }else if(isNumber(value)){
        return toNumber(value);
    }
    return value;
}

function isBoolean(value){
    return /^((true|false))/g.test(value);
}

function  toBoolean(value){
    if( value ){
            switch(value.toString().toLowerCase()){
                case "true": return true;
                case "false": return false;
            }
    } 
    return value;
}

function isNumber(value){
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(value)) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(value);

}

function  toNumber(value){
    return  parseFloat(value);
}

// private Methods
function parseMatch(match , single = true) {
    if (match !== null) {
        match = match['groups'];
        match.single = single;
    }else match = null;
    return match;
}


function isMatched(match) {
    return match !== null ;
}

function isValueNext(match) {
    return (isMatched(match) && ( (match.value === undefined) || (match.value === null)) );
}
// public Methods
function singleCharOption(arg , mergeSingleFlage = false) {

    return !mergeSingleFlage ?  parseMatch(/^-(?<option>\w)(?<value>\S*)?$/g.exec(arg)) : parseMatch(/^-(?<option>\w+)$/g.exec(arg));
}
function wordOption(arg ){
    return parseMatch( /^--(?<option>\w+)(=?(?<value>\S*))?$/g.exec(arg) , false);
}
function isValidNext(nextMatched){

        return (singleCharOption(nextMatched) || wordOption(nextMatched)) == null ? true : false ;
}
function parse(argv = [] , mergeSingleFlage = false){
    let matched ;
    let argvParsed = {$ : []}
    for(let x = 0 ; x < argv.length ; x++){
            matched = singleCharOption(argv[x] , mergeSingleFlage) || wordOption(argv[x]);
            if(matched === null){
                argvParsed.$.push(argv[x]);
                continue;
            }else if(mergeSingleFlage && matched.single){
                for ( let option of matched.option.split('')){
                       argvParsed[option] = true ;
                    }
                    continue;
            }
            else if(isValueNext(matched)){
                console.log(matched)
                    if(isValidNext(argv[x+1])){
                        (matched.single  && (matched.value == undefined)) ? matched.value = true :  matched.value = null;
                        argvParsed[matched.option] = convertArgToPremitive(argv[++x] ?? matched.value) ;
                        continue;
                    }
            }
            (matched.single  && (matched.value == undefined)) ? matched.value = true : '';
            argvParsed[matched.option] = convertArgToPremitive(matched.value) ;        
    }
    return argvParsed;
}
