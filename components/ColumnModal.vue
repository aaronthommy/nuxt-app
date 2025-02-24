<!-- ColumnModal.vue -->
<template>
  <UModal class="column-modal" v-model="isOpenC">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Schlüssel benennen</h6>
        <UButton class="close-button" color="red" @click="closeModal"
          >X</UButton
        >
      </div>
      <div class="modal-body">
        <label for="input" class="modal-label">Schlüsselbezeichnung:</label>
        <UInput
          autofocus
          class="modal-input"
          v-model="columnName"
          color="amber"
          placeholder="z.B. Haustürschlüssel"
        />
      </div>
      <div class="modal-footer">
        <UButton
          class="save-button"
          style="color: #fff"
          @click="closeModal"
          color="amber"
        >
          Speichern
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script>
export default {
  name: "ColumnModal",
  props: ["columnId"],
  data() {
    return {
      isOpenC: false,
      columnName: "",
    };
  },
  methods: {
    closeModal() {
      // Hier z. B. das neue Spalten-Label speichern
      this.$emit("update-column-name", this.columnName);
      this.$emit("close-this-modal", this.isOpenC);
    },
  },
};
</script>

<style scoped>
@import "./styles/columnModal.scss";
</style>
