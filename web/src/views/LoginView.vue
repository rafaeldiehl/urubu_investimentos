<template style="overflow: hidden">
  <div class="login-page flex-center">
    <div class="container flex-center">
      <div class="bg-image">
        <img src="../assets/urubu.png" alt="Urubu do Pix">
      </div>
      <header class="login-header flex-center flex-col">
        <img class="logo-form" alt="Logo do Urubu do Pix" src="../assets/logo.png">
        <h1>
          O melhor <b>investimento</b><br>
          para seu dinheiro.
        </h1>
        <h2>seguro, prático e rápido</h2>
        <div class="trading-table">
          <h3>Tabela de Trading</h3>
          <ul>
            <li>$200 retorno 2000</li>
            <li>$250 retorno 2500</li>
            <li>$300 retorno 3000</li>
            <li>$350 retorno 3500</li>
            <li>$400 retorno 4000</li>
            <li>$500 retorno 5000</li>
          </ul>
        </div>
      </header>
      <div class="form-wrp flex-center">
        <form @submit.prevent="login">
          <h3>Entrar com conta <i class="las la-question-circle"></i></h3>
          <div class="field">
            <label for="email">
              E-mail
            </label>
            <div class="input-wrp">
              <i class="las la-user"></i>
              <input v-model="email" name="email" type="email" placeholder="fulano@exemplo.com" required />
            </div>
          </div>
          <div class="field">
            <label for="password">
              Senha
            </label>
            <div class="input-wrp">
              <i class="las la-lock"></i>
              <input v-model="password"  type="password" name="password" id="password" placeholder="•••••••••" required />
            </div>
          </div>
          <div class="field-radio">
            <div class="checkbox">
              <i class="las la-check"></i>
            </div>
            Não li a <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Política de Privacidade</a>, nem os <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Termos de Uso</a>
          </div>
          <button type="submit"  class="btn btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axiosInstance from '../services/axiosInstance';

export default {
  name: 'LoginView',
  components: {

  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axiosInstance.post('/login', {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          sessionStorage.setItem('userId', response.data.id);
          this.$router.push('dashboard');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="scss">
body {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #181818, var(--background-color));
}

.login-page {
  height: 100vh;

  .bg-image {
    position: absolute;
    top: 0;
    left: -160px;
    z-index: 0;
    opacity: 0.05;

    img {
      height: 100vh;
    }
  }

  .container {
    z-index: 1;
    height: 100%;

    header {
      width: 100%;
    }

    .form-wrp {
      width: 100%;
    } 
  }
}

.checkbox {
  width: 15px;
  height: 15px;
  background: #9292fc;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  margin-right: 10px;
}

.form-wrp {
  position: relative;

  form {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 500px;
  }

  .field-radio {
    font-weight: 200;
    font-size: 15px;
    display: flex;
    align-items: center;

    a {
      font-weight: 300;
      margin-left: 5px;
      color: var(--primary-color);
    }
  }

  .field {
    display: flex;
    flex-direction: column;

    input,
    select {
      border: none;
      border: 1px solid rgba(#fff, 0.15);
      background: #191919;
      font-size: 16px;
      padding: 14px 10px;
      border-radius: 6px;
      color: #fff;

      &:focus,
      &:valid {
        border: 2px solid var(--primary-color);
      }
    }

    label {
      font-size: 14px;
      margin-bottom: 3px;
    }
  }

  .field-row {
    display: flex;
    gap: 10px;
    position: relative;

    .field {
      position: relative;
      width: calc(50% - 5px);
    }
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(#fff, 0.15);
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    gap: 10px;

    i {
      font-size: 23px;
      opacity: 0.3;
    }
  }

  .btn {
    width: 100%;
    margin-top: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

.input-wrp {
  position: relative;

  i {
    position: absolute;
    top: 50%;
    left: 15px;
    font-size: 19px;
    transform: translateY(-50%);
    color: #888;
  }

  input {
    width: 100%;
    padding-left: 45px !important;
  }
}

.logo-form {
  width: 190px;
  margin-bottom: 10px;
}

.login-header {
  gap: 15px;
}

.trading-table {
  margin-top: 20px;

  h3 {
    font-weight: 500;
    font-size: 19px;
    margin-bottom: 5px;
    letter-spacing: 0.5px;
  }

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 17px;
      font-weight: 200;
      letter-spacing: 1px;
      text-align: center;
    }
  }
}
</style>