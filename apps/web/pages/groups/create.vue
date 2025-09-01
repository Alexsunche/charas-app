<!-- apps/web/pages/groups/create.vue -->
<template>
  <n-card title="Новая группа" size="large">
    <n-form :model="form" :rules="rules" ref="formRef" label-placement="top">
      <n-form-item label="Название" path="name">
        <n-input v-model:value="form.name" placeholder="например: Друзья" />
      </n-form-item>
      <n-form-item label="Тип" path="type">
        <n-select v-model:value="form.type" :options="typeOptions" />
      </n-form-item>
      <n-space>
        <n-button type="primary" @click="submit">Создать</n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { NButton, NCard, NForm, NFormItem, NInput, NSelect, NSpace, type FormRules } from 'naive-ui'
import { useLocal } from '~/composables/useLocal'

const { createGroup } = useLocal()
const formRef = ref()
const form = ref<{ name: string; type: 'FRIENDS' | 'FAMILY' }>({ name: '', type: 'FRIENDS' })
const rules: FormRules = { name: { required: true, message: 'Введите название', trigger: 'blur' } }
const typeOptions = [
  { label: 'Друзья', value: 'FRIENDS' },
  { label: 'Семья', value: 'FAMILY' },
]

const submit = async () => {
  await formRef.value?.validate()
  createGroup({ name: form.value.name, type: form.value.type })
  navigateTo('/groups')
}
</script>
