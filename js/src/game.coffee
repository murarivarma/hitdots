Game =
  clearHoles: ->
    $.each $('table td label input'), (index, value) ->
      # debugger
       value.checked = false
      #$(value).attr "checked", "true"
  stopTimer: ->
    if Game.playing
      # Game.timerID = null
      window.clearTimeout(Game.timerID)
  showTime: (remTime) ->
    $('input:first').attr "value", "#{remTime}"
    if Game.playing
      if remTime == 0
        Game.stopGame()
        return
      else
        temp = remTime - 1
        Game.timerID = setTimeout("Game.showTime(#{temp})", 1000)
  stopGame: ->
    Game.stopTimer()
    Game.playing = false
    $('time').value = 0
    Game.clearHoles()
    alert('Game Over.\nYour score is:  '+Game.totalhits)
  play: ->
    Game.stopTimer()
    if Game.playing
      Game.stopGame()
      return
    Game.playing = true
    Game.clearHoles()
    Game.totalhits = 0
    $('.score-board #score').attr "value", "#{Game.totalhits}"
    Game.launch()
    Game.showTime(Game.gamelength)
  launch: ->
    launched = false
    while !launched
      if Game.currentpos != -1
        dot = $('td input')[Game.currentpos]
        dot.checked = false
      mynum = Game.random()
      if mynum!=Game.currentpos
        dot = $('table td label input')[mynum]
        dot.checked = true
        Game.currentpos = mynum
        launched = true
  hithead: (id) ->
    if Game.playing == false
      Game.clearHoles()
      return
    identity = parseInt(id)
    if Game.currentpos != identity
      # Game.hitAudio.play()
      Game.playAudio "missed"
      Game.totalhits += -1
      $('#score').val(Game.totalhits)
      Game.launch()
    else
      # Game.missedAudio.play()
      Game.playAudio "successhit"
      Game.totalhits += 1
      $('#score').val(Game.totalhits)
      Game.launch()

  random: ->
    Math.floor(Math.random()*Game.numholes)
  onClick: ->
    if Game.playing == false
      $('.startstop_button').click ->
        Game.play()
    else
      Game.playing == true
      $('.startstop_button').click ->
        Game.stopGame()
  hitdot: ->
    $('.dot-radio-button').click ->
      idValue =  $(this).attr('id')
      Game.hithead(idValue)

  audio: {}
  list:
    "hit": "../sounds/hit.mp3"
    "missed": "../sounds/missed.mp3"
    "successhit": "../sounds/successhit.mp3"

  playAudio: (name) ->
    @audio[name]?.currentTime = 0;
    @audio[name]?.play()
  init: ->
    Game.gamelength = 30
    Game.timerID = null
    Game.playing = false
    Game.numholes = 10 * 10
    Game.currentpos = -1
    Game.clearHoles()
    Game.onClick()
    Game.hitdot()
    @audio[name] = new Audio "resources/#{url}" for name, url of @list
$ ->
  Game.init()
