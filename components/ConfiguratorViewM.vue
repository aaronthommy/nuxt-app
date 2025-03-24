<template>
  <div class="mobile-container">
    <!-- Kopfbereich -->
    <div class="mobile-header">
      <h1>
        {{ isSchliessanlage ? "Schließanlage Konfigurator" : "Gleichschließung Konfigurator" }}
      </h1>
      <div class="info-icon" @click="toggleInfo">
        <i class="i-heroicons-information-circle" />
      </div>
      <div v-if="showInfo" class="info-tooltip">
        Bei einer Gleichschließung können alle Schlüssel alle Türen öffnen, bei einer Schließanlage benötigen Schlüssel eine gezielte Zuweisung.
      </div>
    </div>

    <!-- Anlagennummer -->
    <div class="mobile-section">
      <h2>Anlagennummer:</h2>
      <input type="text" readonly v-model="anlageNr" placeholder="Anlagenummer" />
    </div>

    <!-- Modellauswahl -->
    <div class="mobile-section">
      <h2>Modellauswahl:</h2>
      <select :value="selectedModelLocal" @change="onModelSelect($event)">
        <option v-for="model in store.availableModels" :key="model" :value="model">
          {{ model }}
        </option>
      </select>
    </div>

    <!-- Gleichschließung Toggle -->
    <div class="mobile-section">
      <label>
        <span>Gleichschließung aktivieren:</span>
        <UToggle color="sky" v-model="finalGleichschliessungState" :disabled="disableGleichToggle" />
      </label>
    </div>

    <!-- Türdetails (Akkordeon) -->
    <div class="mobile-accordion" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <div class="accordion-header" @click="toggleAccordion(rowIndex)">
        <h3>Tür {{ rowIndex + 1 }}</h3>
        <i :class="accordionOpen[rowIndex] ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" />
      </div>
      <div v-if="accordionOpen[rowIndex]" class="accordion-content">
        <!-- Türbezeichnung -->
        <div class="input-group">
          <label>Türbezeichnung:</label>
          <UInput v-model="row[0].doorDesignation" placeholder="z.B. Haupteingang" />
        </div>

        <!-- Anzahl -->
        <div class="input-group">
          <label>Anzahl:</label>
          <UInput v-model="row[0].doorquantity" type="number" min="1" />
        </div>

        <!-- Zylinder-Typ -->
        <div class="input-group">
          <label>Zylinder-Typ:</label>
          <select v-model="row[0].type">
            <option disabled value="">Bitte auswählen</option>
            <option v-for="type in store.availableTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <!-- Größen (Außen/Innen) -->
        <div class="input-group">
          <label>Größen:</label>
          <div class="size-inputs">
            <select v-model="row[0].outside">
              <option value="">Außen</option>
              <option v-for="size in getAvailableOutsideSizes(row[0])" :key="size" :value="size">
                {{ size }} mm
              </option>
            </select>
            <select v-model="row[0].inside">
              <option value="">Innen</option>
              <option v-for="size in getAvailableInsideSizes(row[0])" :key="size" :value="size">
                {{ size }} mm
              </option>
            </select>
          </div>
        </div>

        <!-- Optionen -->
        <div class="input-group">
          <label>Optionen:</label>
          <UButton @click.stop="openOptionsModal(rowIndex)" icon="i-heroicons-cog">
            {{ getSelectedOptionsText(row[0]) || "Optionen auswählen" }}
          </UButton>
        </div>

        <!-- Aktionen (Duplizieren/Löschen) -->
        <div class="action-buttons">
          <UButton @click="duplicateRow(rowIndex)" icon="i-heroicons-document-duplicate">
            Duplizieren
          </UButton>
          <UButton @click="deleteRow(rowIndex)" icon="i-heroicons-trash" color="red">
            Löschen
          </UButton>
        </div>
      </div>
    </div>

    <!-- Schlüssel hinzufügen -->
    <div class="mobile-section">
      <UButton @click="addCheckbox" icon="i-heroicons-plus" class="action-button">
        Schlüssel hinzufügen
      </UButton>
    </div>

    <!-- Weitere Aktionen -->
    <div class="mobile-section">
      <UButton @click="addRow" icon="i-heroicons-plus" class="action-button">
        Tür hinzufügen
      </UButton>
      <UButton @click="saveInstallation" class="action-button">
        Weiter zu den Angeboten
      </UButton>
    </div>

    <!-- Options Modal als einfaches div -->
    <div v-if="modalOptionsVisible" class="options-modal">
      <div class="options-modal-content">
        <h3>Optionen auswählen</h3>
        <div class="options-modal-body">
          <div v-if="activeOptionsModalIndex !== null">
            <div
              v-for="option in (getAllOptionsForType(rows[activeOptionsModalIndex][0]).Optionen || [])"
              :key="option"
              class="option-item"
            >
              <label>
                <input type="checkbox" :value="option" v-model="modalOptionsSelected" />
                {{ option }}
              </label>
            </div>
          </div>
          <div v-else>
            <p>Keine Optionen verfügbar.</p>
          </div>
        </div>
        <div class="options-modal-footer">
          <UButton @click="applyOptions" class="modal-button confirm">Übernehmen</UButton>
          <UButton @click="closeOptionsModal" class="modal-button cancel">Abbrechen</UButton>
        </div>
      </div>
    </div>

    <!-- Warnungsmodal für Modellwechsel -->
    <div v-if="isWarningModalOpen" class="warning-modal">
      <div class="warning-modal-content">
        <p>
          Modell wechseln? Dadurch werden alle aktuellen Einstellungen zurückgesetzt.
        </p>
        <div class="modal-buttons">
          <button @click="confirmChange" class="modal-button confirm">
            Ja, wechseln
          </button>
          <button @click="cancelChange" class="modal-button cancel">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCylinderStore } from "@/stores/cylinderStores.js";
