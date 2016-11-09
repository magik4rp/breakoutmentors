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

//added a green & red style and changed their sizes! -Stacy
var blackHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'black', horizontal: 'center'});
var boldBlackBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: 'black', horizontal: 'center'});
var blackBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'black', horizontal: 'center'});
var whiteHeadingStyle = new Style ({ font: '38px Avenir-Heavy', color: 'white', horizontal: 'center'});
var whiteBodyStyle = new Style ({ font: '20px Avenir-Roman', color: 'white', horizontal: 'center'});
var greenBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#5AA700', horizontal: 'center'});
var redBodyStyle = new Style ({ font: 'bold 20px Avenir-Roman', color: '#E71D32', horizontal: 'center'});

/*  Templates */

//Home Screen
let completedpills = "Sertraline, Vitamin A";
let incompletepills = "none";
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
let dateBox = new Line({
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
});
let homeScreen = Column.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, skin: whiteSkin,
	contents: [
		dateBox,
		new Label({ name: 'completed', top: 20, string: 'Completed', style: greenBodyStyle }),
		completedlist,
		new Label({ name: 'incomplete', string: 'Incomplete', style: redBodyStyle }),
		incompletelist,
		new button({ name: 'myMedicineButton', top: 120, left: 60, right: 60, bottom: 5,
			skin: graySkin, 
				content: new Label({ string: "MY MEDICINE", style: whiteBodyStyle }),
				onTouchBegan: function(container) {container.skin = whiteSkin},
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
let myMedicineScreen = Container.template($ => ({

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
		new button({ name: 'editButton', top: 0, left: 240, right: 0, bottom: 0,
			skin: whiteSkin, 
			content: new Picture({ height: 30, url: "assets/editicon.png" }),	
		}),		pillDetails,		new button({ name: "requestRefillButton", top: 100, left: 60, right: 60, bottom: 20,
			skin: graySkin,
			content: new Label({ string: "REQUEST REFILL", style: whiteBodyStyle })
		}),
	],
}));

//Refill Confirmation
let refillConfirmation = Container.template($ => ({

}));

//Lightbox
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

let mainContainer = new Container({
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

