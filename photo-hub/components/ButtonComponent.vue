<template>
  <button @click="emit('onClick')" :class="`bg-green-500 text-w w-full hover:bg-slate-900 dark:hover:bg-green-600 text-white font-bold py-1 px-4 rounded`">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">


// emit
const emit = defineEmits(['onClick', 'delete'])



</script>
<style lang="">
    
</style>