export default {
  name: "MobileConfiguratorView",
  data() {
    return {
      anlageNr: "",
      object: "",
      id: "",
      password: "",
      email: "",
      name: "",
      phone: "",
      company: "",
      typ: "",
      modalStates: {},
      isOpen: false,
      isOpenL: false,
      isDropdownOpen: {},
      // activeOptionsModalIndex steuert, welche Tür aktuell das Optionen-Modal geöffnet hat
      activeOptionsModalIndex: null,
      // Modal Sichtbarkeit und ausgewählte Optionen
      modalOptionsVisible: false,
      modalOptionsSelected: [],
      hoverInfo: false,
      selectedModelLocal: "",
      oldModel: "",
      isWarningModalOpen: false,
      pendingModel: null,
      overrideToGleichschliessung: false,
      rows: [
        [
          {
            position: 1,
            doorDesignation: "",
            doorquantity: 1,
            type: "",
            outside: "",
            inside: "",
            options: {},
            optionsSelected: [],
            checked: !this.isSchliessanlage,
            keyquantity: 1,
            keyname: "Schlüssel 1",
            keycolor: "",
          },
        ],
      ],
      showInfo: false,
      accordionOpen: [],
    };
  },
  computed: {
    store() {
      return useCylinderStore();
    },
    isSchliessanlage() {
      if (this.overrideToGleichschliessung) {
        return false;
      }
      return this.store.isSchliessanlage;
    },
    finalGleichschliessungState: {
      get() {
        if (!this.store.isSchliessanlage) {
          return true;
        }
        const model = this.store.currentModel || "";
        if (model === "ABUS Ec 550") {
          return true;
        }
        return this.overrideToGleichschliessung;
      },
      set(val) {
        this.overrideToGleichschliessung = val;
      },
    },
    disableGleichToggle() {
      if (!this.store.isSchliessanlage) {
        return true;
      }
      if (this.store.currentModel === "ABUS Ec 550") {
        return true;
      }
      return false;
    },
    effectiveIsSchliessanlage() {
      return !this.finalGleichschliessungState;
    },
    selectedModel: {
      get() {
        return this.store.currentModel;
      },
      set(value) {
        this.store.setModel(value);
      },
    },
    sizesDouble() {
      return this.store.sizesDouble;
    },
    sizesKnob() {
      return this.store.sizesKnob;
    },
    sizesHalf() {
      return this.store.sizesHalf;
    },
    options() {
      return this.store.options;
    },
    cylinderType() {
      return this.store.cylinderType;
    },
    showLoadButton() {
      return this.$route.path.includes("/admin/");
    },
  },
  watch: {
    "store.selectedModel": {
      immediate: true,
      handler(newVal) {
        this.selectedModelLocal = newVal;
        this.oldModel = newVal;
      },
    },
    "$route.query.anlageNr": {
      handler(newVal) {
        if (newVal) {
          this.id = newVal;
          this.loadInstallation();
        }
      },
      immediate: true,
    },
  },
  methods: {
    openOptionsModal(rowIndex) {
      // Setze aktiven Index und lade die aktuell ausgewählten Optionen
      this.activeOptionsModalIndex = rowIndex;
      this.modalOptionsSelected = [...this.rows[rowIndex][0].optionsSelected];
      this.modalOptionsVisible = true;
    },
    closeOptionsModal() {
      this.modalOptionsVisible = false;
      this.activeOptionsModalIndex = null;
    },
    applyOptions() {
      if (this.activeOptionsModalIndex !== null) {
        this.rows[this.activeOptionsModalIndex][0].optionsSelected = [
          ...this.modalOptionsSelected,
        ];
      }
      this.closeOptionsModal();
    },
    toggleDropdown(rowIndex) {
      if (!this.isDropdownOpen[rowIndex]) {
        this.isDropdownOpen[rowIndex] = true;
      } else {
        this.isDropdownOpen[rowIndex] = !this.isDropdownOpen[rowIndex];
      }
    },
    getAllOptionsForType(checkbox) {
      if (this.store.selectedModel && checkbox.type) {
        const typeKey = checkbox.type.replace(/\s*\(.*?\)/g, "");
        const optionsData = this.store.getOptionsForType(typeKey);
        if (Array.isArray(optionsData)) {
          return { Optionen: optionsData };
        } else {
          return optionsData;
        }
      }
      return {};
    },
    getSelectedOptionsText(checkbox) {
      if (checkbox.optionsSelected && checkbox.optionsSelected.length) {
        return checkbox.optionsSelected.join(", ");
      }
      return "";
    },
    optionsToString(options) {
      const optionsArray = [];
      for (const category in options) {
        if (options[category]) {
          optionsArray.push(`${category}:${options[category]}`);
        }
      }
      return optionsArray.join(", ");
    },
    stringToOptions(optionsString, availableOptions) {
      const optionsArray = optionsString.split(", ").filter(Boolean);
      const options = {};
      optionsArray.forEach((optionPair) => {
        const [category, option] = optionPair.split(":");
        if (
          category &&
          option &&
          availableOptions[category]?.includes(option)
        ) {
          options[category] = option;
        } else if (availableOptions.Optionen?.includes(optionPair)) {
          options.Optionen = optionPair;
        }
      });
      return options;
    },
    closeAllDropdowns() {
      Object.keys(this.isDropdownOpen).forEach((key) => {
        this.isDropdownOpen[key] = false;
      });
    },
    handleClickOutside(event) {
      if (
        this.$refs.dropdownContainer &&
        !this.$refs.dropdownContainer.contains(event.target)
      ) {
        this.isDropdownOpen = false;
      }
    },
    changeModel() {
      this.store.setModel(this.selectedModel);
      this.rows.forEach((row) => {
        row.forEach((checkbox) => {
          checkbox.type = "";
          checkbox.inside = "";
          checkbox.outside = "";
          checkbox.options = "";
          checkbox.optionsSelected = [];
        });
      });
    },
    getAvailableInsideSizes(checkbox) {
      const sizes = this.getSizesForType(checkbox.type);
      if (checkbox.outside) {
        return sizes
          .filter((size) => size.outside === Number(checkbox.outside))
          .map((size) => size.inside)
          .filter((value, index, self) => self.indexOf(value) === index);
      } else {
        return sizes
          .map((size) => size.inside)
          .filter((value, index, self) => self.indexOf(value) === index);
      }
    },
    getAvailableOutsideSizes(checkbox) {
      const sizes = this.getSizesForType(checkbox.type);
      if (checkbox.inside) {
        return sizes
          .filter((size) => size.inside === Number(checkbox.inside))
          .map((size) => size.outside)
          .filter((value, index, self) => self.indexOf(value) === index);
      } else {
        return sizes
          .map((size) => size.outside)
          .filter((value, index, self) => self.indexOf(value) === index);
      }
    },
    getSizesForType(type) {
      if (this.store.selectedModel && type) {
        const typeKey = type.replace(/\s*\(.*?\)/g, "");
        return this.store.getSizesForType(typeKey);
      }
      return [];
    },
    getAvailableOptions(checkbox) {
      if (this.store.selectedModel && checkbox.type) {
        const typeKey = checkbox.type.replace(/\s*\(.*?\)/g, "");
        return this.store.getOptionsForType(typeKey);
      }
      return {};
    },
    setOption(checkbox, category, value) {
      if (!checkbox.options) {
        checkbox.options = {};
      }
      checkbox.options[category] = value;
    },
    getAllOptionsForType(checkbox) {
      if (this.store.selectedModel && checkbox.type) {
        const typeKey = checkbox.type.replace(/\s*\(.*?\)/g, "");
        return this.store.getOptionsForType(typeKey);
      }
      return [];
    },
    setSingleOption(checkbox, value) {
      checkbox.options = value;
    },
    onTypeChange(checkbox) {
      if (!this.isSchliessanlage) {
        checkbox.checked = true;
      }
      checkbox.inside = "";
      checkbox.outside = "";
      checkbox.options = {};
      checkbox.optionsSelected = [];
    },
    onInsideSizeChange(checkbox) {
      if (!this.isSizeCombinationValid(checkbox)) {
        checkbox.outside = "";
      }
    },
    onOutsideSizeChange(checkbox) {
      if (!this.isSizeCombinationValid(checkbox)) {
        checkbox.inside = "";
      }
    },
    isSizeCombinationValid(checkbox) {
      const sizes = this.getSizesForType(checkbox.type);
      return sizes.some(
        (size) =>
          size.inside === Number(checkbox.inside) &&
          size.outside === Number(checkbox.outside)
      );
    },
    resetOptions(rowIndex) {
      this.rows[rowIndex].options = [];
    },
    navigateToSysteme() {
      this.$router.push({
        name: "systeme",
        query: {
          anlageNr: this.anlageNr,
          isSchliessanlage: this.isSchliessanlage,
        },
      });
    },
    openModal(colIndex) {
      this.modalStates[colIndex] = true;
    },
    closeModal(colIndex) {
      this.modalStates[colIndex] = false;
    },
    updateColumnName(colIndex, newName) {
      this.rows[0][colIndex].keyname = newName;
    },
    addRow() {
      const numCheckboxes = this.rows[0].length;
      const newRow = [];
      for (let i = 0; i < numCheckboxes; i++) {
        newRow.push({
          position: this.rows.length + 1,
          doorDesignation: "",
          doorquantity: 1,
          type: "",
          outside: "",
          inside: "",
          options: {},
          optionsSelected: [],
          checked: !this.isSchliessanlage,
          keyquantity: 1,
          keyname: "Schlüssel " + (i + 1),
        });
      }
      this.rows.push(newRow);
    },
    toggleRadio(checkbox, categoryName, option) {
      if (checkbox.options[categoryName] === option) {
        checkbox.options[categoryName] = null;
      } else {
        checkbox.options[categoryName] = option;
      }
    },
    addCheckbox() {
      this.rows.forEach((checkbox) => {
        if (!this.isSchliessanlage) {
          checkbox.push({
            checked: true,
            keyquantity: 1,
            keyname: "Schlüssel " + (this.rows[0].length + 1),
          });
        } else {
          checkbox.push({
            checked: false,
            keyquantity: 1,
            keyname: "Schlüssel " + (this.rows[0].length + 1),
          });
        }
      });
    },
    deleteCheckbox(colIndex) {
      if (colIndex === 0) {
        alert("Die erste Spalte enthält die Hauptdaten und kann nicht entfernt werden.");
        return;
      }
      const hasMultipleColumns = this.rows.some((row) => row.length > 1);
      if (hasMultipleColumns || colIndex > 0) {
        this.rows.forEach((row) => row.splice(colIndex, 1));
      } else {
        alert("Die letzte Spalte kann nicht entfernt werden.");
      }
    },
    deleteRow(rowIndex) {
      if (this.rows.length > 1 || rowIndex > 0) {
        this.rows.splice(rowIndex, 1);
      } else {
        alert("Die letzte Zeile kann nicht entfernt werden.");
      }
    },
    duplicateRow(rowIndex) {
      const currentRow = this.rows[rowIndex];
      const newRow = this.deepCopy(currentRow);
      this.rows.splice(rowIndex + 1, 0, newRow);
    },
    duplicateCol(colIndex) {
      this.rows.forEach((row, rowIndex) => {
        if (row[colIndex]) {
          const newCol = this.deepCopy(row[colIndex]);
          row.splice(colIndex + 1, 0, newCol);
        }
      });
    },
    deepCopy(obj) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      const copy = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = this.deepCopy(obj[key]);
        }
      }
      return copy;
    },
    generateRandomAnlagenNummer() {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      this.anlageNr = randomNum.toString();
    },
    async test() {
      console.log("test");
      try {
        const response = await fetch("/api/wc-cart-add-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: 25012,
            price: 50,
            quantity: 1,
            Anlage: this.anlageNr,
            billing_first_name: "Frank",
            billing_last_name: "Bose",
            billing_address_1: "Walsroder Straße 24-26",
            billing_city: "Wedemark",
            billing_postcode: "30900",
            billing_country: "DE",
            billing_email: "fb@secutimetec.de",
          }),
        });
        console.log("test");
        const result = await response.json();
        if (result.success) {
          console.log("Produkt erfolgreich in den Warenkorb gelegt.");
        } else {
          console.log("Fehler beim Hinzufügen des Produkts: " + result.message);
        }
      } catch (error) {
        console.log("Es gab einen Fehler bei der Anfrage: " + error);
      }
    },
    async saveInstallation() {
      for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
        const { type, outside, inside } = this.rows[rowIndex][0];
        if (!type) {
          alert(`Bitte Zylinder-Typ in Zeile ${rowIndex + 1} wählen.`);
          return;
        }
        if (!outside) {
          alert(`Bitte Außenmaß in Zeile ${rowIndex + 1} wählen.`);
          return;
        }
        if (!inside) {
          alert(`Bitte Innenmaß in Zeile ${rowIndex + 1} wählen.`);
          return;
        }
      }
      if (this.isSchliessanlage) {
        const colCount = this.rows[0].length;
        for (let c = 0; c < colCount; c++) {
          let foundAtLeastOne = false;
          for (let r = 0; r < this.rows.length; r++) {
            if (this.rows[r][c].checked) {
              foundAtLeastOne = true;
              break;
            }
          }
          if (!foundAtLeastOne) {
            alert(`Bitte mindestens eine Berechtigung in Spalte #${c + 1} anklicken (Schließanlage).`);
            return;
          }
        }
      }
      if (this.anlageNr === "") {
        let antwort;
        do {
          this.generateRandomAnlagenNummer();
          const response = await $fetch("/api/sqltestanlage?ID=" + this.anlageNr, {
            method: "post",
          });
          antwort = response.message;
        } while (antwort === "Anlagennummer existiert.");
      }
      const queryresultanlage = await $fetch("/api/sqlpostanlageneu", {
        method: "post",
        body: {
          ID: this.anlageNr,
          Objekt: this.object,
          Name: this.name,
          EMail: this.email,
          Telefon: this.phone,
          Firma: this.company,
          Typ: this.typ,
          Modell: this.store.selectedModel,
        },
      });
      if (queryresultanlage) {
        const RowObject = this.rows.map((row, rowIndex) => ({
          POS: rowIndex + 1,
          Bezeichnung: row[0].doorDesignation || "",
          Anzahl: row[0].doorquantity || "",
          Typ: row[0].type || "",
          SizeA: row[0].outside || "",
          SizeI: row[0].inside || "",
          Option: (row[0].optionsSelected || []).join(", "),
        }));
        const queryresultposition = await $fetch("/api/sqlpostposition?ID=" + this.anlageNr, {
          method: "post",
          body: RowObject,
        });
        const KeyNameObject = this.rows[0].map((col, colIndex) => ({
          keyPos: colIndex + 1,
          keyname: col.keyname,
          keyquantity: col.keyquantity || 1,
        }));
        const queryresultschluessel = await $fetch("/api/sqlpostschluessel?ID=" + this.anlageNr, {
          method: "post",
          body: KeyNameObject,
        });
        const Matrix = this.rows.flatMap((row, rowIndex) =>
          row.map((col, colIndex) => ({
            position: rowIndex + 1,
            keynr: colIndex + 1,
            checked: col.checked || false,
          }))
        );
        const queryresultmatrix = await $fetch("/api/sqlpostmatrix?ID=" + this.anlageNr, {
          method: "post",
          body: Matrix,
        });
        this.$router.push({
          name: "systeme",
          query: {
            anlageNr: this.anlageNr,
            isSchliessanlage: this.isSchliessanlage,
          },
        });
      }
    },
    async loadInstallation() {
      this.rows.length = 1;
      this.rows[0].length = 1;
      const queryresultanlage = await $fetch("/api/sqlgetanlage", {
        method: "post",
        body: { ID: this.id },
      });
      if (
        queryresultanlage &&
        queryresultanlage.queryresult &&
        queryresultanlage.queryresult.length > 0
      ) {
        this.anlageNr = queryresultanlage.queryresult[0].ID || "";
        this.object = queryresultanlage.queryresult[0].Objekt || "";
        this.name = queryresultanlage.queryresult[0].Name || "";
        this.email = queryresultanlage.queryresult[0].EMail || "";
        this.phone = queryresultanlage.queryresult[0].Telefon || "";
        this.company = queryresultanlage.queryresult[0].Firma || "";
        this.typ = queryresultanlage.queryresult[0].Typ || "";
        const loadedModel = queryresultanlage.queryresult[0].Modell;
        this.store.setModel(loadedModel);
      }
      const queryresultposition = await $fetch("/api/sqlgetposition", {
        method: "post",
        body: { ID: this.id },
      });
      const maxZeilePosition = Math.max(
        ...queryresultposition.queryresult.map((item) => item.POS)
      );
      for (let i = 0; i < maxZeilePosition - 1; i++) {
        const numCheckboxes = this.rows[0].length;
        const newRow = [];
        for (let j = 0; j < numCheckboxes; j++) {
          newRow.push({ checked: false, doorquantity: 1 });
        }
        this.rows.push(newRow);
      }
      queryresultposition.queryresult.forEach((item) => {
        const zeile = item.POS - 1;
        this.rows[zeile][0].doorDesignation = item.Bezeichnung;
        this.rows[zeile][0].doorquantity = item.Anzahl || 1;
        this.rows[zeile][0].type = item.Typ || "";
        this.rows[zeile][0].outside = item.SizeA || "";
        this.rows[zeile][0].inside = item.SizeI || "";
        const loadedString = item.Option || "";
        this.rows[zeile][0].optionsSelected = loadedString
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      });
      const queryresultschluessel = await $fetch("/api/sqlgetschluessel", {
        method: "post",
        body: { ID: this.id },
      });
      const maxSpalteSchluessel = Math.max(
        ...queryresultschluessel.queryresult.map((item) => item.KeyPOS)
      );
      while (this.rows[0].length < maxSpalteSchluessel) {
        this.addCheckbox();
      }
      queryresultschluessel.queryresult.forEach((item) => {
        const spalte = item.KeyPOS - 1;
        this.rows[0][spalte].keyname = item.Bezeichnung;
        this.rows[0][spalte].keyquantity = item.Anzahl;
      });
      const queryresultmatrix = await $fetch("/api/sqlgetmatrix", {
        method: "post",
        body: { ID: this.id },
      });
      const maxZeile = Math.max(
        ...queryresultmatrix.queryresult.map((item) => item.POSZylinder)
      );
      const maxSpalte = Math.max(
        ...queryresultmatrix.queryresult.map((item) => item.POSSchluessel)
      );
      queryresultmatrix.queryresult.forEach((item) => {
        const zeile = item.POSZylinder - 1;
        const spalte = item.POSSchluessel - 1;
        this.rows[zeile][spalte].checked = item.Berechtigung;
      });
    },
    onModelSelect(event) {
      const newlySelected = event.target.value;
      if (newlySelected !== this.oldModel) {
        this.pendingModel = newlySelected;
        event.target.value = this.oldModel;
        this.isWarningModalOpen = true;
      }
    },
    confirmChange() {
      if (this.pendingModel) {
        this.store.setModel(this.pendingModel);
        this.rows.forEach((row) => {
          row.forEach((checkbox) => {
            checkbox.type = "";
            checkbox.inside = "";
            checkbox.outside = "";
            checkbox.options = {};
            checkbox.optionsSelected = [];
            checkbox.checked = !this.isSchliessanlage;
          });
        });
        this.selectedModelLocal = this.pendingModel;
        this.oldModel = this.pendingModel;
        this.isWarningModalOpen = false;
        this.pendingModel = null;
      }
    },
    cancelChange() {
      this.pendingModel = null;
      this.isWarningModalOpen = false;
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    toggleAccordion(index) {
      this.accordionOpen[index] = !this.accordionOpen[index];
    },
  },
  mounted() {
    this.generateRandomAnlagenNummer();
    document.addEventListener("click", this.closeAllDropdowns);
    this.selectedModelLocal = this.store.selectedModel;
    this.oldModel = this.store.selectedModel;
    if (this.$route.query.anlageNr) {
      this.id = this.$route.query.anlageNr;
      this.loadInstallation();
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeAllDropdowns);
  },
};
</script>

