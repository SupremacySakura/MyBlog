<script setup lang="ts">
</script>
<template>
    <div class="card">
        <slot name="image"></slot>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<style scoped lang="less">
.card {
    width: 580px;
    height: 270px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: space-around;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    display: flex;

    .content {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 270px;
    }
}

.card:hover {
    animation-name: bigger;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.card:not(:hover) {
    animation-name: smaller;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

@keyframes bigger {
    0% {
        scale: 1;
    }

    100% {
        scale: 1.1;
    }
}

@keyframes smaller {
    0% {
        scale: 1.1;
    }

    100% {
        scale: 1;
    }
}
</style>