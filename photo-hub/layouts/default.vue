<template>
    <NuxtLoadingIndicator />
      <Navbar/>
      <UContainer>
        <div class="flex flex-col items-start justify-start md:flex-row mt-1 w-full">
            <!-- Left Sidebar -->
            <div class=" lg:pr-24  h-screen hidden md:block overflow-y-auto md:sticky md:top-16 ">
                <!-- Content for left sidebar -->
                <LeftPanel/>
            </div>

            <!-- Middle Content (Scrollable) -->
            <div class="mx-auto flex flex-col  md:mx-7 w-full">
                <!-- Content for the middle column that will scroll -->
                <!-- Add your dynamic content here -->
                <slot/>
            </div>

            <!-- Right Sidebar -->
            <div  class="w-1/2 overflow-y-auto  h-screen hidden lg:block  sticky top-16">
                <!-- Content for right sidebar -->
                <!-- Place your right sidebar content here -->
                <RightPanel />
            </div>
        </div>
</UContainer>
    <!-- </UContainer> -->
</template>
<script setup lang="ts">
</script>
<style>
            /* Hide scrollbar for webkit-based browsers */
/* ::-webkit-scrollbar {
    width: 0.5rem; */
    /* background-color: #F1F1F1; */
/* } */

/* ::-webkit-scrollbar-thumb { */
    /* background-color: #0c541e; */
/* } */

 /* Hide scrollbar for Firefox */
/* body { */
    /* scrollbar-width: none; */
/* } */

</style>