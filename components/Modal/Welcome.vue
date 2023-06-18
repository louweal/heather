<template>
  <div v-if="$store.state.modals.show === 'welcome'" class="text-center">
    <p>Your account was succesfully created.</p>

    <div class="d-grid">
      <button class="btn btn-primary" @click="$store.commit('modals/show', { name: 'connect' })">Sign in</button>
    </div>
  </div>
</template>
