<template>
  <div class="not-found-container">
    <div class="stars"></div>
    <div class="content">
      <div class="glitch" data-text="404">404</div>
      <h1 class="title">页面迷失在太空</h1>
      <p class="subtitle">我们找不到您要访问的页面</p>
      <router-link to="/" class="home-button"> 返回地球（首页） </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需逻辑代码
</script>

<style scoped>
/* 基础样式 */
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  overflow: hidden;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

/* 星空背景 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(2px 2px at 20px 30px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0));
  background-size: 100px 100px;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

/* 内容区域 */
.content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
  max-width: 800px;
}

/* 故障文字效果 */
.glitch {
  font-size: 10rem;
  font-weight: 800;
  position: relative;
  margin: 0;
  line-height: 1;
  color: #fff;
  animation: glitch-effect 3s infinite alternate;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  color: #0ff;
  z-index: -1;
  animation: glitch-effect-2 2s infinite alternate;
}

.glitch::after {
  color: #f0f;
  z-index: -2;
  animation: glitch-effect-3 2.5s infinite alternate;
}

@keyframes glitch-effect {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
  }
}

/* 标题样式 */
.title {
  font-size: 2rem;
  margin: 1rem 0;
  opacity: 0;
  animation: fadeIn 1s ease-in-out 0.5s forwards;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeIn 1s ease-in-out 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 0.8;
  }
}

/* 返回按钮 */
.home-button {
  display: inline-block;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 1s ease-in-out 1.5s forwards;
  backdrop-filter: blur(5px);
}

.home-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .glitch {
    font-size: 6rem;
  }
  .title {
    font-size: 1.5rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}
</style>
