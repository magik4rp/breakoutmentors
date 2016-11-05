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

var blackHeadingStyle = new Style ({ font: '30px Avenir-Heavy', color: 'black', horizontal: 'center'});
var blackBodyStyle = new Style ({ font: '14px Avenir-Roman', color: 'black', horizontal: 'center'});
var whiteHeadingStyle = new Style ({ font: '30px Avenir-Heavy', color: 'white', horizontal: 'center'});
var whiteBodyStyle = new Style ({ font: '14px Avenir-Roman', color: 'white', horizontal: 'center'});

/*  Templates */
let homeScreen = Container.template($ => ({

}));

let myMedicineScreen = Container.template($ => ({

}));

let individualMedicineScreen = Container.template($ => ({

}));

let refillConfirmation = Container.template($ => ({

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