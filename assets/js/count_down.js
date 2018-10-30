//Define the date
date = {
    days:0,
    hours:0,
    minutes:0,
    seconds:0
}
var countDownDate = new Date("Nov 07, 2018 14:01:00").getTime();
var now = new Date().getTime();
var distance = countDownDate - now;

date.days = Math.floor(distance / (1000 * 60 * 60 * 24));
date.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
date.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
date.seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementsByClassName("day").innerHTML = date.days; 

var Countdown = {
  
  $el: $('.countdown'),
  
  countdown_interval: null,
  total_seconds     : 0,
  
  init: function() {
    
		this.$ = {
        days : this.$el.find('.bloc-time.days .figure'),
    	hours  : this.$el.find('.bloc-time.hours .figure'),
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    this.values = {
        days  : date.days,
	    hours  : date.hours,
        minutes: date.minutes,
        seconds: date.seconds,
    };
    
    this.total_seconds = this.values.days * 24 * 60 * 60 + (this.values.hours * 60 * 60) + (this.values.minutes * 60) + this.values.seconds;

    this.count();    
  },
  
  count: function() {
    
    var that    = this,
        $day_1 = this.$.days.eq(0),
        $day_2 = this.$.days.eq(1),
        $hour_1 = this.$.hours.eq(0),
        $hour_2 = this.$.hours.eq(1),
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);
    
        this.countdown_interval = setInterval(function() {

        if(that.total_seconds > 0) {

            --that.values.seconds;              

            if(that.values.minutes >= 0 && that.values.seconds < 0) {

                that.values.seconds = 59;
                --that.values.minutes;
            }

            if(that.values.hours >= 0 && that.values.minutes < 0) {

                that.values.minutes = 59;
                --that.values.hours;
            }

            if(that.values.days >= 0 && that.values.hours < 0) {

                that.values.hours = 23;
                --that.values.days;
            }
            that.checkHour(that.values.days, $day_1, $day_2);
            that.checkHour(that.values.hours, $hour_1, $hour_2);
            that.checkHour(that.values.minutes, $min_1, $min_2);
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
        }
        else {
            clearInterval(that.countdown_interval);
        }
    }, 1000);    
  },
  
  animateFigure: function($el, value) {
    
     var that        = this,
		$top         = $el.find('.top'),
        $bottom      = $el.find('.bottom'),
        $back_top    = $el.find('.top-back'),
        $back_bottom = $el.find('.bottom-back');

    $back_top.find('span').html(value);
    $back_bottom.find('span').html(value);

    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, { 
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut, 
        clearProps          : 'all' 
    });    
  },
  
  checkHour: function(value, $el_1, $el_2) {
    
    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }    
  }
};

Countdown.init();