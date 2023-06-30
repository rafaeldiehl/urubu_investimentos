<template>
  <div>
    <div class="page-content">
      <NavbarSide />
      <div class="dashboard-content">
        <div class="left-content">
          <div class="amount" v-if="user">
              <div class="bloco-tit">Saldo atual</div>
              <div class="amount-number">
                <div>
                  <strong> $ {{ user.investment_balance }}</strong>
                  <span>Atualizado hoje {{ date }}</span>
                </div>
                <button @click="loadUser">
                  <i class="las la-sync"></i>
                </button>
              </div>
          </div>
          <div class="cards-list">
            <div class="bloco-tit">Seus cartões</div>
            <div v-if="creditCards.length > 0" class="credit-card-list">
              <div v-for="card in creditCards" :key="card.id" class="card">
                <div class="card-number-title">{{ card.card_number }}</div>
                <div class="row-card">
                  <div><span>Expiração</span> <span>{{ card.expiration_date }}</span></div>
                  <div><span>CVV</span> <span>{{ card.cvv }}</span></div>
                </div>
                <div class="card-chip">
                  <img src="../assets/cc-chip.svg" alt="">
                </div>
                <div class="card-icon">
                  <img src="../assets/cc-icon.svg" alt="">
                </div>
              </div>
            </div>
            <div v-else class="bloco-erro">
              <i class="las la-exclamation-circle"></i> Nenhum cartão cadastrado
            </div>
          </div>
        </div>
        <div class="right-content">
          <ul class="history-container">
            <div class="bloco-tit">Histórico de Transações</div>
            <div v-if="transactions.length > 0" class="transactions-list">
              <div class="transaction" v-for="transaction in transactions" :key="transaction.id">
                <div class="transaction-left">
                  <p class="tipo">
                    <span v-if="transaction.transaction_type == 'deposit'">
                      Depósito
                    </span>
                    <span v-else-if="transaction.transaction_type == 'gain'">
                      Retorno de investimento
                    </span>
                    <span v-else-if="transaction.transaction_type == 'withdrawal'">
                      Retirada
                    </span>
                    <span v-else-if="transaction.transaction_type == 'investment'">
                      Investimento
                    </span>
                  </p>
                  <p class="data">{{ transaction.formattedDate }}</p>
                </div>
                <div class="transaction-right">
                  <p>
                    <span v-if="transaction.transaction_type == 'investment' || transaction.transaction_type == 'withdrawal'" class="prefix prefix-minus">
                      -
                    </span>
                    <span v-else class="prefix prefix-plus">
                      +
                    </span>
                    <span class="transaction-number">$ {{ transaction.amount }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="bloco-erro">
              <i class="las la-exclamation-circle"></i> Nenhum transação feita
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../services/axiosInstance';
import NavbarSide from '../components/NavbarSide.vue';
import moment from 'moment';

export default {
  name: 'DashboardView',
  components: {
    NavbarSide
  },
  mounted() {
    this.checkSession();
    this.loadUser();
    this.loadCreditCards();
    this.loadTransactions();
  },
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      user: null,
      creditCards: [],
      transactions: [],
      date: null
    };
  },
  computed: {
    formattedString() {
      return this.addSpaces(this.inputString);
    },
  },
  methods: {
    loadUser() {
      const userId = this.id;

      axiosInstance.get(`/users/${userId}`)
        .then(response => {
          this.user = response.data;
          var dataAtual = new Date();
          var horas = dataAtual.getHours();
          var minutos = dataAtual.getMinutes();
          var horasFormatadas = ("0" + horas).slice(-2);
          var minutosFormatados = ("0" + minutos).slice(-2);
          var dataFormatada = horasFormatadas + ":" + minutosFormatados;
          this.date = dataFormatada;
        })
        .catch(error => {
          console.error('Erro ao carregar informações do usuário:', error);
        });
    },
    loadCreditCards() {
      const userId = this.id;

      axiosInstance.get(`/users/${userId}/credit-cards`)
        .then(response => {
          this.creditCards = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadTransactions() {
      const userId = this.id;

      axiosInstance.get(`/users/${userId}/transactions`)
        .then(response => {
          this.transactions = response.data.map(transaction => {
            const formattedDate = moment(transaction.transaction_date).format('DD/MM/YYYY');
            return {
              ...transaction,
              formattedDate
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    checkSession() {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        this.$router.push('/login');
      }
    },
    addSpaces(string) {
      const regex = /(.{4})/g;
      return string.replace(regex, '$1 ');
    },
  }
}
</script>

<style lang="scss">
.page-content {
  width: 100vw;
  display: flex;
  flex-direction: row;
}

.dashboard-content {
  display: flex;
  width: calc(100% - 250px);
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 50px;
}

.amount {
  background: #191919;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: 8px;
  height: 155px;
  padding: 20px;
  position: relative;

  .amount-number {
    margin-top: 5px;

    >div {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 32px;
        font-weight: 500;
      }

      span {
        font-weight: 300;
        font-size: 14px;
        color: rgba(#fff, 0.6);
      }
    }
  }

  button {
    position: absolute;
    cursor: pointer;
    background: none;
    border: none;
    top: 20px;
    right: 20px;

    i {
      font-size: 23px;
      color: rgba(#fff, 0.4);
      transition: .3s;

      &:hover {
        color: #fff;
      }
    }
  }

  p {
    font-weight: 300;
    font-size: 18px;

    strong {
      font-weight: 500;
      color: var(--primary-color);
    }
  }
}

.cards-list {
  overflow-y: auto;
  background: #191919;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: 8px;
  height: calc(100vh - 295px);
  max-height: 390px;
  margin-top: 30px;
  padding: 20px;
  width: 355px;
}

.history-container {
  overflow-y: auto;
  background: #191919;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: 8px;
  height: calc(100vh - 100px);
  max-height: 570px;
  padding: 20px;
  width: 400px;
}

.bloco-tit {
  font-weight: 300;
  padding-bottom: 8px;
  margin-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid rgba(#fff, 0.1);
}

.bloco-erro {
  font-weight: 300;
  font-size: 14px;
  color: rgba(#fff, 0.4);
  height: calc(100% - 60px);
  margin-top: 10px;
  
  i {
    margin-right: 3px;
  }
}

.transactions-list {
  display: flex;
  flex-direction: column-reverse;
  margin-top: 10px;
  gap: 10px;

  .prefix {
    &.prefix-minus {
      color: #e64f41;
    }

    &.prefix-plus {
      color: #2f8d3e;
    }
  }

  .transaction-left {
    .tipo {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 14px;
    }

    .data {
      font-size: 13px;
      font-weight: 300;
      color: rgba(#fff, 0.5);
    }
  }

  .transaction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .transaction-number {
    font-weight: 400;
    font-size: 18px;
  }
}

.credit-card-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  .card {
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(#fff, 0.2);
    background: radial-gradient(at top, rgba(68,175,187,0.2) 0%, rgba(68,175,187,0.1) 25%, rgba(0,212,255,0) 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 180px;

    .card-chip {
      position: absolute;
      bottom: 15px;
      right: 20px;
    }

    .card-icon {
      position: absolute;
      top: 25px;
      left: 25px;
    }

    .card-number-title {
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 1px;
      font-family: 'Roboto Mono', monospace;
    }

    .row-card {
      display: flex;
      gap: 60px;
      margin-top: 15px;

      div {
        display: flex;
        flex-direction: column;
        font-size: 11px;
        font-weight: 300;

        span {
          &:last-child {
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>