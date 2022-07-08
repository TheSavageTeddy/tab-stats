
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


    //popup for slider tab
    getHTML("slider-popup-button").addEventListener('click', function(){
        var popup = window.open(chrome.extension.getURL("slider/slider.html"),"Tab Slider","width=200px,height=50px")
    })
    
})