<template>
  <div class="flex-center-100vh">
    <div class="form-wrp flex-center">
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">
            <i class="las la-times"></i>
          </span>
          <img src="../assets/naruto.png" alt="Naruto">
          <p>Parabéns! Você obteve um nome ninja</p>
          <h2>Naruto Uzumaki (Kage)</h2>
        </div>
      </div>
      <form action="#">
        <h3>Cadastrar Cartão de Crédito</h3>
        <div class="field">
          <label for="cardholder_name">
            Nome do Titular
          </label>
          <div class="input-wrp">
            <i class="las la-user"></i>
            <input name="cardholder_name" type="text" placeholder="Nome do Titular" required />
          </div>
        </div>
        <div class="field">
          <label for="card_number">
            Número do Cartão
          </label>
          <div class="input-wrp">
            <i class="las la-credit-card"></i>
            <input type="text" name="card_number" id="card_number" v-model="cardNumber" placeholder="•••• •••• •••• ••••" required />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="expiry_date">
              Data de Expiração
            </label>
            <div class="input-wrp">
              <i class="las la-hourglass"></i>
              <input name="expiry_date" type="text" placeholder="mm/aa" required />
            </div>
          </div>
          <div class="field">
            <label for="cvc">
              CVC
            </label>
            <div class="input-wrp">
              <i class="las la-lock"></i>
              <input name="cvc" type="text" placeholder="•••" required />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CreateCreditCardView',
  setup() {
    const isModalOpen = ref(true);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal
    };
  }
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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #191919;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid rgba(#fff, 0.15);;
  width: 500px;
  position: relative;

  img {
    width: 90%;
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