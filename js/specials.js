function checkEvent (elements) {
  this.divModule = elements.divModule;
}

checkEvent.prototype.loadContent = function(currentItem) {
  var _this = this,
      value = currentItem.val(),
      targetDiv = $("<div/>").appendTo(this.divModule);
  if (currentItem.index()) {
    $.ajax({
      dataType : "json",
      url : "data/specials.json",
      success : function(result,status,xhr) {
        var title = $("<h2/>").text(result[value].title),
            description = $("<p/>").text(result[value].text),
            image = $("<img/>").attr("src", result[value].image);
        targetDiv.append(title, description, image);    
      }
    });
  }
};

checkEvent.prototype.bindEvents = function() {
  var _this = this; 
  $("select[name=day]").on("change" ,function() {
    _this.divModule.find("div").empty();
    _this.loadContent($(this).find(":selected"));
    $(".buttons").remove();
  });
};

$(document).ready(function() {
  var elements = {
    "divModule" : $("#specials")
  };
  var checkEventObj = new checkEvent(elements);
  checkEventObj.bindEvents();
});