<style lang="scss" scoped>
/* Container & genereller Stil */
.mobile-container {
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Kopfbereich */
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #4a90e2, #357ab7);
  border-radius: 8px;
  color: #fff;
}

.info-icon {
  font-size: 24px;
  cursor: pointer;
}

.info-tooltip {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 8px;
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Mobile Sektionen */
.mobile-section {
  margin-bottom: 20px;
}

.mobile-section h2 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #333;
}

/* Formularelemente */
input[type="text"],
select,
input[type="number"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
}

/* Akkordeon */
.mobile-accordion {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
}

.accordion-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.accordion-content {
  padding: 12px 16px;
}

/* Input Gruppen */
.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #555;
}

.size-inputs {
  display: flex;
  gap: 8px;
}

/* Aktions-Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  justify-content: flex-end;
}

/* Allgemeiner Button-Stil */
.action-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-bottom: 12px;
}

.action-button:hover {
  background-color: #357ab7;
}

/* Options Modal als div */
.options-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 110;
}

.options-modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  width: 80%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.options-modal-body {
  margin: 16px 0;
}

.options-modal-footer {
  display: flex;
  justify-content: space-around;
}

/* Warnungsmodal für Modellwechsel */
.warning-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.warning-modal-content {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.modal-button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.modal-button.confirm {
  background-color: #4a90e2;
  color: #fff;
}

.modal-button.cancel {
  background-color: #ccc;
  color: #333;
}

/* Optionen im Modal */
.option-item {
  margin-bottom: 8px;
}

.option-item label {
  font-size: 15px;
  color: #333;
}

/* Responsive Anpassungen */
@media (max-width: 600px) {
  .mobile-container {
    padding: 12px;
  }
  .mobile-header {
    padding: 10px 12px;
  }
  input[type="text"],
  select,
  input[type="number"] {
    padding: 8px;
  }
  .action-button {
    padding: 10px;
    font-size: 15px;
  }
}
</style>
