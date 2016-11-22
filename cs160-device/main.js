//@program
/*
Need to do:
- Add config file and read from it
*/

/* SKINS */
let whiteSkin = new Skin({fill: 'white'});
let graySkin = new Skin({fill: 'gray'});
let blueSkin = new Skin({fill: 'blue'});

let blackHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'black', horizontal: 'center'});
let boldBlackBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: 'black', horizontal: 'center'});
let blackBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'black', horizontal: 'center'});
let whiteHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'white', horizontal: 'center'});
let whiteBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'white', horizontal: 'center'});
let whiteSmallStyle = new Style ({ font: '18px Avenir-Roman', color: 'white', horizontal: 'center'});
let greenBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#5AA700', horizontal: 'center'});
let redBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#E71D32', horizontal: 'center'});

/*  Templates */
let homeScreen = Container.template($ => ({
	//top: 20, bottom: 20, left: 20, right: 20, skin: whiteSkin,
	//contents: [],
}));

let lightbox = Layer.template($ => ({ 
    top: $.top, height: 300, left: $.left, width: 230,
    behavior: $.behavior, skin: graySkin, opacity: 0.5,
    contents: [
        $.content
    ]
}));

let lightboxContent = Container.template($ => ({
	top: 100, left: 100, right: 100, bottom: 100, skin: graySkin, 
	contents: [
		$.content
	]
}));

let button = Container.template($ => ({
	top: $.top, bottom: $.bottom, right: $.right, left: $.left,
	skin: $.skin, active: true, 
	contents: [
		$.content
	],
	behavior: Behavior({
		onTouchBegan: $.onTouchBegan,
		onTouchEnded: function(container) {
			mainContainer.remove(currentScreen);
			currentScreen = $.nextScreen;
			mainContainer.add(currentScreen);
		}
	})
}));

let medicationbutton = Line.template($ => ({
	top: 4, bottom: 0, right: 0, left: 0,
	skin: whiteSkin, active: $.active, 
	contents: $.contents,
	behavior: $.behavior
}));

let shadow = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: graySkin,
	contents: [
		//$.content
	]
}));

let popup1 = Container.template($ => ({
	top: 60, left: 60, right: 60, bottom: 60, skin: whiteSkin,
	active: true,
	contents: [	
		new Picture({height: 100, width: 100, url: "assets/thumb1.png"}),
		new Container({
			height:100, width: 100,
			active: true,
			behavior: $.behavior
		})
	]
}));

let popup2 = Container.template($ => ({
	top: 60, left: 60, right: 60, bottom: 60, skin: whiteSkin,
	active: true,
	contents: [
		new Picture({height: 100, width: 100, url: "assets/thumb2.png"}),
		new Label({bottom: 10, string: 'NOW DISPENSING', style: blackBodyStyle })
	],
	behavior: $.behavior
}));

/*let box = Layer.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	//opacity: 0,
	active: true,
	contents: [
		new shadow({}),
	],
	behavior: Behavior({
		onCreate: function(layer) {
			layer.opacity = 0.5;
		},
		onTouchEnded: function(layer) {
			layer.opacity = 0;
		}
	})
}));*/

var pillTaken = false;

var box = new Layer({
	top: 0, bottom: 0, left: 0, right: 0,
	active: false,
	contents: [
		new shadow({}),
	],
	behavior: Behavior({
		onCreate: function(layer) {
			layer.opacity = 0.0;
		},
		onTouchEnded: function(layer) {
			//trace("test2\n");
			layer.opacity = 0;
			layer.active = false;
			mainContainer.remove(pop);
		}
	})
});

var pop;

var mainContainer = new Container({
	top: 0, bottom: 0, left: 0, right: 0, skin: whiteSkin,
	contents: [
		new Line({
			top: 0, left: 0, right: 0, skin: whiteSkin,
			contents: [
				new Label({ top: 60, left: 20, string: "<", style: blackBodyStyle }),
				new Column({ top: 40, left: 0, right: 0, bottom: 0, skin: whiteSkin,
					contents: [
						new Label({ string: 'Today', style: blackHeadingStyle }),
						new Label({ string: 'Fri., October 4, 2016', style: blackBodyStyle }),
					]
				}),
				new Label({ top: 60, right: 20, string: ">", style: blackBodyStyle }),
			],
		}),
		
		new Column({
			horizontal:'center', top: 100, skin: whiteSkin,
			contents: [
				new medicationbutton({
					active: false,
					contents: [
						new Picture({right: 10, height:20, width:20, url:"assets/check.png"}),
						new Label({string: "Vitamin A", style: greenBodyStyle})
					],
				}),
				new medicationbutton({
					active: true,
					contents: [
						new Picture({right: 10, height:20, width:20, url:"assets/notcheck.png"}),
						new Label({string: "Sertraline", style: redBodyStyle})
					],
					behavior: Behavior({
						onTouchEnded: function(content) {
							//trace("hihi\n");
							box.opacity = 0.5;
							box.active = true;
							//not sure if this is needed, if box is active it seems that it has priority
							//content.active = false;
							pop = new popup1({
								behavior: Behavior({
									onTouchEnded: function(content) {
										pillTaken = true;
										mainContainer.remove(pop);
										pop = new popup2({
											behavior: Behavior({
												onCreate: function(container) {
													//container.interval = 3000;
					            					container.duration = 3000;
					            					container.start();
												},
												onFinished: function(container) {
													box.opacity = 0;
													box.active = false;
													mainContainer.remove(pop);
													//for real project need to pass in button ID so popup2 and disable correct button
													((mainContainer.first.next).first.next).active = false;
													((mainContainer.first.next).first.next).first.url = "assets/check.png";
													((mainContainer.first.next).first.next).first.next.style = greenBodyStyle;
												}
											})
										});
										mainContainer.add(pop);
									}
								})
							});
							mainContainer.add(pop);
						}
					})
				}),
			]
		}),
		
		new Picture({bottom: 10, right: 10, height: 40, width: 40, url: "assets/menuicon.png"}),
		box
	]
});

class AppBehavior extends Behavior{
	onLaunch(application) {
		//currentScreen = new homePage({skin: blueSkin});
		//mainContainer.add(currentScreen);
		application.add(mainContainer);
	}
};

application.behavior = new AppBehavior();