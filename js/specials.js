function checkEvent (elements) {
  this.divModule = elements.divModule;
  this.targetDiv = $("<div/>").appendTo(this.divModule);
  this.availableData = [];
}

checkEvent.prototype.init = function() {
  this.loadContent();
  this.bindEvents();
}

checkEvent.prototype.loadContent = function(currentItem) {
  var _this = this;
  $.ajax({
    dataType : "json",
    url : "data/specials.json",
    success : function(result, status, xhr) {
      console.log(result);
      _this.availableData = result; 
    }
  });
};

checkEvent.prototype.showData = function(currentItemValue) {
  if(currentItemValue) {
    var title = $("<h2/>").text(this.availableData[currentItemValue].title),
        description = $("<p/>").text(this.availableData[currentItemValue].text),
        image = $("<img/>").attr("src", this.availableData[currentItemValue].image);
    this.targetDiv.append(title, description, image);  
  }
  else {
    this.targetDiv.empty();
  }
}

checkEvent.prototype.bindEvents = function() {
  var _this = this; 
  $("select[name=day]").on("change" ,function() {
    _this.targetDiv.empty();
    _this.showData($(this).val());
    $(".buttons").remove();
  });
};

$(document).ready(function() {
  var elements = {
    "divModule" : $("#specials")
  };
  var checkEventObj = new checkEvent(elements);
  checkEventObj.init();
});