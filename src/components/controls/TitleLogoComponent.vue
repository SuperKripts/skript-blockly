<script setup lang="ts">
const version = __VERSION__;
const sha = __GITHUB_SHA__;
const gitBranch = __GITHUB_REF_NAME__;
const triggeringActor = __GITHUB_TRIGGERING_ACTOR__;
const runNumber = __GITHUB_RUN_NUMBER__;
const buildTime = __BUILD_TIME__;
const repoUrl = __GITHUB_SERVER_URL__ + '/' + __GITHUB_REPOSITORY__;

const formattedTime = new Date(buildTime).toLocaleString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const buildInfo = `Version: ${version} · ${sha} (${gitBranch})
Triggered by: ${triggeringActor} · Run #${runNumber}
Last Commit Message: ${__GIT_COMMENT_MSG__}
Build At: ${formattedTime}
Repository: ${repoUrl}`;
</script>

<template>
  <div class="logo" :title="buildInfo">
    <div class="logo-icon">
      <i class="fas fa-cubes"></i>
    </div>
    <div class="logo-text">
      <h1>{{ $t('TITLE') }}</h1>
      <p>{{ $t('DESCRIPTION') }}</p>
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

@media (max-width: 768px) {
  .logo {
    transform: scale(0.85);
    transform-origin: left center;
  }
}
</style>
