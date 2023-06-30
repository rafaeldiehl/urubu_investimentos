<template>
  <div class="flex-center-100vh">
    <div class="page-content">
      <NavbarSide />
      <div class="form-wrp page-section-content">
        <form @submit.prevent="submitForm">
          <h3>Investimento no Urubu do Pix</h3>
          <div class="field">
            <label for="amount">
              Valor
            </label>
            <div class="input-wrp">
              <i class="las la-dollar-sign"></i>
              <input v-model="amount" name="amount" type="text" placeholder="0.00" required />
            </div>
          </div>
          <div class="tip"><i class="lar la-question-circle"></i> Ganho de até 10 vezes o valor em 20 segundos</div>
          <button type="submit" class="btn btn-primary">
            Investir
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
      amount: '',
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
      const investmentData = {
        userId: Number(this.id),
        amount: Number(this.amount)
      };

      console.log(investmentData);
      this.amount = '';

      // Fazer a requisição POST usando o Axios
      axiosInstance.post('/transactions/investment', investmentData)
        .then(response => {
          console.log(response.data);

          this.successMessage = true;
        })
        .catch(error => {
          console.error('Erro ao fazer investimento: ', error);
          this.errorMessage = true;
        });
    }
  },
}
</script>

<style lang="scss">
.tip {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(#fff, 0.5);
  gap: 5px;

  i {
    font-size: 16px;
  }
}
</style>