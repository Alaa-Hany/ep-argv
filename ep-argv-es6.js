class Pn_argv{
    constructor(argv , options = { mergeSingleFlage : true }){
        this.argv = argv;
        this.argvParsed = { $ : []}
        this.options = options;
    }
// private Methods
    #parseMatch(match , single = true) {

          if (match !== null) {
              match = match['groups'];
              match.single = single;
          }else match = null;
        return match;
    }

    #isMatched(match) {
        return match !== null ;
    }

    #isValueNext(match) {
        return (this.#isMatched(match) && ( (match.value === undefined) || (match.value === null)) );
    }
// public Methods
    singleCharOption(arg){

        return !this.options.mergeSingleFlage ? this.#parseMatch(/^-(?<option>\w)(?<value>\S*)?$/g.exec(arg)) : this.#parseMatch(/^-(?<option>\w+)$/g.exec(arg));
    }
    wordOption(arg ){
        return this.#parseMatch( /^--(?<option>\w+)(=?(?<value>\S*))?$/g.exec(arg) , false);
    }
    #isValidNext(nextMatched){

            return (this.singleCharOption(nextMatched) || this.wordOption(nextMatched)) == null ? true : false ;
    }
    parse(){
        let matched ;
        for(let x = 0 ; x < this.argv.length ; x++){
                matched = this.singleCharOption(this.argv[x]) || this.wordOption(this.argv[x]);
                if(matched === null){
                    this.argvParsed.$.push(this.argv[x]);
                    continue;
                }else if(this.options.mergeSingleFlage && matched.single){
                    for ( let option of matched.option.split('')){
                            this.argvParsed[option] = true ;
                        }
                        continue;
                }
                else if(this.#isValueNext(matched)){
                        if(this.#isValidNext(this.argv[x+1])){
                            (matched.single  && (matched.value == undefined)) ? matched.value = true :  matched.value = null;
                            this.argvParsed[matched.option] = this.convertArgToPremitive(this.argv[++x] ?? matched.value) ;
                            continue;
                        }
                }
                (matched.single  && (matched.value == undefined)) ? matched.value = true : '';
                this.argvParsed[matched.option] =  this.convertArgToPremitive(matched.value) ; 
                
        }

        return this.argvParsed;
    }
    convertArgToPremitive(value){

        if(this.#isBoolean(value)){
            return this.toBoolean(value);
        }else if(this.#isNumber(value)){
            return this.toNumber(value);
        }
        return value;
    }

    #isBoolean(value){
        return /^((true|false))/g.test(value);
    }

    toBoolean(value){
        if( value ){
                switch(value.toString().toLowerCase()){
                    case "true": return true;
                    case "false": return false;
                }
        } 
        return value;
    }

    #isNumber(value){
        return /^(?<digit>\d+)(\.)?(?<frac>\d*)?$/gi.test(value) ;
    }

    toNumber(value){
        return  parseFloat(value);
    }

}
