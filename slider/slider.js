
// useful/shorter functions

function getHTML(id){
    return document.getElementById(id)
}
  
function changeHTML(id, text){
    document.getElementById(id).innerHTML = text
}



// actual stuff


function updateTabCount(){
    chrome.tabs.query({
    }, function(tabs) {
        console.log(tabs);
        changeHTML("open-tabs", "Tabs open: "+tabs.length)
        // update slider range
        getHTML("tab-slider").max = tabs.length

        // update/set current tab value
        var currentTabNum = tabs.filter(function(active){
            return active.active //gets current active tab
        })
        getHTML("tab-slider").value = currentTabNum[0].index + 1
        changeHTML("current-tab-num", "Current tab number: " + getHTML("tab-slider").value)


    });
}



//wait for doc to load, then load functions
document.addEventListener('DOMContentLoaded', function (){
    updateTabCount()


    //update slider display on its value change
    getHTML("tab-slider").oninput = function(){
        changeHTML("current-tab-num", "Current tab number: " + getHTML("tab-slider").value)
        

        // update current displayed tab

        //get ids of all current tabs in order
        chrome.tabs.query({
        }, function(tabs) {
            let tabIds = []
            tabs.forEach(tab => {
                tabIds.push(tab.id)
            });
            console.log(tabIds)
            sliderTabId=tabIds.at(Number(getHTML("tab-slider").value)-1)
            console.log(sliderTabId)
            chrome.tabs.update(
                sliderTabId,
                {
                    active:true,
                    selected:true
                }
            )
        });

    }
})