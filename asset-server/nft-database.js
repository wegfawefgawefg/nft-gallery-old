const fs = require('fs');
PATH = "assets";

class NFTDataBase{
    constructor(path){
        this.data = {};
        this.populate();
    }
    populate(){
        let nfts = [];
        let tags = [];
        let colors = [];
    
        let files = fs.readdirSync('assets');
        for(let i = 0; i < files.length; i++){
            let file = files[i];
            if(file.endsWith('.json')){
                let data = JSON.parse(fs.readFileSync('assets/' + file));
                let name = file.substring(0, file.length - 5);
                nfts[name] = data;
    
                // tags/colors is is a dict of the possible values
                // for each filterable property (just tags and colors)
                if (data.tags != null && data.tags.length > 0){
                    for(let j = 0; j < data.tags.length; j++){
                        let tag = data.tags[j];
                        if(!tags.includes(tag)){
                            tags.push(tag);
                        }
                    }
                }
                if (data.colors != null && data.colors.length > 0){
                    for(let j = 0; j < data.colors.length; j++){
                        let color = data.colors[j];
                        if(!colors.includes(color)){
                            colors.push(color);
                        }
                    }
                }
                this.data["nfts"] = nfts;
                this.data["colors"] = colors;
                this.data["tags"] = tags;
            }
        }
    }
    get_all_nfts(){
        let nfts = [];
        for(let name in this.data["nfts"]){
            nfts.push(this.data["nfts"][name]);
        }
        return nfts;
    }
    filter_by_single(nfts, cat, has, hasnt){
        return this.filter_by(nfts, cat, [has], [hasnt]);
    }
    filter_by(nfts, cat, has, hasnt){
        let filtered_nfts = [];
        for(let i = 0; i < nfts.length; i++){
            let nft = nfts[i];
            let pass = nft[cat].filter(prop => has.includes(prop));
            let fail = nft[cat].filter(prop => hasnt.includes(prop));
            if(pass.length > 0 && fail.length == 0){
                filtered_nfts.push(nft);
            }
        }
        return filtered_nfts;
    }
    filter_by_numeric_range(nfts, cat, low, high){
        let filtered_nfts = [];
        for(let i = 0; i < nfts.length; i++){
            let nft = nfts[i];
            let value = nft[cat];
            console.log(value);
            if(value >= low && value <= high){
                filtered_nfts.push(nft);
            }
        }
        return filtered_nfts;
    }
}
