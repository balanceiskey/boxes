var colorMap = {
	0: 'one',
	1: 'two',
	2: 'three',
	3: 'four'
};

var BoxModel = Backbone.Model.extend({
	defaults: {
		backgroundColor: 'blanchedalmond',
		interval: 1000 
	},

	colors: [
		'#2caae1',
		'#3b5998',
		'#3c9',
		'#dc4b38'
	],

	initialize: function () {
		this.setRandomInterval();
		this.initInterval();
	},

	initInterval: function () {
		var model = this;
		this.intervalId = setInterval(
			function () {
				model.setRandomColor();
			}, 
			this.get('interval')
		);
	},
	
	getRandomColor: function () {
		var randNum = Math.floor((Math.random() * 1000)) % 4;
		return this.colors[randNum];
	},

	setRandomColor: function () {
		this.set('backgroundColor', this.getRandomColor());
	},

	setRandomInterval: function () {
		this.set('interval', 2000 + Math.floor(Math.random() * 2000));
	}
});

var BoxView = Backbone.View.extend({
	className: 'box',
	initialize: function () {
		this.model.on('change:backgroundColor', this.render, this);
	},

	render: function () {
		this.$el.css('backgroundColor', this.model.get('backgroundColor'));	

		return this;
	}
});

var BoxesView = Backbone.View.extend({
	el: '.boxes',

	initialize: function () {
		_.bindAll(this, 'render', 'createBoxView');

		// Auto generate a collection of box models
		this.collection = this.collection || new Backbone.Collection([
			new BoxModel({color: colorMap[0]}),
			new BoxModel({color: colorMap[1]}),
			new BoxModel({color: colorMap[2]}),
			new BoxModel({color: colorMap[3]})
		]);
	},

	render: function () {
		// Create and store the box views from the box models
		this.boxes = this.collection.map(this.createBoxView);

		return this;
	},

	createBoxView: function (model) {
		var randDelay = Math.floor((Math.random() * 2000)),
			// Instantiate and render the box view
			view = new BoxView({model: model}).render();

		// Append the box view to our boxes container
		this.$el.append(view.$el);

		return view;
	}
});

$(document).ready(function () {
	new BoxesView({}).render();
});
