//@program
/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

/* SKINS */
let whiteSkin = new Skin({fill: 'white'});
let graySkin = new Skin({fill: 'black'});
let redSkin = new Skin({fill: '#E71D32'});
let greenSkin = new Skin({fill: '#5AA700'});
var blackBorderedSkin = new Skin({
    borders: {left: 2, right: 2, top: 2, bottom: 2}, 
    stroke: "black"
});

//added a green & red style and changed their sizes! -Stacy
var blackHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'black', horizontal: 'center'});
var boldBlackBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: 'black', horizontal: 'center'});
var blackBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'black', horizontal: 'center'});
var whiteHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'white', horizontal: 'center'});
var whiteBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'white', horizontal: 'center'});
var whiteSmallStyle = new Style ({ font: '18px Avenir-Roman', color: 'white', horizontal: 'center'});
var greenBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#5AA700', horizontal: 'center'});
var redBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#E71D32', horizontal: 'center'});

/* Data Objects */
let completedpills = "Sertraline, Vitamin A";
let incompletepills = "none";
var refilled = false;
/*  Templates */

//Home Screen
let completedlist = new Column({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
	new Label({ string: completedpills, style: blackBodyStyle })
	]
	});
let incompletelist = new Column({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
	new Label({ string: incompletepills, style: blackBodyStyle })
	]
	});
let homeScreen = Column.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
		new Line({
			top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
			contents: [
			new Label({ left: 50, string: "<", style: blackBodyStyle }),
			new Column({ top: 50, left: 0, right: 0, bottom: 0, skin: whiteSkin,
				contents: [
				new Label({ string: 'Today', style: blackHeadingStyle }),
				new Label({ string: 'Fri., October 4, 2016', style: blackBodyStyle }),
				], 
			}),
			new Label({ right: 50, string: ">", style: blackBodyStyle }),
			],
		}),
		new Label({ name: 'completed', top: 20, string: 'Completed', style: greenBodyStyle }),
		new Column({
			top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
			contents: [
			new Label({ string: completedpills, style: blackBodyStyle })
			]
			}),
		new Label({ name: 'incomplete', string: 'Incomplete', style: redBodyStyle }),
		new Column({
			top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
			contents: [
			new Label({ string: incompletepills, style: blackBodyStyle })
			]
			}),
		new button({ name: 'myMedicineButton', top: 120, left: 60, right: 60, bottom: 5,
			skin: graySkin, 
				content: new Label({ string: "MY MEDICINE", style: whiteBodyStyle }),
				onTouchBegan: function(container) {container.skin = blackBorderedSkin; container.first.style = blackBodyStyle},
				nextScreen: myMedicineScreen,		
		}),
		//Traveling Button not finished yet!
		new button({ name: 'travelingButton', top: 5, left: 60, right: 60, bottom: 20,
			skin: graySkin, 
			content: new Label({ string: "I'M TRAVELING", style: whiteBodyStyle }),	
		}),
	],
}));

//My Medicine Screen
let myMedicineScreen = Column.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
	new button({ name: 'medicine-back-button', top: 5, left: 5, 
			skin: whiteSkin, 
			content: new Label({ string: "←", style: blackBodyStyle}),	
			nextScreen: homeScreen,
		}),
	new Label({ string: 'My Medicines', style: blackHeadingStyle, top: 25}),
	new addMedicineButton(),

	],
	active: true,
	Behavior: class extends Behavior{
		onDisplayed(container) {
			trace('~~~~ LAUNCHED! ~~~~~ \n')
			var medicines = completedpills.split(/[,]+/);
			for (var i = 0; i < medicines.length; i++) { 
				trace(medicines[i] + '\n');
			    container.insert(
			    	new button({ name: medicines[i], left: 25, right: 25, top: 10, height: 40,
					skin: graySkin, 
						content: new Label({ string: medicines[i], style: whiteBodyStyle }),
						onTouchBegan: function(container) {container.skin = blackBorderedSkin; container.first.style = blackBodyStyle},
						nextScreen: individualMedicineScreen,		
				}), container.last);
				trace('Added ' + medicines[i] + '\n');
				trace(container.first.name + '\n');
			}
		}
	}
}));

let addMedicineButton = Container.template($ => ({
	height: 40, right: 25, left: 25, top: 10, skin: blackBorderedSkin,
	contents: [new Label({string: "+ ADD MEDICINE", style: blackBodyStyle})],
	active: true,
	Behavior: class extends Behavior{
		onTouchBegan(container){
			container.skin = graySkin;
			container.first.style = whiteBodyStyle;
		}
		onTouchEnded(container) {
			container.skin = blackBorderedSkin;
			container.first.style = blackBodyStyle;
		}
	}
}));


//Individual Medicine Screen
let pillDetails = new Column({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
		contents: [
		//this is hard-coded for now but we can change this later!
		new Picture({height: 100, url: "assets/pillphoto.png"}),
		new Label({ string: "Sertraline", style: blackHeadingStyle}),
		new Label({ string: "100mg, once daily", style: blackBodyStyle}),
		new Label({ string: "6% REMAINING", style: redBodyStyle}),
		], 
	});
