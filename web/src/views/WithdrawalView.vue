<template>
  <div class="flex-center-100vh">
    <div class="page-content">
      <NavbarSide />
      <div class="form-wrp page-section-content">
        <form @submit.prevent="submitForm">
          <h3>Retirar da Carteira</h3>
          <div class="field">
            <label for="amount">
              Valor
            </label>
            <div class="input-wrp">
              <i class="las la-dollar-sign"></i>
              <input v-model="amount" name="amount" type="text" placeholder="0.00" required />
            </div>
          </div>
          <div class="field">
            <label for="card_number">
              Cartão de Crédito (Destino)
            </label>
            <div class="custom-select">
              <i class="las la-credit-card"></i>
              <select v-model="card_number" id="card_number" required>
                <option value="" disabled selected>Selecione</option>
                <option v-for="card in creditCards" :key="card.id" :value="card.id">{{ card.card_number }}</option>
              </select>
              <div class="arrow"></div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Retirar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import axiosInstance from '../services/axiosInstance';
import NavbarSide from '@/components/NavbarSide.vue';
import axiosInstance from '@/services/axiosInstance';

export default {
  name: 'RegisterCardView',
  components: {
    NavbarSide
  },
  mounted() {
    this.checkSession();
    this.loadCreditCards();
  },
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      creditCards: [],
      card_number: '',
      successMessage: false,
      errorMessage: false
    };
  },
  methods: {
    checkSession() {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        this.$router.push('/login');
      }
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
    submitForm() {
      const withdrawalData = {
        userId: Number(this.id),
        creditCardId: Number(this.card_number),
        amount: Number(this.amount)
      };

      console.log(withdrawalData);

      axiosInstance.post('/transactions/withdrawal', withdrawalData)
        .then(response => {
          console.log(response.data);
          this.card_number = '';
          this.amount = '';

          this.successMessage = true;
        })
        .catch(error => {
          console.error('Erro ao fazer retirada:', error);
          this.errorMessage = true;
        });
    }
  },
}
</script>

<style lang="scss">
.custom-select {
  position: relative;
  display: inline-block;
}

.custom-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 0;
}

.arrow {
  position: absolute;
  z-index: 5;
  top: 38%;
  right: 20px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-left: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  background-color: transparent;
  pointer-events: none;
  transform: rotate(-45deg);
}
</style>