var Phase = require('html5/parser/phase').Phase;

exports.Phase = p = function (parser, tree) {
	Phase.call(this, parser, tree);
}

p.prototype = new Phase;

// FIXME handle_start html head
// FIXME handle_end head br => ImplyHead

p.prototype.process_eof = function() {
	this.startTagHead('head', {});
	this.parser.phase.process_eof();
}

p.prototype.processSpaceCharacters = function(data) {
}

p.prototype.processCharacters = function(data) {
	this.startTagHead('head', {});
	this.parser.phase.processCharacters(data);
}

p.prototype.startTagHead = function(name, attributes) {
	this.tree.insert_element(name, attributes);
	this.head_pointer = tree.open_elements[tree.open_elements.length];
	this.parser.phase = new PHASES.inHead(this.parser, this.tree);
}

p.prototype.startTagOther = function(name, attributes) {
	this.startTagHead('head', {});
	this.parser.phase.processStartTag(name, attributes);
}

p.prototype.endTagImplyHead = function(name) {
	this.startTagHead('head', {});
	this.parser.phase.processEndTag(name);
}

p.prototype.endTagOther = function(name) {
	parse_error('end-tag-after-implied-root', {name: name});
}