let individualMedicineScreen = Column.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
		//editButton not finished yet!
		new button({ name: 'medicine-back-button', top: 5, left: 5, 
			skin: whiteSkin, 
			content: new Label({ string: "←", style: blackBodyStyle}),	
			nextScreen: myMedicineScreen,
		}),
		new button({ name: 'editButton', top: -40, left: 280, right: 0, bottom: 0,
			skin: whiteSkin, 
			content: new Picture({ height: 15, url: "assets/editicon.png" }),	
		}),
		new Label({ string: "Medicine", style: blackHeadingStyle}),
		new Column({
			top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
			contents: [
			//this is hard-coded for now but we can change this later!
			new Picture({height: 100, url: "assets/pillphoto.png"}),
			new Label({ string: "Sertraline", style: blackHeadingStyle}),
			new Label({ string: "100mg, once daily", style: blackBodyStyle}),
			new Label({ string: "6% REMAINING", style: redBodyStyle}),
			], 
		}),
		new refillButton({ name: "requestRefillButton", top: 100, left: 60, right: 60, bottom: 20,
			skin: graySkin,
			content: new Label({ string: "REQUEST REFILL", style: whiteBodyStyle })
		}),
	],
}));

var timer = 0;
var up = true;
//Refill Confirmation
let refillConfirmation = Layer.template($ => ({
	skin: greenSkin, left: 0, right: 0, height: 100, bottom: 0,
	contents: [new Container({skin: greenSkin, left: 0, right: 0, top: 0, bottom: 0,
		contents: [new Label({string: "Refill Requested!", style: whiteHeadingStyle})]})],
	Behavior: class extends Behavior{
		onCreate(container) {
			container.opacity = 0;
			container.interval = 15;
			container.start();
		}
		onTimeChanged(container) {
			if ((container.opacity < 0.95 ) && up) {
				container.opacity = container.opacity + 0.05;
			} 
			else {
				up = false;
				if (timer == 75) {
					mainContainer.remove(mainContainer.last);
					up = true;
					timer = 0;
				} else {
					timer += 1;
				}
			}
		}
	}
}));

//Lightbox
let lightbox = Layer.template($ => ({ 
    top: $.top, height: 250, left: $.left, width: 230,
    behavior: $.behavior, skin: graySkin, opacity: 0.5,
    contents: [
        $.content
    ]
}));

let lightboxContent = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: redSkin, 
	contents: [
		$.content
	]
}));

let button = Container.template($ => ({
	top: $.top, bottom: $.bottom, right: $.right, left: $.left, height: $.height,
	skin: $.skin, active: true, 
	contents: [
		$.content
	],
	behavior: Behavior({
		onTouchBegan: $.onTouchBegan,
		onTouchEnded: function(container) {
			mainContainer.remove(currentScreen);
			trace('removed current screen \n')
			currentScreen = new $.nextScreen;
			trace('set equal to next screen \n')
			mainContainer.add(currentScreen);
			trace('added screen \n')
		}
	})
}));

let refillButton = Container.template($ => ({
	top: $.top, bottom: $.bottom, right: $.right, left: $.left, height: $.height,
	skin: $.skin, active: true, 
	contents: [
		$.content
	],
	behavior: Behavior({
		onTouchEnded: function(container) {
			if (refilled) {
				mainContainer.add(new lightbox({content: new lightboxContent({
					content: new Column({left: 0, right: 0, top: 0, bottom: 0,
						contents: [
						new xButton({style: whiteBodyStyle}),
						new Label({string: "Oops!", style: whiteHeadingStyle, top: 50}),
						new Text({left: 10, right: 10, string: "Looks like you can't refill at this time. Please contact your doctor if this is a mistake.", style: whiteSmallStyle})]})}),
					top: 75, left: 50}))
			} else {
				mainContainer.add(new refillConfirmation());
				refilled = true;	
			}
		}
	})
}));

let xButton = Container.template($ => ({
	top: 10, right: 10, active: true,
	contents: 
		[new Label({string: "x", style: $.style})],
	Behavior: class extends Behavior {
		onTouchEnded(button) {
			mainContainer.remove(mainContainer.last);
		}
	}
}));


/* Main Container */
var currentScreen;

let mainContainer = new Container({
	top: 0, bottom: 0, left: 0, right: 0, skin: whiteSkin,
	contents: [],
});



application.add(mainContainer);
application.behavior = Behavior({
	onLaunch: function(application) {
		//hard-coded in the notification screen just for the purpose of this assignment - Stacy
			currentScreen = new Picture({ left: 0, right: 0, height: 568, url: "assets/homescreennotification.png",
			active: true, 
			behavior: Behavior({ onTouchEnded(container) {currentScreen = new homeScreen(); mainContainer.add(currentScreen);}}), });
		mainContainer.add(currentScreen);
	}	
});

