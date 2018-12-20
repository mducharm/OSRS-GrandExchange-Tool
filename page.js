const { grandExchange } = require("osrs-api");
const json = require("./items.json");
var Chart = require('chart.js');
// var myChart = new Chart(ctx, {...});

var app = new Vue({
    el: '#app',
    data () {
        return {
            test: [1,2,3],
            inputText: "",
            id: 2,
            items: json,
            loadedItems: {
    
            },
            loadedGraphs: {
    
            }
        }  
    },
    computed: {
        sortedItems () {
            return Object.values(this.items).sort()
        },
        filteredList () {
            if (this.inputText === '') {
                return this.items
            }
            var filteredItems = {}
            for (key in this.items) {
                if (RegExp(this.inputText, 'ig').test(this.items[key])) {
                    filteredItems[key] = this.items[key]
                }
                
            }
            return filteredItems
        }
    },
    methods: {
        getItemData (id) {

            grandExchange.getItem(id).then(function(val) {
                Vue.set(app.loadedItems, "item" + id, val["item"])
            }).catch(console.error);

            

            // grandExchange.getItem(id).then(function(val) {
            //     console.log(val)
            //     this.loadedItems["item" + id] = val
            // }).catch(console.error);
        },
        getGraphData (id) {

            grandExchange.getGraph(id).then(function(val) {
                Vue.set(app.loadedGraphs, "graph" + id, val["item"])
            }).catch(console.error);

            // grandExchange.getItem(id).then(function(val) {
            //     console.log(val)
            //     this.loadedItems["item" + id] = val
            // }).catch(console.error);
        },
        deleteItem (obj){
            Vue.delete(app.loadedItems, "item" + obj.id);   
        },
        submitText () {
            try {
                this.getItemData(Object.keys(this.filteredList)[0])
                this.inputText = ''
            } finally {

            }
        }
    }
})
