/* globals AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME' +
        ' was available.');
}

var play = false;

/**
 * Hyper Link component for A-Frame.
 */
AFRAME.registerComponent('videoplay', {
    schema: {
        default: ''
    },


    boundClickHandlerPlay: undefined,
    boundClickHandlerStop: undefined,

    clickHandlerPlay: function hrefClickHandler() {
        console.log('play: ',this.el.id);
        var video = document.getElementById(this.el.id);
        video.play();
        play = true;
    },


    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function() {
        console.log("VIDEOPLAY" , this.el.id , this.el);

        this.boundClickHandlerPlay = this.clickHandlerPlay.bind(this);
        this.el.addEventListener('click', this.boundClickHandlerPlay);
    },
    tick: function() {
        var visibile = document.querySelector("a-marker").object3D.visible;
        if(!visibile && play)
        {
            var video = document.getElementById(this.el.id);
            video.pause();
            video.currentTime = 0;
            play = false;
        }
    },
    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function() {
        this.el.removeEventListener('click', this.boundClickHandlerPlay);
    }
});