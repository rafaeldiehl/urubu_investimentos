<template>
  <div class="flex-center-100vh">
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">
          <i class="las la-times"></i>
        </span>
        <img src="../assets/naruto.png" alt="Naruto">
        <p>Parabéns! Você obteve um nome ninja</p>
        <h2>{{ creditCard.ninjaName }} {{ creditCard.ninjaClan }} ({{ creditCard.ninjaRank }})</h2>
      </div>
    </div>
    <div class="page-content">
      <NavbarSide />
      <div class="form-wrp page-section-content">
        <form @submit.prevent="submitForm">
          <h3>Cadastrar Cartão de Crédito</h3>
          <div class="field">
            <label for="card_number">
              Número do Cartão
            </label>
            <div class="input-wrp">
              <i class="las la-credit-card"></i>
              <input v-model="card_number" type="text" name="card_number" id="card_number" placeholder="•••• •••• •••• ••••" required />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="expiration_date">
                Data de Expiração
              </label>
              <div class="input-wrp">
                <i class="las la-hourglass"></i>
                <input v-model="expiration_date" name="expiration_date" type="text" placeholder="mm/aa" required />
              </div>
            </div>
            <div class="field">
              <label for="cvv">
                CVV
              </label>
              <div class="input-wrp">
                <i class="las la-lock"></i>
                <input  v-model="cvv" name="cvv" type="text" placeholder="•••" required />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Cadastrar
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
  },
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      isModalOpen: false,
      creditCard: null,
      card_number: '',
      expiration_date: '',
      cvv: ''
    };
  },
  methods: {
    checkSession() {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        this.$router.push('/login');
      }
    },
    logout() {
      sessionStorage.removeItem('userId');
      this.$router.push('/login');
    },
    openModal () {
      this.isModalOpen = true;
    },
    closeModal () {
      this.isModalOpen = false;
    },
    submitForm() {
      // Construir o objeto com os dados do cartão
      const cardData = {
        userId: this.id,
        cardNumber: this.card_number,
        expirationDate: this.expiration_date,
        cvv: this.cvv
      };

      // Fazer a requisição POST usando o Axios
      axiosInstance.post('/credit-cards', cardData)
        .then(response => {
          // Atualizar a lista de cartões de crédito com a resposta da API
          this.creditCard = response.data;
          console.log(this.creditCard);
          // Limpar os campos do formulário
          this.card_number = '';
          this.expiration_date = '';
          this.cvv = '';

          this.isModalOpen = true;
        })
        .catch(error => {
          console.error('Erro ao cadastrar o cartão de crédito:', error);
        });
    }
  },
}
</script>

<style lang="scss">
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #191919;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid rgba(#fff, 0.15);;
  width: 480px;
  position: relative;

  img {
    width: 87%;
    margin-bottom: 20px;
  }

  text-align: center;

  p {
    font-weight: 300;
  }

  h2 {
    font-weight: 600;
    color: var(--primary-color);
    margin-top: 5px;
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
}
</style>