function checkEvent (getElements) {
  this.divModule = getElements.divModule;
  this.targetDiv = "";
}
checkEvent.prototype.init = function() {
  this.targetDiv = $("<div/>").appendTo(this.divModule);
  $(".input_submit").remove();
  this.bindEvents();
};

checkEvent.prototype.loadContent = function(currentItem) {
  var _this = this,
      value = currentItem.val();
  if(!currentItem.index()) {
    _this.targetDiv.empty();
  }
  else {
    $.ajax({
      dataType : "json",
      url : "data/specials.json",
      cache : true,
      success : function(result,status,xhr) {
        _this.targetDiv.html("<h2>"+result[value].title+"</h2>"+"<p>"+result[value].text+"</p>"+"<img src =" +result[value].image+"/>");
      }
    });
  }
};

checkEvent.prototype.bindEvents = function() {
  var _this = this; 
  $("select[name=day]").find("option").on("click" ,function() {
    _this.loadContent($(this));
  });
}

$(document).ready(function() {
  var elements = {
    "divModule" : $("#specials")
  };
  var checkEventObj = new checkEvent(elements);
  checkEventObj.init();
});