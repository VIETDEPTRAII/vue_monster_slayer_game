// Random a number(integer) between min and max
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    }
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return {
          width: '0%',
        }
      }
      return {
        width: this.monsterHealth + '%'
      }
    },

    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return {
          width: '0%',
        }
      }

      return {
        width: this.playerHealth + '%'
      }
    },

    canUseSpecialAttackMonster() {
      return this.currentRound % 3 !== 0;
    },

    canPlay() {
      return this.winner != null;
    }
  },

  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },

    attackMonster() {
      this.currentRound++;
      // Random a number(integer) between 5 and 12
      const health = getRandomValue(5, 12);
      this.monsterHealth -= health;
      this.addLogMessage('player', 'attack', health);
      this.attackPlayer();
    },

    specialAttackMonster() {
      this.currentRound++;
      const health = getRandomValue(10, 25);
      this.monsterHealth -= health;
      this.addLogMessage('player', 'attack', health);
      this.attackPlayer();
    },

    attackPlayer() {
      // Random a number(integer) between 8 and 15
      const health = getRandomValue(8, 15);
      this.playerHealth -= health;
      this.addLogMessage('monster', 'attack', health);
    },

    healthPlayer() {
      this.currentRound++;
      const health = getRandomValue(8, 20);
      this.playerHealth += health;
      this.addLogMessage('player', 'heal', health);
      this.attackPlayer();
    },

    surrender() {
      this.playerHealth = 0;
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
      console.log(this.logMessages);
    }
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'monster'
      }

      if (value > 100) {
        this.playerHealth = 100;
      }
    },

    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'player'
      }
    }
  }
});

app.mount('#game');
