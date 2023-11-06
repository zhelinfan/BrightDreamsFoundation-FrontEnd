<template>
  <div class="edit-block">
    <div class="title">{{ title }}</div>
    <div v-if="!isEditing" class="valuePart">{{ originalValue }}</div>
    <div v-else class="valuePart">
      <input type="text" v-model="editedValue" @keyup.enter="saveValue" @blur="cancelEdit" />
    </div>
    <div class="edit-button" @click="editValue">{{ isEditing ? '确认修改' : '修改' }}</div>
  </div>
</template>

<script>
export default {
  name: 'PersonalEdit',
  data() {
    return {
      title: '',
      originalValue: '',
      edit: '修改',
      isEditing: false,
      editedValue: ''
    }
  },
  computed: {
    value() {
      return this.isEditing ? this.editedValue : this.originalValue
    }
  },
  methods: {
    editTitle(title) {
      console.log('title')
      this.title = title
    },
    editOrginalValue(ov) {
      this.originalValue = ov
    },
    editValue() {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        this.editedValue = this.originalValue
      }
    },
    saveValue() {
      this.originalValue = this.editedValue
      this.isEditing = false
    }
  }
}
</script>

<style scoped>
.edit-block{
  display: flex;
  flex-direction: row;
}
.valuePart{
  margin-left: 5px;
}
.edit-button{
  margin-left: 20px;
  color: #1482f0;
}
</style>
