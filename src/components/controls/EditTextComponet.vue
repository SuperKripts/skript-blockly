<script setup lang="ts">
import { ref } from "vue"

const { text, defaultText = '', isSaved = true } = defineProps<{ text: string, defaultText?: string, isSaved?: boolean }>();
const emit = defineEmits(['edit']);
const displayText = ref()
const input = ref()

function editText() {
  displayText.value.style.display = "none";
  input.value.style.display = "";

  input.value.focus();
  input.value.select();
  input.value.value = text;
}

function saveText() {
  displayText.value.style.display = "";
  input.value.style.display = "none";

  const newText = input.value.value.trim();
  if (newText != '' && newText != text) {
    emit('edit', newText);
  }
}

defineExpose({ editText })

</script>

<template>
  <div class="click-to-edit">
    <span class='editable-text' @click="editText" :class="{ 'editable-text--unsaved': !isSaved }" ref="displayText"
      v-text="text && text != '' ? text : defaultText"></span>
    <form class='edit-form' @submit.prevent="saveText">
      <input class='edit-input' @blur="saveText" ref="input" type="text" :placeholder="text" style="display: none;">
    </form>
  </div>
</template>

<style scoped>
.click-to-edit {
  display: inline-block;
  min-width: 80px;
}

.editable-text {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  user-select: none;
  outline: none;
  color: var(--text-primary);
  background-color: transparent;
}

.editable-text:hover {
  background-color: var(--bg-light-hover, rgba(0, 0, 0, 0.05));
}

.editable-text:focus {
  background-color: var(--bg-light-hover, rgba(0, 0, 0, 0.08));
  box-shadow: 0 0 0 2px var(--accent-primary);
}

.editable-text--unsaved::after {
  content: ' ●';
  color: var(--warning-color, #ff9800);
}

.edit-form {
  display: inline-block;
  margin: 0;
}

.edit-input {
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: inherit;
  outline: none;
  min-width: 120px;
  background-color: var(--bg-input);
  color: var(--text-primary, #1e1e1e);
}

.edit-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
}
</style>
