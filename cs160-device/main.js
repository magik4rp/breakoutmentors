//@program
/*
Need to do:
- Add config file and read from it
*/




var model = application.behavior = Object.create(Object.prototype, {

   onComplete: { value: function(application, message) {
      // After the BLLs have been configured, build the UI and issue single/repeated commands to the BLL
      application.skin = new Skin({fill: "black"});
   }},
   
   onLaunch: { value: function(application) {
      // Configure the BLLs used by this application
        application.invoke(new MessageWithObject("pins:configure", {
            sensor: {
                require: "bll",
                pins: {
               // Specify the pins required by this BLL
                }
            }}), Message.TEXT);

        this.data = {};
    }}
   
});

/* SKINS */
let whiteSkin = new Skin({fill: 'white'});
let graySkin = new Skin({fill: 'black'});

/*  Templates */
let homeScreen = Container.template($ => ({

}));

let lightbox = Layer.template($ => ({ 
    top: $.top, height: 300, left: $.left, width: 230,
    behavior: $.behavior, skin: graySkin, opacity: 0.5,
    contents: [
        $.content
    ]
}));

let lightboxContent = Container.template($ => ({
	top: 100, left: 100, right: 100, bottom: 100, skin: whiteSkin, 
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


/* Main Container */
var currentScreen;

let mainContainer = Container({
	top: 0, bottom: 0, left: 0, right: 0, skin: whiteSkin,
	contents: [],
});

application.add(mainContainer);
application.behavior = Behavior({
	onLaunch: function(application) {
		currentScreen = new homeScreen();
		mainContainer.add(currentScreen);
	}	
});