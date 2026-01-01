<template>
  <div class="logo">
    <div class="logo-icon">
      <i class="fas fa-cubes"></i>
    </div>
    <div class="logo-text">
      <h1>{{ $t('title') }}</h1>
      <p>{{ $t('description') }}</p>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background-color: var(--accent-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon i {
  color: white;
  font-size: 22px;
}

.logo-text h1 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.logo-text p {
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}
</style>
