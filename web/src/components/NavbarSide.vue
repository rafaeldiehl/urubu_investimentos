<template>
  <nav class="navbar">
    <ul>
      <img src="../assets/logo_vertical.png" alt="Urubu do Pix Investimentos">
      <li>
        <router-link active-class="active" to="dashboard"><i class="las la-th-large"></i> Dashboard</router-link>
      </li>
      <li>
        <router-link active-class="active" to="investment"><i class="las la-coins"></i> Investir</router-link>
      </li>
      <li>
        <router-link active-class="active" to="deposit"><i class="las la-piggy-bank"></i> Depositar na Carteira</router-link>
      </li>
      <li>
        <router-link active-class="active" to="withdrawal"><i class="las la-wallet"></i> Retirar da Carteira</router-link>
      </li>
      <li>
        <router-link active-class="active" to="register-card"><i class="las la-credit-card"></i> Cadastrar Cartão</router-link>
      </li>
    </ul>
    <a class="logout-link" @click="logout">
      Sair da conta
      <i class="las la-sign-in-alt"></i>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavbarSide',
  methods: {
    logout() {
      sessionStorage.removeItem('userId');
      this.$router.push('/login');
    }
  },
  props: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100vh;
  width: 250px;
  background-color: #131313;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    li {
      width: 100%;
      text-align: left;

      a {
        color: rgba(#fff, 0.5);
        transition: .3s;
        font-weight: 300;
        font-size: 15px;
        
        &:hover {
          color: var(--primary-color);
        }
        display: flex;
        align-items: center;
        gap: 10px;
        
        i {
          font-size: 22px;
        }
      }

        .router-link-exact-active {
          color: var(--primary-color);
          font-weight: 500;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 3px;
            background-color: var(--primary-color);
            top: 0;
            left: -20px;
          }
        }
    }
  }

  img {
    width: 90%;
    margin-bottom: 35px;
  }
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin-bottom: 10px;
}

.navbar a {
  text-decoration: none;
  color: #333;
}

.navbar a:hover {
  color: #000;
}

.logout-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-weight: 400;
  color: lighten(#c43b2e, 10) !important;
  padding: 12px 0;
  width: 100%;
  text-align: center;
  background: rgba(#c43b2e, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: .3s;
  font-size: 15px;

  i {
    font-size: 18px;
  }

  &:hover {
    color: #fff !important;
    background: #c43b2e;
  }
}
</style>
