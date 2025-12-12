(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card "
    + alias4(((helper = (helper = lookupProperty(helpers,"cardClasses") || (depth0 != null ? lookupProperty(depth0,"cardClasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardClasses","hash":{},"data":data,"loc":{"start":{"line":1,"column":17},"end":{"line":1,"column":32}}}) : helper)))
    + "\" data-array-index = \""
    + alias4(((helper = (helper = lookupProperty(helpers,"arrayIndex") || (depth0 != null ? lookupProperty(depth0,"arrayIndex") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"arrayIndex","hash":{},"data":data,"loc":{"start":{"line":1,"column":54},"end":{"line":1,"column":68}}}) : helper)))
    + "\" data-player = \""
    + alias4(((helper = (helper = lookupProperty(helpers,"player") || (depth0 != null ? lookupProperty(depth0,"player") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player","hash":{},"data":data,"loc":{"start":{"line":1,"column":85},"end":{"line":1,"column":95}}}) : helper)))
    + "\">\r\n    <div class=\"card-content "
    + alias4(((helper = (helper = lookupProperty(helpers,"cardContentClasses") || (depth0 != null ? lookupProperty(depth0,"cardContentClasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardContentClasses","hash":{},"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":51}}}) : helper)))
    + "\">\r\n        <!--Card Title-->\r\n        <div class=\"card-title-holder\">\r\n            <span class=\"card-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":37},"end":{"line":5,"column":46}}}) : helper)))
    + "</span>\r\n        </div>\r\n        <!--Card Image-->\r\n        <div class=\"card-image\">\r\n            <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":9,"column":22},"end":{"line":9,"column":31}}}) : helper)))
    + "\">\r\n        </div>\r\n        <!--Card Description-->\r\n        <div class=\"card-description-holder\">\r\n            <div class=\"card-description\">\r\n                <span class=\"description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":14,"column":42},"end":{"line":14,"column":57}}}) : helper)))
    + "</span>\r\n            </div>\r\n        </div>\r\n            <!--Energy Cost Container-->\r\n        <div class=\"card-energy-cost-container\">\r\n            <span class=\"card-energy-cost\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":19,"column":43},"end":{"line":19,"column":51}}}) : helper)))
    + "</span>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
})();