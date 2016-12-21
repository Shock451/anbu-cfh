angular.module('mean.system')
.controller('GameTourController', ['$scope', '$window', function ($scope, $window) {
  // exit game tour when we navigate pages
  $scope.$on('$locationChangeSuccess', () => {
    if ($scope.gameTour) {
      $scope.gameTour.exit();
    }
  });

  $scope.gameTour = introJs();
  $scope.expandChat = 'expand_more';
  $scope.playerCount = 1;
  $scope.playerScore = 0;
  $scope.awaitingPlayers = true;
  $scope.gameTour.setOption('showBullets', false);
  $scope.gameTour.setOptions({
    steps: [
      {
        intro: `This guided tour will explain how to play Cards For Humanity.
          Use the arrow keys for navigation or hit ESC to exit the
         tour and proceed to playing the game.`
      },
      {
        element: '#find-players',
        intro: `Game needs a minimum of 3 players to start.
          You have to wait for minimum number of players to join the game.`
      },
      {
        element: '#player-container',
        intro: 'Here you have info about yourself and the current game.'
      },
      {
        element: '#player-avatar',
        intro: 'This is your Avatar.'
      },
      {
        element: '#player-star',
        intro: `Icon to for you to easily identify yourself amongst
         other players.`
      },
      {
        element: '#player-score',
        intro: `You score during each round of  the game. The game continues 
        until a player wins 5 rounds i.e 5/5.`
      },
      {
        element: '#start-game-button',
        intro: `Once minimum required players have joined, you or any other user
         can start the game by clicking on the start game button.`
      },
      {
        element: '#question',
        intro: 'Once a game is started, a question is displayed.'
      },
      {
        element: '#cards',
        intro: `You also have different answer cards to pick what you deem
         the most appropriate answer to the question.`,
        position: 'top'
      },
      {
        element: '#time-card',
        intro: `Timer counts down. You have a limited time to choose an answer
          to the current question. After time out, the CZAR is also given a
          limited time to select a favorite answer. Player who submitted
          the CZARs favorite answer wins the round. The game proceeds to
          another round and the next CZAR is chosen`
      },
      {
        element: '#is-czar',
        intro: `You might be the next CZAR, check the CZAR icon to 
          know the next CZAR. As a Czar, you wait for all players to
          submit their answers after which you pick what you feel is the most
          appropriate answer to the question. The Player who submitted that
          answer wins the round. The game proceeds to another round`
      },
      {
        element: '#notifications',
        intro: `Your in-app notifications are shown here. Click to view
         a drop down of listing game invites from your friends`,
         position: 'left'
      },
      {
        element: '#requests',
        intro: `You can add other users as friends and also send in app 
        notifications to users that are you friends to join your current game.`,
        position: 'left'
      },
      {
        element: '#chat',
        intro: 'While in a game, you can chat with other players.',
        position: 'top'
      },
      {
        element: '#join-new-game',
        intro: `After a game ends (because too many players left the game 
        or a player won), you can join a new game.`,
        position: 'top'
      },
      {
        element: '#return-to-lobby',
        intro: 'You could also return to the lobby once the game hends.',
        position: 'top'
      },
      {
        element: '#abandon-game-button',
        intro: 'You can also abandon a game at any point in the game.'
      },
      {
        element: '#signout',
        intro: 'You could also signout here',
        position: 'top'
      },
      {
        element: '#home',
        intro: 'You could also return to the homepage',
        position: 'bottom'
      }

    ]
  });

  const isGameCustom = () => {
    const custom = $window.location.href.indexOf('custom') >= 0;
    return (custom);
  };

  const tourComplete = () => {
    if (isGameCustom()) {
      $window.location = '/play?custom';
    } else {
      $window.location = '/play';
    }
  };

  const beforeTourChange = (targetElement) => {
    switch (targetElement.id) {
    case 'find-players': {
      $scope.$apply(() => {
        $scope.awaitingPlayers = true;
      });
      break;
    }
    case 'player-score': {
      $scope.$apply(() => {
        $scope.awaitingPlayers = true;
        $scope.showOtherPlayers = false;
        $scope.showStartButton = false;
      });
      break;
    }
    case 'start-game-button': {
      $scope.$apply(() => {
        $scope.awaitingPlayers = false;
        $scope.showOtherPlayers = true;
        $scope.showStartButton = true;
        $scope.showTime = false;
        $scope.showQuestion = false;
      });
      break;
    }
    case 'question': {
      $scope.$apply(() => {
        $scope.showStartButton = false;
        $scope.showTime = true;
        $scope.showQuestion = true;
      });
      break;
    }
    case 'cards': {
      $scope.$apply(() => {
        $scope.showCzar = false;
      });
      break;
    }
    case 'time-card': {
      $scope.$apply(() => {
        $scope.showQuestion = true;
        $scope.gameEnd = false;
        $scope.playerScore = 0;
      });
      break;
    }
    case 'is-czar': {
      $scope.$apply(() => {
        $scope.showCzar = true;
        $scope.playerScore = 1;
      });
      break;
    }
    case 'join-new-game': {
      $scope.$apply(() => {
        $scope.showQuestion = false;
        $scope.gameEnd = true;
        $scope.showChatBody = false;
        $scope.expandChat = 'expand_less';
      });
      break;
    }
    case 'chat': {
      $scope.$apply(() => {
        $scope.showChatBody = true;
        $scope.expandChat = 'expand_more';
      });
      break;
    }
    case 'requests': {
      $scope.$apply(() => {
        $scope.showChatBody = false;
        $scope.expandChat = 'expand_less';
      });
      break;
    }
    default: {
      // we don't want to do anything on the default cases
    }
    }
  };

  $scope.gameTour.start()
    .oncomplete(tourComplete)
    .onexit(tourComplete)
    .onbeforechange(beforeTourChange);
}]);
