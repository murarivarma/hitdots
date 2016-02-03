var Game;

Game = {
  clearHoles: function() {
    return $.each($('table td label input'), function(index, value) {
      return value.checked = false;
    });
  },
  stopTimer: function() {
    if (Game.playing) {
      return window.clearTimeout(Game.timerID);
    }
  },
  showTime: function(remTime) {
    var temp;
    $('input:first').attr("value", "" + remTime);
    if (Game.playing) {
      if (remTime === 0) {
        Game.stopGame();
      } else {
        temp = remTime - 1;
        return Game.timerID = setTimeout("Game.showTime(" + temp + ")", 1000);
      }
    }
  },
  stopGame: function() {
    Game.stopTimer();
    Game.playing = false;
    $('time').value = 0;
    Game.clearHoles();
    alert('Game Over.\nYour score is:  ' + Game.totalhits);
    return $('#score').val("0");
  },
  play: function() {
    Game.stopTimer();
    if (Game.playing) {
      Game.stopGame();
      return;
    }
    Game.playing = true;
    Game.clearHoles();
    Game.totalhits = 0;
    $('.score-board #score').attr("value", "" + Game.totalhits);
    Game.launch();
    return Game.showTime(Game.gamelength);
  },
  launch: function() {
    var dot, launched, mynum, results;
    launched = false;
    results = [];
    while (!launched) {
      if (Game.currentpos !== -1) {
        dot = $('td input')[Game.currentpos];
        dot.checked = false;
      }
      mynum = Game.random();
      if (mynum !== Game.currentpos) {
        dot = $('table td label input')[mynum];
        dot.checked = true;
        Game.currentpos = mynum;
        results.push(launched = true);
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  hithead: function(id) {
    var identity;
    if (Game.playing === false) {
      Game.clearHoles();
      return;
    }
    identity = parseInt(id);
    if (Game.currentpos !== identity) {
      Game.playAudio("missed");
      Game.totalhits += -1;
      $('#score').val(Game.totalhits);
      return Game.launch();
    } else {
      Game.playAudio("successhit");
      Game.totalhits += 1;
      $('#score').val(Game.totalhits);
      return Game.launch();
    }
  },
  random: function() {
    return Math.floor(Math.random() * Game.numholes);
  },
  onClick: function() {
    if (Game.playing === false) {
      return $('.startstop_button').click(function() {
        return Game.play();
      });
    } else {
      Game.playing === true;
      return $('.startstop_button').click(function() {
        return Game.stopGame();
      });
    }
  },
  hitdot: function() {
    return $('.dot-radio-button').click(function() {
      var idValue;
      idValue = $(this).attr('id');
      return Game.hithead(idValue);
    });
  },
  audio: {},
  list: {
    "hit": "../sounds/hit.mp3",
    "missed": "../sounds/missed.mp3",
    "successhit": "../sounds/successhit.mp3"
  },
  playAudio: function(name) {
    var ref, ref1;
    if ((ref = this.audio[name]) != null) {
      ref.currentTime = 0;
    }
    return (ref1 = this.audio[name]) != null ? ref1.play() : void 0;
  },
  init: function() {
    var name, ref, results, url;
    Game.gamelength = 30;
    Game.timerID = null;
    Game.playing = false;
    Game.numholes = 10 * 10;
    Game.currentpos = -1;
    Game.clearHoles();
    Game.onClick();
    Game.hitdot();
    ref = this.list;
    results = [];
    for (name in ref) {
      url = ref[name];
      results.push(this.audio[name] = new Audio("resources/" + url));
    }
    return results;
  }
};

$(function() {
  return Game.init();
});
